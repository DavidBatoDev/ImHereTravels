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
  const data = d.data() as Record<string, any>;
  return {
    id: d.id,
    slug: data.slug ?? slug,
    name: data.name ?? data.title ?? "",
    code: data.tourCode ?? data.code ?? undefined,
  };
}
