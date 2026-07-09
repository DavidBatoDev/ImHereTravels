/**
 * Tour review types (shared shape for the `tourReviews` Firestore collection).
 *
 * Reviews were historically an embedded `details.reviews[]` array on each
 * `tourPackages` doc (see `TourReview` in ./tour.ts). They now live in their own
 * top-level `tourReviews` collection so we can support user submissions,
 * moderation/hide, verified-booking linkage, photos, and cross-tour aggregation.
 */

export type ReviewStatus = "published" | "hidden" | "pending";
export type ReviewSource = "user" | "admin" | "google" | "tourradar";

/** External (federated) sources — shown as cards but excluded from the average + JSON-LD. */
export const EXTERNAL_REVIEW_SOURCES = ["google", "tourradar"] as const;

/** True for federated reviews (Google/TourRadar) that must not count toward ratings. */
export function isExternalSource(source?: ReviewSource): boolean {
  return source === "google" || source === "tourradar";
}

/**
 * Airbnb-style per-category ratings. Travelers optionally rate these in addition
 * to the overall star; tours surface per-category averages. External (federated)
 * reviews never carry them, so the category panel is gated on their presence.
 */
export const REVIEW_CATEGORIES = [
  { key: "guide", label: "Tour Guide" },
  { key: "experience", label: "Experience" },
  { key: "value", label: "Value" },
  { key: "food", label: "Food" },
  { key: "accommodation", label: "Accommodation" },
] as const;

export type CategoryKey = (typeof REVIEW_CATEGORIES)[number]["key"];
/** 1–5 per rated category; partial because each category is optional. */
export type CategoryRatings = Partial<Record<CategoryKey, number>>;
/** Per-category average across a tour's reviews (only categories with data). */
export interface CategoryAggregate {
  key: CategoryKey;
  label: string;
  average: number; // rounded to one decimal
  count: number;
}

/** A traveler-uploaded review video (played inline; `poster` is a still frame). */
export interface ReviewVideo {
  src: string; // mp4 URL
  poster?: string; // still-frame image URL shown before playback
}

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
  categoryRatings?: CategoryRatings; // optional per-category stars (first-party only)
  title?: string; // optional headline
  bodyMarkdown: string; // WYSIWYG output (markdown source)

  reviewerFirstName: string;
  reviewerLastName?: string; // usually withheld publicly
  reviewerLocation?: string;
  reviewerCountryEmoji?: string; // nationality flag (e.g. from TourRadar countryEmoji)
  reviewerAvatar?: string; // uploaded photo URL; empty → initial-avatar fallback
  photos?: string[]; // uploaded trip-photo URLs
  videos?: ReviewVideo[]; // uploaded trip videos (e.g. TourRadar "moments")

  status: ReviewStatus;
  source: ReviewSource;
  verified: boolean; // matched a confirmed booking for this tour

  bookingId?: string; // PRIVATE — never exposed
  bookingCode?: string; // PRIVATE — never exposed

  // External-source provenance (present when source === "google"). Federated
  // reviews arrive with no tour association: tourId/tourSlug/tourName stay ""
  // until an admin assigns a tour (or marks the review hub-only).
  externalId?: string; // dedup key = external review id / content hash
  externalSource?: "google" | "tourradar"; // provider discriminator
  externalUpdatedAt?: number; // epoch ms, Google updateTime — detects edits on re-sync
  externalReply?: string; // owner reply (reviewReply.comment), display-only
  reviewerFullName?: string; // Google displayName as-received (before first-name split)
  assigned?: boolean; // admin has triaged (assigned a tour OR marked hub-only)
  deletedOnGoogleAt?: number; // epoch ms — flagged when absent from a later sync

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
  categoryRatings?: CategoryRatings;
  title?: string;
  bodyMarkdown: string;
  reviewerFirstName: string;
  reviewerLocation?: string;
  reviewerCountryEmoji?: string; // nationality flag, when known
  reviewerAvatar?: string;
  photos?: string[];
  videos?: ReviewVideo[];
  verified: boolean;
  createdAt: number;
  displayDate?: string;
  source?: ReviewSource; // lets the card badge external reviews (e.g. "via Google")
  externalReply?: string; // owner reply, shown as "Response from the owner"
}

/** Aggregate rating for a tour (drives the star summary + AggregateRating JSON-LD). */
export interface ReviewAggregate {
  average: number; // rounded to one decimal, e.g. 4.9
  count: number;
}
