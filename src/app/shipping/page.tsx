import Link from "next/link";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Shipping | Chhavi Craft",
  description: "Shipping information for Chhavi Craft – delivery times, costs, and coverage.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="font-display text-3xl font-normal text-[var(--foreground)] sm:text-4xl">
          Shipping
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          Delivery information for Chhavi Craft orders
        </p>

        <div className="mt-10 space-y-6 text-[var(--foreground)]">
          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              Processing Time
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Personalised products require time for production. Orders are typically processed
              within 3–5 business days before shipment. During peak seasons, processing may take
              slightly longer.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              Delivery Time
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Delivery times vary by location. Local deliveries in Sonipat and nearby areas may
              arrive within 2–3 days. For other parts of India, expect 5–10 business days depending
              on your address and courier availability.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              Shipping Costs
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Shipping charges are calculated at checkout based on your address and order weight.
              Free shipping may apply to orders above a certain value—check the cart page for
              current offers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              Order Tracking
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Once your order is shipped, you will receive an email with a tracking number. You can
              use this to track your package until delivery.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              Damaged or Lost Shipments
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              If your order arrives damaged or is lost in transit, please contact us within 7 days
              of the expected delivery date. We will work with you to resolve the issue. See our{" "}
              <Link href="/refund" className="text-[var(--accent)] hover:underline">
                Refund Policy
              </Link>{" "}
              for details.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              Bulk Orders
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              For corporate or bulk orders, we offer flexible shipping arrangements. Please{" "}
              <Link href="/contact" className="text-[var(--accent)] hover:underline">
                contact us
              </Link>{" "}
              or call +91 89509 62636 to discuss your requirements.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
