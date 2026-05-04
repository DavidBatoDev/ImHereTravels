import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/app/components/global/Footer";
import ShareButton from "./_components/ShareButton";
import { getAllTourSlugs, getTourBySlug } from "@/data/tours";
import type { Tour } from "@/types/tour";
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
import RelatedTours from "./_components/RelatedTours";
import CommunityGrid from "./_components/CommunityGrid";
import BookingCard from "./_components/BookingCard";
import TourViewRecorder from "./_components/TourViewRecorder";
import Reveal from "@/app/components/global/Reveal";
import BookingCardReveal from "./_components/BookingCardReveal";

const BASE_URL = "https://www.imheretravels.com";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllTourSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
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
      images: [{ url: tour.gallery.hero, alt: tour.gallery.heroAlt }],
    },
  };
}

function buildTourJsonLd(tour: Tour) {
  const durationFact = tour.keyFacts.find((f) => f.label === "Duration");
  const routeFact = tour.keyFacts.find((f) => f.label === "Route");
  const groupFact = tour.keyFacts.find((f) => f.label === "Group Size");

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
        "@type": "TouristTrip",
        "@id": `${BASE_URL}/tours/${tour.slug}`,
        name: tour.meta.title,
        description: tour.meta.description,
        url: `${BASE_URL}/tours/${tour.slug}`,
        image: `${BASE_URL}${tour.gallery.hero}`,
        provider: { "@id": `${BASE_URL}/#organization` },
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
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildTourJsonLd(tour)) }}
      />
      <main className="flex-1">
        <TourViewRecorder slug={tour.slug} />
        <Breadcrumbs tourName={tour.name} />

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
                  <div className="shrink-0 pt-3 md:pt-4">
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
                  <TourHeader header={tour.header} />
                </Reveal>
                {tour.keyFacts.length > 0 && (
                  <Reveal y={20} delay={60}>
                    <KeyFacts items={tour.keyFacts} tourSlug={tour.slug} />
                  </Reveal>
                )}
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
              </div>

              <Reveal y={16} delay={60}>
                <div className="mt-6 lg:hidden">
                  <BookingCard booking={tour.booking} />
                </div>
              </Reveal>
            </div>

            <BookingCardReveal booking={tour.booking} />
          </div>
        </div>

        <Reveal y={24}>
          <Testimonials />
        </Reveal>
        {tour.relatedTours?.heading && (
          <Reveal y={24}>
            <RelatedTours section={tour.relatedTours} />
          </Reveal>
        )}
        {tour.community?.heading && (
          <Reveal y={24}>
            <CommunityGrid section={tour.community} />
          </Reveal>
        )}
      </main>
      <Footer />
    </>
  );
}
