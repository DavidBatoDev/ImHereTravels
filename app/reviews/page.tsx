import Link from "next/link";
import Footer from "@/app/components/global/Footer";
import ReviewCard from "@/app/components/reviews/ReviewCard";
import RatingBreakdown from "@/app/components/reviews/RatingBreakdown";
import ReviewInsights from "@/app/components/reviews/ReviewInsights";
import CategoryRatings from "@/app/components/reviews/CategoryRatings";
import ReviewsFilterBar from "@/app/components/reviews/ReviewsFilterBar";
import {
  DEFAULT_SORT,
  DEFAULT_SOURCE,
  SORT_OPTIONS,
  SOURCE_OPTIONS,
  matchesSource,
  reviewSearchText,
  sortReviews,
  type SortValue,
  type SourceValue,
  type TourOption,
} from "@/app/components/reviews/reviews-filter";
import TourRadarWidget from "@/app/components/reviews/TourRadarWidget";
import { getAllPublishedReviews, computeCategoryAggregates } from "@/lib/reviews-firestore";
import { isExternalSource } from "@/types/review";
import type { PublicReview } from "@/types/review";

// Company-level TourRadar "Operator Reviews" widget (from the Widget Center).
// Set to the iframe src URL (or full embed snippet) to show it on the hub.
const TOURRADAR_OPERATOR_WIDGET_URL =
  process.env.NEXT_PUBLIC_TOURRADAR_OPERATOR_WIDGET_URL;

export const revalidate = 3600;

const BASE_URL = "https://www.imheretravels.com";

export const metadata = {
  title: "Traveler Reviews — I'm Here Travels",
  description:
    "Real reviews from verified I'm Here Travels travelers. Read what our community says about our small-group adventures across the Philippines, Japan, the Maldives and more.",
  alternates: { canonical: `${BASE_URL}/reviews` },
};

function overall(reviews: PublicReview[]): { average: number; count: number } {
  if (reviews.length === 0) return { average: 0, count: 0 };
  const sum = reviews.reduce((a, r) => a + (r.rating || 0), 0);
  return { average: Math.round((sum / reviews.length) * 10) / 10, count: reviews.length };
}

function buildHubJsonLd(reviews: PublicReview[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/reviews`,
    name: "Traveler Reviews — I'm Here Travels",
    description:
      "Real reviews from verified I'm Here Travels travelers across our small-group adventures.",
    url: `${BASE_URL}/reviews`,
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      name: "Traveler Reviews",
      numberOfItems: reviews.length,
      itemListElement: reviews.slice(0, 50).map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1,
          },
          author: { "@type": "Person", name: r.reviewerFirstName },
          itemReviewed: { "@type": "TouristTrip", name: r.tourName },
          ...(r.createdAt
            ? { datePublished: new Date(r.createdAt).toISOString().split("T")[0] }
            : {}),
        },
      })),
    },
  };
}

export default async function ReviewsHubPage({
  searchParams,
}: {
  searchParams: Promise<{ tour?: string; sort?: string; q?: string; source?: string }>;
}) {
  const { tour, sort, q, source } = await searchParams;
  const all = await getAllPublishedReviews();

  // Unique tours present in the review set, with per-tour counts (for the filter).
  const tourMap = new Map<string, TourOption>();
  for (const r of all) {
    if (!r.tourSlug || !r.tourName) continue;
    const existing = tourMap.get(r.tourSlug);
    if (existing) existing.count += 1;
    else tourMap.set(r.tourSlug, { slug: r.tourSlug, name: r.tourName, count: 1 });
  }
  const tours = Array.from(tourMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  const activeTour = tour && tourMap.has(tour) ? tour : undefined;
  const activeSort: SortValue =
    (SORT_OPTIONS.find((s) => s.value === sort)?.value as SortValue) ?? DEFAULT_SORT;
  const activeSource: SourceValue =
    (SOURCE_OPTIONS.find((s) => s.value === source)?.value as SourceValue) ?? DEFAULT_SOURCE;
  const activeQuery = (q ?? "").trim();
  const needle = activeQuery.toLowerCase();

  // Per-source counts for the menu. Counted against the tour + search selection
  // (but not against the source itself) so each option shows what picking it yields.
  const inScope = all.filter(
    (r) =>
      (!activeTour || r.tourSlug === activeTour) &&
      (!needle || reviewSearchText(r).includes(needle)),
  );
  const sourceCounts = Object.fromEntries(
    SOURCE_OPTIONS.map((o) => [o.value, inScope.filter((r) => matchesSource(r, o.value)).length]),
  ) as Record<SourceValue, number>;

  // Tour + free-text + source filters narrow the set BEFORE sorting, so the rating
  // breakdown / insights panel always describes exactly what's listed below.
  const filtered = inScope.filter((r) => matchesSource(r, activeSource));
  const reviews = sortReviews(filtered, activeSort);
  // Headline count is ALL reviews shown (TourRadar + verified bookers combined).
  const stats = overall(filtered);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildHubJsonLd(all.filter((r) => !isExternalSource(r.source)))),
        }}
      />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 md:px-8 md:pb-24 md:pt-10">
          <h1 className="font-display text-h1-mobile md:text-h1-desktop text-midnight">
            Traveler Reviews
          </h1>
          <p className="mt-4 max-w-2xl font-body text-b2-mobile md:text-b2-desktop text-dark-gray">
            Real stories from verified travelers who&apos;ve explored the world with us.
          </p>

          {stats.count > 0 && (
            <div className="mt-6 max-w-2xl rounded-lg bg-white p-6 shadow-small md:p-8">
              <RatingBreakdown reviews={filtered} />
              <ReviewInsights reviews={filtered} showHighlights={false} />
              <CategoryRatings categories={computeCategoryAggregates(filtered)} />
            </div>
          )}

          <div className="mt-8">
            <ReviewsFilterBar
              tours={tours}
              totalCount={all.length}
              activeTour={activeTour}
              activeSort={activeSort}
              activeQuery={activeQuery}
              activeSource={activeSource}
              sourceCounts={sourceCounts}
            />
          </div>

          {reviews.length === 0 ? (
            <div className="mt-16 text-center">
              {activeQuery || activeTour || activeSource !== DEFAULT_SOURCE ? (
                <>
                  <p className="font-body text-b2-desktop text-dark-gray">
                    No reviews match
                    {activeQuery && (
                      <>
                        {" "}
                        <span className="font-medium text-midnight">
                          &ldquo;{activeQuery}&rdquo;
                        </span>
                      </>
                    )}
                    .
                  </p>
                  <Link
                    href="/reviews"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white hover:bg-light-red"
                  >
                    Clear filters
                  </Link>
                </>
              ) : (
                <>
                  <p className="font-body text-b2-desktop text-dark-gray">
                    No reviews yet — check back soon.
                  </p>
                  <Link
                    href="/tours"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white hover:bg-light-red"
                  >
                    Browse tours
                  </Link>
                </>
              )}
            </div>
          ) : (
            <ul className="mt-10 columns-1 gap-6 md:mt-12 md:columns-2 lg:columns-3 [&>li]:mb-6 [&>li]:break-inside-avoid">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showTour />
              ))}
            </ul>
          )}
        </section>
        {!activeTour && TOURRADAR_OPERATOR_WIDGET_URL && (
          <TourRadarWidget
            widgetUrl={TOURRADAR_OPERATOR_WIDGET_URL}
            variant="operator"
          />
        )}
      </main>
      <Footer />
    </>
  );
}
