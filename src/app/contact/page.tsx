"use client";

import { useState } from "react";
import Link from "next/link";
import { RiMapPinLine, RiPhoneLine, RiMailLine } from "react-icons/ri";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="font-display text-3xl font-normal text-[var(--foreground)] sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          Have a question? Get in touch—we&apos;d love to hear from you.
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                <RiMapPinLine className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">Address</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  06, Rohtak Flyover, near Detailing Street,<br />
                  Model Town, Sonipat, Haryana 131001
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                <RiPhoneLine className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">Phone</h3>
                <a
                  href="tel:+918950962636"
                  className="mt-1 block text-sm text-[var(--accent)] hover:underline"
                >
                  +91 89509 62636
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                <RiMailLine className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">Email</h3>
                <a
                  href="mailto:contact@chhavicraft.com"
                  className="mt-1 block text-sm text-[var(--accent)] hover:underline"
                >
                  contact@chhavicraft.com
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            {submitted ? (
              <p className="text-center text-[var(--foreground)]">
                Thank you for your message. We&apos;ll get back to you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)]">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-2 w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[var(--accent)] px-4 py-3 font-semibold text-white hover:opacity-90"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--border)]">
          <iframe
            title="Chhavi Craft location"
            src="https://maps.google.com/maps?q=Chhavi+Craft+Sonipat&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block"
          />
        </div>

        <p className="mt-8 text-sm text-[var(--muted)]">
          <a
            href="https://www.google.com/maps/place/Chhavi+Craft/data=!4m2!3m1!1s0x0:0x1a7a3f4675bf9e6c"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            View on Google Maps
          </a>
          {" · "}
          For bulk orders, please{" "}
          <a
            href="https://wa.me/918950962636?text=Hi%21%20I%27m%20interested%20in%20placing%20a%20bulk%20order%20for%20Chhavi%20Craft%20products.%20Please%20share%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            WhatsApp us
          </a>{" "}
          or call directly.
        </p>
      </main>
      <Footer />
    </div>
  );
}
