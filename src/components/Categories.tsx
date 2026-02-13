"use client";

import Link from "next/link";
import {
  RiBook2Line,
  RiPenNibLine,
  RiComputerLine,
  RiGiftLine,
  RiCalendarLine,
  RiCupLine,
  RiBankCardLine,
  RiHeartLine,
  RiSearchLine,
  RiBuildingLine,
  RiEditLine,
  RiLightbulbLine,
} from "react-icons/ri";

const categories = [
  { id: "diaries", name: "Diaries & Notebook", href: "/#diaries", Icon: RiBook2Line, color: "text-red-500" },
  { id: "pens", name: "Pens and Boxes", href: "/#pens", Icon: RiPenNibLine, color: "text-teal-500" },
  { id: "organizers", name: "Desk Organizers", href: "/#organizers", Icon: RiComputerLine, color: "text-amber-600" },
  { id: "combos", name: "Gift Combos", href: "/#combos", Icon: RiGiftLine, color: "text-red-500" },
  { id: "planners", name: "Planners & Calendars", href: "/#planners", Icon: RiCalendarLine, color: "text-gray-600" },
  { id: "mugs", name: "Mugs & Bottles", href: "/#mugs", Icon: RiCupLine, color: "text-blue-500" },
  { id: "cardholder", name: "Business Cardholder", href: "/#cardholder", Icon: RiBankCardLine, color: "text-sky-400" },
  { id: "bracelets", name: "Unisex Bracelets", href: "/#bracelets", Icon: RiHeartLine, color: "text-rose-400" },
  { id: "gift-finder", name: "Gift Finder", href: "/#gift-finder", Icon: RiSearchLine, color: "text-pink-500" },
  { id: "bulk", name: "Buy in Bulk", href: "/#bulk", Icon: RiBuildingLine, color: "text-sky-500" },
  { id: "submit-name", name: "Submit Name", href: "/#submit-name", Icon: RiEditLine, color: "text-gray-700" },
  { id: "past-projects", name: "Past Projects", href: "/#past-projects", Icon: RiLightbulbLine, color: "text-amber-400" },
];

export default function Categories() {
  return (
    <section id="categories" className="px-3 py-6 sm:px-4 sm:py-8 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-2xl border-2 border-[var(--accent)] bg-white">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
            {categories.map((cat, index) => (
              <Link
                key={cat.id}
                href={cat.href}
                className={`
                  group flex flex-col items-center justify-center gap-1.5 py-4 px-2 text-center
                  min-h-[100px] sm:min-h-[110px] sm:py-5 sm:gap-2 md:min-h-[120px] md:py-6
                  border-b border-r border-dashed border-gray-300
                  [&:nth-child(3n)]:border-r-0
                  sm:[&:nth-child(3n)]:border-r sm:[&:nth-child(4n)]:border-r-0
                  lg:[&:nth-child(4n)]:border-r lg:[&:nth-child(6n)]:border-r-0
                  [&:nth-child(n+10)]:border-b-0
                  sm:[&:nth-child(n+9)]:border-b-0
                  lg:[&:nth-child(n+7)]:border-b-0
                `}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12 ${cat.color}`}>
                  <cat.Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                </span>
                <span className="text-[11px] font-medium text-[var(--foreground)] leading-tight group-hover:text-[var(--accent)] sm:text-xs md:text-sm line-clamp-2">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
