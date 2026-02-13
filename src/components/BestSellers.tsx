import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Wooden Desk Organizer with Calendar",
    variant: "Brown & Silver",
    price: 599,
    originalPrice: 1198,
    tag: "Sale",
  },
  {
    id: 2,
    name: "Personalised Pen & Keychain Set",
    variant: null,
    price: 399,
    originalPrice: 798,
    tag: "Sale",
  },
  {
    id: 3,
    name: "Doctor Gift Set — Metal Pen & Brass Keychain",
    variant: "Medical sign",
    price: 390,
    originalPrice: 780,
    tag: "Sale",
  },
  {
    id: 4,
    name: "Premium Welcome Kit",
    variant: "Pen, Keychain, Penstand & Diary",
    price: 1890,
    originalPrice: 3780,
    tag: "Sale",
  },
];

function ProductCard({
  name,
  variant,
  price,
  originalPrice,
  tag,
}: (typeof products)[0]) {
  return (
    <Link
      href="#"
      className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition hover:border-[var(--accent)] hover:shadow-lg"
    >
      <div className="aspect-square bg-gradient-to-br from-[var(--background)] to-[var(--border)] flex items-center justify-center text-5xl text-[var(--muted)]/40 group-hover:text-[var(--accent)]/50 transition">
        🎁
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
          <span className="text-sm text-[var(--muted)] line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
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
          <Link
            href="#"
            className="text-sm font-medium text-[var(--accent)] hover:underline"
          >
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
