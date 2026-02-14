"use client";

import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#pens", label: "Personalized Pens" },
  { href: "/#diaries", label: "Corporate Diaries" },
  { href: "/#organizers", label: "Desk Organizers" },
  { href: "/#combos", label: "Gift Combos" },
  { href: "/#household", label: "Household Gifts" },
];

const infoLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund", label: "Refund Policy" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/shipping", label: "Shipping" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-white dark:bg-[#1a1612] dark:border-t dark:border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-normal">Chhavi Craft</p>
            <p className="mt-4 text-sm text-white/80">
              We provide the best range of Acrylic QR Scan Stand, Dog Tag, QR Code Stand, Photo Album, QR Menu Stand, Wooden Scrap Book, Corporate Gifts & more.
            </p>
            <p className="mt-4 text-sm text-white/80">
              06, Rohtak Flyover, near Detailing Street,<br />
              Model Town, Sonipat, Haryana 131001
            </p>
            <p className="mt-2">
              <a href="tel:08950962636" className="text-sm text-[var(--accent-light)] hover:underline">
                089509 62636
              </a>
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Quick links</h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Information</h4>
            <ul className="mt-4 space-y-2">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Stay updated</h4>
            <p className="mt-4 text-sm text-white/80">Subscribe for offers and new launches.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:border-[var(--accent-light)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-light)] dark:border-white/30 dark:bg-white/5"
              />
              <button
                type="submit"
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-light)]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          © {new Date().getFullYear()} Chhavi Craft. Crafted with care in Sonipat.
        </div>
      </div>
    </footer>
  );
}
