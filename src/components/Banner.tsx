export default function Banner() {
  return (
    <div className="bg-[var(--accent)] py-2.5 text-center text-sm font-medium text-white">
      <span className="hidden sm:inline">First order 50% off — use code </span>
      <code className="mx-1 rounded bg-white/20 px-2 py-0.5 font-mono">FIRST50</code>
      <span className="sm:ml-1"> | Bulk enquiries: </span>
      <a href="tel:+918950962636" className="font-semibold underline hover:no-underline">
        +91 89509 62636
      </a>
    </div>
  );
}
