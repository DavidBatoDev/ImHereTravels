import { NextResponse } from "next/server";
import {
  findReviewableToursForIdentifier,
  type ReviewableTour,
} from "@/lib/booking-verify";

export const runtime = "nodejs";

/**
 * POST /api/reviews/my-tours — given only a booking email (no tour context),
 * return every tour that email can review or is booked on. Used by the reviews
 * hub, where there's no specific tour to verify against: the traveler enters
 * their email and picks which of their tours to review.
 *
 * Body: { identifier: string (booking email address) }
 * Returns: { ok: true, tours: ReviewableTour[] }
 *
 * `tours` is empty when the email has no eligible, unreviewed bookings. Each
 * tour carries a `started` flag — started ones are reviewable now, upcoming
 * ones are surfaced but not yet actionable.
 */

type Body = { identifier?: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const identifier = body.identifier?.trim() ?? "";
  if (!identifier) {
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

  const tours: ReviewableTour[] = await findReviewableToursForIdentifier(identifier);
  return NextResponse.json({ ok: true, tours });
}
