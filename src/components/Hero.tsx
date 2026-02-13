import Link from "next/link";

// QR-inspired small grid (accent colour #b85c38)
const QR_BG = "data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23b85c38' fill-opacity='0.07'%3E%3Crect width='4' height='4'/%3E%3Crect x='8' y='0' width='4' height='4'/%3E%3Crect x='16' y='0' width='4' height='4'/%3E%3Crect x='24' y='0' width='4' height='4'/%3E%3Crect x='4' y='8' width='4' height='4'/%3E%3Crect x='12' y='8' width='4' height='4'/%3E%3Crect x='20' y='8' width='4' height='4'/%3E%3Crect y='16' width='4' height='4'/%3E%3Crect x='8' y='16' width='4' height='4'/%3E%3Crect x='16' y='16' width='4' height='4'/%3E%3Crect x='24' y='16' width='4' height='4'/%3E%3Crect x='4' y='24' width='4' height='4'/%3E%3Crect x='12' y='24' width='4' height='4'/%3E%3Crect x='20' y='24' width='4' height='4'/%3E%3C/g%3E%3C/svg%3E";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--background)] via-[#f5f0e8] to-[var(--accent-light)]/20">
      <div className="absolute inset-0 bg-[length:32px_32px] opacity-90" style={{ backgroundImage: `url("${QR_BG}")` }} />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
            Handcrafted in Sonipat
          </p>
          <h1 className="font-display text-4xl font-normal leading-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            Everything personalisable
          </h1>
          <p className="mt-6 text-lg text-[var(--muted)]">
            From QR stands to dog tags and photo albums—we personalise it all with your name or logo. Scan. Share. Personalise.
          </p>
          <p className="mt-3 text-sm font-medium text-[var(--accent)]">
            Your name on every scan.
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]/90">
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
