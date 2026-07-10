"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import SearchInput from "@/app/components/reviews/SearchInput";
import useListboxNav from "@/app/components/reviews/useListboxNav";
import {
  DEFAULT_SORT,
  SORT_OPTIONS,
  sortReviews,
  type ReviewSortFields,
  type SortValue,
} from "@/app/components/reviews/reviews-filter";
import type { KeywordChip } from "@/app/components/reviews/review-keywords";

/** A single review card plus the metadata this section needs to filter + sort it. */
type ReviewItem = ReviewSortFields & {
  id: string;
  themeKeys: string[];
  searchText: string;
  node: React.ReactNode;
};

/**
 * The interactive body of a tour's reviews section.
 *
 * Shows interest-keyword chips mined from the tour's own reviews and a sort
 * control (the same options as the reviews hub). Clicking a chip filters the
 * grid IN PLACE (no navigation to /reviews) to the reviews that mention that
 * theme, so a potential customer can jump straight to what they care about
 * without leaving the tour page. A "Show more" control expands the list within
 * the section rather than linking away.
 *
 * Cards are server-rendered `ReviewCard` nodes passed down as `items[].node`
 * (each tagged with the theme keys it matches + its sort fields), so review
 * rendering stays on the server and this component only handles selection,
 * sorting, and visibility.
 */
export default function TourReviewsSection({
  chips,
  items,
  totalCount,
  initialVisible = 6,
}: {
  chips: KeywordChip[];
  items: ReviewItem[];
  totalCount: number;
  initialVisible?: number;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [sort, setSort] = useState<SortValue>(DEFAULT_SORT);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = items.filter(
    (it) =>
      (!active || it.themeKeys.includes(active)) &&
      (!q || it.searchText.includes(q)),
  );
  const sorted = sortReviews(filtered, sort);
  const visible = expanded ? sorted : sorted.slice(0, initialVisible);
  const hiddenCount = sorted.length - visible.length;

  const selectChip = (key: string | null) => {
    setActive(key);
    setExpanded(false); // collapse back to the standard height when refiltering
  };

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput value={query} onChange={setQuery} />
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {chips.length > 0 && (
        // Single scrollable strip of topic filters (mined from the reviews).
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Chip active={active === null} onClick={() => selectChip(null)}>
            All {totalCount}
          </Chip>
          {chips.map((c) => (
            <Chip
              key={c.key}
              active={active === c.key}
              onClick={() => selectChip(active === c.key ? null : c.key)}
            >
              {c.label} <span className="opacity-70">{c.count}</span>
            </Chip>
          ))}
        </div>
      )}

      {sorted.length === 0 ? (
        <p className="mt-10 text-center font-body text-b3-desktop text-grey">
          No reviews match{" "}
          {q && <span className="font-medium text-midnight">“{query.trim()}”</span>}.{" "}
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive(null);
            }}
            className="text-crimson-red underline underline-offset-2 hover:text-light-red"
          >
            Clear
          </button>
        </p>
      ) : (
        <>
          {/* Masonry (CSS columns) so cards sit at their natural content height and
              pack tightly — a short review no longer stretches to a tall row-mate,
              which left awkward empty space. Each `node` is a server-rendered
              ReviewCard whose grid variant renders its own <li>; the arbitrary
              variants add the per-card spacing + keep a card from splitting across
              columns. Fragment only supplies the key. */}
          <ul className="mt-8 columns-1 gap-6 md:columns-2 lg:columns-3 [&>li]:mb-6 [&>li]:break-inside-avoid">
            {visible.map((it) => (
              <Fragment key={it.id}>{it.node}</Fragment>
            ))}
          </ul>

          {hiddenCount > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="rounded-full border border-light-grey bg-white px-6 py-3 font-body text-b3-desktop font-medium text-midnight shadow-small transition-colors hover:bg-light-grey"
              >
                Show {hiddenCount} more review{hiddenCount === 1 ? "" : "s"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 font-body text-b4-desktop transition-colors ${
        active
          ? "bg-crimson-red text-white"
          : "bg-light-grey text-midnight hover:bg-light-grey/70"
      }`}
    >
      {children}
    </button>
  );
}

/** Compact sort menu reusing the reviews-hub sort options. */
function SortDropdown({
  value,
  onChange,
}: {
  value: SortValue;
  onChange: (value: SortValue) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Escape + focus restore are owned by useListboxNav; this only closes on
  // clicks outside the menu.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useListboxNav({ open, listRef, triggerRef, onClose: () => setOpen(false) });

  const current = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

  return (
    <div ref={ref} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-light-grey bg-white px-4 py-2 font-body text-b4-desktop text-midnight transition-colors hover:bg-light-grey"
      >
        <span className="text-grey">Sort:</span>
        <span className="font-medium">{current.label}</span>
        <ChevronDown
          className={`size-4 text-grey transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute right-0 z-20 mt-2 min-w-52 overflow-hidden rounded-md bg-white py-1 shadow-medium ring-1 ring-black/5"
        >
          {SORT_OPTIONS.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2.5 text-left font-body text-b4-desktop transition-colors hover:bg-light-grey ${
                  o.value === value
                    ? "bg-crimson-red/10 font-medium text-crimson-red"
                    : "text-midnight"
                }`}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
