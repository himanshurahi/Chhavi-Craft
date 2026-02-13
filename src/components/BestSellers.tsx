import Link from "next/link";
import { RiQrCodeLine, RiPriceTag3Line, RiRestaurant2Line } from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";

const products = [
  {
    id: 1,
    name: "Acrylic QR Scan Stand",
    variant: "Your Name / Logo",
    price: 599,
    originalPrice: 1198,
    tag: "Sale",
    Visual: () => (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[var(--background)] to-[var(--border)] p-4">
        <div className="rounded-lg bg-white p-3 shadow-sm">
          <RiQrCodeLine className="h-12 w-12 text-[var(--foreground)]" />
        </div>
        <span className="text-[10px] font-medium text-[var(--muted)]">Your Name Here</span>
      </div>
    ),
  },
  {
    id: 2,
    name: "Personalised Dog Tag",
    variant: "Engraved name",
    price: 399,
    originalPrice: 798,
    tag: "Sale",
    Visual: () => (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-amber-50 to-amber-100/50 p-4">
        <RiPriceTag3Line className="h-14 w-14 text-amber-700" />
        <span className="text-[10px] font-medium text-[var(--muted)]">Your Name Here</span>
      </div>
    ),
  },
  {
    id: 3,
    name: "QR Menu Stand",
    variant: "Your menu link",
    price: 490,
    originalPrice: 780,
    tag: "Sale",
    Visual: () => (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
        <RiRestaurant2Line className="h-12 w-12 text-emerald-700" />
        <RiQrCodeLine className="h-8 w-8 text-[var(--foreground)]" />
        <span className="text-[10px] font-medium text-[var(--muted)]">Your Logo Here</span>
      </div>
    ),
  },
  {
    id: 4,
    name: "Personalised Photo Album",
    variant: "Your name on cover",
    price: 890,
    originalPrice: 1780,
    tag: "Sale",
    Visual: () => (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-rose-50 to-pink-50 p-4">
        <MdPhotoLibrary className="h-14 w-14 text-rose-600" />
        <span className="text-[10px] font-medium text-[var(--muted)]">Your Name Here</span>
      </div>
    ),
  },
];

function ProductCard({ name, variant, price, originalPrice, tag, Visual }: (typeof products)[0]) {
  return (
    <Link
      href="#"
      className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition hover:border-[var(--accent)] hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden">
        <Visual />
      </div>
      <div className="p-4">
        {tag && (
          <span className="inline-block rounded bg-[var(--accent)] px-2 py-0.5 text-xs font-medium text-white">
            {tag}
          </span>
        )}
        <h3 className="mt-2 font-semibold text-[var(--foreground)] line-clamp-2 group-hover:text-[var(--accent)]">
          {name}
        </h3>
        {variant && <p className="text-sm text-[var(--muted)]">{variant}</p>}
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold text-[var(--accent)]">₹{price.toLocaleString("en-IN")}</span>
          <span className="text-sm text-[var(--muted)] line-through">
            ₹{originalPrice.toLocaleString("en-IN")}
          </span>
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
          <Link href="#" className="text-sm font-medium text-[var(--accent)] hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
