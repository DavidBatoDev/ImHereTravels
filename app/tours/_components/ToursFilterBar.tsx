"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export type SortKey =
  | "relevant"
  | "price-asc"
  | "price-desc"
  | "duration-asc"
  | "duration-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevant",      label: "Most Relevant" },
  { value: "price-asc",     label: "Price: Low to High" },
  { value: "price-desc",    label: "Price: High to Low" },
  { value: "duration-asc",  label: "Duration: Short to Long" },
  { value: "duration-desc", label: "Duration: Long to Short" },
];

/* -------------------------------------------------------------------------- */
/* Reusable custom dropdown                                                    */
/* -------------------------------------------------------------------------- */

function Dropdown({
  triggerLabel,
  activeLabel,
  options,
  onSelect,
  activeValue,
  icon,
}: {
  triggerLabel: string;
  activeLabel: string;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  activeValue: string;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger pill */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-grey bg-white px-4 py-2.5 font-body text-b4-desktop text-midnight transition-colors hover:border-midnight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red"
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="text-grey">{triggerLabel}:</span>
        <span className="font-medium text-midnight">{activeLabel}</span>
        {/* Chevron */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 text-grey transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute right-0 top-[calc(100%+8px)] z-50 min-w-52 overflow-hidden rounded-lg bg-white shadow-medium transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              onSelect(opt.value);
              setOpen(false);
            }}
            className={`flex w-full items-center justify-between px-4 py-3 text-left font-body text-b4-desktop transition-colors hover:bg-light-grey ${
              activeValue === opt.value
                ? "font-medium text-crimson-red"
                : "text-midnight"
            }`}
          >
            {opt.label}
            {activeValue === opt.value && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7l3.5 3.5L12 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Filter bar                                                                  */
/* -------------------------------------------------------------------------- */

interface Props {
  destinations: { slug: string; name: string }[];
  currentDestination: string | undefined;
  currentSort: SortKey;
  totalCount: number;
}

export default function ToursFilterBar({
  destinations,
  currentDestination,
  currentSort,
  totalCount,
}: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  function navigate(dest: string | undefined, sort: SortKey) {
    const p = new URLSearchParams();
    if (dest) p.set("destination", dest);
    if (sort !== "relevant") p.set("sort", sort);
    const qs = p.toString();
    startTransition(() => {
      router.push(qs ? `/tours?${qs}` : "/tours");
    });
  }

  const isFiltered = !!currentDestination || currentSort !== "relevant";

  const sortActiveLabel =
    SORT_OPTIONS.find((o) => o.value === currentSort)?.label ?? "Most Relevant";

  const destOptions = [
    { value: "", label: "All Destinations" },
    ...destinations.map((d) => ({ value: d.slug, label: d.name })),
  ];
  const filterActiveLabel =
    destinations.find((d) => d.slug === currentDestination)?.name ??
    "All Destinations";

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 md:mt-10">
      {/* Left: trip count */}
      <p className="font-body text-b4-desktop text-dark-gray">
        <span className="font-sans font-bold text-midnight">{totalCount}</span>{" "}
        {totalCount === 1 ? "Trip" : "Trips"} Total
      </p>

      {/* Right: controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Sort By */}
        <Dropdown
          triggerLabel="Sort By"
          activeLabel={sortActiveLabel}
          options={SORT_OPTIONS}
          activeValue={currentSort}
          onSelect={(v) => navigate(currentDestination, v as SortKey)}
        />

        {/* Filter by destination */}
        <Dropdown
          triggerLabel="Filter"
          activeLabel={filterActiveLabel}
          options={destOptions}
          activeValue={currentDestination ?? ""}
          onSelect={(v) => navigate(v || undefined, currentSort)}
          icon={
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 6h18M7 12h10M11 18h2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          }
        />

        {/* RESET — only when a filter/sort is active */}
        {isFiltered && (
          <button
            type="button"
            onClick={() => navigate(undefined, "relevant")}
            className="rounded-full border border-midnight px-4 py-2.5 font-body text-b4-desktop font-medium text-midnight transition-colors hover:bg-midnight hover:text-white"
          >
            RESET
          </button>
        )}
      </div>
    </div>
  );
}
