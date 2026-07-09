import ReviewCard from "@/app/components/reviews/ReviewCard";
import TourReviewsSection from "@/app/components/reviews/TourReviewsSection";
import RatingBreakdown from "@/app/components/reviews/RatingBreakdown";
import ReviewInsights from "@/app/components/reviews/ReviewInsights";
import CategoryRatings from "@/app/components/reviews/CategoryRatings";
import { buildKeywordChips, matchThemes } from "@/app/components/reviews/review-keywords";
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
        // with the same sorter the hub uses.
        createdAt: review.createdAt,
        photos: review.photos,
        videos: review.videos,
        bodyMarkdown: review.bodyMarkdown,
        // Lowercased haystack for in-section search.
        searchText: `${review.title ?? ""} ${review.bodyMarkdown ?? ""} ${
          review.reviewerFirstName
        } ${review.reviewerLocation ?? ""}`.toLowerCase(),
        node: <ReviewCard review={review} />,
      }))
    : [];

  return (
    <section id="reviews" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-10 md:px-8 md:py-14">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
          {HEADING}
        </h2>
        <WriteReviewButton tourSlug={tourSlug} tourName={tourName} />
      </div>

      {hasReal && (
        <div className="mt-6 max-w-2xl rounded-lg bg-white p-6 shadow-small md:p-8">
          <RatingBreakdown reviews={reviews!} />
          <ReviewInsights reviews={reviews!} />
          <CategoryRatings categories={computeCategoryAggregates(reviews!)} />
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
