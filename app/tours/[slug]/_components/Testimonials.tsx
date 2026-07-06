import ReviewCard from "@/app/components/reviews/ReviewCard";
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
  const items = hasReal ? reviews! : PLACEHOLDERS;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
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

      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}
