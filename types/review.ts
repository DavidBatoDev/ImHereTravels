/**
 * Tour review types (shared shape for the `tourReviews` Firestore collection).
 *
 * Reviews were historically an embedded `details.reviews[]` array on each
 * `tourPackages` doc (see `TourReview` in ./tour.ts). They now live in their own
 * top-level `tourReviews` collection so we can support user submissions,
 * moderation/hide, verified-booking linkage, photos, and cross-tour aggregation.
 */

export type ReviewStatus = "published" | "hidden" | "pending";
export type ReviewSource = "user" | "admin";

/**
 * Full Firestore document shape for `tourReviews/{id}`.
 *
 * `bookingId` / `bookingCode` are PRIVATE audit/dedup fields and must never be
 * sent to the client — project to `PublicReview` before returning from any
 * public route or server component.
 *
 * `createdAt` / `updatedAt` are epoch milliseconds in app code; they are stored
 * as Firestore `Timestamp`s and converted at the data-access boundary.
 */
export interface ReviewDoc {
  tourId: string; // tourPackages doc id (the association)
  tourSlug: string; // for web query / routing
  tourName: string; // denormalized display name

  rating: number; // 1–5
  title?: string; // optional headline
  bodyMarkdown: string; // WYSIWYG output (markdown source)

  reviewerFirstName: string;
  reviewerLastName?: string; // usually withheld publicly
  reviewerLocation?: string;
  reviewerAvatar?: string; // uploaded photo URL; empty → initial-avatar fallback
  photos?: string[]; // uploaded trip-photo URLs

  status: ReviewStatus;
  source: ReviewSource;
  verified: boolean; // matched a confirmed booking for this tour

  bookingId?: string; // PRIVATE — never exposed
  bookingCode?: string; // PRIVATE — never exposed

  createdAt: number; // epoch ms
  updatedAt: number; // epoch ms
  displayDate?: string; // legacy free-text date from migrated rows
}

/** Client-safe projection of a review (no booking identifiers). */
export interface PublicReview {
  id: string;
  tourSlug: string;
  tourName: string;
  rating: number;
  title?: string;
  bodyMarkdown: string;
  reviewerFirstName: string;
  reviewerLocation?: string;
  reviewerAvatar?: string;
  photos?: string[];
  verified: boolean;
  createdAt: number;
  displayDate?: string;
}

/** Aggregate rating for a tour (drives the star summary + AggregateRating JSON-LD). */
export interface ReviewAggregate {
  average: number; // rounded to one decimal, e.g. 4.9
  count: number;
}
