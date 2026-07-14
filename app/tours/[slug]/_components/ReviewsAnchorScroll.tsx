"use client";

import { useEffect } from "react";
import { scrollToReviews } from "@/lib/reviews-scroll";

/**
 * If the page loads directly on the `#reviews` hash (a shared/pasted link, or
 * a refresh after ReviewsLink set it), the browser's own fragment jump fires
 * before images above the target finish loading and can leave the viewport
 * stuck on an earlier section. Re-scrolling a couple of times as the page
 * settles keeps the target actually in view.
 */
export default function ReviewsAnchorScroll() {
  useEffect(() => {
    if (window.location.hash !== "#reviews") return;
    const { cancel } = scrollToReviews({
      behavior: "auto",
      updateHash: false,
      settleDelays: [200, 700, 1200, 2000],
    });
    return cancel;
  }, []);

  return null;
}
