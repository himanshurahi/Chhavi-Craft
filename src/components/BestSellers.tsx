import Link from "next/link";
import { RiQrCodeLine, RiPriceTag3Line, RiRestaurant2Line } from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";
import { products } from "@/lib/products";

const iconMap = {
  "acrylic-qr-stand": RiQrCodeLine,
  dog: RiPriceTag3Line,
  "qr-menu-stand": RiRestaurant2Line,
  "photo-album": MdPhotoLibrary,
} as const;

const iconColor: Record<string, string> = {
  "acrylic-qr-stand": "text-[var(--foreground)]",
  dog: "text-amber-700",
  "qr-menu-stand": "text-emerald-700",
  "photo-album": "text-rose-600",
};

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const Icon = iconMap[product.slug as keyof typeof iconMap] ?? RiQrCodeLine;
  const isMenuStand = product.slug === "qr-menu-stand";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition hover:border-[var(--accent)] hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden">
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br ${product.visualBg} p-4`}
        >
          <Icon className={`h-12 w-12 sm:h-14 sm:w-14 ${iconColor[product.slug] ?? "text-[var(--foreground)]"}`} />
          {isMenuStand && <RiQrCodeLine className="h-8 w-8 text-[var(--foreground)]" />}
          <span className="text-[10px] font-medium text-[var(--muted)]">
            {isMenuStand ? "Your Logo Here" : "Your Name Here"}
          </span>
        </div>
      </div>
      <div className="p-4">
        {product.tag && (
          <span className="inline-block rounded bg-[var(--accent)] px-2 py-0.5 text-xs font-medium text-white">
            {product.tag}
          </span>
        )}
        <h3 className="mt-2 font-semibold text-[var(--foreground)] line-clamp-2 group-hover:text-[var(--accent)]">
          {product.name}
        </h3>
        {product.variant && <p className="text-sm text-[var(--muted)]">{product.variant}</p>}
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

export default function BestSellers() {
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
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
