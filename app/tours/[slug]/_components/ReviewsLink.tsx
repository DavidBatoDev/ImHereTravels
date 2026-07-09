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

  const label =
    count > 0 ? `${average.toFixed(1)} stars, ${count} reviews` : "Read reviews";

  return (
    <a
      href="#reviews"
      onClick={handleClick}
      aria-label={label}
      className="group inline-flex items-center gap-2 rounded-full border border-light-grey bg-white px-3.5 py-1.5 font-body text-b4-desktop text-midnight shadow-small transition-all hover:border-crimson-red hover:shadow-medium"
    >
      {count > 0 ? (
        <>
          <span aria-hidden className="text-crimson-red">
            ★
          </span>
          <span className="font-bold">{average.toFixed(1)}</span>
          <span aria-hidden className="text-light-grey">
            |
          </span>
          <span className="text-dark-gray underline underline-offset-2 group-hover:text-crimson-red">
            {count} review{count === 1 ? "" : "s"}
          </span>
        </>
      ) : (
        <span className="underline underline-offset-2 group-hover:text-crimson-red">
          Read reviews
        </span>
      )}
    </a>
  );
}
