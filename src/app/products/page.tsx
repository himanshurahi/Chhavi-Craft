"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { RiQrCodeLine, RiPriceTag3Line, RiRestaurant2Line, RiCloseLine } from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";
import {
  products,
  productCategories,
  getUniqueProductTypes,
  getUniqueBrands,
} from "@/lib/products";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Product } from "@/lib/products";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "acrylic-qr-stand": RiQrCodeLine,
  dog: RiPriceTag3Line,
  "qr-menu-stand": RiRestaurant2Line,
  "photo-album": MdPhotoLibrary,
};

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

function ProductCard({ product }: { product: Product }) {
  const Icon = iconMap[product.slug] ?? RiQrCodeLine;
  const isMenuStand = product.slug === "qr-menu-stand";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition hover:border-[var(--accent)] hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden">
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br ${product.visualBg} p-4`}
        >
          <Icon className="h-12 w-12 text-[var(--foreground)] sm:h-14 sm:w-14" />
          {isMenuStand && <RiQrCodeLine className="h-8 w-8 text-[var(--foreground)]" />}
          <span className="text-[10px] font-medium text-[var(--muted)]">
            {isMenuStand ? "Your Logo Here" : "Your Name Here"}
          </span>
        </div>
        {product.tag && (
          <span className="absolute bottom-2 left-2 rounded bg-[var(--accent)] px-2 py-0.5 text-xs font-medium text-white">
            {product.tag}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[var(--foreground)] line-clamp-2 group-hover:text-[var(--accent)]">
          {product.name}
        </h3>
        {product.variant && (
          <p className="mt-0.5 text-sm text-[var(--muted)] line-clamp-1">{product.variant}</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold text-[var(--accent)]">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[var(--muted)] line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") ?? "";
  const [availability, setAvailability] = useState("");
  const [priceFilter, setPriceFilter] = useState(searchParams.get("price") ?? "");
  const [productType, setProductType] = useState(searchParams.get("type") ?? "");
  const [brand, setBrand] = useState(searchParams.get("brand") ?? "");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "name-asc");

  const categoryInfo = categorySlug ? productCategories[categorySlug] : null;
  const productTypes = getUniqueProductTypes();
  const brands = getUniqueBrands();

  const { filteredProducts, totalCount } = useMemo(() => {
    let result = [...products];

    if (categorySlug) {
      result = result.filter((p) => p.categorySlug === categorySlug);
    }
    if (availability === "in-stock") {
      result = result.filter(() => true);
    }
    if (priceFilter) {
      const [minStr, maxStr] = priceFilter.split("-");
      const min = parseInt(minStr, 10);
      const max = maxStr ? (maxStr === "+" ? Infinity : parseInt(maxStr, 10)) : Infinity;
      result = result.filter((p) => {
        const price = p.price;
        return price >= min && (max === Infinity || price <= max);
      });
    }
    if (productType) {
      result = result.filter((p) => p.productType === productType);
    }
    if (brand) {
      result = result.filter((p) => p.brand === brand);
    }

    const totalCount = result.length;

    if (sort === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "name-desc") result.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);

    return { filteredProducts: result, totalCount };
  }, [categorySlug, availability, priceFilter, productType, brand, sort]);

  const activeFilters = [
    priceFilter && {
      key: "price",
      label: PRICE_OPTIONS.find((o) => o.value === priceFilter)?.label ?? priceFilter,
      onRemove: () => setPriceFilter(""),
    },
    productType && {
      key: "type",
      label: productType,
      onRemove: () => setProductType(""),
    },
    brand && {
      key: "brand",
      label: brand,
      onRemove: () => setBrand(""),
    },
  ].filter(Boolean) as { key: string; label: string; onRemove: () => void }[];

  const removeAllFilters = () => {
    setPriceFilter("");
    setProductType("");
    setBrand("");
    setAvailability("");
  };

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
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              >
                <option value="">Availability</option>
                <option value="in-stock">In stock</option>
              </select>
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
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              >
                <option value="">Product type</option>
                {productTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              >
                <option value="">Brand</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
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
