/**
 * Minimal tour identity lookup for the review flow.
 *
 * The public `Tour` type doesn't carry the Firestore doc id, but reviews need it
 * as the association key (`tourId`). This resolves slug → { id, name, code }
 * straight from `tourPackages`. Server-only.
 */

import { adminDb } from "@/lib/firebase-admin";

export interface TourIdentity {
  id: string;
  slug: string;
  name: string;
  code?: string;
}

/** The `tourPackages` fields the review flow reads. */
type TourPackageDoc = {
  slug?: string;
  name?: string;
  title?: string;
  tourCode?: string;
  code?: string;
};

export async function getTourIdentityBySlug(
  slug: string,
): Promise<TourIdentity | null> {
  if (!slug) return null;
  const snap = await adminDb
    .collection("tourPackages")
    .where("slug", "==", slug)
    .limit(1)
    .get();
  if (snap.empty) return null;

  const d = snap.docs[0];
  const data = d.data() as TourPackageDoc;
  return {
    id: d.id,
    slug: data.slug ?? slug,
    name: data.name ?? data.title ?? "",
    code: data.tourCode ?? data.code ?? undefined,
  };
}

/**
 * All reviewable tours as { id, slug, name, code }. Used to map a traveler's
 * bookings (matched leniently by name/code) to the tours they can review. Only
 * docs that actually carry a slug are returned (a slug is required to submit).
 */
export async function getAllTourIdentities(): Promise<TourIdentity[]> {
  const snap = await adminDb.collection("tourPackages").get();
  const out: TourIdentity[] = [];
  for (const d of snap.docs) {
    const data = d.data() as TourPackageDoc;
    const slug = data.slug ?? "";
    if (!slug) continue;
    out.push({
      id: d.id,
      slug,
      name: data.name ?? data.title ?? "",
      code: data.tourCode ?? data.code ?? undefined,
    });
  }
  return out;
}
