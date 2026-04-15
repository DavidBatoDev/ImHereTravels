"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Tour } from "@/types/tour";

import "swiper/css";

const LS_KEY = "iht_recently_viewed";
const MAX_STORED = 10;

export function recordTourView(slug: string): void {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const existing: string[] = raw ? JSON.parse(raw) : [];
    const updated = [slug, ...existing.filter((s) => s !== slug)].slice(
      0,
      MAX_STORED,
    );
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable (SSR, private mode) — silently ignore
  }
}

/* -------------------------------------------------------------------------- */
/* Personalized Tours card — light background                                 */
/* -------------------------------------------------------------------------- */

function PersonalizedToursCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-light-grey bg-white p-6 shadow-small md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3">
          {/* Badge */}
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-light-grey px-3 py-1 font-body text-b4-desktop text-midnight">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 22l-2.09-10.26L4 10l5.91-1.74z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            Personalized Tours
          </span>
          <h2 className="font-sans text-h4-mobile md:text-h4-desktop text-midnight">
            Create your own tour
          </h2>
          <p className="max-w-md font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
            Let&apos;s create an exclusive epic adventure for your group.
          </p>
        </div>
        <Link
          href="/contact-us"
          className="inline-flex w-fit items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white transition-colors hover:bg-light-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red focus-visible:ring-offset-2"
        >
          Create Now
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Recently Viewed Tours section                                               */
/* -------------------------------------------------------------------------- */

export default function RecentlyViewedTours({
  allTours,
}: {
  allTours: Tour[];
}) {
  const [viewed, setViewed] = useState<Tour[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(LS_KEY);
      const slugs: string[] = raw ? JSON.parse(raw) : [];
      const map = new Map(allTours.map((t) => [t.slug, t]));
      setViewed(
        slugs.map((s) => map.get(s)).filter((t): t is Tour => t !== undefined),
      );
    } catch {
      // ignore
    }
  }, [allTours]);

  // Don't render anything until client hydration to avoid layout shift
  if (!mounted) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-8 md:pb-24">
      {/* Personalized Tours card — always visible */}
      <PersonalizedToursCard />

      {/* Recently Viewed — only shown after a tour has been visited */}
      {viewed.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-6 font-sans text-h4-mobile md:text-h4-desktop text-midnight">
            Recently Viewed Tours
          </h2>
          <Swiper
            slidesPerView="auto"
            spaceBetween={24}
            className="overflow-hidden!"
          >
            {viewed.map((tour) => (
              <SwiperSlide
                key={tour.slug}
                style={{ width: "300px", flexShrink: 0 }}
              >
                <Link
                  href={`/tours/${tour.slug}`}
                  className="group block overflow-hidden rounded-lg bg-white shadow-small transition-shadow hover:shadow-medium"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={tour.listingCard.image}
                      alt={tour.listingCard.imageAlt}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-light-grey px-3 py-1 font-body text-b4-desktop text-midnight">
                      <Image
                        src="/Icons/SVG/Pin/pin-solid-red.svg"
                        alt=""
                        width={12}
                        height={12}
                      />
                      {tour.listingCard.duration}
                    </span>
                    <h3 className="mt-3 font-sans text-h6-mobile md:text-h6-desktop text-midnight transition-colors group-hover:text-crimson-red">
                      {tour.header.title.split("|").slice(-1)[0]?.trim() ??
                        tour.header.title}
                    </h3>
                    <p className="mt-1 font-body text-b4-desktop font-medium text-midnight">
                      {tour.listingCard.price}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
