"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import SearchInput from "@/app/components/reviews/SearchInput";
import useListboxNav from "@/app/components/reviews/useListboxNav";
import ReviewsPager from "@/app/components/reviews/ReviewsPager";
import {
  DEFAULT_SORT,
  DEFAULT_SOURCE,
  SORT_OPTIONS,
  SOURCE_OPTIONS,
  matchesSource,
  sortReviews,
  type ReviewSortFields,
  type SortValue,
  type SourceValue,
  type TourOption,
} from "@/app/components/reviews/reviews-filter";
import type { KeywordChip } from "@/app/components/reviews/review-keywords";

/** A single review card plus the metadata this section needs to filter + sort it. */
type ReviewItem = ReviewSortFields & {
  id: string;
  themeKeys: string[];
  searchText: string;
  node: React.ReactNode;
  /** Which tour this review is for — only needed when `tours` is passed. */
  tourSlug?: string;
  source?: string;
};

const PAGER_LIST_CLASS =
  "mt-8 columns-1 gap-6 md:columns-2 lg:columns-3 [&>li]:mb-6 [&>li]:break-inside-avoid";

/**
 * The interactive body of a tour's (or a destination's, across several tours)
 * reviews section.
 *
 * Shows a source dropdown (same look as the hub's — imheretravels.com /
 * Google / TourRadar, always visible here), interest-keyword chips mined
 * from the reviews, and a sort control (the same options as the reviews
 * hub). Clicking a chip filters the grid IN PLACE (no navigation to
 * /reviews) to the reviews that mention that theme, so a potential customer
 * can jump straight to what they care about without leaving the page. When
 * `tours` is passed (a destination page, showing several tours at once) a
 * further chip row filters to one tour at a time. Paginated (not "show
 * more") so the page doesn't grow unbounded.
 *
 * Cards are server-rendered `ReviewCard` nodes passed down as `items[].node`
 * (each tagged with the theme keys it matches + its sort fields), so review
 * rendering stays on the server and this component only handles selection,
 * sorting, and pagination.
 */
export default function TourReviewsSection({
  chips,
  items,
  totalCount,
  tours,
  pageSize = 6,
}: {
  chips: KeywordChip[];
  items: ReviewItem[];
  totalCount: number;
  /** When provided (destination pages), shows a "which tour" chip filter. */
  tours?: TourOption[];
  pageSize?: number;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [activeTour, setActiveTour] = useState<string | null>(null);
  const [activeSource, setActiveSource] = useState<SourceValue>(DEFAULT_SOURCE);
  const [sort, setSort] = useState<SortValue>(DEFAULT_SORT);
  const [query, setQuery] = useState("");

  // Same recipe as the hub's server-side sourceCounts — counted against the
  // full set (not narrowed by the other active filters), so switching tour/
  // theme/search doesn't make the source counts jump around underneath you.
  const sourceCounts = useMemo(
    () =>
      Object.fromEntries(
        SOURCE_OPTIONS.map((o) => [o.value, items.filter((it) => matchesSource(it, o.value)).length]),
      ) as Record<SourceValue, number>,
    [items],
  );

  const q = query.trim().toLowerCase();
  const filtered = items.filter(
    (it) =>
      (!activeTour || it.tourSlug === activeTour) &&
      matchesSource(it, activeSource) &&
      (!active || it.themeKeys.includes(active)) &&
      (!q || it.searchText.includes(q)),
  );
  const sorted = sortReviews(filtered, sort);

  return (
    <div id="reviews-section-body" className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput value={query} onChange={setQuery} />
        {/* Always visible, unlike the hub's dropdown (which prunes empty
            options) — every source stays selectable here regardless of count. */}
        <SourceDropdown value={activeSource} counts={sourceCounts} onChange={setActiveSource} />
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {tours && tours.length > 1 && (
        // Which tour — only relevant when a page (a destination) spans more than one.
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Chip active={activeTour === null} onClick={() => setActiveTour(null)}>
            All tours {totalCount}
          </Chip>
          {tours.map((t) => (
            <Chip
              key={t.slug}
              active={activeTour === t.slug}
              onClick={() => setActiveTour(activeTour === t.slug ? null : t.slug)}
            >
              {t.name} <span className="opacity-70">{t.count}</span>
            </Chip>
          ))}
        </div>
      )}

      {chips.length > 0 && (
        // Single scrollable strip of topic filters (mined from the reviews).
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Chip active={active === null} onClick={() => setActive(null)}>
            All {totalCount}
          </Chip>
          {chips.map((c) => (
            <Chip
              key={c.key}
              active={active === c.key}
              onClick={() => setActive(active === c.key ? null : c.key)}
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
              setActiveTour(null);
              setActiveSource(DEFAULT_SOURCE);
            }}
            className="text-crimson-red underline underline-offset-2 hover:text-light-red"
          >
            Clear
          </button>
        </p>
      ) : (
        // Masonry (CSS columns) so cards sit at their natural content height and
        // pack tightly — a short review no longer stretches to a tall row-mate.
        // Reset to page 1 whenever a filter changes.
        <ReviewsPager
          resetKey={`${activeTour ?? ""}|${activeSource}|${active ?? ""}|${sort}|${q}`}
          items={sorted.map((it) => (
            <Fragment key={it.id}>{it.node}</Fragment>
          ))}
          pageSize={pageSize}
          listClassName={PAGER_LIST_CLASS}
          scrollTargetId="reviews-section-body"
        />
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
  const reduce = !!useReducedMotion();

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

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            role="listbox"
            initial={reduce ? false : { opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: reduce ? 0.1 : 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 z-20 mt-2 w-[min(13rem,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-md bg-white py-1 shadow-medium ring-1 ring-black/5"
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
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Source filter dropdown — same look as the reviews hub's, with per-option
 *  counts, but never prunes empty options (see the call site for why). */
function SourceDropdown({
  value,
  counts,
  onChange,
}: {
  value: SourceValue;
  counts: Record<SourceValue, number>;
  onChange: (value: SourceValue) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const reduce = !!useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useListboxNav({ open, listRef, triggerRef, onClose: () => setOpen(false) });

  const current = SOURCE_OPTIONS.find((o) => o.value === value) ?? SOURCE_OPTIONS[0];

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
        <span className="text-grey">Source:</span>
        <span className="font-medium">{current.label}</span>
        <ChevronDown
          className={`size-4 text-grey transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            role="listbox"
            initial={reduce ? false : { opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: reduce ? 0.1 : 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 z-20 mt-2 w-[min(13rem,calc(100vw-2rem))] origin-top-left overflow-hidden rounded-md bg-white py-1 shadow-medium ring-1 ring-black/5"
          >
            {SOURCE_OPTIONS.map((o) => (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={o.value === value}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left font-body text-b4-desktop transition-colors hover:bg-light-grey ${
                    o.value === value ? "font-medium text-midnight" : "text-dark-gray"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {o.value === value && <Check className="size-4 shrink-0 text-crimson-red" />}
                    {o.label}
                  </span>
                  <span className="text-grey">{counts[o.value]}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
