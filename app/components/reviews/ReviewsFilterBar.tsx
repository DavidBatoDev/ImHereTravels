"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, Search } from "lucide-react";
import {
  DEFAULT_SORT,
  SORT_OPTIONS,
  type SortValue,
  type TourOption,
} from "@/app/components/reviews/reviews-filter";

/** Client filter bar for the reviews hub: tour selector + sort, URL-driven. */
export default function ReviewsFilterBar({
  tours,
  totalCount,
  activeTour,
  activeSort,
}: {
  tours: TourOption[];
  totalCount: number;
  activeTour?: string;
  activeSort: SortValue;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const push = (next: { tour?: string | null; sort?: SortValue }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next.tour !== undefined) {
      if (next.tour) params.set("tour", next.tour);
      else params.delete("tour");
    }
    if (next.sort !== undefined) {
      if (next.sort && next.sort !== DEFAULT_SORT) params.set("sort", next.sort);
      else params.delete("sort");
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const activeTourName = activeTour
    ? tours.find((t) => t.slug === activeTour)?.name ?? "Select tour"
    : `All tours (${totalCount})`;
  const activeSortLabel =
    SORT_OPTIONS.find((s) => s.value === activeSort)?.label ?? "Most recent";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <TourMenu
        tours={tours}
        totalCount={totalCount}
        activeTour={activeTour}
        label={activeTourName}
        onSelect={(slug) => push({ tour: slug })}
      />
      <SortMenu activeSort={activeSort} label={activeSortLabel} onSelect={(sort) => push({ sort })} />
    </div>
  );
}

/** Shared dropdown shell: button + popover, closes on outside click / Escape. */
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return { open, setOpen, ref };
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
  const { open, setOpen, ref } = useDropdown();
  const [query, setQuery] = useState("");
  const filtered = tours.filter((t) => t.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div ref={ref} className="relative">
      <button
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
        <div className={panelClass} role="listbox">
          {tours.length > 6 && (
            <div className="sticky top-0 mb-1 flex items-center gap-2 rounded-sm bg-white px-2 py-1.5">
              <Search className="size-4 text-grey" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tours…"
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

function SortMenu({
  activeSort,
  label,
  onSelect,
}: {
  activeSort: SortValue;
  label: string;
  onSelect: (sort: SortValue) => void;
}) {
  const { open, setOpen, ref } = useDropdown();
  return (
    <div ref={ref} className="relative">
      <button
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
        <div className={panelClass} role="listbox">
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
