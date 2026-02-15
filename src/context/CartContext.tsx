"use client";

import { createContext, useContext, useCallback, useState, useEffect, useRef } from "react";
import type { CartItem as ApiCartItem } from "@/store/cartApi";
import {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} from "@/store/cartApi";
import { useDispatch } from "react-redux";
import { useAuth } from "@/context/AuthContext";
import {
  getGuestCart,
  clearGuestCart,
  addToGuestCart,
  removeFromGuestCart,
  updateGuestCartQuantity,
  type GuestCartEntry,
} from "@/lib/guestCart";
import { api } from "@/store/baseApi";

/** CartItem from API or guest (guest items use negative id = -product_id). */
export type CartItem = ApiCartItem;

export type PlacedOrder = {
  orderId: string;
  items: CartItem[];
  total: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  isGuest: boolean;
  createdAt: string;
};

/** Optional product snapshot for guest cart display (name, slug, price, image). */
export type ProductSnapshot = {
  name: string;
  slug: string;
  price: number;
  image_url?: string | null;
};

type CartContextType = {
  items: CartItem[];
  addItem: (
    productId: number,
    quantity?: number,
    productSnapshot?: ProductSnapshot
  ) => Promise<unknown>;
  removeItem: (cartItemId: number) => Promise<unknown>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<unknown>;
  clearCart: () => Promise<unknown>;
  placeOrder: (
    details: Omit<PlacedOrder, "orderId" | "items" | "total" | "createdAt">
  ) => PlacedOrder | null;
  itemCount: number;
  total: number;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

function guestCartToItems(guest: ReturnType<typeof getGuestCart>): CartItem[] {
  return guest.items.map((e) => ({
    id: -e.product_id,
    product_id: e.product_id,
    name: e.name,
    slug: e.slug,
    price: e.price,
    quantity: e.quantity,
    subtotal: e.price * e.quantity,
    image_url: e.image_url ?? null,
  }));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [guestItems, setGuestItems] = useState<CartItem[]>(() =>
    typeof window === "undefined" ? [] : guestCartToItems(getGuestCart())
  );
  const hasMergedRef = useRef(false);

  const { data, isLoading } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !isAuthenticated,
  });

  const [addToCartMutation] = useAddToCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [clearCartMutation] = useClearCartMutation();

  const isLoggedIn = !!isAuthenticated;
  const apiItems = data?.items ?? [];
  const apiItemCount = data?.items_count ?? 0;
  const apiTotal = data?.subtotal ?? 0;

  const items = isLoggedIn ? apiItems : guestItems;
  const itemCount = isLoggedIn ? apiItemCount : guestItems.reduce((s, i) => s + i.quantity, 0);
  const total = isLoggedIn ? apiTotal : guestItems.reduce((s, i) => s + i.subtotal, 0);

  // Sync guest cart from sessionStorage on mount (when not logged in)
  useEffect(() => {
    if (isLoggedIn) return;
    setGuestItems(guestCartToItems(getGuestCart()));
  }, [isLoggedIn]);

  // Merge guest cart into API cart when user logs in (once per login)
  useEffect(() => {
    if (!isLoggedIn) {
      hasMergedRef.current = false;
      return;
    }
    if (hasMergedRef.current) return;
    const guest = getGuestCart();
    if (guest.items.length === 0) {
      hasMergedRef.current = true;
      return;
    }
    hasMergedRef.current = true;
    Promise.all(
      guest.items.map((entry) =>
        addToCartMutation({ product_id: entry.product_id, quantity: entry.quantity }).unwrap()
      )
    )
      .then(() => {
        clearGuestCart();
        setGuestItems([]);
        dispatch(api.util.invalidateTags(["Cart"]));
      })
      .catch(() => {
        dispatch(api.util.invalidateTags(["Cart"]));
      });
  }, [isLoggedIn, addToCartMutation, dispatch]);

  const addItem = useCallback(
    async (
      productId: number,
      quantity = 1,
      productSnapshot?: ProductSnapshot
    ) => {
      if (isLoggedIn) {
        return addToCartMutation({ product_id: productId, quantity }).unwrap();
      }
      const entry: GuestCartEntry = {
        product_id: productId,
        quantity,
        name: productSnapshot?.name ?? "Product",
        slug: productSnapshot?.slug ?? "",
        price: productSnapshot?.price ?? 0,
        image_url: productSnapshot?.image_url,
      };
      addToGuestCart(entry);
      setGuestItems(guestCartToItems(getGuestCart()));
    },
    [isLoggedIn, addToCartMutation]
  );

  const removeItem = useCallback(
    async (cartItemId: number) => {
      if (isLoggedIn) {
        return removeCartItem(cartItemId).unwrap();
      }
      const productId = -cartItemId;
      removeFromGuestCart(productId);
      setGuestItems(guestCartToItems(getGuestCart()));
    },
    [isLoggedIn, removeCartItem]
  );

  const updateQuantity = useCallback(
    async (cartItemId: number, quantity: number) => {
      if (isLoggedIn) {
        if (quantity <= 0) return removeCartItem(cartItemId).unwrap();
        return updateCartItem({ cartItemId, quantity }).unwrap();
      }
      const productId = -cartItemId;
      updateGuestCartQuantity(productId, quantity);
      setGuestItems(guestCartToItems(getGuestCart()));
    },
    [isLoggedIn, updateCartItem, removeCartItem]
  );

  const clearCart = useCallback(async () => {
    if (isLoggedIn) {
      return clearCartMutation().unwrap();
    }
    clearGuestCart();
    setGuestItems([]);
  }, [isLoggedIn, clearCartMutation]);

  const placeOrder = useCallback(
    (
      details: Omit<PlacedOrder, "orderId" | "items" | "total" | "createdAt">
    ): PlacedOrder | null => {
      if (items.length === 0) return null;
      const order: PlacedOrder = {
        ...details,
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        items: [...items],
        total,
        createdAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem("chhavi_craft_last_order", JSON.stringify(order));
      } catch {}
      if (isLoggedIn) {
        clearCartMutation();
      } else {
        clearGuestCart();
        setGuestItems([]);
      }
      return order;
    },
    [items, total, isLoggedIn, clearCartMutation]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        placeOrder,
        itemCount,
        total,
        isLoading: isLoggedIn ? isLoading : false,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
