"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type { Tour } from "@/types/tour";

import "swiper/css";

export default function WhereWeStay({
  section,
}: {
  section: NonNullable<Tour["whereWeStay"]>;
}) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="mt-10 w-full md:mt-14">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
          {section.heading}
        </h2>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Previous accommodation"
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex size-9 items-center justify-center rounded-full border border-midnight text-midnight transition-colors hover:border-crimson-red hover:text-crimson-red"
          >
            <ChevronLeft className="size-4" strokeWidth={2.25} />
          </button>
          <button
            type="button"
            aria-label="Next accommodation"
            onClick={() => swiperRef.current?.slideNext()}
            className="flex size-9 items-center justify-center rounded-full border border-midnight text-midnight transition-colors hover:border-crimson-red hover:text-crimson-red"
          >
            <ChevronRight className="size-4" strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Swiper
          onSwiper={(s) => { swiperRef.current = s; }}
          loop
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 } }}
          className="overflow-hidden!"
        >
          {section.items.map((a, i) => {
            const imageSrc = a.image.trim();

            return (
              <SwiperSlide key={`${a.name}-${i}`}>
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-light-grey">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={a.imageAlt}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div>
                    <h3 className="font-sans text-h6-mobile md:text-h6-desktop font-bold text-midnight">
                      {a.name}
                    </h3>
                    <p className="mt-1 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                      {a.nights}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
