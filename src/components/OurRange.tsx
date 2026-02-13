const rangeItems = [
  "Acrylic QR Scan Stand",
  "Dog Tag",
  "QR Code Stand",
  "Photo Album",
  "QR Menu Stand",
  "Wooden Scrap Book",
  "Corporate Gifts",
];

export default function OurRange() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--card)] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-sm font-medium text-[var(--muted)]">
          Chhavi Craft provides you the best range of{" "}
          <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
            {rangeItems.map((item, i) => (
              <span key={item}>
                <span className="text-[var(--foreground)]">{item}</span>
                {i < rangeItems.length - 1 ? "," : ""}
              </span>
            ))}
            <span className="text-[var(--foreground)]"> & more.</span>
          </span>
        </p>
      </div>
    </section>
  );
}
