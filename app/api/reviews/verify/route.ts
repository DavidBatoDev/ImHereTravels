import { NextResponse } from "next/server";
import { getTourIdentityBySlug } from "@/lib/tour-identity";
import { verifyBookingForTour } from "@/lib/booking-verify";

export const runtime = "nodejs";

/**
 * POST /api/reviews/verify — check that a traveler holds an eligible booking
 * (Confirmed/Completed) for a tour before showing the review form.
 *
 * Body: { identifier: string (email or booking id/code), tourSlug: string }
 * Returns: { ok: true, firstName } | { ok: false, error }
 *
 * Only the first name is returned (for form prefill). The booking is re-verified
 * server-side at submit time, so nothing here is trusted for the actual write.
 */

type Body = { identifier?: string; tourSlug?: string };

const REASONS: Record<string, string> = {
  not_found:
    "We couldn't find a booking with those details. Check your booking email or ID and try again.",
  not_confirmed:
    "That booking isn't confirmed yet. Only confirmed or completed travelers can leave a review.",
  wrong_tour:
    "That booking is for a different tour. You can only review a tour you've booked.",
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
      { ok: false, error: "Please enter your booking email or ID." },
      { status: 400 },
    );
  }

  const tour = await getTourIdentityBySlug(tourSlug);
  if (!tour) {
    return NextResponse.json({ ok: false, error: "Unknown tour." }, { status: 404 });
  }

  const result = await verifyBookingForTour({
    identifier,
    tour: { name: tour.name, code: tour.code },
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: REASONS[result.reason] ?? "Verification failed." },
      { status: 403 },
    );
  }

  return NextResponse.json({ ok: true, firstName: result.booking.firstName });
}
