"use client";

import Link from "next/link";
import { useGetCategoriesQuery } from "@/store/categoriesApi";
import { getCategoryIcon, getCategoryColor } from "@/lib/categoryIcons";

export default function Categories() {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <section id="categories" className="px-3 py-6 sm:px-4 sm:py-8 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-2xl border-2 border-[var(--accent)] bg-[var(--card)]">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex min-h-[100px] animate-pulse flex-col items-center justify-center gap-2 py-6"
                >
                  <div className="h-10 w-10 rounded-full bg-[var(--border)] sm:h-12 sm:w-12" />
                  <div className="h-4 w-16 rounded bg-[var(--border)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !categories?.length) {
    return null;
  }

  return (
    <section id="categories" className="px-3 py-6 sm:px-4 sm:py-8 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-2xl border-2 border-[var(--accent)] bg-[var(--card)]">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
            {categories.map((cat, index) => {
              const Icon = getCategoryIcon(cat.icon);
              const color = getCategoryColor(index);
              const href = `/products?category=${cat.slug}`;

              return (
                <Link
                  key={cat.id}
                  href={href}
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
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12 ${color}`}
                  >
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </span>
                  <span className="text-[11px] font-medium text-[var(--foreground)] leading-tight group-hover:text-[var(--accent)] sm:text-xs md:text-sm line-clamp-2">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
