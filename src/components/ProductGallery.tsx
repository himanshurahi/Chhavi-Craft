"use client";

import { useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const visualBgFallback = "from-[var(--background)] to-[var(--border)]";

type ProductGalleryProps = {
  images: string[];
  productName: string;
  placeholder?: React.ReactNode;
};

export default function ProductGallery({
  images,
  productName,
  placeholder,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const hasGallery = images.length > 0;
  const hasMultiple = images.length > 1;

  const handleThumbClick = useCallback((index: number) => {
    setSelectedIndex(index);
    swiperRef.current?.slideTo(index);
  }, []);

  if (!hasGallery) {
    return (
      <div className="space-y-3">
        <div
          className={`aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${visualBgFallback} flex items-center justify-center p-12`}
        >
          {placeholder ?? (
            <span className="text-sm font-medium text-[var(--muted)]">
              No image
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Swiper
        modules={[Navigation, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
        spaceBetween={0}
        slidesPerView={1}
        navigation={hasMultiple}
        pagination={hasMultiple ? { clickable: true } : false}
        loop={hasMultiple}
        className={`aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${visualBgFallback} product-gallery-swiper [&_.swiper-button-next]:text-[var(--foreground)] [&_.swiper-button-prev]:text-[var(--foreground)] [&_.swiper-pagination-bullet]:bg-[var(--foreground)] [&_.swiper-pagination-bullet-active]:bg-[var(--accent)]`}
      >
        {images.map((url, i) => (
          <SwiperSlide key={i}>
            <div className="flex h-full w-full items-center justify-center p-4">
              <img
                src={url}
                alt={`${productName} — image ${i + 1}`}
                className="h-full w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleThumbClick(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                selectedIndex === i
                  ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/30"
                  : "border-[var(--border)] hover:border-[var(--muted)]"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={url}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
