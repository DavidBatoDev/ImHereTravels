"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type { DestinationHighlight } from "@/data/destinations";

import "swiper/css";

function NavButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous" : "Next"}
      onClick={onClick}
      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-grey text-midnight transition-colors hover:border-midnight hover:bg-midnight hover:text-white"
    >
      {direction === "left" ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export default function HighlightsSection({
  heading,
  items,
}: {
  heading: string;
  items: DestinationHighlight[];
}) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      {/* Centred heading with nav arrows pinned right */}
      <div className="relative mb-8 flex items-center justify-center md:mb-10">
        <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
          {heading}
        </h2>
        <div className="absolute right-0 flex gap-2">
          <NavButton direction="left" onClick={() => swiperRef.current?.slidePrev()} />
          <NavButton direction="right" onClick={() => swiperRef.current?.slideNext()} />
        </div>
      </div>

      <Swiper
        onSwiper={(s) => { swiperRef.current = s; }}
        allowTouchMove
        slidesPerView="auto"
        spaceBetween={16}
        className="overflow-hidden!"
      >
        {items.map((item, i) => (
          <SwiperSlide key={i} style={{ width: "282px", flexShrink: 0 }}>
            <div className="flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-small" style={{ height: "420px" }}>
              <div className="relative shrink-0 overflow-hidden" style={{ height: "260px" }}>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-start p-4">
                <h3 className="font-sans text-h6-mobile md:text-h6-desktop text-midnight">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-1 font-body text-b4-mobile md:text-b4-desktop text-dark-gray line-clamp-3">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
