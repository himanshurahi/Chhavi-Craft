"use client";

import { RiQrCodeLine, RiPriceTag3Line, RiBook2Line, RiRestaurant2Line, RiGiftLine } from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";

const rangeItems = [
  { name: "Acrylic QR Scan Stand", Icon: RiQrCodeLine, color: "text-[var(--accent)]" },
  { name: "Dog Tag", Icon: RiPriceTag3Line, color: "text-amber-600" },
  { name: "QR Code Stand", Icon: RiQrCodeLine, color: "text-[var(--accent)]" },
  { name: "Photo Album", Icon: MdPhotoLibrary, color: "text-rose-500" },
  { name: "QR Menu Stand", Icon: RiRestaurant2Line, color: "text-emerald-600" },
  { name: "Wooden Scrap Book", Icon: RiBook2Line, color: "text-amber-700" },
  { name: "Corporate Gifts", Icon: RiGiftLine, color: "text-[var(--accent)]" },
];

export default function OurRange() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--card)] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-sm font-medium text-[var(--muted)] mb-6">
          Chhavi Craft provides you the best range of
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8">
          {rangeItems.map(({ name, Icon, color }) => (
            <span
              key={name}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)]"
            >
              <Icon className={`h-5 w-5 shrink-0 ${color}`} />
              {name}
            </span>
          ))}
          <span className="text-sm font-medium text-[var(--foreground)]">& more.</span>
        </div>
      </div>
    </section>
  );
}
