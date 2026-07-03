"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import { type GalleryMediaItem } from "@/data/travelWithDev";
import TripMomentsGallery from "./TripMomentsGallery";

export default function GallerySectionClient({ slides }: { slides: GalleryMediaItem[][][] }) {
  const [viewAll, setViewAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allItems = [
    ...new Map(
      slides
        .flat(2)
        .filter((item) => !!item.src)
        .map((item) => [item.src, item])
    ).values(),
  ];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(
    () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % allItems.length : null)),
    [allItems.length]
  );

  const goPrev = useCallback(
    () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + allItems.length) % allItems.length : null)),
    [allItems.length]
  );

  // Keyboard nav + scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, goNext, goPrev, closeLightbox]);

  const currentItem = lightboxIndex !== null ? allItems[lightboxIndex] : null;

  return (
    <section className="relative bg-light-grey">
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 hidden -rotate-12 lg:block"
        aria-hidden="true"
      >
        <Image
          src="/Stickers/Print/PNG/Asterisk/Print_Asterisk_Yellow.png"
          alt=""
          width={250}
          height={250}
          className="object-contain"
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        {/* Heading row */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
            Real Moments from Our Trips
          </h2>

          <button
            role="switch"
            aria-checked={viewAll}
            onClick={() => setViewAll((v) => !v)}
            className="flex shrink-0 cursor-pointer items-center gap-2.5 focus-visible:outline-none"
          >
            <span className="whitespace-nowrap font-body text-b4-desktop text-dark-gray">
              View All Gallery
            </span>
            <span
              className={[
                "relative h-6 w-11 rounded-full transition-colors duration-200",
                viewAll ? "bg-crimson-red" : "bg-grey/40",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-xsmall transition-transform duration-200",
                  viewAll ? "translate-x-5" : "translate-x-0",
                ].join(" ")}
              />
            </span>
          </button>
        </div>

        {viewAll ? (
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:grid-cols-3 lg:grid-cols-4">
            {allItems.map((item, index) => (
              <button
                key={item.src}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-3/4 w-full overflow-hidden rounded-md bg-grey/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red"
                aria-label={item.alt ?? `Open photo ${index + 1}`}
              >
                {item.type === "video" ? (
                  <>
                    <video
                      src={item.src}
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* video badge */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      <svg
                        className="h-10 w-10 text-white drop-shadow"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    {/* always-visible small play icon */}
                    <svg
                      className="absolute top-2 right-2 h-5 w-5 text-white drop-shadow"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </>
                ) : (
                  <ImageWithSkeleton
                    src={item.src!}
                    alt={item.alt ?? "Trip moment"}
                    fill
                    rounded="md"
                    sizes="(max-width: 1280px) 33vw, 400px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </button>
            ))}
          </div>
        ) : (
          <TripMomentsGallery slides={slides} />
        )}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          {/* Counter */}
          <p className="absolute top-4 left-1/2 -translate-x-1/2 font-body text-b4-desktop text-white/60 select-none">
            {lightboxIndex! + 1} / {allItems.length}
          </p>

          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            aria-label="Close viewer"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:left-6"
            aria-label="Previous"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Media */}
          <div
            className="flex max-h-[90vh] max-w-[85vw] items-center justify-center md:max-w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.type === "video" ? (
              <video
                key={currentItem.src}
                src={currentItem.src}
                controls
                autoPlay
                playsInline
                className="max-h-[90vh] max-w-full rounded-md object-contain"
              />
            ) : (
              <Image
                key={currentItem.src}
                src={currentItem.src!}
                alt={currentItem.alt ?? "Trip moment"}
                width={1200}
                height={1500}
                className="max-h-[90vh] max-w-full rounded-md object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            )}
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:right-6"
            aria-label="Next"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
