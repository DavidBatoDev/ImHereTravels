"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

/** Site-wide fallback (mirrors FALLBACK_IMAGE in lib/tours-firestore.ts). */
const DEFAULT_FALLBACK = "/figma/tour-philippines-sunrise.png";

type Rounded = "none" | "sm" | "md" | "lg" | "full";
const ROUND: Record<Rounded, string> = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export type ImageWithSkeletonProps = Omit<
  ImageProps,
  "priority" | "onLoad" | "onError" | "onLoadingComplete"
> & {
  /**
   * Hero / above-the-fold. Maps to next/image `preload` (the Next 16 replacement
   * for the deprecated `priority`). The <img> stays mounted so the preload still
   * counts toward LCP.
   */
  priority?: boolean;
  /** Classes for the wrapper in width/height mode (ignored in fill mode). */
  containerClassName?: string;
  /** Skeleton + image corner radius, matched to the photo/avatar. */
  rounded?: Rounded;
  /** Swapped in if the image errors (default: site fallback). */
  fallbackSrc?: string;
};

/**
 * next/image wrapper that shows a shimmer skeleton and cross-fades the image in
 * on load. A client leaf — safe to render from server components.
 *
 * `fill` mode returns a fragment so it drops straight into the existing
 * `<div className="relative aspect-… bg-light-grey"><Image fill/></div>` pattern.
 * width/height mode wraps in a tight `relative inline-block` box (for avatars/icons
 * that have no positioned ancestor).
 */
export default function ImageWithSkeleton({
  priority = false,
  containerClassName = "",
  rounded = "none",
  fallbackSrc = DEFAULT_FALLBACK,
  className = "",
  fill,
  src,
  alt,
  style,
  ...rest
}: ImageWithSkeletonProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Cached-image guard: with `unoptimized` next/image, a warm-cache image can be
  // `complete` before React attaches onLoad, so onLoad may never fire and the
  // skeleton would stick forever (back/forward nav, local assets, Swiper loop
  // clones). Settle it after commit if the <img> is already decoded.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, [currentSrc]);

  const round = ROUND[rounded];

  const skeleton = (
    <span
      aria-hidden="true"
      className={[
        "img-skeleton pointer-events-none absolute inset-0",
        round,
        "transition-opacity duration-500 ease-out",
        loaded ? "opacity-0" : "opacity-100",
      ].join(" ")}
    />
  );

  const image = (
    <Image
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      fill={fill}
      preload={priority || undefined}
      className={[
        className,
        "transition-opacity duration-500 ease-out",
        loaded ? "opacity-100" : "opacity-0",
      ].join(" ")}
      style={style}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setLoaded(false);
          setCurrentSrc(fallbackSrc);
        } else {
          // Fallback also failed — stop the shimmer instead of spinning forever.
          setLoaded(true);
        }
      }}
      {...rest}
    />
  );

  if (fill) {
    return (
      <>
        {skeleton}
        {image}
      </>
    );
  }

  return (
    <span
      className={["relative inline-block overflow-hidden", round, containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      {skeleton}
      {image}
    </span>
  );
}
