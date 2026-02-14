import Link from "next/link";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us | Chhavi Craft",
  description:
    "Learn about Chhavi Craft – handcrafted personalised gifts in Sonipat. Acrylic QR stands, dog tags, photo albums, corporate gifts & more.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="font-display text-3xl font-normal text-[var(--foreground)] sm:text-4xl">
          About Us
        </h1>
        <p className="mt-2 text-[var(--muted)]">Handcrafted with care in Sonipat</p>

        <div className="mt-10 space-y-6 text-[var(--foreground)]">
          <p className="leading-relaxed text-[var(--foreground)]">
            Chhavi Craft is a personalised gift store based in Sonipat, Haryana. We specialise in
            handcrafted products that can be customised with your name, logo, or message—making
            every gift unique and memorable.
          </p>
          <p className="leading-relaxed text-[var(--foreground)]">
            From acrylic QR scan stands and dog tags to photo albums, QR menu stands, wooden scrap
            books, and corporate gifts—we offer a wide range of products that are perfect for
            personal use, corporate gifting, or special occasions.
          </p>
          <h2 className="mt-10 font-display text-xl font-normal text-[var(--foreground)]">
            Our mission
          </h2>
          <p className="leading-relaxed text-[var(--foreground)]">
            We believe that a gift becomes special when it carries a personal touch. Our mission is
            to help you create thoughtful, meaningful gifts that your loved ones or clients will
            cherish.
          </p>
          <h2 className="mt-10 font-display text-xl font-normal text-[var(--foreground)]">
            Crafted in Sonipat
          </h2>
          <p className="leading-relaxed text-[var(--foreground)]">
            All our products are crafted with attention to detail in Sonipat. We take pride in
            quality materials and precise engraving or printing, ensuring each item meets the high
            standards our customers expect.
          </p>
        </div>

        <Link
          href="/products"
          className="mt-12 inline-block rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white hover:opacity-90"
        >
          Browse products
        </Link>
      </main>
      <Footer />
    </div>
  );
}
