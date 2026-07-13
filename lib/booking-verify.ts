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

/**
 * Whether a booking status makes the traveler eligible to review. Real statuses
 * are free-text ("Booking Confirmed — <date>", "Installment 2/4 — last paid …",
 * "Cancelled", …), so we match by intent: a confirmed booking, or an installment
 * plan that has made at least one payment. Cancelled bookings and not-yet-paid
 * installment plans ("Installment 0/…") are excluded.
 */
export function isEligibleStatus(status: unknown): boolean {
  const s = String(status ?? "").trim().toLowerCase();
  if (!s || s.includes("cancel")) return false;
  if (s.startsWith("booking confirmed") || s === "confirmed" || s === "completed") {
    return true;
  }
  // Installment plans: eligible once a payment has been made (i.e. not "0/…").
  if (s.startsWith("installment")) return !/\b0\s*\//.test(s);
  return false;
}

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

  const eligible = candidates.filter((b) => isEligibleStatus(b.bookingStatus));
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

export interface ReviewableTour {
  slug: string;
  name: string;
}

export type ReviewableToursResult =
  | { ok: true; firstName: string; nationality?: string; tours: ReviewableTour[] }
  | { ok: false; reason: "not_found" | "not_confirmed" | "no_reviewable_tour" };

/**
 * Given a booking email, return the tours the traveler can review: their
 * eligible (Confirmed/Completed) bookings mapped to catalog tours by the same
 * lenient name/code match, deduped by slug. `firstName`/`nationality` come from
 * the first eligible booking (for form prefill). Nothing here is trusted for the
 * write — the submit route re-verifies the chosen tour with `verifyBookingForTour`.
 */
export async function findReviewableToursForEmail(
  identifier: string,
  catalog: { slug: string; name?: string; code?: string }[],
): Promise<ReviewableToursResult> {
  const candidates = await findCandidateBookings(identifier);
  if (candidates.length === 0) return { ok: false, reason: "not_found" };

  const eligible = candidates.filter((b) => isEligibleStatus(b.bookingStatus));
  if (eligible.length === 0) return { ok: false, reason: "not_confirmed" };

  const bySlug = new Map<string, ReviewableTour>();
  for (const booking of eligible) {
    const bCode = normalize(booking.tourCode);
    const bName = normalize(booking.tourPackageName);
    // Prefer the most precise match so one booking doesn't fan out to every
    // same-family variant: exact code → exact name → lenient contains.
    let matches = bCode ? catalog.filter((t) => t.code && normalize(t.code) === bCode) : [];
    if (matches.length === 0 && bName) {
      matches = catalog.filter((t) => normalize(t.name) === bName);
    }
    if (matches.length === 0) {
      matches = catalog.filter((t) => bookingMatchesTour(booking, { name: t.name, code: t.code }));
    }
    for (const t of matches) {
      if (t.slug && !bySlug.has(t.slug)) {
        bySlug.set(t.slug, { slug: t.slug, name: t.name ?? "" });
      }
    }
  }
  const tours = Array.from(bySlug.values());
  if (tours.length === 0) return { ok: false, reason: "no_reviewable_tour" };

  const first = eligible[0];
  return {
    ok: true,
    firstName: firstNameOf(first),
    nationality: first.nationality ? String(first.nationality).trim() || undefined : undefined,
    tours,
  };
}
