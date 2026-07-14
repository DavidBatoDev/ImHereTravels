"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, Search } from "lucide-react";
import SearchInput from "@/app/components/reviews/SearchInput";
import useListboxNav from "@/app/components/reviews/useListboxNav";
import {
  DEFAULT_SORT,
  DEFAULT_SOURCE,
  SORT_OPTIONS,
  SOURCE_OPTIONS,
  type SortValue,
  type SourceValue,
  type TourOption,
} from "@/app/components/reviews/reviews-filter";

const SEARCH_DEBOUNCE_MS = 300;

/**
 * Client filter bar for the reviews hub: free-text search + tour selector + sort.
 * All three are URL-driven (`?q=`, `?tour=`, `?sort=`) so a filtered view is
 * shareable and the server does the filtering. Search is debounced so typing
 * doesn't push a history entry per keystroke.
 */
export default function ReviewsFilterBar({
  tours,
  totalCount,
  activeTour,
  activeSort,
  activeQuery = "",
  activeSource = DEFAULT_SOURCE,
  sourceCounts,
}: {
  tours: TourOption[];
  totalCount: number;
  activeTour?: string;
  activeSort: SortValue;
  activeQuery?: string;
  activeSource?: SourceValue;
  sourceCounts?: Record<SourceValue, number>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const push = (next: {
    tour?: string | null;
    sort?: SortValue;
    q?: string | null;
    source?: SourceValue;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next.tour !== undefined) {
      if (next.tour) params.set("tour", next.tour);
      else params.delete("tour");
    }
    if (next.sort !== undefined) {
      if (next.sort && next.sort !== DEFAULT_SORT) params.set("sort", next.sort);
      else params.delete("sort");
    }
    if (next.q !== undefined) {
      if (next.q) params.set("q", next.q);
      else params.delete("q");
    }
    if (next.source !== undefined) {
      if (next.source && next.source !== DEFAULT_SOURCE) params.set("source", next.source);
      else params.delete("source");
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // Local text state, pushed to the URL after a pause.
  const [query, setQuery] = useState(activeQuery);
  useEffect(() => {
    const timer = setTimeout(() => {
      const next = query.trim();
      if (next !== activeQuery) push({ q: next || null });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeQuery]);

  const activeTourName = activeTour
    ? tours.find((t) => t.slug === activeTour)?.name ?? "Select tour"
    : `All tours (${totalCount})`;
  const activeSortLabel =
    SORT_OPTIONS.find((s) => s.value === activeSort)?.label ?? SORT_OPTIONS[0].label;
  const activeSourceLabel =
    SOURCE_OPTIONS.find((s) => s.value === activeSource)?.label ?? SOURCE_OPTIONS[0].label;

  // Hide the source menu when every review comes from one place — a filter that
  // can only ever return "all" or "nothing" is noise.
  const showSourceMenu =
    !sourceCounts ||
    SOURCE_OPTIONS.filter((o) => o.value !== "all" && sourceCounts[o.value] > 0).length > 1;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <SearchInput value={query} onChange={setQuery} className="w-full sm:max-w-xs" />
      {tours.length > 1 && (
        <TourMenu
          tours={tours}
          totalCount={totalCount}
          activeTour={activeTour}
          label={activeTourName}
          onSelect={(slug) => push({ tour: slug })}
        />
      )}
      {showSourceMenu && (
        <SourceMenu
          activeSource={activeSource}
          label={activeSourceLabel}
          counts={sourceCounts}
          onSelect={(source) => push({ source })}
        />
      )}
      <SortMenu activeSort={activeSort} label={activeSortLabel} onSelect={(sort) => push({ sort })} />
    </div>
  );
}

/**
 * Shared dropdown shell: closes on outside click. Escape + focus restore + arrow
 * navigation are owned by `useListboxNav` in each menu.
 */
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  return { open, setOpen, ref, triggerRef, listRef };
}

const triggerClass =
  "flex w-full items-center justify-between gap-3 rounded-full border border-light-grey bg-white px-4 py-2.5 font-body text-b4-desktop text-midnight shadow-xxsmall transition-colors hover:bg-light-grey/60 sm:w-auto";
const panelClass =
  "absolute z-30 mt-2 max-h-80 w-[min(20rem,calc(100vw-2rem))] overflow-auto rounded-md border border-light-grey bg-white p-1.5 shadow-medium";
const itemClass =
  "flex w-full items-center justify-between gap-3 rounded-sm px-3 py-2 text-left font-body text-b4-desktop text-dark-gray hover:bg-light-grey";

function TourMenu({
  tours,
  totalCount,
  activeTour,
  label,
  onSelect,
}: {
  tours: TourOption[];
  totalCount: number;
  activeTour?: string;
  label: string;
  onSelect: (slug: string | null) => void;
}) {
  const { open, setOpen, ref, triggerRef, listRef } = useDropdown();
  const [query, setQuery] = useState("");
  const hasSearch = tours.length > 6;
  const filtered = tours.filter((t) => t.name.toLowerCase().includes(query.trim().toLowerCase()));

  // When the panel has its own autofocused search box, don't steal that focus.
  useListboxNav({
    open,
    listRef,
    triggerRef,
    onClose: () => setOpen(false),
    autoFocus: !hasSearch,
  });

  return (
    <div ref={ref} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={triggerClass}
      >
        <span className="truncate">
          <span className="text-grey">Tour:</span> {label}
        </span>
        <ChevronDown className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div ref={listRef} className={panelClass} role="listbox">
          {hasSearch && (
            <div className="sticky top-0 mb-1 flex items-center gap-2 rounded-sm bg-white px-2 py-1.5">
              <Search className="size-4 text-grey" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tours…"
                aria-label="Search tours"
                className="w-full bg-transparent font-body text-b4-desktop text-midnight outline-none placeholder:text-grey"
              />
            </div>
          )}
          <MenuItem
            label={`All tours`}
            count={totalCount}
            selected={!activeTour}
            onClick={() => {
              onSelect(null);
              setOpen(false);
            }}
          />
          {filtered.map((t) => (
            <MenuItem
              key={t.slug}
              label={t.name}
              count={t.count}
              selected={activeTour === t.slug}
              onClick={() => {
                onSelect(t.slug);
                setOpen(false);
              }}
            />
          ))}
          {filtered.length === 0 && (
            <p className="px-3 py-2 font-body text-b4-desktop text-grey">No tours match.</p>
          )}
        </div>
      )}
    </div>
  );
}

function SourceMenu({
  activeSource,
  label,
  counts,
  onSelect,
}: {
  activeSource: SourceValue;
  label: string;
  counts?: Record<SourceValue, number>;
  onSelect: (source: SourceValue) => void;
}) {
  const { open, setOpen, ref, triggerRef, listRef } = useDropdown();
  useListboxNav({ open, listRef, triggerRef, onClose: () => setOpen(false) });

  return (
    <div ref={ref} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={triggerClass}
      >
        <span className="truncate">
          <span className="text-grey">Source:</span> {label}
        </span>
        <ChevronDown className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div ref={listRef} className={panelClass} role="listbox">
          {SOURCE_OPTIONS
            // Drop sources with nothing behind them (e.g. Google before go-live);
            // keep the current selection so it can always be read back.
            .filter(
              (s) =>
                !counts || s.value === "all" || s.value === activeSource || counts[s.value] > 0,
            )
            .map((s) => (
              <MenuItem
                key={s.value}
                label={s.label}
                count={counts?.[s.value]}
                selected={activeSource === s.value}
                onClick={() => {
                  onSelect(s.value);
                  setOpen(false);
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
}

function SortMenu({
  activeSort,
  label,
  onSelect,
}: {
  activeSort: SortValue;
  label: string;
  onSelect: (sort: SortValue) => void;
}) {
  const { open, setOpen, ref, triggerRef, listRef } = useDropdown();
  useListboxNav({ open, listRef, triggerRef, onClose: () => setOpen(false) });

  return (
    <div ref={ref} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={triggerClass}
      >
        <span className="truncate">
          <span className="text-grey">Sort:</span> {label}
        </span>
        <ChevronDown className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div ref={listRef} className={panelClass} role="listbox">
          {SORT_OPTIONS.map((s) => (
            <MenuItem
              key={s.value}
              label={s.label}
              selected={activeSort === s.value}
              onClick={() => {
                onSelect(s.value);
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MenuItem({
  label,
  count,
  selected,
  onClick,
}: {
  label: string;
  count?: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onClick}
      className={`${itemClass} ${selected ? "bg-light-grey/70 font-medium text-midnight" : ""}`}
    >
      <span className="flex min-w-0 items-center gap-2">
        {selected && <Check className="size-4 shrink-0 text-crimson-red" />}
        <span className="truncate">{label}</span>
      </span>
      {count !== undefined && <span className="shrink-0 text-grey">{count}</span>}
    </button>
  );
}
