import { NextResponse } from "next/server";
import { getAllTourIdentities } from "@/lib/tour-identity";
import { findReviewableToursForEmail } from "@/lib/booking-verify";

export const runtime = "nodejs";

/**
 * POST /api/reviews/my-bookings — for the reviews-hub "Write a review" flow.
 *
 * Body: { identifier: string (booking email address) }
 * Returns: { ok: true, firstName, nationality?, tours: [{ slug, name }] }
 *        | { ok: false, error }
 *
 * Looks the traveler up by email and returns the tours they can review (eligible
 * bookings mapped to catalog tours). Only surfaces tour names/slugs; the review
 * submit route re-verifies the chosen tour, so nothing here is trusted for a write.
 */

type Body = { identifier?: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REASONS: Record<string, string> = {
  not_found:
    "We couldn't find a booking with that email address. Double-check it and try again.",
  not_confirmed:
    "That booking isn't confirmed yet. Only confirmed or completed travelers can leave a review.",
  no_reviewable_tour:
    "We couldn't match your booking to a tour that's open for reviews.",
};

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

  const catalog = await getAllTourIdentities();
  const result = await findReviewableToursForEmail(identifier, catalog);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: REASONS[result.reason] ?? "Verification failed." },
      { status: result.reason === "not_found" ? 404 : 403 },
    );
  }

  return NextResponse.json({
    ok: true,
    firstName: result.firstName,
    nationality: result.nationality,
    tours: result.tours,
  });
}
