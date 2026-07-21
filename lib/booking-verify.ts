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
import { isEligibleBookingStatus } from "@/lib/booking-status";
import { getAllTourIdentities } from "@/lib/tour-identity";
import { hasReviewForBooking } from "@/lib/reviews-firestore";
import { bookingMatchesTour, type TourMatchTarget } from "@/lib/booking-tour-match";

// Re-exported so existing importers of this module keep working.
export { bookingMatchesTour } from "@/lib/booking-tour-match";

export interface VerifiedBooking {
  bookingId: string;
  bookingCode: string;
  firstName: string;
  nationality?: string;
  tourPackageName: string;
}

type RawBooking = Record<string, any>;

/**
 * Coerce the various date shapes a booking may store into a Date.
 * `tourDate` is a Firestore Timestamp; `returnDate` is a "YYYY-MM-DD" string
 * (and can be empty). Returns null when the value is missing/unparseable so the
 * caller can fail-open. (Mirrors the tolerant toDate in
 * admin/client/src/lib/create-bookings-from-payment.ts.)
 */
function toDate(v: unknown): Date | null {
  if (!v) return null;
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
  if (typeof v === "object" && typeof (v as any).toDate === "function") {
    try {
      const d = (v as any).toDate();
      return d instanceof Date && !isNaN(d.getTime()) ? d : null;
    } catch {
      return null;
    }
  }
  if (typeof v === "object" && typeof (v as any)._seconds === "number") {
    return new Date((v as any)._seconds * 1000);
  }
  if (typeof v === "number") return new Date(v);
  if (typeof v === "string") {
    const t = v.trim();
    if (!t) return null;
    const d = new Date(t);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

/**
 * Has the trip started (or finished)? A review is only allowed once the tour is
 * ongoing or done, i.e. `now >= tourDate`. Fail-open (returns true) when the
 * booking has no parseable `tourDate`, so a data gap never blocks a legitimate
 * reviewer.
 */
export function tourHasStarted(booking: RawBooking): boolean {
  const start = toDate(booking.tourDate);
  if (!start) return true;
  return Date.now() >= start.getTime();
}

/** Parse a leading day-count out of a duration string ("12 days", "11 Days and 10 Nights"). */
function durationDays(booking: RawBooking): number | null {
  const d = booking.tourDuration;
  if (typeof d !== "string") return null;
  const m = d.match(/(\d+)\s*day/i) ?? d.match(/\d+/);
  return m ? parseInt(m[0].match(/\d+/)![0], 10) : null;
}

/**
 * When the trip ends. Prefer an explicit `returnDate`; otherwise derive it from
 * the start date plus the parsed duration in days. Null when unknowable.
 */
function tourEndDate(booking: RawBooking, start: Date): Date | null {
  const ret = toDate(booking.returnDate);
  if (ret) return ret;
  const days = durationDays(booking);
  if (days == null) return null;
  const end = new Date(start.getTime());
  end.setDate(end.getDate() + days);
  return end;
}

/**
 * The tour's lifecycle phase relative to now, used for the picker badge:
 * "Upcoming" (not started), "Ongoing" (started, not yet ended), or "Completed"
 * (start + duration elapsed). Undefined when there's no start date to reason
 * about. A started tour with an unknown end is treated as Completed — reviews
 * arrive after travel, and it avoids labeling a long-past trip "Ongoing".
 */
export function tourPhase(
  booking: RawBooking,
): "Upcoming" | "Ongoing" | "Completed" | undefined {
  const start = toDate(booking.tourDate);
  if (!start) return undefined;
  const now = Date.now();
  if (now < start.getTime()) return "Upcoming";
  const end = tourEndDate(booking, start);
  if (!end) return "Completed";
  return now >= end.getTime() ? "Completed" : "Ongoing";
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
  | { ok: false; reason: "not_found" | "not_confirmed" | "wrong_tour" | "not_started" };

/**
 * Verify that `identifier` maps to an eligible booking for the given tour.
 * Returns the minimal booking info needed to prefill + stamp the review.
 *
 * Eligibility, in order: a booking exists for the email → its status is
 * Confirmed/Completed → it is for this tour → the trip has started (or the date
 * is unknown) → it has a stable booking id (dedup depends on it).
 */
export async function verifyBookingForTour(params: {
  identifier: string;
  /** Pass `id` wherever it's known — it's the only key that survives a rename. */
  tour: TourMatchTarget;
}): Promise<VerifyResult> {
  const candidates = await findCandidateBookings(params.identifier);
  if (candidates.length === 0) return { ok: false, reason: "not_found" };

  const eligible = candidates.filter((b) => isEligibleBookingStatus(b.bookingStatus));
  if (eligible.length === 0) return { ok: false, reason: "not_confirmed" };

  const tourMatches = eligible.filter((b) => bookingMatchesTour(b, params.tour));
  if (tourMatches.length === 0) return { ok: false, reason: "wrong_tour" };

  // F2: only allow a review once the trip is ongoing or done. Fail-open when
  // the date is unknown, so a data gap never blocks a legitimate reviewer.
  const started = tourMatches.filter((b) => tourHasStarted(b));
  if (started.length === 0) return { ok: false, reason: "not_started" };
  const match = started[0];

  // F5: dedup keys on the booking id — refuse if we can't resolve a stable one.
  const bookingId = String(match.bookingId ?? match.id ?? "");
  if (!bookingId) return { ok: false, reason: "not_found" };

  return {
    ok: true,
    booking: {
      bookingId,
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
  /**
   * Whether the trip has started (or finished). Only started tours can be
   * reviewed now; upcoming ones are shown but not yet actionable.
   */
  started: boolean;
  /** Booking details, so the traveler can recognize the right trip. */
  reservationDate?: string;
  tourDate?: string;
  tourDuration?: string;
  status?: string;
}

function fmtDate(d: Date | null): string | undefined {
  if (!d) return undefined;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

/**
 * Every tour this identifier has booked with an eligible (Confirmed/Completed)
 * status that resolves to a known package and hasn't already been reviewed —
 * whether or not the trip has started. Each carries a `started` flag: started
 * tours can be reviewed now, upcoming ones are surfaced but not yet actionable.
 *
 * Used to offer a traveler who landed on the wrong tour page the list of tours
 * they actually booked, so they can jump straight to the right one (and see
 * which upcoming trips they'll be able to review later).
 *
 * Sorted started-first, so anything the traveler can act on now appears at top.
 */
export async function findReviewableToursForIdentifier(
  identifier: string,
): Promise<ReviewableTour[]> {
  const candidates = await findCandidateBookings(identifier);
  const eligible = candidates.filter((b) => isEligibleBookingStatus(b.bookingStatus));
  if (eligible.length === 0) return [];

  const allTours = await getAllTourIdentities();
  const out: ReviewableTour[] = [];
  const seen = new Set<string>();
  for (const b of eligible) {
    const tour = allTours.find((t) =>
      bookingMatchesTour(b, { id: t.id, name: t.name, code: t.code }),
    );
    if (!tour || seen.has(tour.slug)) continue;
    const bookingId = String(b.bookingId ?? b.id ?? "");
    if (!bookingId) continue;
    if (await hasReviewForBooking(bookingId, tour.id)) continue; // already reviewed
    seen.add(tour.slug);
    out.push({
      slug: tour.slug,
      name: tour.name,
      started: tourHasStarted(b),
      reservationDate: fmtDate(toDate(b.reservationDate)),
      // Prefer a cleanly-formatted date from the Timestamp; fall back to the raw
      // pre-formatted string only if the Timestamp won't parse.
      tourDate:
        fmtDate(toDate(b.tourDate)) ||
        (typeof b.formattedDate === "string" ? b.formattedDate : undefined),
      tourDuration: typeof b.tourDuration === "string" ? b.tourDuration : undefined,
      status: tourPhase(b),
    });
  }
  // Reviewable-now first; preserve booking order within each group.
  out.sort((a, b) => Number(b.started) - Number(a.started));
  return out;
}
