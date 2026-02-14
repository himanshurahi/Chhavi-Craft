"use client";

import Link from "next/link";
import { RiShoppingBagLine, RiDeleteBinLine, RiArrowLeftLine } from "react-icons/ri";
import { useCart } from "@/context/CartContext";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function CartPage() {
  const { items, removeItem, updateQuantity, itemCount, total } = useCart();

  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)]"
        >
          <RiArrowLeftLine className="h-4 w-4" />
          Continue shopping
        </Link>

        <h1 className="font-display text-2xl font-normal text-[var(--foreground)] sm:text-3xl">
          Your cart
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>

        {items.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
            <RiShoppingBagLine className="mx-auto h-16 w-16 text-[var(--muted)]/40" />
            <p className="mt-4 text-lg font-medium text-[var(--foreground)]">Your cart is empty</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Add some products to get started</p>
            <Link
              href="/#best-sellers"
              className="mt-6 inline-block rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:flex-row sm:items-center sm:gap-6"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--foreground)]">{item.name}</h3>
                    {item.personalisation && (
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        Personalisation: {item.personalisation}
                      </p>
                    )}
                    <p className="mt-2 font-semibold text-[var(--accent)]">
                      ₹{item.price.toLocaleString("en-IN")} each
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center overflow-hidden rounded-lg border border-[var(--border)]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-10 w-10 items-center justify-center text-[var(--foreground)] hover:bg-[var(--background)]"
                      >
                        −
                      </button>
                      <span className="w-12 text-center text-sm font-medium text-[var(--foreground)]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-10 w-10 items-center justify-center text-[var(--foreground)] hover:bg-[var(--background)]"
                      >
                        +
                      </button>
                    </div>
                    <p className="min-w-[80px] text-right font-semibold text-[var(--foreground)]">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded p-2 text-[var(--muted)] hover:bg-red-50 hover:text-red-600"
                      aria-label="Remove"
                    >
                      <RiDeleteBinLine className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-[var(--foreground)]">Subtotal</span>
                <span className="text-xl font-bold text-[var(--accent)]">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Tax included. Shipping calculated at checkout.
              </p>
              <Link
                href="/checkout"
                className="mt-6 inline-block w-full rounded-lg bg-[var(--accent)] px-6 py-4 text-center text-base font-semibold text-white hover:opacity-90 sm:w-auto sm:min-w-[200px]"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
