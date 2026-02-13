"use client";

import Link from "next/link";
import { useState } from "react";
import { RiMenuLine, RiCloseLine, RiSearchLine, RiUserLine, RiShoppingBagLine } from "react-icons/ri";
import { FaGift } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#pens", label: "Personalized Pens" },
  { href: "/#diaries", label: "Corporate Diaries" },
  { href: "/#organizers", label: "Desk Organizers" },
  { href: "/#combos", label: "Gift Combos" },
  { href: "/#household", label: "Household Gifts" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded p-2 text-[var(--foreground)] hover:bg-[var(--border)]"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <RiCloseLine className="h-6 w-6" /> : <RiMenuLine className="h-6 w-6" />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center text-[var(--accent)]">
              <FaGift className="h-8 w-8" />
            </span>
            <div>
              <span className="block font-display text-xl font-normal text-[var(--accent)] sm:text-2xl">
                Chhavi Craft
              </span>
              <span className="block text-xs font-medium tracking-wide text-[var(--foreground)]">
                THE CORPORATE GIFT STORE
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/search"
            className="rounded-full p-2 text-[var(--foreground)] hover:bg-[var(--border)]"
            aria-label="Search"
          >
            <RiSearchLine className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
          <Link
            href="/login"
            className="rounded-full p-2 text-[var(--foreground)] hover:bg-[var(--border)]"
            aria-label="Account"
          >
            <RiUserLine className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full p-2 text-[var(--foreground)] hover:bg-[var(--border)]"
            aria-label="Cart"
          >
            <RiShoppingBagLine className="h-5 w-5 sm:h-6 sm:w-6" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-medium text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/#bulk" className="py-2 text-sm font-medium text-[var(--accent)]" onClick={() => setOpen(false)}>
              Bulk orders
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
