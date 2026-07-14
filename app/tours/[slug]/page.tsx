import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Footer from "@/app/components/global/Footer";
import ShareButton from "./_components/ShareButton";
import ReviewsLink from "./_components/ReviewsLink";
export const revalidate = 3600; // Re-fetch from Firestore at most once per hour

import { getAllTourSlugs, getTourBySlug, getHostedTourSlugs, getCurrentSlugForPreviousSlug } from "@/lib/tours-firestore";
import {
  getReviewsForTour,
  getAggregateForTour,
  computeReviewAggregate,
} from "@/lib/reviews-firestore";
import type { Tour } from "@/types/tour";
import { isExternalSource } from "@/types/review";
import type { PublicReview, ReviewAggregate } from "@/types/review";
import AutoFitText from "./_components/AutoFitText";
import Breadcrumbs from "./_components/Breadcrumbs";
import TourGallery from "./_components/TourGallery";
import TourHeader from "./_components/TourHeader";
import KeyFacts from "./_components/KeyFacts";
import WhatsIncluded from "./_components/WhatsIncluded";
import TripHighlights from "./_components/TripHighlights";
import TourMap from "./_components/TourMap";
import Itinerary from "./_components/Itinerary";
import WhereWeStay from "./_components/WhereWeStay";
import Faqs from "./_components/Faqs";
import ThingsToKnow from "./_components/ThingsToKnow";
import Tips from "./_components/Tips";
import Testimonials from "./_components/Testimonials";
import TourRadarWidget from "@/app/components/reviews/TourRadarWidget";
import RelatedTours from "./_components/RelatedTours";
import CommunityGrid from "./_components/CommunityGrid";
import BookingCard from "./_components/BookingCard";
import TourViewRecorder from "./_components/TourViewRecorder";
import ReviewsAnchorScroll from "./_components/ReviewsAnchorScroll";
import Reveal from "@/app/components/global/Reveal";
import BookingCardReveal from "./_components/BookingCardReveal";

const BASE_URL = "https://www.imheretravels.com";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getAllTourSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return { title: "Tour not found" };
  return {
    title: tour.meta.title,
    description: tour.meta.description,
    alternates: {
      canonical: `${BASE_URL}/tours/${tour.slug}`,
    },
    openGraph: {
      title: tour.meta.title,
      description: tour.meta.description,
      type: "website",
      url: `${BASE_URL}/tours/${tour.slug}`,
      // og:image is supplied by the generated `opengraph-image.tsx` card.
    },
    twitter: {
      card: "summary_large_image",
      title: tour.meta.title,
      description: tour.meta.description,
    },
  };
}

function buildTourJsonLd(
  tour: Tour,
  reviews: PublicReview[],
  aggregate: ReviewAggregate,
) {
  const durationFact = tour.keyFacts.find((f) => f.label === "Duration");
  const routeFact = tour.keyFacts.find((f) => f.label === "Route");
  const groupFact = tour.keyFacts.find((f) => f.label === "Group Size");

  // Only surface rating/review markup when we have real reviews — Google flags
  // empty or fabricated ratings.
  const aggregateRating =
    aggregate.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: aggregate.average,
            reviewCount: aggregate.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {};

  // Strip markdown to a plain-text snippet for the review body in structured data.
  const toPlain = (md: string) =>
    md.replace(/[*_`#>\-]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\s+/g, " ").trim();

  // Google's structured-data policy forbids putting third-party (Google/TourRadar)
  // reviews into your own Review/AggregateRating markup — keep the JSON-LD
  // first-party only. (`aggregate` is already first-party-only in reviews-firestore.ts.)
  const firstPartyReviews = reviews.filter((r) => !isExternalSource(r.source));

  const reviewLd =
    firstPartyReviews.length > 0
      ? {
          review: firstPartyReviews.slice(0, 10).map((r) => ({
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: 5,
              worstRating: 1,
            },
            author: { "@type": "Person", name: r.reviewerFirstName },
            reviewBody: toPlain(r.bodyMarkdown).slice(0, 400),
            ...(r.createdAt
              ? { datePublished: new Date(r.createdAt).toISOString().split("T")[0] }
              : {}),
          })),
        }
      : {};

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Tours", item: `${BASE_URL}/tours` },
          { "@type": "ListItem", position: 3, name: tour.name, item: `${BASE_URL}/tours/${tour.slug}` },
        ],
      },
      {
        // Google's review/AggregateRating rich result only recognizes a fixed
        // allowlist of types (Product, LocalBusiness, Book, Event, ...) —
        // "TouristTrip" alone is not on it. Multi-typing as Product too keeps
        // every Trip-specific property while making the review markup eligible.
        "@type": ["TouristTrip", "Product"],
        "@id": `${BASE_URL}/tours/${tour.slug}`,
        name: tour.meta.title,
        description: tour.meta.description,
        url: `${BASE_URL}/tours/${tour.slug}`,
        image: tour.gallery.hero.startsWith("http")
          ? tour.gallery.hero
          : `${BASE_URL}${tour.gallery.hero}`,
        provider: { "@id": `${BASE_URL}/#organization` },
        ...aggregateRating,
        ...reviewLd,
        ...(durationFact ? { duration: durationFact.values[0] } : {}),
        ...(routeFact ? { itinerary: { "@type": "ItemList", name: routeFact.values[0] } } : {}),
        ...(groupFact ? { maximumAttendeeCapacity: parseInt(groupFact.values[0]) || undefined } : {}),
        offers: {
          "@type": "Offer",
          url: tour.booking.ctaHref,
          priceCurrency: tour.booking.priceCurrency,
          price: tour.booking.priceAmount.replace(/[^0-9.]/g, ""),
          availability: "https://schema.org/InStock",
          validFrom: new Date().toISOString().split("T")[0],
        },
        ...(tour.faqs?.items.length
          ? {
              subjectOf: {
                "@type": "FAQPage",
                mainEntity: tour.faqs.items.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: faq.answer },
                })),
              },
            }
          : {}),
      },
    ],
  };
}

