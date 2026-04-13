"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, A11y } from "swiper/modules";
import type { Tour } from "@/types/tour";

import "swiper/css";
import "swiper/css/navigation";

export default function WhereWeStay({
  section,
}: {
  section: NonNullable<Tour["whereWeStay"]>;
}) {
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
            className="wws-prev flex size-9 items-center justify-center rounded-full border border-midnight text-midnight transition-colors hover:border-crimson-red hover:text-crimson-red"
          >
            <ChevronLeft className="size-4" strokeWidth={2.25} />
          </button>
          <button
            type="button"
            aria-label="Next accommodation"
            className="wws-next flex size-9 items-center justify-center rounded-full border border-midnight text-midnight transition-colors hover:border-crimson-red hover:text-crimson-red"
          >
            <ChevronRight className="size-4" strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Swiper
          modules={[Navigation, Keyboard, A11y]}
          loop
          loopAdditionalSlides={2}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 } }}
          navigation={{ prevEl: ".wws-prev", nextEl: ".wws-next" }}
          keyboard={{ enabled: true }}
          className="!overflow-hidden"
        >
          {section.items.map((a, i) => (
            <SwiperSlide key={`${a.name}-${i}`}>
              <div className="flex flex-col gap-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-light-grey">
                  <Image
                    src={a.image}
                    alt={a.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
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
          ))}
        </Swiper>
      </div>
    </section>
  );
}
