import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import Markdown from "@/app/components/global/Markdown";
import Stars from "@/app/components/reviews/Stars";
import ReviewPhotos from "@/app/components/reviews/ReviewPhotos";
import type { PublicReview } from "@/types/review";

function formatDate(review: PublicReview): string {
  if (review.displayDate) return review.displayDate;
  if (!review.createdAt) return "";
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(review.createdAt));
}

/**
 * A single review card. Used on the tour page testimonials grid and the
 * community hub. Set `showTour` to surface which tour the review is for (hub).
 */
export default function ReviewCard({
  review,
  showTour = false,
}: {
  review: PublicReview;
  showTour?: boolean;
}) {
  const date = formatDate(review);
  return (
    <li className="flex flex-col gap-5 rounded-lg bg-white p-8 shadow-small md:p-10">
      <div className="flex items-center justify-between">
        <Stars count={review.rating} />
        {date && <span className="font-body text-b4-desktop text-grey">{date}</span>}
      </div>

      {review.title && (
        <p className="-mb-2 font-sans text-h6-desktop font-bold text-midnight">
          {review.title}
        </p>
      )}

      <Markdown>{review.bodyMarkdown}</Markdown>

      {review.photos && review.photos.length > 0 && (
        <ReviewPhotos photos={review.photos} authorAlt={review.reviewerFirstName} />
      )}

      {showTour && review.tourName && (
        <Link
          href={`/tours/${review.tourSlug}`}
          className="font-body text-b4-desktop text-crimson-red underline"
        >
          {review.tourName}
        </Link>
      )}

      <div className="mt-auto flex items-center gap-4 pt-2">
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
          {review.reviewerLocation && (
            <p className="font-body text-b4-desktop text-vivid-orange">
              {review.reviewerLocation}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
