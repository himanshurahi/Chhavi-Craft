import Banner from "@/components/Banner";
import BestSellers from "@/components/BestSellers";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import GiftFinder from "@/components/GiftFinder";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import OurRange from "@/components/OurRange";
import Steps from "@/components/Steps";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main>
        <Hero />
        <Categories />
        <GiftFinder />
        <OurRange />
        <BestSellers />
        <Steps />
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-normal text-[var(--foreground)] sm:text-4xl">
              Unique & useful gifts
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">
              Thoughtful, practical gifts—QR stands, dog tags, photo albums & more. Every item can be personalised with your name or logo. Scan. Share. Personalise.
            </p>
            <a
              href="/#categories"
              className="mt-6 inline-block rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white hover:bg-[#9a4a2e]"
            >
              Shop now
            </a>
          </div>
        </section>
        <section id="bulk" className="border-y border-[var(--border)] bg-[var(--card)] py-12">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <h2 className="font-display text-2xl font-normal text-[var(--foreground)] sm:text-3xl">
              Bulk orders
            </h2>
            <p className="mt-2 text-[var(--muted)]">Corporate or large quantity? Get in touch.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/918950962636"
                title="089509 62636"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
              >
                WhatsApp
              </a>
              <a
                href="mailto:contact@chhavicraft.com"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white"
              >
                Email
              </a>
            </div>
          </div>
        </section>
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
