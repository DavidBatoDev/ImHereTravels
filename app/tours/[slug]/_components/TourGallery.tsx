"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Keyboard, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import type { Tour } from "@/types/tour";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function TourGallery({ gallery }: { gallery: Tour["gallery"] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const slides = [
    { src: gallery.hero, alt: gallery.heroAlt },
    ...gallery.thumbnails,
  ];

  return (
    <section className="w-full">
      <div className="group relative">
        <Swiper
          modules={[Navigation, Thumbs, Keyboard, A11y]}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          navigation={{ prevEl: ".tg-prev", nextEl: ".tg-next" }}
          keyboard={{ enabled: true }}
          loop
          spaceBetween={0}
          slidesPerView={1}
          className="overflow-hidden! rounded-lg"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative aspect-video w-full bg-light-grey">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Previous image"
          className="tg-prev absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-midnight opacity-0 shadow-small transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-white"
        >
          <ChevronLeft className="size-5" strokeWidth={2.25} />
        </button>
        <button
          type="button"
          aria-label="Next image"
          className="tg-next absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-midnight opacity-0 shadow-small transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-white"
        >
          <ChevronRight className="size-5" strokeWidth={2.25} />
        </button>
      </div>

      {slides.length > 1 && (
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={3}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 6 },
          }}
          watchSlidesProgress
          slideToClickedSlide
          className="tg-thumbs mt-4 overflow-hidden!"
        >
          {slides.map((slide, i) => (
            <SwiperSlide
              key={i}
              className="h-auto! cursor-pointer overflow-hidden rounded-md opacity-60 transition-opacity [&.swiper-slide-thumb-active]:opacity-100"
            >
              <div className="relative aspect-4/3 w-full bg-light-grey">
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 33vw, 200px"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
