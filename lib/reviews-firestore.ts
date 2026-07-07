/**
 * Firestore-backed tour review data layer (`tourReviews` collection).
 *
 * Reads (public site) return `PublicReview` — never the private booking
 * identifiers stored on the doc. Writes (submission route) go through
 * `createReview`, guarded by `hasReviewForBooking` for dedup.
 *
 * Query strategy: we use equality-only filters (no `orderBy`) and sort in
 * memory, so no Firestore composite indexes are required. Per-tour review
 * volume is low; the hub caps its scan. Reads are wrapped in React `cache()`
 * so one Firestore read serves the whole request/build.
 *
 * Server-only (imports firebase-admin). Never import from a client component.
 */

import { cache } from "react";
import { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { isExternalSource } from "@/types/review";
import type { PublicReview, ReviewAggregate } from "@/types/review";

const REVIEWS_COLLECTION = "tourReviews";
const HUB_SCAN_LIMIT = 500;

type RawDoc = Record<string, any>;

function toMillis(v: unknown): number {
  if (v && typeof (v as Timestamp).toMillis === "function") {
    return (v as Timestamp).toMillis();
  }
  return typeof v === "number" ? v : 0;
}

/** Project a raw Firestore review doc to the client-safe shape. */
function toPublicReview(id: string, raw: RawDoc): PublicReview {
  return {
    id,
    tourSlug: raw.tourSlug ?? "",
    tourName: raw.tourName ?? "",
    rating: typeof raw.rating === "number" ? raw.rating : Number(raw.rating) || 5,
    title: raw.title || undefined,
    bodyMarkdown: raw.bodyMarkdown ?? raw.body ?? "",
    reviewerFirstName: raw.reviewerFirstName ?? "",
    reviewerLocation: raw.reviewerLocation || undefined,
    reviewerAvatar: raw.reviewerAvatar || undefined,
    photos: Array.isArray(raw.photos) && raw.photos.length ? raw.photos : undefined,
    verified: raw.verified === true,
    createdAt: toMillis(raw.createdAt),
    displayDate: raw.displayDate || undefined,
    source: raw.source ?? "user",
    externalReply: raw.externalReply || undefined,
  };
}

/** Newest first: real timestamps sort by createdAt; migrated rows fall back to 0. */
function byNewest(a: PublicReview, b: PublicReview): number {
  return b.createdAt - a.createdAt;
}

/** Published reviews for one tour, newest first. */
export const getReviewsForTour = cache(
  async (tourSlug: string): Promise<PublicReview[]> => {
    if (!tourSlug) return [];
    const snap = await adminDb
      .collection(REVIEWS_COLLECTION)
      .where("tourSlug", "==", tourSlug)
      .where("status", "==", "published")
      .get();
    return snap.docs.map((d) => toPublicReview(d.id, d.data())).sort(byNewest);
  },
);

/**
 * Aggregate rating (avg + count) for a tour, from its published reviews.
 *
 * First-party only: federated (Google / TourRadar) reviews still render as cards
 * but are excluded from the "verified reviews" number and from the
 * AggregateRating JSON-LD (Google's structured-data policy forbids third-party
 * reviews in your own markup).
 */
export const getAggregateForTour = cache(
  async (tourSlug: string): Promise<ReviewAggregate> => {
    const reviews = (await getReviewsForTour(tourSlug)).filter(
      (r) => !isExternalSource(r.source),
    );
    if (reviews.length === 0) return { average: 0, count: 0 };
    const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return {
      average: Math.round((sum / reviews.length) * 10) / 10,
      count: reviews.length,
    };
  },
);

/** All published reviews across tours (community hub), newest first. */
export const getAllPublishedReviews = cache(
  async (): Promise<PublicReview[]> => {
    const snap = await adminDb
      .collection(REVIEWS_COLLECTION)
      .where("status", "==", "published")
      .limit(HUB_SCAN_LIMIT)
      .get();
    return snap.docs.map((d) => toPublicReview(d.id, d.data())).sort(byNewest);
  },
);

// ─── Writes (submission route) ───────────────────────────────────────────────

export interface CreateReviewInput {
  tourId: string;
  tourSlug: string;
  tourName: string;
  rating: number;
  title?: string;
  bodyMarkdown: string;
  reviewerFirstName: string;
  reviewerLocation?: string;
  reviewerAvatar?: string;
  photos?: string[];
  bookingId: string;
  bookingCode?: string;
}

/** Has this booking already reviewed this tour? (dedup guard) */
export async function hasReviewForBooking(
  bookingId: string,
  tourId: string,
): Promise<boolean> {
  if (!bookingId) return false;
  const snap = await adminDb
    .collection(REVIEWS_COLLECTION)
    .where("bookingId", "==", bookingId)
    .where("tourId", "==", tourId)
    .limit(1)
    .get();
  return !snap.empty;
}

/** Create a verified, published user review. Returns the new doc id. */
export async function createReview(input: CreateReviewInput): Promise<string> {
  const now = Timestamp.now();
  const doc: RawDoc = {
    tourId: input.tourId,
    tourSlug: input.tourSlug,
    tourName: input.tourName,
    rating: input.rating,
    bodyMarkdown: input.bodyMarkdown,
    reviewerFirstName: input.reviewerFirstName,
    status: "published",
    source: "user",
    verified: true,
    bookingId: input.bookingId,
    createdAt: now,
    updatedAt: now,
  };
  if (input.title) doc.title = input.title;
  if (input.reviewerLocation) doc.reviewerLocation = input.reviewerLocation;
  if (input.reviewerAvatar) doc.reviewerAvatar = input.reviewerAvatar;
  if (input.photos && input.photos.length) doc.photos = input.photos;
  if (input.bookingCode) doc.bookingCode = input.bookingCode;

  const ref = await adminDb.collection(REVIEWS_COLLECTION).add(doc);
  return ref.id;
}
