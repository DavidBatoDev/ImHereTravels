import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/global/Footer";
import ReviewCard from "@/app/components/reviews/ReviewCard";
import RatingBreakdown from "@/app/components/reviews/RatingBreakdown";
import ReviewInsights from "@/app/components/reviews/ReviewInsights";
import CategoryRatings from "@/app/components/reviews/CategoryRatings";
import ReviewsFilterBar from "@/app/components/reviews/ReviewsFilterBar";
import ReviewsPager from "@/app/components/reviews/ReviewsPager";
import TripStyleRail from "@/app/components/reviews/TripStyleRail";
import WriteReviewButton from "@/app/tours/[slug]/_components/WriteReviewButton";
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
import { TRIP_STYLES } from "@/app/components/reviews/trip-styles";
import { getAllPublishedReviews, computeCategoryAggregates } from "@/lib/reviews-firestore";
import { isExternalSource } from "@/types/review";
import type { PublicReview, CategoryAggregate } from "@/types/review";

// ⚠️ TEMP MOCKUP — remove before handoff. Preview-only category averages so the
// category-ratings row is visible in the summary card. The live reviews are all
// TourRadar imports (no per-category scores), so `computeCategoryAggregates`
// returns []. Delete this constant + the fallback in the card once first-party
// category reviews exist.
const MOCK_CATEGORY_PREVIEW: CategoryAggregate[] = [
  { key: "guide", label: "Tour Guide", average: 5.0, count: 1 },
  { key: "experience", label: "Experience", average: 4.9, count: 1 },
  { key: "value", label: "Value", average: 4.7, count: 1 },
  { key: "food", label: "Food", average: 4.8, count: 1 },
  { key: "accommodation", label: "Accommodation", average: 4.6, count: 1 },
];

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
  searchParams: Promise<{
    tour?: string;
    sort?: string;
    q?: string;
    source?: string;
  }>;
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
  const summaryCategories = computeCategoryAggregates(filtered);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildHubJsonLd(all.filter((r) => !isExternalSource(r.source)))),
        }}
      />
      <main className="flex-1 overflow-x-clip">
        <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 md:px-8 md:pb-24 md:pt-10">
          <h1 className="font-display text-h1-mobile md:text-h1-desktop text-midnight">
            Traveler Reviews
          </h1>
          <p className="mt-4 max-w-2xl font-body text-b2-mobile md:text-b2-desktop text-dark-gray">
            Real stories from verified travelers who&apos;ve explored the world with us.
          </p>

          {stats.count > 0 && (
            <div className="mt-6 rounded-lg bg-white p-6 shadow-small md:p-8">
              {/* Top: rating summary (left) + write-a-review CTA (right), split by a
                  centered vertical divider (equal pr-10 | pl-10 padding). */}
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-light-grey">
                {/* Left: average + distribution bars, with trust/freshness facts. */}
                <div className="lg:pr-10">
                  <RatingBreakdown reviews={filtered} />
                  <ReviewInsights reviews={filtered} showHighlights={false} />
                </div>
                {/* Right: invite the traveler to contribute their own review. */}
                <div className="flex flex-col justify-center gap-4 lg:pl-10">
                  <div>
                    <h2 className="font-sans text-h5-mobile md:text-h5-desktop text-midnight">
                      Write your Experience
                    </h2>
                    <p className="mt-2 max-w-md font-body text-b4-mobile md:text-b4-desktop text-grey">
                      Share your story and help fellow travelers choose their next
                      adventure. Every voice adds to a community where each
                      experience counts.
                    </p>
                  </div>
                  <WriteReviewButton
                    hub
                    triggerClassName="inline-flex w-fit items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white shadow-small transition-all hover:bg-light-red hover:shadow-medium"
                  />
                </div>
              </div>

              {/* Bottom: what travelers love + per-category ratings, full width.
                  ⚠️ TEMP: categories fall back to MOCK_CATEGORY_PREVIEW so the row
                  is visible while the live (TourRadar) data carries no category
                  scores — remove the fallback + the mock constant before handoff. */}
              <div className="mt-6 border-t border-light-grey pt-6">
                <ReviewInsights reviews={filtered} showFacts={false} />
                <div className="mt-4">
                  <CategoryRatings
                    categories={
                      summaryCategories.length > 0 ? summaryCategories : MOCK_CATEGORY_PREVIEW
                    }
                    layout="row"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sticky filter bar: pins at the top (the site nav auto-hides on
              scroll-down) with a full-bleed page-coloured band, so review cards
              scroll UNDER it and stay clipped below the search/filter controls.
              The -mx/px pair extends the band to the section's edges. */}
          <div className="sticky top-0 z-30 -mx-4 mt-8 bg-light-grey px-4 py-4 md:-mx-8 md:px-8">
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

          {/* Two-column: trip-style rail (left) + review list (right). Brand
              stickers bleed off the four corners (resident-hosts pattern); the
              overflow-x-clip on <main> keeps the off-edge bleed from adding a
              horizontal scrollbar. `id`/`scroll-mt` = the pager's scroll target
              when changing pages (lands just below the sticky filter bar). */}
          <div id="reviews-top" className="relative mt-8 scroll-mt-28">
            <div
              className="pointer-events-none absolute -left-12 top-28 -z-10 hidden rotate-6 lg:block"
              aria-hidden="true"
            >
              <Image
                src="/Stickers/Digital/PNG/Asterisk/Digital_Asterisk_Orange.png"
                alt=""
                width={130}
                height={130}
                className="object-contain"
              />
            </div>
            <div
              className="pointer-events-none absolute -right-16 top-130 -z-10 hidden rotate-12 lg:block"
              aria-hidden="true"
            >
              <Image
                src="/Stickers/Digital/PNG/Burst/Digital_Burst_Red.png"
                alt=""
                width={180}
                height={180}
                className="object-contain"
              />
            </div>
            <div
              className="pointer-events-none absolute left-57 bottom-270 -z-10 hidden -rotate-5 lg:block"
              aria-hidden="true"
            >
              <Image
                src="/Stickers/Digital/PNG/Clove/Digital_Clove_LightGreen.png"
                alt=""
                width={170}
                height={170}
                className="object-contain"
              />
            </div>


            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[320px_1fr] lg:gap-10">
              {/* Bottom-sticky sidebar: scrolls with the page until its bottom
                  card ("Bucket-List Trips") reaches the bottom of the viewport,
                  then pins there — so that card stays visible while the reviews
                  keep scrolling. No inner scroll. */}
              <div className="lg:sticky lg:bottom-8 lg:self-start">
                <TripStyleRail styles={TRIP_STYLES} />
              </div>

              <div className="min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-sans text-h5-mobile md:text-h5-desktop text-midnight">
                    All reviews
                  </h2>
                  <span className="shrink-0 font-body text-b4-desktop text-grey">
                    {reviews.length} review{reviews.length === 1 ? "" : "s"}
                  </span>
                </div>

                {reviews.length === 0 ? (
                  <div className="mt-12 text-center">
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
                  <ReviewsPager
                    // Remount (reset to page 1) whenever the filters change.
                    key={`${activeTour ?? ""}|${activeSort}|${activeQuery}|${activeSource}`}
                    pageSize={10}
                    items={reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} showTour variant="row" />
                    ))}
                  />
                )}
              </div>
            </div>
          </div>
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
