"use client";

import Link from "next/link";
import { useGetProductsQuery } from "@/store/productsApi";
import ProductCard from "./ProductCard";

export default function BestSellers() {
  const { data: products = [], isLoading } = useGetProductsQuery({ best_seller: 1 });

  const displayProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <section id="best-sellers" className="border-y border-[var(--border)] bg-[var(--card)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="h-10 w-48 animate-pulse rounded bg-[var(--border)]" />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-2xl bg-[var(--border)]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayProducts.length === 0) return null;

  return (
    <section id="best-sellers" className="border-y border-[var(--border)] bg-[var(--card)] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-normal text-[var(--foreground)] sm:text-4xl">
              Best sellers
            </h2>
            <p className="mt-2 text-[var(--muted)]">Most loved by our customers</p>
          </div>
          <Link href="/products" className="text-sm font-medium text-[var(--accent)] hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {displayProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
