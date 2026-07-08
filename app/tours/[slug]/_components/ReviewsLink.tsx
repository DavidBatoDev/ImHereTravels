"use client";

import { scrollToReviews } from "@/lib/reviews-scroll";

/**
 * Airbnb-style "★ 4.9 · 23 reviews" teaser next to the tour title, linking down
 * to the reviews section. A plain `<a href="#reviews">` relies on the browser's
 * native fragment jump, which fires before images below the target finish
 * loading — as more content loads in above it, the target drifts further down
 * the page and the viewport is left wherever it happened to land (often mid
 * itinerary on a long tour page). Scrolling on click instead reads the
 * element's position fresh, after the page is fully hydrated and rendered.
 */
export default function ReviewsLink({
  average,
  count,
}: {
  average: number;
  count: number;
}) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const { found } = scrollToReviews();
    if (found) e.preventDefault();
  }

  return (
    <a
      href="#reviews"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 font-body text-b4-desktop text-midnight underline underline-offset-2 transition-colors hover:text-crimson-red"
    >
      {count > 0 ? (
        <>
          <span aria-hidden className="text-crimson-red">
            ★
          </span>
          <span className="font-bold">{average.toFixed(1)}</span>
          <span>
            · {count} review{count === 1 ? "" : "s"}
          </span>
        </>
      ) : (
        "Read reviews"
      )}
    </a>
  );
}
