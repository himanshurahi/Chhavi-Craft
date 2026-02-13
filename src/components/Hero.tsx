import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--background)] via-[#f5f0e8] to-[var(--accent-light)]/20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23b85c38\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
            Handcrafted in Sonipat
          </p>
          <h1 className="font-display text-4xl font-normal leading-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            Everything personalisable
          </h1>
          <p className="mt-6 text-lg text-[var(--muted)]">
            From diaries to pens and desk organisers—we personalise it all with precision. Add a name or logo with a single click.
          </p>
          <p className="mt-3 text-sm text-[var(--muted)]/90">
            Best range of Acrylic QR Scan Stand, Dog Tag, QR Code Stand, Photo Album, QR Menu Stand, Wooden Scrap Book, Corporate Gifts & more.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/#categories"
              className="inline-flex items-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[var(--accent)]/25 transition hover:bg-[#9a4a2e]"
            >
              Shop now
            </Link>
            <Link
              href="/#gift-finder"
              className="inline-flex items-center rounded-full border-2 border-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-white"
            >
              Find a gift
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
