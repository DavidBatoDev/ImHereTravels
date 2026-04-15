import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import {
  getDestinationBySlug,
  getAllDestinationSlugs,
  type DestinationReview,
} from "@/data/destinations";
import { getTourBySlug } from "@/data/tours";

/* -------------------------------------------------------------------------- */
/* Static generation                                                           */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return getAllDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return {};
  return {
    title: `${destination.name} Tour Reviews — I'm Here Travels`,
    description: `Read all traveller reviews for ${destination.name} tours with I'm Here Travels.`,
  };
}

/* -------------------------------------------------------------------------- */
/* Star row                                                                    */
/* -------------------------------------------------------------------------- */

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-crimson-red" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4 fill-current">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Review card                                                                 */
/* -------------------------------------------------------------------------- */

function ReviewCard({ review }: { review: DestinationReview }) {
  return (
    <div
      className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-small md:p-8"
      style={{ width: "384px", height: "319px", maxWidth: "100%", overflow: "hidden" }}
    >
      <div className="flex items-center justify-between">
        <StarRow count={review.stars} />
        <span className="font-body text-b4-desktop text-grey">{review.date}</span>
      </div>
      <p className="flex-1 font-body text-b2-mobile md:text-b2-desktop text-midnight">
        {review.text}
      </p>
      <div className="flex items-center gap-3 pt-2">
        {review.avatar ? (
          <Image
            src={review.avatar}
            alt={review.author}
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-light-grey font-sans text-h6-desktop text-midnight">
            {review.author[0]}
          </div>
        )}
        <div>
          <p className="font-sans text-h6-mobile font-bold text-midnight md:text-h6-desktop">
            {review.author}
          </p>
          {review.location && (
            <p className="font-body text-b4-desktop text-grey">{review.location}</p>
          )}
          {review.tourName && (
            <p className="font-body text-b4-desktop text-crimson-red">{review.tourName}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default async function DestinationReviewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const reviews = destination.reviews ?? [];

  // Group reviews by tour name
  const grouped = reviews.reduce<Record<string, DestinationReview[]>>((acc, r) => {
    const key = r.tourName ?? destination.name;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  const tourNames = Object.keys(grouped);

  // Resolve tour listing data for the CTA section
  const tours = destination.tourSlugs
    .map((s) => getTourBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getTourBySlug>>[];

  return (
    <>
      <Header />
      <main className="flex-1 bg-light-grey">
        {/* ── Header banner ─────────────────────────────────────────── */}
        <div className="border-b border-light-grey bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
            <nav className="mb-4 flex items-center gap-2 font-body text-b4-desktop text-grey">
              <Link href="/all-destinations" className="hover:text-crimson-red">
                Destinations
              </Link>
              <span>/</span>
              <Link href={`/all-destinations/${slug}`} className="hover:text-crimson-red">
                {destination.name}
              </Link>
              <span>/</span>
              <span className="text-midnight">Reviews</span>
            </nav>
            <h1 className="font-sans text-h2-mobile md:text-h2-desktop text-midnight">
              {destination.name} Tour Reviews
            </h1>
            <p className="mt-2 font-body text-b2-mobile md:text-b2-desktop text-dark-gray">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""} from travellers who
              explored {destination.name} with I&apos;m Here Travels.
            </p>
          </div>
        </div>

        {/* ── Reviews ───────────────────────────────────────────────── */}
        <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
          {reviews.length === 0 ? (
            <p className="text-center font-body text-b2-desktop text-dark-gray">
              No reviews yet for this destination.
            </p>
          ) : tourNames.length > 1 ? (
            /* Multiple tours — group by tour name */
            <div className="flex flex-col gap-14">
              {tourNames.map((tourName) => (
                <section key={tourName}>
                  <h2 className="mb-6 font-sans text-h4-mobile md:text-h4-desktop text-midnight">
                    {tourName}
                  </h2>
                  <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {grouped[tourName].map((review, i) => (
                      <li key={i}>
                        <ReviewCard review={review} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            /* Single tour or ungrouped — flat grid */
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, i) => (
                <li key={i}>
                  <ReviewCard review={review} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Tour CTA ──────────────────────────────────────────────── */}
        {tours.length > 0 && (
          <section className="border-t border-light-grey bg-white">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
              <div className="mb-8 text-center">
                <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
                  Ready to experience {destination.name}?
                </h2>
                <p className="mt-3 font-body text-b2-mobile md:text-b2-desktop text-dark-gray">
                  Join one of our small-group tours and make your own memories.
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tours.map((tour) => (
                  <li key={tour.slug}>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-small transition-shadow hover:shadow-medium"
                    >
                      <div className="relative aspect-4/3 w-full overflow-hidden">
                        <Image
                          src={tour.listingCard.image}
                          alt={tour.listingCard.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5 md:p-6">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-light-grey px-3 py-1 font-body text-b4-desktop text-midnight">
                          <Image
                            src="/Icons/SVG/Pin/pin-solid-red.svg"
                            alt=""
                            width={14}
                            height={14}
                          />
                          {tour.listingCard.duration}
                        </span>
                        <h3 className="mt-4 font-sans text-h5-mobile md:text-h5-desktop text-midnight group-hover:text-crimson-red">
                          {tour.header.title.split("|").slice(-1)[0]?.trim() ?? tour.header.title}
                        </h3>
                        <p className="mt-2 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                          {tour.listingCard.description}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-5">
                          <div className="flex items-baseline gap-2">
                            <span className="font-body text-b4-desktop text-dark-gray">From</span>
                            <span className="font-sans text-h6-mobile md:text-h6-desktop text-midnight">
                              {tour.listingCard.price}
                            </span>
                          </div>
                          <span className="inline-flex items-center justify-center rounded-full bg-crimson-red px-5 py-2 font-body text-b4-desktop font-medium text-white transition-colors group-hover:bg-light-red">
                            View Tour
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
