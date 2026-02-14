"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { RiMenuLine, RiCloseLine, RiSearchLine, RiUserLine, RiShoppingBagLine, RiSunLine, RiMoonLine } from "react-icons/ri";
import { FaGift } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products?category=pens", label: "Personalized Pens" },
  { href: "/products?category=diaries", label: "Corporate Diaries" },
  { href: "/products?category=organizers", label: "Desk Organizers" },
  { href: "/products?category=combos", label: "Gift Combos" },
  { href: "/products", label: "Household Gifts" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated, user } = useAuth();
  const initials = user?.name
    ? user.name
        .split(/[\s.]+/)
        .filter(Boolean)
        .map((p) => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || user.email.slice(0, 2).toUpperCase()
    : null;
  const { itemCount: cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded p-2 text-[var(--foreground)] hover:bg-[var(--border)] md:hidden"
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
              <span className="block font-display text-lg font-normal text-[var(--accent)] sm:text-xl md:text-2xl">
                Chhavi Craft
              </span>
              <span className="block text-xs font-medium tracking-wide text-[var(--foreground)]">
                Crafting your Curiosity
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
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden rounded-full p-2 text-[var(--foreground)] hover:bg-[var(--border)] md:flex"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <RiSunLine className="h-5 w-5 sm:h-6 sm:w-6" /> : <RiMoonLine className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded-full p-2 text-[var(--foreground)] hover:bg-[var(--border)]"
            aria-label="Search"
          >
            <RiSearchLine className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <Link
            href={isAuthenticated ? "/dashboard" : "/login"}
            className="flex items-center justify-center rounded-full p-2 text-[var(--foreground)] hover:bg-[var(--border)]"
            aria-label={isAuthenticated ? "Dashboard" : "Log in"}
          >
            {isAuthenticated && initials ? (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-semibold text-white sm:h-9 sm:w-9 sm:text-sm">
                {initials}
              </span>
            ) : (
              <RiUserLine className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
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

      {/* Search overlay - always in DOM for transitions */}
      <div
        className={`fixed inset-0 z-[60] flex items-start justify-center bg-black/40 pt-[20vh] px-4 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          searchOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSearchOpen(false)}
        role="dialog"
        aria-label="Search"
        aria-hidden={!searchOpen}
      >
        <div
          className={`w-full max-w-2xl transition-all duration-300 ease-out ${
            searchOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-4 scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <RiSearchLine className="h-6 w-6 shrink-0 text-[var(--muted)]" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 text-lg text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none sm:text-xl"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="rounded-full p-2 text-[var(--muted)] hover:bg-[var(--border)] hover:text-[var(--foreground)]"
                  aria-label="Close search"
                >
                  <RiCloseLine className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

      {/* Mobile menu - slide animation, hidden on desktop */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
            open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2 overflow-y-auto border-t border-[var(--border)] bg-[var(--card)] px-4 py-4">
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
            <button
              type="button"
              onClick={() => { toggleTheme(); setOpen(false); }}
              className="flex items-center gap-2 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)]"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <RiSunLine className="h-5 w-5" /> : <RiMoonLine className="h-5 w-5" />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </nav>
        </div>
    </header>
  );
}
