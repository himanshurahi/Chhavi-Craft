"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiUserLine, RiShoppingBagLine, RiSettings3Line, RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const tabs = [
  { href: "/dashboard", label: "Orders", Icon: RiShoppingBagLine },
  { href: "/dashboard/settings", label: "Settings", Icon: RiSettings3Line },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, logout, isAuthReady } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isAuthReady && !isAuthenticated && typeof window !== "undefined") {
      router.push("/login");
    }
  }, [isAuthReady, isAuthenticated, router]);

  if (!isAuthReady || (!isAuthenticated && !user)) {
    return null; // Will redirect or still loading
  }

  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-normal text-[var(--foreground)] sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Welcome back, {user?.name ?? user?.email}
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--background)]"
          >
            <RiLogoutBoxLine className="h-4 w-4" />
            Log out
          </button>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-56">
            <nav className="flex gap-2 lg:flex-col">
              {tabs.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    pathname === href
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
          <div className="flex-1 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
