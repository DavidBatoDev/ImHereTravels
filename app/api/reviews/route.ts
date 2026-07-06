import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getTourIdentityBySlug } from "@/lib/tour-identity";
import { verifyBookingForTour } from "@/lib/booking-verify";
import {
  createReview,
  hasReviewForBooking,
} from "@/lib/reviews-firestore";
import { MAX_PHOTOS_PER_REVIEW } from "@/lib/review-upload";

export const runtime = "nodejs";

const MAX_BODY_CHARS = 5000;
const MAX_TITLE_CHARS = 120;
const MAX_NAME_CHARS = 60;
const MAX_LOCATION_CHARS = 80;

// Only accept image URLs we minted ourselves (from /api/reviews/upload).
const ALLOWED_IMAGE_HOST = "firebasestorage.googleapis.com";

type Body = {
  identifier?: string;
  tourSlug?: string;
  rating?: number;
  title?: string;
  bodyMarkdown?: string;
  reviewerFirstName?: string;
  reviewerLocation?: string;
  reviewerAvatar?: string;
  photos?: string[];
  website?: string; // honeypot — real users leave this empty
};

function isOwnImageUrl(url: unknown): url is string {
  if (typeof url !== "string" || !url) return false;
  try {
    return new URL(url).hostname === ALLOWED_IMAGE_HOST;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bots without writing anything.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const identifier = body.identifier?.trim() ?? "";
  const tourSlug = body.tourSlug?.trim() ?? "";
  const rating = Number(body.rating);
  const bodyMarkdown = (body.bodyMarkdown ?? "").trim();
  const reviewerFirstName = (body.reviewerFirstName ?? "").trim().slice(0, MAX_NAME_CHARS);

  if (!identifier || !tourSlug) {
    return NextResponse.json(
      { ok: false, error: "Please verify your booking first." },
      { status: 400 },
    );
  }
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ ok: false, error: "Please choose a star rating." }, { status: 400 });
  }
  if (bodyMarkdown.length < 4) {
    return NextResponse.json({ ok: false, error: "Please write a short review." }, { status: 400 });
  }
  if (bodyMarkdown.length > MAX_BODY_CHARS) {
    return NextResponse.json({ ok: false, error: "Your review is too long." }, { status: 400 });
  }
  if (!reviewerFirstName) {
    return NextResponse.json({ ok: false, error: "Please enter your first name." }, { status: 400 });
  }

  const tour = await getTourIdentityBySlug(tourSlug);
  if (!tour) {
    return NextResponse.json({ ok: false, error: "Unknown tour." }, { status: 404 });
  }

  // Re-verify the booking server-side — never trust the client's earlier check.
  const verification = await verifyBookingForTour({
    identifier,
    tour: { name: tour.name, code: tour.code },
  });
  if (!verification.ok) {
    return NextResponse.json(
      { ok: false, error: "We couldn't verify your booking for this tour." },
      { status: 403 },
    );
  }

  // One review per booking per tour.
  if (await hasReviewForBooking(verification.booking.bookingId, tour.id)) {
    return NextResponse.json(
      { ok: false, error: "You've already reviewed this tour. Thank you!" },
      { status: 409 },
    );
  }

  const photos = Array.isArray(body.photos)
    ? body.photos.filter(isOwnImageUrl).slice(0, MAX_PHOTOS_PER_REVIEW)
    : [];
  const reviewerAvatar = isOwnImageUrl(body.reviewerAvatar) ? body.reviewerAvatar : undefined;

  try {
    const id = await createReview({
      tourId: tour.id,
      tourSlug: tour.slug,
      tourName: tour.name,
      rating: Math.round(rating),
      title: body.title?.trim().slice(0, MAX_TITLE_CHARS) || undefined,
      bodyMarkdown,
      reviewerFirstName,
      reviewerLocation: body.reviewerLocation?.trim().slice(0, MAX_LOCATION_CHARS) || undefined,
      reviewerAvatar,
      photos,
      bookingId: verification.booking.bookingId,
      bookingCode: verification.booking.bookingCode || undefined,
    });

    // Refresh the tour page + community hub so the review appears immediately.
    revalidatePath(`/tours/${tour.slug}`);
    revalidatePath("/reviews");

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("Review submission failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
