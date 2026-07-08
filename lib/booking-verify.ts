/**
 * Server-side booking verification for the review flow.
 *
 * A traveler may submit a review only if they hold an eligible booking (status
 * "Confirmed" or "Completed") for the tour they're reviewing. They identify
 * themselves with the email address on their booking.
 *
 * This module is server-only — it reads the `bookings` collection via the
 * firebase-admin singleton (which bypasses security rules), so it must never be
 * imported by a client component.
 */

import { adminDb } from "@/lib/firebase-admin";

// Past + upcoming travelers may both review; pending/cancelled may not.
const ELIGIBLE_STATUSES = new Set(["Confirmed", "Completed"]);

export interface VerifiedBooking {
  bookingId: string;
  bookingCode: string;
  firstName: string;
  nationality?: string;
  tourPackageName: string;
}

type RawBooking = Record<string, any>;

function normalize(s: unknown): string {
  return String(s ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Does a booking's tour match the tour being reviewed? Lenient on naming. */
export function bookingMatchesTour(
  booking: RawBooking,
  tour: { name?: string; code?: string },
): boolean {
  const bName = normalize(booking.tourPackageName);
  const tName = normalize(tour.name);
  if (bName && tName && (bName === tName || bName.includes(tName) || tName.includes(bName))) {
    return true;
  }
  if (tour.code && booking.tourCode && normalize(booking.tourCode) === normalize(tour.code)) {
    return true;
  }
  return false;
}

function firstNameOf(b: RawBooking): string {
  if (b.firstName) return String(b.firstName).trim();
  if (b.fullName) return String(b.fullName).trim().split(/\s+/)[0] ?? "";
  return "";
}

/** Collect candidate bookings matching an email address. */
async function findCandidateBookings(identifier: string): Promise<RawBooking[]> {
  const id = identifier.trim();
  if (!id || !id.includes("@")) return [];

  const col = adminDb.collection("bookings");
  const candidates: RawBooking[] = [];
  const seen = new Set<string>();

  const push = (docs: FirebaseFirestore.QueryDocumentSnapshot[]) => {
    for (const d of docs) {
      if (seen.has(d.id)) continue;
      seen.add(d.id);
      candidates.push({ id: d.id, ...d.data() });
    }
  };

  // Try exact and lowercased (stored casing is not guaranteed).
  const variants = Array.from(new Set([id, id.toLowerCase()]));
  for (const v of variants) {
    const snap = await col.where("emailAddress", "==", v).limit(10).get();
    push(snap.docs);
  }

  return candidates;
}

export type VerifyResult =
  | { ok: true; booking: VerifiedBooking }
  | { ok: false; reason: "not_found" | "not_confirmed" | "wrong_tour" };

/**
 * Verify that `identifier` maps to an eligible booking for the given tour.
 * Returns the minimal booking info needed to prefill + stamp the review.
 */
export async function verifyBookingForTour(params: {
  identifier: string;
  tour: { name?: string; code?: string };
}): Promise<VerifyResult> {
  const candidates = await findCandidateBookings(params.identifier);
  if (candidates.length === 0) return { ok: false, reason: "not_found" };

  const eligible = candidates.filter((b) => ELIGIBLE_STATUSES.has(b.bookingStatus));
  if (eligible.length === 0) return { ok: false, reason: "not_confirmed" };

  const match = eligible.find((b) => bookingMatchesTour(b, params.tour));
  if (!match) return { ok: false, reason: "wrong_tour" };

  return {
    ok: true,
    booking: {
      bookingId: String(match.bookingId ?? match.id ?? ""),
      bookingCode: String(match.bookingCode ?? ""),
      firstName: firstNameOf(match),
      nationality: match.nationality ? String(match.nationality).trim() || undefined : undefined,
      tourPackageName: String(match.tourPackageName ?? ""),
    },
  };
}
