import Link from "next/link";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Chhavi Craft",
  description: "Terms of Service for Chhavi Craft – personalised gifts and corporate gifting.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="font-display text-3xl font-normal text-[var(--foreground)] sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-[var(--muted)]">Last updated: {new Date().toLocaleDateString("en-IN")}</p>

        <div className="mt-10 space-y-6 text-[var(--foreground)]">
          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              1. Acceptance of Terms
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              By accessing and using the Chhavi Craft website and services, you agree to be bound by
              these Terms of Service. If you do not agree to these terms, please do not use our
              services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              2. Products and Orders
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              We offer personalised and corporate gifts. By placing an order, you confirm that the
              information you provide (including personalisation details such as names, logos, or
              text) is accurate and that you have the right to use any content you submit. We
              reserve the right to refuse orders that contain inappropriate or infringing content.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              3. Payment
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Payment is required at the time of checkout. We accept the payment methods displayed
              on our website. All prices are in Indian Rupees (₹) and include applicable taxes unless
              otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              4. Personalisation
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Our products are personalised based on your specifications. Please verify all
              personalisation details before confirming your order. Changes cannot be made once
              production has begun.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              5. Limitation of Liability
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Chhavi Craft shall not be liable for any indirect, incidental, or consequential
              damages arising from the use of our products or services. Our liability is limited to
              the amount paid for the specific order in question.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              6. Changes
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              We may update these Terms of Service from time to time. Continued use of our services
              after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              7. Contact
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              For questions about these terms, please contact us at{" "}
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
