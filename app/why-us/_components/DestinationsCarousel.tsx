"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

type Destination = { name: string; image: string; href: string };

export default function DestinationsCarousel({
  heading,
  items,
}: {
  heading: string;
  items: Destination[];
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="font-sans text-h4-mobile text-midnight md:text-h4-desktop">
          {heading}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Previous destination"
            className="dest-prev flex size-10 items-center justify-center rounded-full border-[2.5px] border-midnight text-midnight transition-colors hover:border-crimson-red hover:text-crimson-red"
          >
            <ChevronLeft className="size-5" strokeWidth={2.25} />
          </button>
          <button
            type="button"
            aria-label="Next destination"
            className="dest-next flex size-10 items-center justify-center rounded-full border-[2.5px] border-midnight text-midnight transition-colors hover:border-crimson-red hover:text-crimson-red"
          >
            <ChevronRight className="size-5" strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Keyboard, A11y]}
        loop
        loopAdditionalSlides={2}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
        navigation={{ prevEl: ".dest-prev", nextEl: ".dest-next" }}
        keyboard={{ enabled: true }}
        className="!overflow-hidden"
      >
        {items.map((dest) => (
          <SwiperSlide key={dest.name}>
            <Link
              href={dest.href}
              className="group relative block h-80 overflow-hidden rounded-lg"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 768px) 80vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-4 left-4 font-sans font-bold text-h5-mobile text-white drop-shadow-sm md:text-h5-desktop">
                {dest.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
