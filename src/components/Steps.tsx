"use client";

import { RiQrCodeLine, RiShoppingCartLine, RiSmartphoneLine } from "react-icons/ri";

const steps = [
  {
    title: "Add your name or logo",
    desc: "Pick a product and add a name or logo. We engrave or print it with precision.",
    Icon: RiQrCodeLine,
    accent: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-500/10",
  },
  {
    title: "Order & relax",
    desc: "Place your order. We'll confirm and keep you updated until dispatch.",
    Icon: RiShoppingCartLine,
    accent: "from-[var(--accent)] to-rose-600",
    bgGlow: "bg-[var(--accent)]/10",
  },
  {
    title: "Scan & enjoy",
    desc: "Receive your personalised product. Scan your QR, share your link, or gift it—your name on every scan.",
    Icon: RiSmartphoneLine,
    accent: "from-emerald-500 to-teal-600",
    bgGlow: "bg-emerald-500/10",
  },
];

export default function Steps() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-white to-[var(--background)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[var(--accent)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--accent)]">
            How it works
          </span>
          <h2 className="mt-4 font-display text-3xl font-normal text-[var(--foreground)] sm:text-4xl lg:text-5xl">
            Order in 3 steps
          </h2>
          <p className="mt-3 text-lg text-[var(--muted)]">Simple, fast, reliable</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-4 lg:gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center">
              <div
                className="absolute top-14 hidden h-0.5 md:block"
                style={{
                  left: i === 0 ? "50%" : 0,
                  right: i === steps.length - 1 ? "50%" : 0,
                  background:
                    "linear-gradient(90deg, transparent 0%, var(--accent) 15%, var(--accent) 85%, transparent 100%)",
                  opacity: 0.35,
                }}
                aria-hidden
              />

              <div
                className={`relative flex h-full min-h-[280px] flex-col rounded-3xl border border-[var(--border)] bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[var(--accent)]/30 ${step.bgGlow} hover:scale-[1.02] md:min-h-[300px]`}
              >
                <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--foreground)] text-sm font-bold text-white shadow-md">
                  {i + 1}
                </span>

                <div className="flex flex-1 flex-col items-center text-center">
                  <div
                    className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.accent} text-white shadow-lg`}
                  >
                    <step.Icon className="h-10 w-10" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[var(--foreground)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-[var(--muted)]">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
