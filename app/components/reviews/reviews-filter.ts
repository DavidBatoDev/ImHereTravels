/**
 * Shared (server-safe) constants + types for the reviews hub filter/sort.
 * Kept out of the "use client" component so the server page can import the
 * SORT_OPTIONS value (client-module value exports become proxies on the server).
 */

export type TourOption = { slug: string; name: string; count: number };

export const SORT_OPTIONS = [
  { value: "recent", label: "Most recent" },
  { value: "oldest", label: "Oldest first" },
  { value: "media", label: "With photos & video" },
  { value: "longest", label: "Most detailed" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const DEFAULT_SORT: SortValue = "recent";
