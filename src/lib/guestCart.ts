/**
 * Guest cart stored in sessionStorage when user is not logged in.
 * Merged into API cart on login.
 */

const GUEST_CART_KEY = "chhavi_craft_guest_cart";

export type GuestCartEntry = {
  product_id: number;
  quantity: number;
  name: string;
  slug: string;
  price: number;
  image_url?: string | null;
};

export type GuestCart = {
  items: GuestCartEntry[];
};

function getStored(): GuestCart {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = sessionStorage.getItem(GUEST_CART_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as GuestCart;
    return Array.isArray(parsed?.items) ? { items: parsed.items } : { items: [] };
  } catch {
    return { items: [] };
  }
}

export function getGuestCart(): GuestCart {
  return getStored();
}

export function setGuestCart(cart: GuestCart): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
  } catch {}
}

export function clearGuestCart(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(GUEST_CART_KEY);
  } catch {}
}

/** Add or update quantity for a product in guest cart. Merges with existing entry by product_id. */
export function addToGuestCart(entry: GuestCartEntry): GuestCart {
  const cart = getStored();
  const existing = cart.items.findIndex((i) => i.product_id === entry.product_id);
  if (existing >= 0) {
    const items = [...cart.items];
    items[existing] = {
      ...items[existing],
      quantity: items[existing].quantity + entry.quantity,
      name: entry.name,
      slug: entry.slug,
      price: entry.price,
      image_url: entry.image_url ?? items[existing].image_url,
    };
    const next = { items };
    setGuestCart(next);
    return next;
  }
  const items = [...cart.items, entry];
  const next = { items };
  setGuestCart(next);
  return next;
}

/** Remove by product_id. */
export function removeFromGuestCart(productId: number): GuestCart {
  const cart = getStored();
  const items = cart.items.filter((i) => i.product_id !== productId);
  const next = { items };
  setGuestCart(next);
  return next;
}

/** Set quantity for a product; 0 removes. */
export function updateGuestCartQuantity(productId: number, quantity: number): GuestCart {
  if (quantity <= 0) return removeFromGuestCart(productId);
  const cart = getStored();
  const existing = cart.items.find((i) => i.product_id === productId);
  if (!existing) return cart;
  const items = cart.items.map((i) =>
    i.product_id === productId ? { ...i, quantity } : i
  );
  const next = { items };
  setGuestCart(next);
  return next;
}
