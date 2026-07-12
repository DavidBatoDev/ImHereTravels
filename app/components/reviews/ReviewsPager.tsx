"use client";

import { useEffect, useRef, useState } from "react";
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
 * Remount it (via a `key` tied to the active filters) to reset back to page 1
 * when the filter/search/sort changes.
 */
export default function ReviewsPager({
  items,
  pageSize = 10,
}: {
  items: React.ReactNode[];
  pageSize?: number;
}) {
  const [page, setPage] = useState(0);
  const isFirstRender = useRef(true);

  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, pageCount - 1);
  const start = current * pageSize;
  const visible = items.slice(start, start + pageSize);

  // After the page changes, scroll up to the filters / top of the reviews area
  // so a new page starts from the top instead of leaving the user at the bottom.
  // Runs post-render (stable layout) and skips the initial mount.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document
      .getElementById("reviews-top")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [current]);

  const btn =
    "inline-flex items-center gap-1.5 rounded-full border border-light-grey bg-white px-5 py-2.5 font-body text-b4-desktop font-medium text-midnight shadow-small transition-colors hover:bg-light-grey disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white";

  return (
    <div>
      <ul className="mt-6 flex flex-col gap-4">{visible}</ul>

      {pageCount > 1 && (
        <nav
          aria-label="Reviews pages"
          className="mt-8 flex items-center justify-between gap-3"
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
