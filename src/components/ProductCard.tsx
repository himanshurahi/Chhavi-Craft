"use client";

import Link from "next/link";
import { RiQrCodeLine, RiPriceTag3Line, RiRestaurant2Line } from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";
import type { Product } from "@/store/productsApi";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "acrylic-qr-stand": RiQrCodeLine,
  "dog-tag": RiPriceTag3Line,
  "qr-menu-stand": RiRestaurant2Line,
  "photo-album": MdPhotoLibrary,
};

const visualBgFallback = "from-[var(--background)] to-[var(--border)]";

function ProductImage({ product }: { product: Product }) {
  if (product.image_url) {
    return (
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const Icon = iconMap[product.slug] ?? RiQrCodeLine;
  const isMenuStand = product.slug === "qr-menu-stand";

  return (
    <div
      className={`flex aspect-square flex-col items-center justify-center gap-2 bg-gradient-to-br ${visualBgFallback} p-4`}
    >
      <Icon className="h-12 w-12 text-[var(--foreground)] sm:h-14 sm:w-14" />
      {isMenuStand && <RiQrCodeLine className="h-8 w-8 text-[var(--foreground)]" />}
      <span className="text-[10px] font-medium text-[var(--muted)]">
        {isMenuStand ? "Your Logo Here" : "Your Name Here"}
      </span>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const displayPrice = product.price;
  const originalPrice = product.actual_price > product.price ? product.actual_price : undefined;
  const tag = product.is_best_seller ? "Best Seller" : undefined;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition hover:border-[var(--accent)] hover:shadow-lg"
    >
      <div className="relative overflow-hidden">
        <ProductImage product={product} />
        {tag && (
          <span className="absolute bottom-2 left-2 rounded bg-[var(--accent)] px-2 py-0.5 text-xs font-medium text-white">
            {tag}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[var(--foreground)] line-clamp-2 group-hover:text-[var(--accent)]">
          {product.name}
        </h3>
        {product.category && (
          <p className="mt-0.5 text-sm text-[var(--muted)] line-clamp-1">{product.category.name}</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold text-[var(--accent)]">
            ₹{displayPrice.toLocaleString("en-IN")}
          </span>
          {originalPrice && (
            <span className="text-sm text-[var(--muted)] line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
