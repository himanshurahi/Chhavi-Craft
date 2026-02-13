"use client";

import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

const purposeOptions = [
  { value: "", label: "Gift by Purpose" },
  { value: "birthday", label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
  { value: "wedding", label: "Wedding" },
  { value: "housewarming", label: "Housewarming" },
  { value: "diwali", label: "Diwali" },
  { value: "corporate", label: "Corporate" },
];

const professionOptions = [
  { value: "", label: "Gift by Profession" },
  { value: "teacher", label: "Teacher" },
  { value: "doctor", label: "Doctor" },
  { value: "engineer", label: "Engineer" },
  { value: "boss", label: "Boss" },
  { value: "lawyer", label: "Lawyer" },
  { value: "entrepreneur", label: "Entrepreneur" },
];

const relationOptions = [
  { value: "", label: "Gift by Relation" },
  { value: "parents", label: "Parents" },
  { value: "boss", label: "Boss" },
  { value: "friend", label: "Friend" },
  { value: "teacher", label: "Teacher" },
  { value: "colleague", label: "Colleague" },
  { value: "client", label: "Client" },
];

const priceOptions = [
  { value: "", label: "Price" },
  { value: "100-200", label: "₹100-200" },
  { value: "200-300", label: "₹200-300" },
  { value: "300-400", label: "₹300-400" },
  { value: "400-500", label: "₹400-500" },
  { value: "500+", label: "₹500+" },
];

export default function GiftFinder() {
  const [purpose, setPurpose] = useState("");
  const [profession, setProfession] = useState("");
  const [relation, setRelation] = useState("");
  const [price, setPrice] = useState("");

  const handleFind = () => {
    // Navigate or filter based on selections
    const params = new URLSearchParams();
    if (purpose) params.set("purpose", purpose);
    if (profession) params.set("profession", profession);
    if (relation) params.set("relation", relation);
    if (price) params.set("price", price);
    window.location.hash = `#categories?${params.toString()}`;
  };

  return (
    <section id="gift-finder" className="border-t-4 border-[var(--accent)] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <h2 className="shrink-0 text-xl font-bold text-[var(--foreground)] sm:text-2xl">
            Find Gift
          </h2>

          <div className="flex flex-1 flex-wrap items-center gap-3 sm:gap-4">
            <div className="relative min-w-[140px] flex-1">
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              >
                {purposeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <RiArrowDownSLine className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative min-w-[140px] flex-1">
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              >
                {professionOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <RiArrowDownSLine className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative min-w-[140px] flex-1">
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              >
                {relationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <RiArrowDownSLine className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative min-w-[120px] flex-1">
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              >
                {priceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <RiArrowDownSLine className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <button
            type="button"
            onClick={handleFind}
            className="shrink-0 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
          >
            Find Gift
          </button>
        </div>
      </div>
    </section>
  );
}
