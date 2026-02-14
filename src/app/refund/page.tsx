import Link from "next/link";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Refund Policy | Chhavi Craft",
  description: "Refund and return policy for Chhavi Craft personalised gifts.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="font-display text-3xl font-normal text-[var(--foreground)] sm:text-4xl">
          Refund Policy
        </h1>
        <p className="mt-2 text-[var(--muted)]">Last updated: {new Date().toLocaleDateString("en-IN")}</p>

        <div className="mt-10 space-y-6 text-[var(--foreground)]">
          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              Overview
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              At Chhavi Craft, we take pride in the quality of our personalised products. If you are
              not satisfied with your purchase, please review this policy to understand your options.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              Eligibility for Refunds
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Refunds may be considered in the following circumstances: (1) The product arrives
              damaged or defective; (2) The wrong product was shipped; (3) The personalisation is
              incorrect due to our error. Due to the custom nature of our products, we generally
              cannot accept returns or offer refunds for change of mind or errors in information
              provided by the customer.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              How to Request a Refund
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Contact us within 7 days of receiving your order. Please provide your order number,
              photos of the issue (if applicable), and a brief description. We will review your
              request and respond within 3–5 business days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              Refund Process
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Approved refunds will be processed to the original payment method within 7–10 business
              days. For replacement of defective or incorrect items, we may offer to ship a correct
              product at no additional cost instead of a refund.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              Contact
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              For refund enquiries, reach us at{" "}
              <Link href="/contact" className="text-[var(--accent)] hover:underline">
                Contact
              </Link>{" "}
              or call +91 89509 62636.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
