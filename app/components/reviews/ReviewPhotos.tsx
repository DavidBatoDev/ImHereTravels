"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Play, Volume2, X } from "lucide-react";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import type { ReviewVideo } from "@/types/review";

type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string };

const PHOTO_PREVIEW = 3; // photo thumbnails shown on the card before "+N"

/**
 * Trip photos + videos.
 *
 * `preview` (card): features the video (autoplays muted in the background) and
 * shows up to three photo thumbnails with a "+N" overflow tile. Hovering any
 * tile shows a floating enlarged preview to the side — videos play there WITH
 * sound. Full grid otherwise (the focus modal). Clicking opens a lightbox with
 * arrows / swipe / keyboard nav and inline video playback.
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
  const [hover, setHover] = useState<{ index: number; rect: DOMRect } | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    setHover(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % media.length));
      if (e.key === "ArrowLeft")
        setActive((i) => (i === null ? i : (i - 1 + media.length) % media.length));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, media.length]);

  // Backstops so the hover preview never gets "stuck": clear it on scroll or when
  // the tab loses focus (a missed mouseleave otherwise leaves it on screen).
  useEffect(() => {
    if (!hover) return;
    const clear = () => setHover(null);
    window.addEventListener("scroll", clear, true);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("scroll", clear, true);
      window.removeEventListener("blur", clear);
    };
  }, [hover]);

  if (media.length === 0) return null;
  const current = active === null ? null : media[active];
  const go = (delta: number) =>
    setActive((i) => (i === null ? i : (i + delta + media.length) % media.length));

  const open = (index: number) => {
    setHover(null);
    setActive(index);
  };
  const onEnter = (index: number) => (e: React.MouseEvent<HTMLElement>) =>
    setHover({ index, rect: e.currentTarget.getBoundingClientRect() });
  const onLeave = () => setHover(null);

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
        onClick={() => open(index)}
        onMouseEnter={onEnter(index)}
        onMouseLeave={onLeave}
        aria-label={
          item.type === "video"
            ? `Play video from ${authorAlt}`
            : `View photo ${index + 1} from ${authorAlt}`
        }
        className={`group relative overflow-hidden rounded-sm bg-light-grey ${className}`}
      >
        {thumb ? (
          <ImageWithSkeleton
            src={thumb}
            alt={`Trip ${item.type} from ${authorAlt}`}
            fill
            sizes="120px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
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
      <div className="flex flex-col gap-2" onMouseLeave={onLeave}>
        {hasVideo && media[0].type === "video" && (
          <button
            type="button"
            onClick={() => open(0)}
            onMouseEnter={onEnter(0)}
            onMouseLeave={onLeave}
            aria-label={`Play video from ${authorAlt}`}
            className="group relative h-44 w-full overflow-hidden rounded-sm bg-midnight"
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
            {previewPhotoCount === 0 && remaining > 0 ? (
              <span className="absolute inset-0 flex items-center justify-center bg-midnight/60 font-sans text-h6-desktop font-bold text-white">
                +{remaining}
              </span>
            ) : (
              <span className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 font-body text-b4-desktop text-white">
                <Volume2 className="size-3.5" /> Hover for sound
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
      <div className="flex flex-wrap gap-2" onMouseLeave={onLeave}>
        {media.map((_, i) => (
          <Tile key={i} index={i} className="size-16 md:size-20" />
        ))}
      </div>
    );
  }

  return (
    <>
      {gallery}

      {/* Quick hover preview — floats to the side, no click needed. */}
      {hover && active === null && (
        <HoverPreview media={media} hover={hover} authorAlt={authorAlt} />
      )}

      {current && (
        <div
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
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setActive(null)}
          >
            <X className="size-6" />
          </button>
          {media.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 md:left-4"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 md:right-4"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
              >
                <ChevronRight className="size-7" />
              </button>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-body text-b4-desktop text-white">
                {(active ?? 0) + 1} / {media.length}
              </span>
            </>
          )}
          {current.type === "video" ? (
            <video
              src={current.src}
              poster={current.poster}
              controls
              autoPlay
              playsInline
              className="max-h-[85vh] max-w-[92vw] rounded-md"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={current.src}
              alt={`Trip photo from ${authorAlt}`}
              className="max-h-[85vh] max-w-[92vw] rounded-md object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </>
  );
}

/** Floating enlarged preview shown while hovering a tile (desktop only). */
function HoverPreview({
  media,
  hover,
  authorAlt,
}: {
  media: MediaItem[];
  hover: { index: number; rect: DOMRect };
  authorAlt: string;
}) {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => setMounted(true), []);

  // Try to play with sound; if the browser blocks unmuted autoplay, fall back to
  // muted so the preview still plays instead of freezing on the poster.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    el.play().catch(() => {
      el.muted = true;
      el.play().catch(() => {});
    });
  }, [mounted]);

  if (!mounted) return null;

  const item = media[hover.index];
  const WIDTH = 340;
  const HEIGHT = 232;
  const GAP = 16;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Prefer the side of the tile with more room; clamp to the viewport.
  const placeRight = vw - hover.rect.right >= hover.rect.left;
  let left = placeRight ? hover.rect.right + GAP : hover.rect.left - GAP - WIDTH;
  left = Math.max(8, Math.min(left, vw - WIDTH - 8));
  let top = hover.rect.top + hover.rect.height / 2 - HEIGHT / 2;
  top = Math.max(8, Math.min(top, vh - HEIGHT - 8));

  return createPortal(
    <div className="pointer-events-none fixed z-[60] hidden md:block" style={{ left, top, width: WIDTH }}>
      <div className="hover-preview-card overflow-hidden rounded-md bg-midnight shadow-xlarge ring-1 ring-black/10">
        {item.type === "video" ? (
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            autoPlay
            loop
            playsInline
            style={{ height: HEIGHT }}
            className="w-full object-cover"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.src}
            alt={`Trip photo from ${authorAlt}`}
            style={{ height: HEIGHT }}
            className="w-full object-cover"
          />
        )}
      </div>
    </div>,
    document.body,
  );
}
