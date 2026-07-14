/**
 * Booking-status categorization for the review-eligibility flow.
 *
 * The stored `bookingStatus` on a booking is free-text produced by the payment
 * flow (e.g. "Booking Confirmed — Oct 2, 2025", "Installment 2/4 — last paid …",
 * "Waiting for Full Payment", "Cancelled"). It is *never* the bare word
 * "Confirmed"/"Completed", so an exact-string check rejects every real booking.
 * This helper collapses those strings into the coarse category used for
 * eligibility.
 *
 * MIRROR: keep byte-identical with the `bookingStatusCategory` in
 * admin/client/src/services/reviews-service.ts — the two apps are separate and
 * share no code (see that file's header at ~line 257). The check order matters:
 * "confirmed" wins first, and a partially-paid "Installment n/m" maps to Pending
 * (not eligible) even though it contains no "cancelled".
 */
export function bookingStatusCategory(
  status: unknown,
): "Confirmed" | "Pending" | "Cancelled" | "Completed" {
  const s = typeof status === "string" ? status.toLowerCase() : "";
  if (!s) return "Pending";
  if (s.includes("confirmed")) return "Confirmed";
  if (s.includes("cancelled")) return "Cancelled";
  if (s.includes("installment")) return "Pending";
  if (s.includes("completed")) return "Completed";
  return "Pending";
}

/** A booking is eligible to leave a review only when confirmed or completed. */
export function isEligibleBookingStatus(status: unknown): boolean {
  const cat = bookingStatusCategory(status);
  return cat === "Confirmed" || cat === "Completed";
}