export default async function TourDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) {
    // A stale slug may have been renamed — redirect to the current page if one
    // of the active tours lists it as a (redirect-enabled) previous slug.
    const current = await getCurrentSlugForPreviousSlug(slug);
    if (current && current !== slug) permanentRedirect(`/tours/${current}`);
    notFound();
  }

  const hostedSlugs = new Set(await getHostedTourSlugs());

  // Reviews now come from the dedicated `tourReviews` collection (not the legacy
  // embedded `details.reviews[]`), so user-submitted + admin reviews share one
  // moderated source.
  const [reviews, aggregate] = await Promise.all([
    getReviewsForTour(tour.slug),
    getAggregateForTour(tour.slug),
  ]);
  // Combined across ALL sources (first-party + Google/TourRadar) — for the
  // teaser link only. `aggregate` (first-party-only) still drives JSON-LD and
  // the "verified reviews" line per Google's structured-data policy.
  const displayAggregate = computeReviewAggregate(reviews);

  const instagramHref = "https://www.instagram.com/imheretravels";
  const fallbackCommunityImages = tour.gallery.thumbnails
    .map((thumb) => ({ src: thumb.src, alt: thumb.alt, href: instagramHref }))
    .slice(0, 7);

  const communitySection = tour.community ?? {
    heading: "With @imheretravels",
    images: fallbackCommunityImages,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildTourJsonLd(tour, reviews, aggregate)),
        }}
      />
      <main className="flex-1">
        <TourViewRecorder slug={tour.slug} />
        <ReviewsAnchorScroll />
        <Breadcrumbs
          tourName={tour.name}
          parent={
            hostedSlugs.has(tour.slug)
              ? { label: "Hosted Tours", href: "/hosted-tours" }
              : undefined
          }
        />

        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
            <div className="min-w-0">
              <Reveal y={16}>
                <div className="mt-2 flex items-start justify-between gap-4 md:mt-4">
                  <AutoFitText
                    as="h1"
                    className="font-display text-h2-mobile md:text-h2-desktop text-midnight"
                  >
                    {tour.name}
                  </AutoFitText>
                  <div className="flex shrink-0 items-center gap-4 pt-3 md:pt-4">
                    {!tour.comingSoon && (
                      <ReviewsLink
                        average={displayAggregate.average}
                        count={displayAggregate.count}
                      />
                    )}
                    <ShareButton title={tour.header.title} />
                  </div>
                </div>
              </Reveal>

              <Reveal y={20} delay={80}>
                <div className="mt-6 md:mt-8">
                  <TourGallery gallery={tour.gallery} />
                </div>
              </Reveal>

              <div className="mt-6 rounded-lg bg-white px-5 py-8 md:px-10 md:py-10">
                <Reveal y={20}>
                  <TourHeader
                    header={
                      tour.comingSoon
                        ? { ...tour.header, tags: [] }
                        : tour.header
                    }
                  />
                </Reveal>
                {tour.keyFacts.length > 0 && (
                  <Reveal y={20} delay={60}>
                    <KeyFacts
                      items={
                        tour.comingSoon
                          ? tour.keyFacts.filter((f) => f.icon !== "route")
                          : tour.keyFacts
                      }
                      tourSlug={tour.bookingSlug ?? tour.slug}
                    />
                  </Reveal>
                )}
                {tour.comingSoon ? (
                  <>
                    <Reveal y={20}>
                      <div className="mt-8 rounded-lg border border-light-grey px-6 py-8 text-center">
                        <p className="font-sans text-h6-mobile md:text-h6-desktop font-bold text-dark-gray">
                          What&apos;s Included
                        </p>
                        <p className="mt-2 font-body text-b4-desktop text-grey">
                          Inclusions coming soon.
                        </p>
                      </div>
                    </Reveal>
                    <Reveal y={20}>
                      <div className="mt-6 rounded-lg border border-light-grey px-6 py-8 text-center">
                        <p className="font-sans text-h6-mobile md:text-h6-desktop font-bold text-dark-gray">
                          Itinerary
                        </p>
                        <p className="mt-2 font-body text-b4-desktop text-grey">
                          Itinerary to be announced.
                        </p>
                      </div>
                    </Reveal>
                  </>
                ) : (
                  <>
                    {tour.whatsIncluded?.heading && (
                      <Reveal y={20}>
                        <WhatsIncluded section={tour.whatsIncluded} />
                      </Reveal>
                    )}
                    {tour.tripHighlights?.heading && (
                      <Reveal y={20}>
                        <TripHighlights section={tour.tripHighlights} />
                      </Reveal>
                    )}
                    {tour.map?.heading && (
                      <Reveal y={20}>
                        <TourMap section={tour.map} />
                      </Reveal>
                    )}
                    {tour.itinerary.heading && tour.itinerary.days.length > 0 && (
                      <Reveal y={20}>
                        <Itinerary section={tour.itinerary} />
                      </Reveal>
                    )}
                    {tour.whereWeStay?.heading && (
                      <Reveal y={20}>
                        <WhereWeStay section={tour.whereWeStay} />
                      </Reveal>
                    )}
                    {tour.faqs?.heading && (
                      <Reveal y={20}>
                        <Faqs section={tour.faqs} />
                      </Reveal>
                    )}
                    {tour.thingsToKnow?.heading && (
                      <Reveal y={20}>
                        <ThingsToKnow section={tour.thingsToKnow} />
                      </Reveal>
                    )}
                    {tour.tips?.heading && (
                      <Reveal y={20}>
                        <Tips section={tour.tips} />
                      </Reveal>
                    )}
                  </>
                )}
              </div>

              <Reveal y={16} delay={60}>
                <div className="mt-6 lg:hidden">
                  <BookingCard
                    booking={tour.booking}
                    comingSoon={tour.comingSoon}
                    reviewAverage={displayAggregate.average}
                    reviewCount={displayAggregate.count}
                  />
                </div>
              </Reveal>
            </div>

            <BookingCardReveal
              booking={tour.booking}
              comingSoon={tour.comingSoon}
              reviewAverage={displayAggregate.average}
              reviewCount={displayAggregate.count}
            />
          </div>
        </div>

        <Reveal y={24}>
          <Testimonials
            reviews={reviews}
            aggregate={aggregate}
            tourSlug={tour.slug}
            tourName={tour.name}
          />
        </Reveal>
        {(tour.tourRadarWidgetUrl || tour.tourRadarWidgetId) && (
          <Reveal y={24}>
            <TourRadarWidget
              widgetId={tour.tourRadarWidgetId}
              widgetUrl={tour.tourRadarWidgetUrl}
              variant="tour"
            />
          </Reveal>
        )}
        {tour.relatedTours?.heading && (
          <Reveal y={24}>
            <RelatedTours section={tour.relatedTours} />
          </Reveal>
        )}
        {communitySection.images.length > 0 && (
          <Reveal y={24}>
            <CommunityGrid section={communitySection} />
          </Reveal>
        )}
      </main>
      <Footer />
    </>
  );
}
