"use client";

import Link from "next/link";
import { useState } from "react";
import {
  RiShoppingCartLine,
  RiArrowLeftLine,
  RiQrCodeLine,
  RiPriceTag3Line,
  RiRestaurant2Line,
  RiHeartLine,
  RiEyeLine,
  RiQuestionLine,
  RiRefreshLine,
  RiFileTextLine,
  RiTruckLine,
  RiCustomerService2Line,
  RiShareLine,
  RiStarFill,
  RiStarLine,
  RiEditLine,
} from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import type { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";

type Product = (typeof products)[0];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "acrylic-qr-stand": RiQrCodeLine,
  dog: RiPriceTag3Line,
  "qr-menu-stand": RiRestaurant2Line,
  "photo-album": MdPhotoLibrary,
};

type Props = { product: Product };

export default function ProductDetail({ product }: Props) {
  const Icon = iconMap[product.slug] ?? RiQrCodeLine;
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("about");
  const { addItem } = useCart();

  const accordionItems = [
    { id: "about", title: "About the Product", Icon: RiQuestionLine, content: product.description },
    { id: "returns", title: "Easy Returns", Icon: RiRefreshLine, content: "30-day easy return policy. Contact us if you're not satisfied." },
    { id: "personalization", title: "Free Personalization", Icon: RiFileTextLine, content: "Add your name or logo at no extra cost. Precision laser engraving." },
    { id: "shipping", title: "Free Shipping", Icon: RiTruckLine, content: "Free shipping on orders above ₹999. Delivery within 5-7 business days." },
    { id: "care", title: "Customer Care", Icon: RiCustomerService2Line, content: "Need help? Call +91 89509 62636 or email us." },
  ];

  const ratingBreakdown = [
    { stars: 5, count: 8 },
    { stars: 4, count: 1 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ];
  const totalReviews = 9;
  const overallRating = 4.89;

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      personalisation: name || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)]"
      >
        <RiArrowLeftLine className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image / Visual */}
        <div
          className={`aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${product.visualBg} flex items-center justify-center p-12`}
        >
          <div className="flex flex-col items-center gap-4">
            <Icon className="h-24 w-24 sm:h-32 sm:w-32 text-[var(--accent)]" />
            <span className="rounded-lg bg-[var(--card)]/80 px-4 py-2 text-sm font-medium text-[var(--muted)]">
              Your Name Here
            </span>
          </div>
        </div>

        {/* Info - matches reference layout */}
        <div className="bg-[var(--background)] rounded-2xl p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Chhavi Craft
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
            {product.name}
          </h1>
          <button
            type="button"
            className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
          >
            <RiHeartLine className="h-5 w-5" />
            Add to wishlist
          </button>

          {/* Pricing */}
          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            {product.originalPrice && (
              <span className="text-lg text-[var(--muted)] line-through">
                Rs. {product.originalPrice.toLocaleString("en-IN")}.00
              </span>
            )}
            <span className="text-2xl font-bold text-[var(--foreground)]">
              Rs. {product.price.toLocaleString("en-IN")}.00
            </span>
            {product.tag && (
              <span className="rounded bg-[var(--accent)] px-2.5 py-0.5 text-xs font-medium text-white">
                {product.tag}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Tax included.{" "}
            <Link href="/shipping" className="underline hover:text-[var(--accent)]">
              Shipping
            </Link>{" "}
            calculated at checkout.
          </p>
          <p className="mt-1 text-sm font-medium text-red-600">12 sold in last 24 hours</p>

          {/* Upload image */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-[var(--foreground)]">
              Upload image
            </label>
            <label className="mt-2 flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3">
              <span className="rounded border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm text-[var(--foreground)]">
                Choose file
              </span>
              <span className="text-sm text-[var(--muted)]">
                {file ? file.name : "No file chosen"}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          {/* Name to be Engraved */}
          <div className="mt-5">
            <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)]">
              Name to be Engraved:
            </label>
            <textarea
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name or message"
              rows={3}
              className="mt-2 w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>
          <p className="mt-2 text-sm font-medium text-red-600">
            Please hurry! only 30 left in stock
          </p>

          {/* Quantity */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-[var(--foreground)]">Quantity</label>
            <div className="mt-2 inline-flex items-center overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card)]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center text-[var(--foreground)] hover:bg-[var(--background)]"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="h-10 w-14 border-x border-[var(--border)] bg-[var(--card)] text-center text-sm text-[var(--foreground)] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center text-[var(--foreground)] hover:bg-[var(--background)]"
              >
                +
              </button>
            </div>
          </div>

          {/* Buy in bulk */}
          <a
            href="https://wa.me/918950962636?text=Hi%21%20I%27m%20interested%20in%20placing%20a%20bulk%20order%20for%20Chhavi%20Craft%20products.%20Please%20share%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--foreground)] hover:text-[var(--accent)]"
          >
            <FaWhatsapp className="h-5 w-5 text-green-600" />
            Buy this Item in Bulk
          </a>

          {/* Live viewers */}
          <p className="mt-4 flex items-center gap-2 text-sm text-[var(--muted)]">
            <RiEyeLine className="h-4 w-4" />
            1 customers are viewing this product
          </p>

          {/* Action buttons */}
          <form onSubmit={handleAddToCart} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-[var(--foreground)] bg-[var(--card)] px-6 py-4 text-base font-semibold text-[var(--foreground)] transition hover:bg-[var(--background)]"
            >
              <RiShoppingCartLine className="h-5 w-5" />
              {added ? "Added!" : "Add to cart"}
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center rounded-lg bg-[var(--accent)] px-6 py-4 text-base font-semibold text-white transition hover:opacity-90"
            >
              Buy it now
            </button>
          </form>
        </div>
      </div>

      {/* Service guarantees badges */}
      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "PAYMENTS", Icon: RiShoppingCartLine },
          { label: "SHIPPING", Icon: RiTruckLine },
          { label: "100% QUALITY", Icon: RiStarFill },
          { label: "24/7 SUPPORT", Icon: RiCustomerService2Line },
        ].map(({ label, Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center"
          >
            <Icon className="h-6 w-6 text-[var(--accent)]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Accordion sections */}
      <div className="mt-8 space-y-2">
        {accordionItems.map(({ id, title, Icon, content }) => (
          <div
            key={id}
            className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]"
          >
            <button
              type="button"
              onClick={() => setOpenAccordion(openAccordion === id ? null : id)}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-[var(--background)]"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-[var(--muted)]" />
                <span className="font-semibold text-[var(--foreground)]">{title}</span>
              </div>
              <span
                className={`shrink-0 text-[var(--muted)] transition-transform ${openAccordion === id ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
            {openAccordion === id && (
              <div className="border-t border-[var(--border)] px-4 py-4">
                <p className="text-sm text-[var(--muted)]">{content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Share link */}
      <button
        type="button"
        className="mt-6 flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)]"
      >
        <RiShareLine className="h-4 w-4" />
        Share
      </button>

      {/* Customer reviews */}
      <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--foreground)]">Customer reviews</h2>
        <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:gap-12">
          <div>
            <p className="text-4xl font-bold text-[var(--foreground)]">{overallRating}</p>
            <div className="mt-2 flex gap-0.5 text-amber-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <RiStarFill key={i} className="h-5 w-5" />
              ))}
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">Based on {totalReviews} reviews</p>
            <p className="mt-2 flex items-center gap-1 text-sm text-[var(--muted)]">
              <RiStarFill className="h-4 w-4 text-[var(--accent)]" />
              Reviews by Chhavi Craft
            </p>
          </div>
          <div className="flex-1 space-y-2">
            {ratingBreakdown.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) =>
                    i <= stars ? (
                      <RiStarFill key={i} className="h-4 w-4 text-amber-500" />
                    ) : (
                      <RiStarLine key={i} className="h-4 w-4 text-gray-300" />
                    )
                  )}
                </div>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{ width: `${(count / totalReviews) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-right text-sm text-[var(--muted)]">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="mt-8 flex items-center gap-2 rounded-lg bg-[var(--foreground)] px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          <RiEditLine className="h-4 w-4" />
          Write a review
        </button>
      </div>
    </section>
  );
}
