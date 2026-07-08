import ReviewCard from "@/app/components/reviews/ReviewCard";
import TourReviewsSection from "@/app/components/reviews/TourReviewsSection";
import { buildKeywordChips, matchThemes } from "@/app/components/reviews/review-keywords";
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
  aggregate,
  tourSlug,
  tourName,
}: {
  reviews?: PublicReview[];
  aggregate?: ReviewAggregate;
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
        node: <ReviewCard review={review} />,
      }))
    : [];

  return (
    <section id="reviews" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-10 md:px-8 md:py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
            {HEADING}
          </h2>
          {hasReal && aggregate && aggregate.count > 0 && (
            <p className="mt-2 flex items-center gap-2 font-body text-b2-desktop text-midnight">
              <span className="font-bold">{aggregate.average.toFixed(1)}</span>
              <span aria-hidden className="text-crimson-red">
                ★
              </span>
              <span className="text-grey">
                · {aggregate.count} verified review{aggregate.count === 1 ? "" : "s"}
              </span>
            </p>
          )}
        </div>
        <WriteReviewButton tourSlug={tourSlug} tourName={tourName} />
      </div>

      {hasReal ? (
        <TourReviewsSection
          chips={chips}
          items={keywordItems}
          totalCount={reviews!.length}
        />
      ) : (
        // No real reviews yet — show the generic placeholder testimonials.
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDERS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>
      )}
    </section>
  );
}
