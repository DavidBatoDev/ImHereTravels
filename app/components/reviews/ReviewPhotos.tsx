"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import type { ReviewVideo } from "@/types/review";

type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string };

const PHOTO_PREVIEW = 3; // photo thumbnails shown on the card before "+N"

/**
 * Trip photos + videos. `preview` (card): features the video (autoplays muted
 * in the background) and shows up to three photo thumbnails with a "+N"
 * overflow tile. Full grid otherwise (the focus modal). Clicking opens a
 * gallery viewer with arrows / swipe / keyboard nav and inline video playback.
 *
 * The viewer is rendered through a portal straight to `document.body` — it
 * previously lived inline in the tree and, being `position: fixed`, got
 * trapped inside the page's scroll-reveal wrappers (framer-motion sets a CSS
 * transform on those, which creates a new containing block and confines any
 * "fixed" descendant to that block instead of the viewport). Portaling out to
 * `<body>` sidesteps that regardless of what wraps the review grid.
 */
export default function ReviewPhotos({
  photos = [],
  videos = [],
  authorAlt,
  preview = false,
}: {
  photos?: string[];
  videos?: ReviewVideo[];
  authorAlt: string;
  preview?: boolean;
}) {
  // Videos first — they're the most engaging thing to open.
  const media: MediaItem[] = [
    ...videos.map((v) => ({ type: "video" as const, src: v.src, poster: v.poster })),
    ...photos.map((src) => ({ type: "image" as const, src })),
  ];
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % media.length));
      if (e.key === "ArrowLeft")
        setActive((i) => (i === null ? i : (i - 1 + media.length) % media.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, media.length]);

  if (media.length === 0) return null;
  const current = active === null ? null : media[active];
  const go = (delta: number) =>
    setActive((i) => (i === null ? i : (i + delta + media.length) % media.length));

  /** One clickable image tile (thumbnail or modal grid). `overflow` renders "+N". */
  const Tile = ({
    index,
    className,
    overflow = 0,
  }: {
    index: number;
    className: string;
    overflow?: number;
  }) => {
    const item = media[index];
    const thumb = item.type === "video" ? item.poster : item.src;
    return (
      <button
        type="button"
        onClick={() => setActive(index)}
        aria-label={
          item.type === "video"
            ? `Play video from ${authorAlt}`
            : `View photo ${index + 1} from ${authorAlt}`
        }
        className={`relative overflow-hidden rounded-sm bg-light-grey ${className}`}
      >
        {thumb ? (
          <ImageWithSkeleton
            src={thumb}
            alt={`Trip ${item.type} from ${authorAlt}`}
            fill
            sizes="120px"
            className="object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center bg-midnight/80" />
        )}
        {item.type === "video" && overflow === 0 && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex size-7 items-center justify-center rounded-full bg-black/55 text-white">
              <Play className="size-4 translate-x-px fill-current" />
            </span>
          </span>
        )}
        {overflow > 0 && (
          <span className="absolute inset-0 flex items-center justify-center bg-midnight/60 font-sans text-h6-desktop font-bold text-white">
            +{overflow}
          </span>
        )}
      </button>
    );
  };

  // ── Card preview: featured (autoplaying) video + up to 3 photos + "+N" ──────
  let gallery: React.ReactNode;
  if (preview) {
    const hasVideo = videos.length > 0; // media[0] is the featured video
    const previewPhotoCount = Math.min(photos.length, PHOTO_PREVIEW);
    const shown = (hasVideo ? 1 : 0) + previewPhotoCount;
    const remaining = media.length - shown;

    gallery = (
      <div className="flex flex-col gap-2">
        {hasVideo && media[0].type === "video" && (
          <button
            type="button"
            onClick={() => setActive(0)}
            aria-label={`Play video from ${authorAlt}`}
            className="relative h-44 w-full overflow-hidden rounded-sm bg-midnight"
          >
            <video
              src={media[0].src}
              poster={media[0].poster}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              className="size-full object-cover"
            />
            {previewPhotoCount === 0 && remaining > 0 && (
              <span className="absolute inset-0 flex items-center justify-center bg-midnight/60 font-sans text-h6-desktop font-bold text-white">
                +{remaining}
              </span>
            )}
          </button>
        )}
        {previewPhotoCount > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {photos.slice(0, PHOTO_PREVIEW).map((_, pi) => (
              <Tile
                key={pi}
                index={videos.length + pi}
                className="aspect-square w-full"
                overflow={pi === previewPhotoCount - 1 ? remaining : 0}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    // Full grid (focus modal): show everything.
    gallery = (
      <div className="flex flex-wrap gap-2">
        {media.map((_, i) => (
          <Tile key={i} index={i} className="size-16 md:size-20" />
        ))}
      </div>
    );
  }

  return (
    <>
      {gallery}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {current && (
              <motion.div
                key="review-media-viewer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/80 p-4"
                onClick={() => setActive(null)}
                onTouchStart={(e) => {
                  touchStartX.current = e.touches[0]?.clientX ?? null;
                }}
                onTouchEnd={(e) => {
                  if (touchStartX.current === null || media.length < 2) return;
                  const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
                  if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
                  touchStartX.current = null;
                }}
              >
                <button
                  type="button"
                  aria-label="Close"
                  className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                  onClick={() => setActive(null)}
                >
                  <X className="size-6" />
                </button>
                {media.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous"
                      className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 md:left-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        go(-1);
                      }}
                    >
                      <ChevronLeft className="size-7" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next"
                      className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 md:right-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        go(1);
                      }}
                    >
                      <ChevronRight className="size-7" />
                    </button>
                    <span className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-body text-b4-desktop text-white">
                      {(active ?? 0) + 1} / {media.length}
                    </span>
                  </>
                )}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {current.type === "video" ? (
                      <video
                        src={current.src}
                        poster={current.poster}
                        controls
                        autoPlay
                        playsInline
                        className="max-h-[85vh] max-w-[92vw] rounded-md"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={current.src}
                        alt={`Trip photo from ${authorAlt}`}
                        className="max-h-[85vh] max-w-[92vw] rounded-md object-contain"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
