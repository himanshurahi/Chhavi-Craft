"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
  {
    name: "Sneha P.",
    text: "Ordered personalised pens for our office. Great quality and the engraving was perfect. Highly recommend!",
  },
  {
    name: "Arjun D.",
    text: "The QR stand was exactly what we needed for our café. Customers love scanning the menu. Fast delivery too.",
  },
  {
    name: "Meera R.",
    text: "Bought a photo album as a wedding gift. The personalisation was flawless and the recipient loved it.",
  },
  {
    name: "Karan S.",
    text: "Corporate gift order for 50 units. Chhavi Craft delivered on time with excellent packaging. Will definitely order again.",
  },
  {
    name: "Divya N.",
    text: "The dog tag for my pet is sturdy and the engraving is clear. Great customer service and quick turnaround.",
  },
  {
    name: "Rohit G.",
    text: "Quality products at reasonable prices. The desk organiser is now my favourite office accessory. Five stars!",
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
        <div className="mt-10">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className="!pb-12 [&_.swiper-pagination]:relative [&_.swiper-pagination]:mt-8"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name}>
                <blockquote className="flex min-h-[160px] flex-col justify-center rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5">
                  <p className="text-sm text-[var(--foreground)]">&ldquo;{t.text}&rdquo;</p>
                  <cite className="mt-4 text-sm font-semibold not-italic text-[var(--accent)]">
                    — {t.name}
                  </cite>
                </blockquote>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
