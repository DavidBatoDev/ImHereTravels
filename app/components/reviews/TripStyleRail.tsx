"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import type { TripStyle } from "@/app/components/reviews/trip-styles";

/**
 * The reviews-hub left rail: a curated photo showcase (NOT a filter). Each trip
 * style is a stacked-photo card the visitor browses on demand — advancing tosses
 * the top photo off the deck to reveal the next one peeking behind it, so it
 * reads like flipping through a physical stack. Nothing auto-plays. Photos are
 * hand-curated in `trip-styles.ts`.
 *
 * The card adapts to the current photo's orientation (portrait photos get a
 * portrait card instead of being cropped into a landscape frame), detected on
 * image load. Client component (per-card carousel state). On mobile the rail is
 * a horizontal snap strip; from `lg` it stacks vertically as the sidebar.
 */

// Rotation/offset for the tiles peeking out behind the front photo (the "stack").
const BACK_TILE_TRANSFORMS = [
  "rotate-6 translate-x-3 translate-y-1.5",
  "-rotate-5 -translate-x-3 translate-y-1",
];

// Flip: the top photo is tossed off the deck (direction-aware) while the card
// beneath rises from the stack to take its place.
const cardVariants: Variants = {
  enter: { scale: 0.94, y: 12, opacity: 0.4 },
  center: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 1 },
  exit: (dir: number) => ({
    x: dir >= 0 ? 72 : -72,
    y: -26,
    rotate: dir >= 0 ? 12 : -12,
    scale: 0.96,
    opacity: 0,
    zIndex: 3,
  }),
};

export default function TripStyleRail({ styles }: { styles: TripStyle[] }) {
  return (
    <section aria-label="Featured trips">
      <h2 className="mb-4 font-sans text-h6-mobile md:text-h6-desktop text-midnight">
        Featured trips
      </h2>
      <ul className="flex items-start gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:gap-8 lg:overflow-visible lg:pb-0">
        {styles.map((style) => (
          <li
            key={style.key}
            className="min-w-[68%] snap-start sm:min-w-65 lg:min-w-0 lg:w-full"
          >
            <TripStyleCard style={style} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function TripStyleCard({ style }: { style: TripStyle }) {
  const n = style.images.length;
  // [current index, last nav direction] — direction drives which way the top
  // photo is tossed. Kept together so each change carries its own direction.
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);
  const [portrait, setPortrait] = useState(false);
  const hasCarousel = n > 1;
  const paginate = (delta: number) => setPage(([i]) => [(i + delta + n) % n, delta]);
  const jumpTo = (i: number) => setPage(([cur]) => [i, i >= cur ? 1 : -1]);

  // Up to two upcoming photos peeking behind the front, so advancing reveals the
  // card that was next in the stack.
  const backs =
    n >= 3
      ? [style.images[(index + 1) % n], style.images[(index + 2) % n]]
      : n === 2
        ? [style.images[(index + 1) % n]]
        : [];

  // Shared by onLoad and the mount-time ref check below — browsers don't
  // reliably re-fire `load` for an <img> that's already in the HTTP cache
  // (e.g. paging back to a photo already viewed), so relying on onLoad alone
  // leaves `portrait` stuck from whichever photo last actually fired it.
  function applyOrientation(img: HTMLImageElement) {
    if (img.naturalWidth && img.naturalHeight)
      setPortrait(img.naturalHeight > img.naturalWidth);
  }

  return (
    <div className="group">
      <div
        className={`relative mx-auto w-full max-w-60 rounded-md bg-light-grey ${portrait ? "aspect-4/5" : "aspect-4/3"}`}
      >
        {backs.map((src, i) => (
          <div
            key={i}
            aria-hidden
            className={`absolute inset-0 overflow-hidden rounded-md shadow-small brightness-90 ${BACK_TILE_TRANSFORMS[i]}`}
          >
            <ImageWithSkeleton
              src={src}
              alt=""
              fill
              rounded="md"
              sizes="240px"
              className="object-cover"
            />
          </div>
        ))}

        {/* Front photo — tossed off the top of the deck on change (the card beneath
            rises to take its place). Plain <img> (via motion.img) so we can read
            naturalWidth/Height for orientation; next/image optimization is off. */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            custom={direction}
            src={style.images[index]}
            alt={`${style.label} — photo ${index + 1} of ${n}`}
            ref={(img) => {
              // Fires on mount, once the <img> has the current index's src. If
              // it's already cached, `complete` is true right away and we don't
              // have to wait for (or miss) a load event.
              if (img && img.complete) applyOrientation(img);
            }}
            onLoad={(e) => applyOrientation(e.currentTarget)}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 size-full rounded-md object-cover shadow-medium"
          />
        </AnimatePresence>

        {hasCarousel && (
          <>
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label={`Previous photo of ${style.label}`}
              className="absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-midnight shadow-small transition hover:bg-white hover:text-crimson-red focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label={`Next photo of ${style.label}`}
              className="absolute right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-midnight shadow-small transition hover:bg-white hover:text-crimson-red focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}
      </div>

      {hasCarousel && (
        <div className="mt-5 flex justify-center gap-1.5">
          {style.images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Show photo ${i + 1} of ${style.label}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-4 bg-crimson-red" : "w-1.5 bg-grey/40 hover:bg-grey"
              }`}
            />
          ))}
        </div>
      )}

      <p className="mt-3 text-center font-sans text-h6-mobile md:text-h6-desktop text-midnight">
        {style.label}
      </p>
      {style.blurb && (
        <p className="mt-0.5 text-center font-body text-b4-desktop text-grey">
          {style.blurb}
        </p>
      )}
    </div>
  );
}
