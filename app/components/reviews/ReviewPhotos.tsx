"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";

/** Trip-photo thumbnails with a simple click-to-zoom lightbox. */
export default function ReviewPhotos({
  photos,
  authorAlt,
}: {
  photos: string[];
  authorAlt: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, photos.length]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View photo ${i + 1} from ${authorAlt}`}
            className="relative size-16 overflow-hidden rounded-sm bg-light-grey md:size-20"
          >
            <ImageWithSkeleton
              src={src}
              alt={`Trip photo from ${authorAlt}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/80 p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setActive(null)}
          >
            <X className="size-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[active]}
            alt={`Trip photo from ${authorAlt}`}
            className="max-h-[85vh] max-w-[92vw] rounded-md object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
