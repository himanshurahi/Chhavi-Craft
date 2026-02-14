import Link from "next/link";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Chhavi Craft",
  description: "Privacy Policy for Chhavi Craft – how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="font-display text-3xl font-normal text-[var(--foreground)] sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-[var(--muted)]">Last updated: {new Date().toLocaleDateString("en-IN")}</p>

        <div className="mt-10 space-y-6 text-[var(--foreground)]">
          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              1. Information We Collect
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              We collect information you provide when placing orders, creating an account, or
              contacting us. This includes your name, email address, phone number, shipping address,
              and payment details. For personalised products, we also collect the text, images, or
              logos you submit for customisation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              2. How We Use Your Information
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              We use your information to process orders, personalise products, communicate with you
              about your orders, and improve our services. We may send promotional emails about new
              products or offers if you have opted in. You can unsubscribe from marketing
              communications at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              3. Information Sharing
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              We do not sell your personal information. We may share your data with trusted service
              providers (e.g., payment processors, shipping partners) solely for order fulfilment. We
              require these partners to protect your information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              4. Data Security
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              We implement appropriate security measures to protect your personal information.
              However, no method of transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              5. Your Rights
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              You have the right to access, correct, or delete your personal information. You may
              also request that we limit the use of your data. Contact us to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-normal text-[var(--foreground)]">
              6. Contact
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              For privacy-related enquiries, please contact us at{" "}
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
