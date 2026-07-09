import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import Markdown from "@/app/components/global/Markdown";
import ExpandableBody from "@/app/components/reviews/ExpandableBody";
import Stars from "@/app/components/reviews/Stars";
import ReviewPhotos from "@/app/components/reviews/ReviewPhotos";
import ReactCountryFlag from "react-country-flag";
import { getTourRadarReviewsUrl } from "@/lib/tourradar-links";
import { isoForLocation, isoFromFlagEmoji } from "@/lib/country-flags";
import type { PublicReview } from "@/types/review";

function formatDate(review: PublicReview): string {
  if (review.displayDate) return review.displayDate;
  if (!review.createdAt) return "";
  // "MMMM dd, yyyy" → e.g. "July 09, 2026".
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(review.createdAt));
}

/**
 * A single review card. Used on the tour page testimonials grid and the
 * community hub. Set `showTour` to surface which tour the review is for (hub).
 *
 * `variant="modal"` renders the same content unclamped (full body, no "Read
 * more") for the focus modal opened from the grid card.
 */
export default function ReviewCard({
  review,
  showTour = false,
  variant = "grid",
}: {
  review: PublicReview;
  showTour?: boolean;
  variant?: "grid" | "modal";
}) {
  const date = formatDate(review);
  const sourceLabel =
    review.source === "google"
      ? "via Google"
      : review.source === "tourradar"
        ? "via TourRadar"
        : null;
  const tourRadarUrl =
    review.source === "tourradar" ? getTourRadarReviewsUrl(review.tourSlug) : undefined;
  const isModal = variant === "modal";
  // Real SVG flag (emoji flags don't render on Windows). Prefer the source's flag
  // (TourRadar countryEmoji → ISO), else derive from the free-text location.
  const countryIso = review.reviewerCountryEmoji
    ? isoFromFlagEmoji(review.reviewerCountryEmoji)
    : isoForLocation(review.reviewerLocation);

  const sourceBadgeCls =
    "whitespace-nowrap rounded-full bg-light-grey px-2.5 py-1 font-body text-b4-desktop text-dark-gray";

  const header = (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <Stars count={review.rating} />
        {sourceLabel &&
          (tourRadarUrl ? (
            <a
              href={tourRadarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${sourceBadgeCls} transition-colors hover:bg-light-grey/70 hover:text-crimson-red`}
            >
              {sourceLabel}
            </a>
          ) : (
            <span className={sourceBadgeCls}>{sourceLabel}</span>
          ))}
      </div>
      {date && <span className="font-body text-b4-desktop text-grey">{date}</span>}
    </div>
  );

  const title = review.title && (
    <p className="-mb-2 font-sans text-h6-desktop font-bold text-midnight">{review.title}</p>
  );

  // In the focus modal, flash-highlight the (now fully visible) body text.
  const body = (
    <Markdown className={isModal ? "review-reveal-highlight" : undefined}>
      {review.bodyMarkdown}
    </Markdown>
  );

  const reply = review.externalReply && (
    <div className="rounded-md border-l-2 border-light-grey bg-light-grey/40 py-2 pl-4">
      <p className="font-body text-b4-desktop font-bold text-midnight">Response from the owner</p>
      <p className="mt-1 font-body text-b4-desktop text-dark-gray">{review.externalReply}</p>
    </div>
  );

  const photos = ((review.photos && review.photos.length > 0) ||
    (review.videos && review.videos.length > 0)) && (
    <ReviewPhotos
      photos={review.photos}
      videos={review.videos}
      authorAlt={review.reviewerFirstName}
      preview={!isModal}
    />
  );

  const tourLink = showTour && review.tourName && (
    <Link
      href={`/tours/${review.tourSlug}`}
      className="font-body text-b4-desktop text-crimson-red underline"
    >
      {review.tourName}
    </Link>
  );

  const reviewer = (
    <div className={`${isModal ? "" : "mt-auto"} flex items-center gap-4 pt-2`}>
      {review.reviewerAvatar ? (
        <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-light-grey">
          <ImageWithSkeleton
            src={review.reviewerAvatar}
            alt=""
            fill
            rounded="full"
            sizes="56px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-light-grey font-sans text-h6-desktop font-bold text-midnight">
          {review.reviewerFirstName.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 font-sans text-h6-desktop font-bold text-midnight">
          <span className="truncate">{review.reviewerFirstName}</span>
          {review.verified && (
            <span
              className="inline-flex items-center gap-0.5 text-spring-green"
              title="Verified traveler"
            >
              <BadgeCheck className="size-4" />
              <span className="font-body text-b4-desktop font-normal">Verified</span>
            </span>
          )}
        </p>
        {(countryIso || review.reviewerLocation) && (
          <p className="flex items-center gap-1.5 font-body text-b4-desktop text-vivid-orange">
            {countryIso && (
              <ReactCountryFlag
                countryCode={countryIso}
                svg
                title={review.reviewerLocation || countryIso}
                style={{ width: "1.1em", height: "1.1em", borderRadius: "2px" }}
                aria-hidden
              />
            )}
            {review.reviewerLocation && <span className="truncate">{review.reviewerLocation}</span>}
          </p>
        )}
      </div>
    </div>
  );

  // Modal variant: everything visible, body unclamped, no "Read more".
  if (isModal) {
    return (
      <div className="flex flex-col gap-5 rounded-lg bg-white p-8 md:p-10">
        {header}
        {title}
        {body}
        {reply}
        {photos}
        {tourLink}
        {reviewer}
      </div>
    );
  }

  return (
    <li className="flex flex-col gap-5 rounded-lg bg-white p-8 shadow-small transition-all duration-200 hover:-translate-y-0.5 hover:shadow-medium md:p-10">
      {header}
      {title}
      <ExpandableBody modal={<ReviewCard review={review} showTour={showTour} variant="modal" />}>
        {body}
      </ExpandableBody>
      {reply}
      {photos}
      {tourLink}
      {reviewer}
    </li>
  );
}
