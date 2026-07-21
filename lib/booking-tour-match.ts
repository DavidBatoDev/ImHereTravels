/**
 * Does a booking belong to a given tour?
 *
 * Split out from `booking-verify.ts` because that module initialises the
 * firebase-admin singleton at import time; this predicate is pure, so keeping it
 * separate lets it be exercised without credentials.
 */

export interface TourMatchTarget {
  /** tourPackages document id — the only key that never drifts. */
  id?: string;
  name?: string;
  code?: string;
}

/** The booking fields this predicate reads. Values are coerced, not trusted. */
export interface BookingMatchFields {
  tourId?: unknown;
  tourCode?: unknown;
  tourPackageName?: unknown;
}

export function normalize(s: unknown): string {
  return String(s ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Match order: document id (authoritative), else tour code, else normalized name.
 *
 * `tourCode` and `tourPackageName` are snapshots taken when the booking was
 * made, and both drift: renaming a tour or restandardising its code severs the
 * link to every historical booking. That happened in prod — standardising the
 * hosted codes (IHF → IHF-D, TXPDE → TXP-DE) left 45 travellers unable to
 * review a trip they had taken, because neither their stored code nor their
 * stored name matched any more.
 *
 * When both sides carry an id the comparison is DECISIVE — a mismatch returns
 * false rather than falling through. This gates review submission, so a booking
 * for tour A must never verify against tour B just because A's stale code
 * happens to collide with B's current one.
 *
 * Code and name remain the fallback for bookings written before `tourId` was
 * backfilled (and for environments where the backfill hasn't been run).
 */
export function bookingMatchesTour(
  booking: BookingMatchFields,
  tour: TourMatchTarget,
): boolean {
  const bId = String(booking.tourId ?? "").trim();
  const tId = String(tour.id ?? "").trim();
  if (bId && tId) return bId === tId;

  // "xxx" is the placeholder written when a tour package has no code; treat it
  // as a non-match so two code-less tours can't cross-match.
  const bCode = normalize(booking.tourCode);
  const tCode = normalize(tour.code);
  if (bCode && tCode && bCode !== "xxx" && tCode !== "xxx" && bCode === tCode) {
    return true;
  }

  const bName = normalize(booking.tourPackageName);
  const tName = normalize(tour.name);
  if (bName && tName && bName === tName) return true;

  return false;
}
