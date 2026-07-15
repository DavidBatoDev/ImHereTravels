import Link from "next/link";
import ReviewCard from "@/app/components/reviews/ReviewCard";
import TourReviewsSection from "@/app/components/reviews/TourReviewsSection";
import RatingBreakdown from "@/app/components/reviews/RatingBreakdown";
import ReviewInsights from "@/app/components/reviews/ReviewInsights";
import CategoryRatings from "@/app/components/reviews/CategoryRatings";
import { buildKeywordChips, matchThemes } from "@/app/components/reviews/review-keywords";
import { reviewSearchText, type TourOption } from "@/app/components/reviews/reviews-filter";
import { computeCategoryAggregates } from "@/lib/reviews-firestore";
import type { PublicReview } from "@/types/review";

/**
 * The reviews section on a destination (country) page — same visual template
 * as a tour page's `Testimonials` section (summary card + interactive
 * filtered/sorted grid), spanning every tour in the destination rather than
 * one. Reviews carry `showTour` so a mixed grid still reads clearly, and a
 * tour chip filter (rendered by `TourReviewsSection` when `tours.length > 1`)
 * lets a visitor narrow to the specific tour they're weighing.
 *
 * Deliberately no "Write a review" CTA here (unlike the tour page) — a
 * destination isn't itself bookable. The right column instead points at the
 * tours grid already on this page, since the goal is converting a browsing
 * visitor into a specific tour booking, not collecting reviews.
 */
export default function DestinationReviewsSection({
  reviews,
  tours,
  destinationName,
  destinationSlug,
}: {
  reviews: PublicReview[];
  tours: TourOption[];
  destinationName: string;
  destinationSlug: string;
}) {
  if (reviews.length === 0) return null;

  const chips = buildKeywordChips(reviews);
  const keywordItems = reviews.map((review) => ({
    id: review.id,
    themeKeys: matchThemes(review),
    createdAt: review.createdAt,
    verified: review.verified,
    photos: review.photos,
    videos: review.videos,
    bodyMarkdown: review.bodyMarkdown,
    searchText: reviewSearchText(review),
    tourSlug: review.tourSlug,
    source: review.source,
    node: <ReviewCard review={review} showTour />,
  }));

  return (
    <section id="reviews" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-12 md:px-8 md:py-16">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {destinationName} Tour Reviews
      </h2>

      {/* Same summary-card template as the tour page and the reviews hub, for a
          uniform look: rating breakdown (left) + tours CTA (right) split by a
          vertical divider, then travelers-love + per-category ratings full
          width below. */}
      <div className="mt-6 rounded-lg bg-white p-6 shadow-small md:p-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-light-grey">
          <div className="lg:pr-10">
            <RatingBreakdown reviews={reviews} />
            <ReviewInsights reviews={reviews} showHighlights={false} />
          </div>
          <div className="flex flex-col justify-center gap-4 lg:pl-10">
            <div>
              <h3 className="font-sans text-h5-mobile md:text-h5-desktop text-midnight">
                Ready to book your own adventure?
              </h3>
              <p className="mt-2 max-w-md font-body text-b4-mobile md:text-b4-desktop text-grey">
                Real trips, real travelers. Find the {destinationName}{" "}
                tour that&apos;s right for you and start planning.
              </p>
            </div>
            <Link
              href={`/tours?destination=${destinationSlug}`}
              className="inline-flex w-fit items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white shadow-small transition-all hover:bg-light-red hover:shadow-medium"
            >
              View All Tours
            </Link>
          </div>
        </div>

        <div className="mt-6 border-t border-light-grey pt-6">
          <ReviewInsights reviews={reviews} showFacts={false} />
          <div className="mt-4">
            <CategoryRatings categories={computeCategoryAggregates(reviews)} layout="row" />
          </div>
        </div>
      </div>

      <TourReviewsSection
        chips={chips}
        items={keywordItems}
        totalCount={reviews.length}
        tours={tours}
      />
    </section>
  );
}
