"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  personalisation?: string;
};

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

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (details: Omit<PlacedOrder, "orderId" | "items" | "total" | "createdAt">) => PlacedOrder | null;
  itemCount: number;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "chhavi_craft_cart";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      setItems([]);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {}
    }
  }, [items, mounted]);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    setItems((prev) => [...prev, { ...item, id: generateId() }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const placeOrder = useCallback(
    (details: Omit<PlacedOrder, "orderId" | "items" | "total" | "createdAt">) => {
      if (items.length === 0) return null;
      const order: PlacedOrder = {
        ...details,
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        items: [...items],
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        createdAt: new Date().toISOString(),
      };
      setItems([]);
      try {
        localStorage.setItem("chhavi_craft_last_order", JSON.stringify(order));
      } catch {}
      return order;
    },
    [items]
  );

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

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
