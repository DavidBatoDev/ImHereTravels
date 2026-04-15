"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type { DestinationReview } from "@/data/destinations";

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

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-crimson-red" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4 fill-current">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection({
  heading,
  items,
  slug,
}: {
  heading: string;
  items: DestinationReview[];
  slug: string;
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
        spaceBetween={24}
        className="overflow-hidden!"
      >
        {items.map((review, i) => (
          <SwiperSlide key={i} style={{ width: "384px", height: "319px", flexShrink: 0 }}>
            <div className="flex h-full flex-col gap-4 rounded-lg bg-white p-6 shadow-small md:p-8">
              <div className="flex items-center justify-between">
                <StarRow count={review.stars} />
                <span className="font-body text-b4-desktop text-grey">{review.date}</span>
              </div>
              <p className="flex-1 font-body text-b2-mobile md:text-b2-desktop text-midnight">
                {review.text}
              </p>
              <div className="flex items-center gap-3 pt-2">
                {review.avatar ? (
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    width={44}
                    height={44}
                    className="size-11 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-light-grey font-sans text-h6-desktop text-midnight">
                    {review.author[0]}
                  </div>
                )}
                <div>
                  <p className="font-sans text-h6-mobile font-bold text-midnight md:text-h6-desktop">
                    {review.author}
                  </p>
                  {review.tourName && (
                    <p className="font-body text-b4-desktop text-crimson-red">
                      {review.tourName}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-8 flex justify-center">
        <Link
          href={`/all-destinations/${slug}/reviews`}
          className="inline-flex items-center justify-center rounded-full border border-midnight px-8 py-3 font-body font-medium text-midnight transition-colors hover:bg-midnight hover:text-white"
        >
          Read All Reviews
        </Link>
      </div>
    </section>
  );
}
