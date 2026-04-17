import Link from "next/link";
import Footer from "@/app/components/global/Footer";
import { getAllTours } from "@/data/tours";
import {
  getAllDestinations,
  getDestinationBySlug,
} from "@/data/destinations";
import type { Tour } from "@/types/tour";
import TourCard from "./_components/TourCard";
import ToursFilterBar from "./_components/ToursFilterBar";
import type { SortKey } from "./_components/ToursFilterBar";
import RecentlyViewedTours from "./_components/RecentlyViewedTours";

const BASE_URL = "https://www.imheretravels.com";

export const metadata = {
  title: "Browse All Tours — I'm Here Travels",
  description:
    "Browse every I'm Here Travels small-group adventure — Philippines, Japan, Maldives, India, Tanzania and more. Filter by destination and find your perfect trip.",
};

function buildToursJsonLd(tours: Tour[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/tours`,
    name: "All Tours — I'm Here Travels",
    description:
      "Browse every I'm Here Travels small-group adventure — Philippines, Japan, Maldives, India, Tanzania and more.",
    url: `${BASE_URL}/tours`,
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      name: "Small-Group Tours",
      numberOfItems: tours.length,
      itemListElement: tours.map((tour, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/tours/${tour.slug}`,
        name: tour.name,
        description: tour.meta.description,
        image: `${BASE_URL}${tour.gallery.hero}`,
      })),
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function parsePriceGBP(priceAmount: string): number {
  return parseFloat(priceAmount.replace(/[^0-9.]/g, "")) || 0;
}

function parseDurationDays(duration: string): number {
  const m = duration.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

const VALID_SORTS: SortKey[] = [
  "relevant",
  "price-asc",
  "price-desc",
  "duration-asc",
  "duration-desc",
];

function sortTours(tours: Tour[], sort: SortKey): Tour[] {
  const s = [...tours];
  switch (sort) {
    case "price-asc":
      return s.sort(
        (a, b) =>
          parsePriceGBP(a.booking.priceAmount) -
          parsePriceGBP(b.booking.priceAmount),
      );
    case "price-desc":
      return s.sort(
        (a, b) =>
          parsePriceGBP(b.booking.priceAmount) -
          parsePriceGBP(a.booking.priceAmount),
      );
    case "duration-asc":
      return s.sort(
        (a, b) =>
          parseDurationDays(a.listingCard.duration) -
          parseDurationDays(b.listingCard.duration),
      );
    case "duration-desc":
      return s.sort(
        (a, b) =>
          parseDurationDays(b.listingCard.duration) -
          parseDurationDays(a.listingCard.duration),
      );
    default:
      return s; // "relevant" = registry order
  }
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string; sort?: string }>;
}) {
  const { destination, sort } = await searchParams;

  const allTours = getAllTours();
  const allDestinations = getAllDestinations();

  // Validate destination param — ignore unknown slugs
  const validDest =
    destination && allDestinations.some((d) => d.slug === destination)
      ? destination
      : undefined;

  // Filter
  let filtered = allTours;
  if (validDest) {
    const dest = getDestinationBySlug(validDest)!;
    filtered = allTours.filter((t) => dest.tourSlugs.includes(t.slug));
  }

  // Validate sort param
  const validSort: SortKey =
    sort && VALID_SORTS.includes(sort as SortKey)
      ? (sort as SortKey)
      : "relevant";

  // Sort
  const sorted = sortTours(filtered, validSort);

  const destOptions = allDestinations.map((d) => ({
    slug: d.slug,
    name: d.name,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToursJsonLd(sorted)) }}
      />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 md:px-8 md:pb-24 md:pt-10">
          <h1 className="font-display text-h1-mobile md:text-h1-desktop text-midnight">
            All Tours
          </h1>
          <p className="mt-4 max-w-2xl font-body text-b2-mobile md:text-b2-desktop text-dark-gray">
            Small-group adventures across the Philippines, the Maldives and
            more.
          </p>

          <ToursFilterBar
            destinations={destOptions}
            currentDestination={validDest}
            currentSort={validSort}
            totalCount={sorted.length}
          />

          {sorted.length === 0 ? (
            <div className="mt-16 text-center">
              <p className="font-body text-b2-desktop text-dark-gray">
                No tours found for this destination.
              </p>
              <Link
                href="/tours"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white hover:bg-light-red"
              >
                View All Tours
              </Link>
            </div>
          ) : (
            <ul className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
              {sorted.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </ul>
          )}
        </section>

        <RecentlyViewedTours allTours={allTours} />
      </main>
      <Footer />
    </>
  );
}
