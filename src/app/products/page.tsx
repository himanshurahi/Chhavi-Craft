"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useGetProductsQuery } from "@/store/productsApi";
import { useGetCategoryBySlugQuery } from "@/store/categoriesApi";
import { productCategories } from "@/lib/products";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const SORT_OPTIONS = [
  { value: "name-asc", label: "Alphabetically, A-Z" },
  { value: "name-desc", label: "Alphabetically, Z-A" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
];

const PRICE_OPTIONS = [
  { value: "", label: "Price" },
  { value: "0-300", label: "₹0 - ₹300" },
  { value: "300-500", label: "₹300 - ₹500" },
  { value: "500-800", label: "₹500 - ₹800" },
  { value: "800-1200", label: "₹800 - ₹1,200" },
  { value: "1200+", label: "₹1,200+" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") ?? "";
  const [priceFilter, setPriceFilter] = useState(searchParams.get("price") ?? "");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "name-asc");

  const { data: products = [], isLoading, isError } = useGetProductsQuery(
    categorySlug ? { category: categorySlug } : undefined
  );

  const { data: categoryFromApi } = useGetCategoryBySlugQuery(categorySlug, {
    skip: !categorySlug,
  });

  const categoryInfo = categoryFromApi
    ? { name: categoryFromApi.name, description: categoryFromApi.description ?? "" }
    : categorySlug
      ? productCategories[categorySlug]
      : null;

  const { filteredProducts, totalCount } = useMemo(() => {
    let result = [...products];

    if (priceFilter) {
      const [minStr, maxStr] = priceFilter.split("-");
      const min = parseInt(minStr, 10);
      const max = maxStr ? (maxStr === "+" ? Infinity : parseInt(maxStr, 10)) : Infinity;
      result = result.filter((p) => {
        const price = p.price;
        return price >= min && (max === Infinity || price <= max);
      });
    }

    const totalCount = result.length;

    if (sort === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "name-desc") result.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);

    return { filteredProducts: result, totalCount };
  }, [products, priceFilter, sort]);

  const activeFilters = [
    priceFilter && {
      key: "price",
      label: PRICE_OPTIONS.find((o) => o.value === priceFilter)?.label ?? priceFilter,
      onRemove: () => setPriceFilter(""),
    },
  ].filter(Boolean) as { key: string; label: string; onRemove: () => void }[];

  const removeAllFilters = () => setPriceFilter("");

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Banner />
        <Nav />
        <main className="pb-16">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <div className="h-10 w-48 animate-pulse rounded bg-[var(--border)]" />
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-2xl bg-[var(--border)]" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen">
        <Banner />
        <Nav />
        <main className="pb-16">
          <div className="mx-auto max-w-7xl px-4 py-12 text-center">
            <p className="text-[var(--muted)]">Unable to load products. Please try again later.</p>
            <Link href="/products" className="mt-4 inline-block text-[var(--accent)] hover:underline">
              Refresh
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="pb-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <h1 className="font-display text-3xl font-normal text-[var(--foreground)] sm:text-4xl">
            {categoryInfo?.name ?? "Products"}
          </h1>
          {categoryInfo?.description && (
            <p className="mt-3 max-w-2xl text-[var(--muted)]">{categoryInfo.description}</p>
          )}

          {/* Filters and sort */}
          <div className="mt-6 flex flex-col gap-4 border-b border-[var(--border)] pb-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-[var(--foreground)]">Filter:</span>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              >
                {PRICE_OPTIONS.map((o) => (
                  <option key={o.value || "any"} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-[var(--foreground)]">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="text-sm text-[var(--muted)]">
                {filteredProducts.length} of {products.length} products
              </span>
            </div>
          </div>

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {activeFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={f.onRemove}
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5"
                >
                  {f.label}
                  <RiCloseLine className="h-4 w-4" />
                </button>
              ))}
              <button
                onClick={removeAllFilters}
                className="text-sm font-medium text-[var(--accent)] hover:underline"
              >
                Remove all
              </button>
            </div>
          )}

          {/* Product grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="py-12 text-center text-[var(--muted)]">
              No products match your filters. Try adjusting or removing filters.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--background)]" />}>
      <ProductsContent />
    </Suspense>
  );
}
