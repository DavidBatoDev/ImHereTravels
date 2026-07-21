import { NextResponse } from "next/server";
import { getTourIdentityBySlug } from "@/lib/tour-identity";
import {
  verifyBookingForTour,
  findReviewableToursForIdentifier,
  type ReviewableTour,
} from "@/lib/booking-verify";

export const runtime = "nodejs";

/**
 * POST /api/reviews/verify — check that a traveler holds an eligible booking
 * (Confirmed/Completed) for a tour before showing the review form.
 *
 * Body: { identifier: string (booking email address), tourSlug: string }
 * Returns: { ok: true, firstName, nationality? } | { ok: false, error }
 *
 * Only prefill data is returned here. The booking is re-verified server-side
 * at submit time, so nothing here is trusted for the actual write.
 */

type Body = { identifier?: string; tourSlug?: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REASONS: Record<string, string> = {
  not_found:
    "We couldn't find a booking with that email address. Double-check it and try again.",
  not_confirmed:
    "That booking isn't confirmed yet. Only confirmed or completed travelers can leave a review.",
  wrong_tour:
    "That booking is for a different tour. You can only review a tour you've booked.",
  not_started:
    "You can leave a review once your trip has started. Come back when you're travelling with us.",
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const identifier = body.identifier?.trim() ?? "";
  const tourSlug = body.tourSlug?.trim() ?? "";
  if (!identifier || !tourSlug) {
    return NextResponse.json(
      { ok: false, error: "Please enter your booking email address." },
      { status: 400 },
    );
  }
  if (!EMAIL_REGEX.test(identifier)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const tour = await getTourIdentityBySlug(tourSlug);
  if (!tour) {
    return NextResponse.json({ ok: false, error: "Unknown tour." }, { status: 404 });
  }

  const result = await verifyBookingForTour({
    identifier,
    tour: { id: tour.id, name: tour.name, code: tour.code },
  });

  if (!result.ok) {
    // Dead-end avoidance: when the traveler can't review *this* tour — either
    // because they didn't book it (wrong_tour) or it hasn't started yet
    // (not_started) — offer the other tours they can review (or have booked) so
    // they can jump straight to one instead of hitting a wall. Sorted
    // started-first, so anything reviewable now is at the top.
    let otherTours: ReviewableTour[] = [];
    if (result.reason === "wrong_tour" || result.reason === "not_started") {
      otherTours = (await findReviewableToursForIdentifier(identifier)).filter(
        (t) => t.slug !== tourSlug,
      );
    }
    return NextResponse.json(
      {
        ok: false,
        reason: result.reason,
        error: REASONS[result.reason] ?? "Verification failed.",
        otherTours,
      },
      { status: 403 },
    );
  }

  return NextResponse.json({
    ok: true,
    firstName: result.booking.firstName,
    nationality: result.booking.nationality,
  });
}
