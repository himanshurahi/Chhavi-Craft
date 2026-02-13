const testimonials = [
  {
    name: "Priya S.",
    text: "Great value for money. The product quality is excellent and it makes a perfect gift for anyone working from home.",
  },
  {
    name: "Rahul M.",
    text: "Best in class for gifting. Nice quality and quick delivery. Will order again for corporate events.",
  },
  {
    name: "Anita K.",
    text: "Very nice product and smooth finish. Worth every rupee. Ideal for friends and colleagues.",
  },
  {
    name: "Vikram J.",
    text: "Beautiful item and so suitable for any occasion. Very happy with the purchase.",
  },
];

export default function Testimonials() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--card)] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-normal text-[var(--foreground)] sm:text-4xl">
            What customers say
          </h2>
          <p className="mt-2 text-[var(--muted)]">Real feedback from real people</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
            >
              <p className="text-sm text-[var(--foreground)]">&ldquo;{t.text}&rdquo;</p>
              <cite className="mt-4 block text-sm font-semibold not-italic text-[var(--accent)]">
                — {t.name}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
