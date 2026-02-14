import Link from "next/link";
import { RiHomeLine } from "react-icons/ri";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <p className="text-6xl font-display font-normal text-[var(--accent)] sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-normal text-[var(--foreground)] sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-2 max-w-md text-[var(--muted)]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white hover:opacity-90"
        >
          <RiHomeLine className="h-5 w-5" />
          Back to home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
