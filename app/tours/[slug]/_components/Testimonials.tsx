import Link from "next/link";
import ReviewCard from "@/app/components/reviews/ReviewCard";
import TourReviewsSection from "@/app/components/reviews/TourReviewsSection";
import RatingBreakdown from "@/app/components/reviews/RatingBreakdown";
import ReviewInsights from "@/app/components/reviews/ReviewInsights";
import CategoryRatings from "@/app/components/reviews/CategoryRatings";
import { buildKeywordChips, matchThemes } from "@/app/components/reviews/review-keywords";
import { reviewSearchText } from "@/app/components/reviews/reviews-filter";
import { computeCategoryAggregates } from "@/lib/reviews-firestore";
import WriteReviewButton from "./WriteReviewButton";
import type { PublicReview, ReviewAggregate } from "@/types/review";

const HEADING = "What people say about us";

// Generic fallback testimonials, shown when a tour has no real reviews yet.
const PLACEHOLDERS: PublicReview[] = [
  {
    id: "placeholder-1",
    tourSlug: "",
    tourName: "",
    rating: 5,
    displayDate: "May 2023",
    bodyMarkdown:
      "Had an amazing time on the trial tour! Action packed with lots of fun things on the itinerary, and a great bunch of people. Would definitely go again!",
    reviewerAvatar: "/reviews/avatars/flynn.jpg",
    reviewerFirstName: "Flynn",
    reviewerLocation: "London, United Kingdom",
    verified: false,
    createdAt: 0,
  },
  {
    id: "placeholder-2",
    tourSlug: "",
    tourName: "",
    rating: 5,
    displayDate: "February 2024",
    bodyMarkdown:
      "My experience has been amazing, I'll never forget it. I met extraordinary people and explored beautiful places. I definitely recommend to book a trip!",
    reviewerAvatar: "/reviews/avatars/manuel.jpg",
    reviewerFirstName: "Manuel",
    reviewerLocation: "Milan, Italy",
    verified: false,
    createdAt: 0,
  },
  {
    id: "placeholder-3",
    tourSlug: "",
    tourName: "",
    rating: 5,
    displayDate: "July 2024",
    bodyMarkdown:
      "I enjoyed the tour! Seamless coordination of transportation and accommodation made me feel like a VIP throughout the trip! LOVED every bit of it!! I highly recommend!",
    reviewerAvatar: "/reviews/avatars/bella.jpg",
    reviewerFirstName: "Bella",
    reviewerLocation: "Cagayan, Philippines",
    verified: false,
    createdAt: 0,
  },
];

export default function Testimonials({
  reviews,
  tourSlug,
  tourName,
}: {
  reviews?: PublicReview[];
  aggregate?: ReviewAggregate; // still passed by the tour page; display now uses RatingBreakdown
  tourSlug: string;
  tourName: string;
}) {
  const hasReal = !!reviews && reviews.length > 0;

  // Interest-keyword chips are mined from the tour's own reviews so a visitor can
  // filter to what they care about in place (see TourReviewsSection). Cards are
  // rendered here on the server and handed to the client section as nodes.
  const chips = hasReal ? buildKeywordChips(reviews!) : [];
  const keywordItems = hasReal
    ? reviews!.map((review) => ({
        id: review.id,
        themeKeys: matchThemes(review),
        // Sort fields (satisfy ReviewSortFields) so the client section can sort
        // with the same sorter the hub uses — `verified` feeds "Most relevant".
        createdAt: review.createdAt,
        verified: review.verified,
        photos: review.photos,
        videos: review.videos,
        bodyMarkdown: review.bodyMarkdown,
        // Lowercased haystack for in-section search (same recipe as the hub).
        searchText: reviewSearchText(review),
        source: review.source,
        node: <ReviewCard review={review} />,
      }))
    : [];

  return (
    <section id="reviews" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-10 md:px-8 md:py-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {HEADING}
      </h2>

      {/* Same summary-card template as the reviews hub, for a uniform look: rating
          breakdown + write-a-review CTA split by a vertical divider, then
          travelers-love + per-category ratings full width below. */}
      {hasReal && (
        <div className="mt-6 rounded-lg bg-white p-6 shadow-small md:p-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-light-grey">
            <div className="lg:pr-10">
              <RatingBreakdown reviews={reviews!} />
              <ReviewInsights reviews={reviews!} showHighlights={false} />
            </div>
            <div className="flex flex-col justify-center gap-4 lg:pl-10">
              <div>
                <h3 className="font-sans text-h5-mobile md:text-h5-desktop text-midnight">
                  Write your Experience
                </h3>
                <p className="mt-2 max-w-md font-body text-b4-mobile md:text-b4-desktop text-grey">
                  Share your story and help fellow travelers choose their next
                  adventure. Every voice adds to a community where each
                  experience counts.
                </p>
              </div>
              <WriteReviewButton
                tourSlug={tourSlug}
                tourName={tourName}
                triggerClassName="inline-flex w-fit items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white shadow-small transition-all hover:bg-light-red hover:shadow-medium"
              />
            </div>
          </div>

          <div className="mt-6 border-t border-light-grey pt-6">
            <ReviewInsights reviews={reviews!} showFacts={false} />
            <div className="mt-4">
              <CategoryRatings categories={computeCategoryAggregates(reviews!)} layout="row" />
            </div>
          </div>
        </div>
      )}

      {/* No reviews for this tour yet — a CTA-only card (no empty rating
          breakdown to show) inviting the first review, plus a way to browse
          real reviews from other trips in the meantime. */}
      {!hasReal && (
        <div className="mt-6 rounded-lg bg-white p-6 shadow-small md:p-8">
          <h3 className="font-sans text-h5-mobile md:text-h5-desktop text-midnight">
            Write your Experience
          </h3>
          <p className="mt-2 max-w-md font-body text-b4-mobile md:text-b4-desktop text-grey">
            Be the first to share your story and help fellow travelers choose
            their next adventure.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            <WriteReviewButton
              tourSlug={tourSlug}
              tourName={tourName}
              triggerClassName="inline-flex w-fit items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white shadow-small transition-all hover:bg-light-red hover:shadow-medium"
            />
            <Link
              href="/reviews"
              className="font-body text-b4-desktop font-medium text-crimson-red underline underline-offset-2 hover:text-light-red"
            >
              See reviews from other trips
            </Link>
          </div>
        </div>
      )}

      {hasReal ? (
        <TourReviewsSection
          chips={chips}
          items={keywordItems}
          totalCount={reviews!.length}
        />
      ) : (
        // No real reviews yet — show the generic placeholder testimonials.
        <ul className="mt-8 columns-1 gap-6 md:columns-2 lg:columns-3 [&>li]:mb-6 [&>li]:break-inside-avoid">
          {PLACEHOLDERS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>
      )}
    </section>
  );
}
