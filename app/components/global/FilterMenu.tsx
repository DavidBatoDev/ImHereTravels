"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import useListboxNav from "@/app/components/global/useListboxNav";

export type FilterOption = { value: string; label: string; count?: number };

/**
 * The one filter/sort dropdown used by every list toolbar (tours, reviews hub,
 * per-tour reviews) so the controls look and behave identically app-wide. The
 * styling matches the reviews hub bar exactly, so adopting it elsewhere leaves
 * the reviews section visually unchanged.
 *
 * A rounded-full trigger pill ("Prefix: Value ▾") opens a listbox panel of
 * options with full keyboard support (arrow keys, Home/End, Escape, click-away).
 * Long lists (>6 options, or forced via `searchable`) get an in-panel search
 * box; the first option — the "All …" entry — stays pinned while searching.
 * Optional per-option `count`s render right-aligned.
 *
 * Width: the trigger fills its wrapper, so control the width from the parent via
 * `className` (e.g. `w-full sm:w-auto` for a stacked mobile bar). Use `align` to
 * flip the panel to the right edge when the control sits on the right of a row.
 */
export default function FilterMenu({
  prefix,
  value,
  options,
  activeValue,
  onSelect,
  searchable,
  searchPlaceholder = "Search…",
  align = "left",
  className = "",
}: {
  /** Muted lead-in shown before the value, e.g. "Sort" → "Sort: Most relevant". */
  prefix: string;
  /** The current selection, shown in the trigger. */
  value: string;
  options: FilterOption[];
  activeValue: string;
  onSelect: (value: string) => void;
  /** Force the in-panel search box on/off. Defaults to on when >6 options. */
  searchable?: boolean;
  searchPlaceholder?: string;
  align?: "left" | "right";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const showSearch = searchable ?? options.length > 6;

  // Close on click-away (the search box is cleared on each open, see the trigger).
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // The panel owns its own search box, so don't let keyboard nav steal focus.
  useListboxNav({
    open,
    listRef,
    triggerRef,
    onClose: () => setOpen(false),
    autoFocus: !showSearch,
  });

  const q = query.trim().toLowerCase();
  const searching = showSearch && q.length > 0;
  const [head, ...tail] = options;
  const restFiltered = searching
    ? tail.filter((o) => o.label.toLowerCase().includes(q))
    : tail;
  // Keep the pinned "All …" head visible even while searching the rest.
  const visible = showSearch && head ? [head, ...restFiltered] : options;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setQuery("");
          setOpen((v) => !v);
        }}
        className="flex w-full items-center justify-between gap-3 rounded-full border border-light-grey bg-white px-4 py-2.5 font-body text-b4-desktop text-midnight shadow-xxsmall transition-colors hover:bg-light-grey/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red"
      >
        <span className="truncate">
          <span className="text-grey">{prefix}:</span> {value}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          className={`absolute z-40 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-md border border-light-grey bg-white p-1.5 shadow-medium ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {/* Static header (not part of the scroll area) so options can't peek
              above it while scrolling. */}
          {showSearch && (
            <div className="mb-1 flex items-center gap-2 rounded-sm bg-white px-2 py-1.5">
              <Search className="size-4 text-grey" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="w-full bg-transparent font-body text-b4-desktop text-midnight outline-none placeholder:text-grey"
              />
            </div>
          )}

          <div className="max-h-72 overflow-auto">
            {visible.map((opt) => {
              const selected = activeValue === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onSelect(opt.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-sm px-3 py-2 text-left font-body text-b4-desktop transition-colors hover:bg-light-grey ${
                    selected ? "bg-light-grey/70 font-medium text-midnight" : "text-dark-gray"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {selected && <Check className="size-4 shrink-0 text-crimson-red" />}
                    <span className="truncate">{opt.label}</span>
                  </span>
                  {opt.count !== undefined && (
                    <span className="shrink-0 text-grey">{opt.count}</span>
                  )}
                </button>
              );
            })}

            {searching && restFiltered.length === 0 && (
              <p className="px-3 py-2 font-body text-b4-desktop text-grey">No matches.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
