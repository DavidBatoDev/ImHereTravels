"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Client-side pager for the hub's review list. Receives server-rendered
 * `ReviewCard` nodes (each a `<li>`) and shows one page at a time (default 10)
 * with Prev/Next.
 *
 * The reviews flow normally on the page (the trip-style rail beside them is
 * sticky), so scrolling the page moves through the reviews while the rail stays
 * pinned. Changing page smooth-scrolls back to the top of the list.
 *
 * Pass `resetKey` (tied to the active filters) to reset back to page 1 when
 * the filter/search/sort changes — this component itself stays mounted (it's
 * no longer forced to remount via a `key` at the call site), so items that are
 * still on screen after a sort/filter change keep their DOM node instead of
 * being torn down and rebuilt, which is what previously made review photos
 * flash/reload on every sort change. The page itself still crossfades on any
 * genuine content swap (new page, new filter) via `AnimatePresence` below.
 */
export default function ReviewsPager({
  items,
  pageSize = 10,
  listClassName = "mt-6 flex flex-col gap-4",
  scrollTargetId = "reviews-top",
  resetKey,
}: {
  items: React.ReactNode[];
  pageSize?: number;
  /** Wrapper classes for the `<ul>` — defaults to the hub's single-column list.
   *  Pass a masonry-columns class to match the tour/destination sections instead. */
  listClassName?: string;
  /** Id of the element to smooth-scroll to on page change. */
  scrollTargetId?: string;
  /** Changing this resets back to page 1 (e.g. a filter/sort/search signature). */
  resetKey?: string;
}) {
  const [page, setPage] = useState(0);
  const reduce = !!useReducedMotion();

  // Reset to page 1 when the filter signature changes, without remounting the
  // whole pager (see doc comment above). Adjusting state during render (rather
  // than in an effect) when a prop changes is the React-blessed pattern for
  // this — it bails out before paint, so there's no extra flash of page 1's
  // stale slice before the reset takes effect.
  const [prevResetKey, setPrevResetKey] = useState(resetKey);
  if (resetKey !== prevResetKey) {
    setPrevResetKey(resetKey);
    setPage(0);
  }

  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, pageCount - 1);
  const start = current * pageSize;
  const visible = items.slice(start, start + pageSize);

  // After the page changes, scroll up to the filters / top of the reviews area
  // so a new page starts from the top instead of leaving the user at the bottom.
  // `prevPage` is seeded to the initial `current` at render time (not inside
  // the effect), so it's already correct before the effect ever runs — unlike
  // a boolean "isFirstRender" ref, this survives React Strict Mode's
  // mount→unmount→remount dance in dev without misfiring on a fresh mount.
  const prevPage = useRef(current);
  useEffect(() => {
    if (prevPage.current === current) return;
    prevPage.current = current;
    document
      .getElementById(scrollTargetId)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [current, scrollTargetId, reduce]);

  const btn =
    "inline-flex items-center gap-1.5 rounded-full border border-light-grey bg-white px-5 py-2.5 font-body text-b4-desktop font-medium text-midnight shadow-small transition-colors hover:bg-light-grey disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white";

  return (
    <div>
      {/* Crossfade the whole page of cards on page/filter change instead of an
          instant swap — `mode="wait"` lets the old page fade out before the new
          one fades in, so two full grids never overlap mid-transition. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={`${resetKey ?? ""}::${current}`}
          className={listClassName}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
          transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {visible}
        </motion.ul>
      </AnimatePresence>

      {pageCount > 1 && (
        <nav
          aria-label="Reviews pages"
          className="mt-8 flex flex-wrap items-center justify-between gap-3"
        >
          <button
            type="button"
            onClick={() => setPage(current - 1)}
            disabled={current === 0}
            className={btn}
          >
            <ChevronLeft className="size-4" />
            Prev
          </button>

          <span className="font-body text-b4-desktop text-grey">
            Page {current + 1} of {pageCount}
          </span>

          <button
            type="button"
            onClick={() => setPage(current + 1)}
            disabled={current >= pageCount - 1}
            className={btn}
          >
            Next
            <ChevronRight className="size-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
