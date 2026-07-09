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

/**
 * Minimal fields needed to sort a review. `PublicReview` satisfies this
 * structurally, and so does any lighter object that carries these fields — so
 * both the hub (server) and the per-tour section (client) share one sorter.
 */
export interface ReviewSortFields {
  createdAt: number;
  photos?: unknown[];
  videos?: unknown[];
  bodyMarkdown?: string;
}

export const reviewHasMedia = (r: ReviewSortFields): boolean =>
  (r.photos?.length ?? 0) + (r.videos?.length ?? 0) > 0;

/** Sort a review list per the selected sort option (input is newest-first). */
export function sortReviews<T extends ReviewSortFields>(
  list: T[],
  sort: SortValue,
): T[] {
  const copy = [...list];
  switch (sort) {
    case "oldest":
      return copy.sort((a, b) => a.createdAt - b.createdAt);
    case "media":
      return copy.sort(
        (a, b) =>
          Number(reviewHasMedia(b)) - Number(reviewHasMedia(a)) ||
          b.createdAt - a.createdAt,
      );
    case "longest":
      return copy.sort(
        (a, b) => (b.bodyMarkdown?.length ?? 0) - (a.bodyMarkdown?.length ?? 0),
      );
    default:
      return copy.sort((a, b) => b.createdAt - a.createdAt);
  }
}
