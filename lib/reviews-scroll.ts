type ScrollToReviewsOptions = {
  behavior?: ScrollBehavior;
  updateHash?: boolean;
  settleDelays?: number[];
};

type ScrollToReviewsResult = {
  found: boolean;
  cancel: () => void;
};

const DEFAULT_SETTLE_DELAYS = [750, 1200, 1800, 2600];
const REVIEWS_SCROLL_LOCK = "reviewsScrollLock";

export function scrollToReviews({
  behavior = "smooth",
  updateHash = true,
  settleDelays = DEFAULT_SETTLE_DELAYS,
}: ScrollToReviewsOptions = {}): ScrollToReviewsResult {
  if (typeof window === "undefined") {
    return { found: false, cancel: () => {} };
  }

  const scroll = (scrollBehavior: ScrollBehavior) => {
    const el = document.getElementById("reviews");
    if (!el) return false;
    document.documentElement.dataset[REVIEWS_SCROLL_LOCK] = "true";
    el.scrollIntoView({ behavior: scrollBehavior, block: "start" });
    return true;
  };

  const found = scroll(behavior);
  if (!found) return { found: false, cancel: () => {} };

  if (updateHash) {
    history.replaceState(null, "", "#reviews");
  }

  let cancelled = false;
  const cancel = () => {
    cancelled = true;
    timers.forEach((timer) => window.clearTimeout(timer));
    delete document.documentElement.dataset[REVIEWS_SCROLL_LOCK];
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("pointerdown", cancel);
    window.removeEventListener("keydown", cancel);
  };

  // The itinerary expands/collapses rows while the page scrolls past it, which
  // changes the height above Reviews. Re-align after those transitions settle.
  const timers = settleDelays.map((delay) =>
    window.setTimeout(() => {
      if (!cancelled) scroll("auto");
    }, delay),
  );
  const unlockTimer = window.setTimeout(cancel, Math.max(...settleDelays) + 200);
  timers.push(unlockTimer);

  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("pointerdown", cancel, { passive: true });
  window.addEventListener("keydown", cancel);

  return {
    found: true,
    cancel,
  };
}
