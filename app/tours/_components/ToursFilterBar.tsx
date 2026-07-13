"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import FilterMenu from "@/app/components/global/FilterMenu";

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
        <FilterMenu
          prefix="Sort By"
          value={sortActiveLabel}
          options={SORT_OPTIONS}
          activeValue={currentSort}
          onSelect={(v) => navigate(currentDestination, v as SortKey)}
          align="right"
        />

        <FilterMenu
          prefix="Filter"
          value={filterActiveLabel}
          options={destOptions}
          activeValue={currentDestination ?? ""}
          onSelect={(v) => navigate(v || undefined, currentSort)}
          align="right"
          searchPlaceholder="Search destinations…"
        />

        {/* RESET — only when a filter/sort is active */}
        {isFiltered && (
          <button
            type="button"
            onClick={() => navigate(undefined, "relevant")}
            className="rounded-full border border-light-grey bg-white px-4 py-2.5 font-body text-b4-desktop font-medium text-midnight shadow-xxsmall transition-colors hover:bg-light-grey/60"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
