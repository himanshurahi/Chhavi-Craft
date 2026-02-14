"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RiCheckLine, RiArrowRightLine } from "react-icons/ri";
import type { PlacedOrder } from "@/context/CartContext";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("chhavi_craft_last_order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch {
      setOrder(null);
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen">
        <Banner />
        <Nav />
        <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:py-24">
          <p className="text-[var(--muted)]">No order found. Redirecting...</p>
          <Link href="/" className="mt-6 inline-block text-[var(--accent)] hover:underline">
            Continue shopping
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <RiCheckLine className="h-10 w-10 text-emerald-600" />
            </div>
          </div>
          <h1 className="mt-6 text-center font-display text-2xl font-normal text-[var(--foreground)] sm:text-3xl">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-center text-[var(--muted)]">
            Your order has been placed successfully.
          </p>

          <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6">
            <div className="flex justify-between">
              <span className="text-sm text-[var(--muted)]">Order number</span>
              <span className="font-semibold text-[var(--foreground)]">{order.orderId}</span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-sm text-[var(--muted)]">Date</span>
              <span className="text-sm text-[var(--foreground)]">{orderDate}</span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-sm text-[var(--muted)]">Email</span>
              <span className="text-sm text-[var(--foreground)]">{order.email}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <h2 className="font-semibold text-[var(--foreground)]">Order details</h2>
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm"
              >
                <span className="text-[var(--foreground)]">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold text-[var(--foreground)]">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between border-t border-[var(--border)] pt-6">
            <span className="font-semibold text-[var(--foreground)]">Total</span>
            <span className="text-xl font-bold text-[var(--accent)]">
              ₹{order.total.toLocaleString("en-IN")}
            </span>
          </div>

          <p className="mt-6 text-center text-sm text-[var(--muted)]">
            A confirmation email has been sent to {order.email}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-base font-semibold text-white hover:opacity-90"
            >
              Continue shopping
              <RiArrowRightLine className="h-5 w-5" />
            </Link>
            <Link
              href="/products/acrylic-qr-stand"
              className="inline-flex items-center justify-center rounded-lg border-2 border-[var(--foreground)] px-6 py-3 text-base font-semibold text-[var(--foreground)] hover:bg-[var(--background)]"
            >
              Track order
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
