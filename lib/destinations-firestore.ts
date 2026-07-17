/**
 * Firestore-backed destinations registry.
 *
 * Exposes the same public API as the static `data/destinations.ts`
 * (getAllDestinations / getDestinationBySlug / getAllDestinationSlugs /
 * getTourDestination) but reads from the `destinations` collection authored in
 * the admin. Functions are async and wrapped in React `cache()` so a single
 * Firestore read serves the whole build/request; pages control refresh cadence
 * with their own ISR `revalidate`.
 *
 * Requires `FIREBASE_SERVICE_ACCOUNT` (see lib/firebase-admin.ts). Server-only.
 */

import { cache } from "react";
import { adminDb } from "@/lib/firebase-admin";
import type {
  Destination,
  DestinationQuickFact,
  DestinationHighlight,
  DestinationFaq,
} from "@/data/destinations";

const COLLECTION = "destinations";

type RawDoc = Record<string, any>;

function toDestination(raw: RawDoc): Destination {
  const description: string[] = Array.isArray(raw.description)
    ? raw.description.filter((p: any) => typeof p === "string")
    : [];

  const quickFacts: DestinationQuickFact[] | undefined =
    Array.isArray(raw.quickFacts) && raw.quickFacts.length > 0
      ? raw.quickFacts
      : undefined;

  // Empty highlights must be undefined (not []), so the page falls back to
  // highlights derived from the linked tours' tripHighlights.
  const highlights: DestinationHighlight[] | undefined =
    Array.isArray(raw.highlights) && raw.highlights.length > 0
      ? raw.highlights
      : undefined;

  const faqs: DestinationFaq[] | undefined =
    Array.isArray(raw.faqs) && raw.faqs.length > 0 ? raw.faqs : undefined;

  // Only expose the community section when it has images, otherwise the page
  // would render an empty grid.
  const communityImages = Array.isArray(raw.community?.images)
    ? raw.community.images.filter((img: any) => img?.src)
    : [];
  const community =
    communityImages.length > 0
      ? {
          heading: raw.community?.heading || "With @Imheretravels",
          images: communityImages,
        }
      : undefined;

  return {
    slug: raw.slug ?? "",
    name: raw.name ?? "",
    region: raw.region ?? "",
    meta: {
      title: raw.seo?.title || `${raw.name ?? "Destination"} — I'm Here Travels`,
      description: raw.seo?.description || description[0] || "",
    },
    heroImage: raw.heroImage ?? "",
    heroImageAlt: raw.heroImageAlt ?? "",
    description,
    tourSlugs: Array.isArray(raw.tourSlugs) ? raw.tourSlugs : [],
    hiddenReviewIds: Array.isArray(raw.hiddenReviewIds) ? raw.hiddenReviewIds : [],
    featuredReviewIds: Array.isArray(raw.featuredReviewIds) ? raw.featuredReviewIds : [],
    quickFacts,
    highlights,
    faqs,
    community,
  };
}

const fetchAllActiveDestinations = cache(async (): Promise<Destination[]> => {
  const snap = await adminDb
    .collection(COLLECTION)
    .where("status", "==", "active")
    .get();
  return snap.docs
    .map((d) => {
      const data = d.data();
      return {
        // Preserve the authored order; unordered docs fall to the end by name.
        order: typeof data.order === "number" ? data.order : Number.MAX_SAFE_INTEGER,
        destination: toDestination({ id: d.id, ...data }),
      };
    })
    .sort(
      (a, b) =>
        a.order - b.order || a.destination.name.localeCompare(b.destination.name),
    )
    .map((x) => x.destination);
});

export async function getAllDestinations(): Promise<Destination[]> {
  return fetchAllActiveDestinations();
}

export async function getDestinationBySlug(
  slug: string,
): Promise<Destination | undefined> {
  const destinations = await fetchAllActiveDestinations();
  return destinations.find((d) => d.slug === slug);
}

export async function getAllDestinationSlugs(): Promise<string[]> {
  const destinations = await fetchAllActiveDestinations();
  return destinations.map((d) => d.slug);
}

export async function getTourDestination(
  tourSlug: string,
): Promise<Destination | undefined> {
  const destinations = await fetchAllActiveDestinations();
  return destinations.find((d) => d.tourSlugs.includes(tourSlug));
}
