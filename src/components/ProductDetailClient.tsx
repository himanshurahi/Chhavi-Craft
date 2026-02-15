"use client";

import { useGetProductBySlugQuery } from "@/store/productsApi";
import ProductDetail from "./ProductDetail";

type Props = { slug: string };

export default function ProductDetailClient({ slug }: Props) {
  const { data: product, isLoading, isError } = useGetProductBySlugQuery(slug);

  const displayProduct = product;

  if (isLoading && !displayProduct) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-[var(--border)]" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-[var(--border)]" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-[var(--border)]" />
            <div className="h-20 w-full animate-pulse rounded bg-[var(--border)]" />
          </div>
        </div>
      </section>
    );
  }

  if (isError && !displayProduct) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 text-center">
        <p className="text-[var(--muted)]">Product not found.</p>
      </section>
    );
  }

  if (!displayProduct) return null;

  return <ProductDetail product={displayProduct} />;
}
