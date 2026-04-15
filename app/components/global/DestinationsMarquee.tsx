"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";

type Destination = { name: string; image: string; href: string };

export default function DestinationsMarquee({
  items,
}: {
  items: Destination[];
}) {
  return (
    <div
      // Horizontal fade mask: slides dissolve into the page background at
      // both edges so the carousel doesn't look like it was hard-clipped.
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
      }}
    >
    <Swiper
      modules={[Autoplay, FreeMode]}
      // Continuous, smooth conveyor-belt feel: no per-slide pause +
      // a slow transition speed produces uniform motion at any width.
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={5000}
      loop
      loopAdditionalSlides={items.length}
      freeMode={{ enabled: true, momentum: false }}
      allowTouchMove
      slidesPerView={1.2}
      spaceBetween={16}
      breakpoints={{
        640: { slidesPerView: 2.2, spaceBetween: 16 },
        768: { slidesPerView: 3.2, spaceBetween: 24 },
        1024: { slidesPerView: 4.2, spaceBetween: 24 },
      }}
      className="overflow-hidden! [&_.swiper-wrapper]:ease-linear!"
    >
      {items.map((dest) => (
        <SwiperSlide key={dest.name}>
          <Link
            href={dest.href}
            className="group relative block aspect-square w-full overflow-hidden rounded-md"
          >
            <Image
              src={dest.image}
              alt={dest.name}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 30vw, 22vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute bottom-4 left-4 font-sans text-h5-mobile md:text-h5-desktop text-white">
              {dest.name}
            </span>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
}
