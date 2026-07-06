import Link from "next/link";
import Footer from "@/app/components/global/Footer";
import ReviewCard from "@/app/components/reviews/ReviewCard";
import { getAllPublishedReviews } from "@/lib/reviews-firestore";
import type { PublicReview } from "@/types/review";

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
  searchParams: Promise<{ tour?: string }>;
}) {
  const { tour } = await searchParams;
  const all = await getAllPublishedReviews();

  // Unique tours present in the review set (for filter pills).
  const tourMap = new Map<string, string>();
  for (const r of all) {
    if (r.tourSlug && r.tourName && !tourMap.has(r.tourSlug)) {
      tourMap.set(r.tourSlug, r.tourName);
    }
  }
  const tours = Array.from(tourMap, ([slug, name]) => ({ slug, name })).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const activeTour = tour && tourMap.has(tour) ? tour : undefined;
  const reviews = activeTour ? all.filter((r) => r.tourSlug === activeTour) : all;
  const stats = overall(all);

  const pill = (active: boolean) =>
    [
      "rounded-full px-4 py-2 font-body text-b4-desktop transition-colors",
      active
        ? "bg-crimson-red text-white"
        : "border border-light-grey text-dark-gray hover:bg-light-grey",
    ].join(" ");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHubJsonLd(all)) }}
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
            <p className="mt-4 flex items-center gap-2 font-body text-b2-desktop text-midnight">
              <span className="font-bold">{stats.average.toFixed(1)}</span>
              <span aria-hidden className="text-crimson-red">
                ★
              </span>
              <span className="text-grey">
                · {stats.count} verified review{stats.count === 1 ? "" : "s"}
              </span>
            </p>
          )}

          {tours.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-2">
              <Link href="/reviews" className={pill(!activeTour)}>
                All tours
              </Link>
              {tours.map((t) => (
                <Link key={t.slug} href={`/reviews?tour=${t.slug}`} className={pill(activeTour === t.slug)}>
                  {t.name}
                </Link>
              ))}
            </div>
          )}

          {reviews.length === 0 ? (
            <div className="mt-16 text-center">
              <p className="font-body text-b2-desktop text-dark-gray">
                No reviews yet — check back soon.
              </p>
              <Link
                href="/tours"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white hover:bg-light-red"
              >
                Browse tours
              </Link>
            </div>
          ) : (
            <ul className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showTour />
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
