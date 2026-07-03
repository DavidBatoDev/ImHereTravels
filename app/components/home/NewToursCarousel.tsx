"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";

import "swiper/css";

type TourCard = {
  title: string;
  duration: string;
  description: string;
  price: string;
  image: string;
  href: string;
};

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
      aria-label={direction === "left" ? "Previous tours" : "Next tours"}
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

export default function NewToursCarousel({ tours }: { tours: TourCard[] }) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="tours" className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="relative mb-6 flex items-center justify-center md:mb-10">
        <h2 className="text-center font-sans text-h3-mobile text-midnight md:text-h3-desktop">
          New Tours
        </h2>
        <div className="absolute right-0 hidden gap-2 md:flex">
          <NavButton direction="left" onClick={() => swiperRef.current?.slidePrev()} />
          <NavButton direction="right" onClick={() => swiperRef.current?.slideNext()} />
        </div>
      </div>

      <div className="mb-6 flex justify-center gap-2 md:hidden">
        <NavButton direction="left" onClick={() => swiperRef.current?.slidePrev()} />
        <NavButton direction="right" onClick={() => swiperRef.current?.slideNext()} />
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        allowTouchMove
        slidesPerView="auto"
        spaceBetween={16}
        className="overflow-hidden! [&_.swiper-wrapper]:items-stretch"
      >
        {tours.map((tour) => (
          <SwiperSlide key={tour.title} style={{ width: "min(88vw, 380px)", flexShrink: 0, height: "auto" }}>
            <Link
              href={tour.href}
              className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-small transition-shadow hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <ImageWithSkeleton
                  src={tour.image}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-light-grey px-3 py-1 font-body text-b4-desktop text-midnight">
                  <Image
                    src="/Icons/SVG/Pin/pin-solid-red.svg"
                    alt=""
                    width={14}
                    height={14}
                  />
                  {tour.duration}
                </span>
                <h3 className="mt-4 font-sans text-h5-mobile text-midnight group-hover:text-crimson-red md:text-h5-desktop">
                  {tour.title}
                </h3>
                <p className="mt-2 font-body text-b4-mobile text-dark-gray md:text-b4-desktop">
                  {tour.description}
                </p>
                <div className="mt-auto flex items-baseline gap-2 pt-5">
                  <span className="font-body text-b4-desktop text-dark-gray">
                    From
                  </span>
                  <span className="font-sans text-h6-mobile text-midnight md:text-h6-desktop">
                    {tour.price}
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-10 flex justify-center">
        <Link
          href="/tours"
          className="inline-flex items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white transition-colors hover:bg-light-red"
        >
          View Tours
        </Link>
      </div>
    </section>
  );
}
