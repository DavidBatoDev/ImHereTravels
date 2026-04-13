import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/app/components/global/Header";
import ShareButton from "./_components/ShareButton";
import { getAllTourSlugs, getTourBySlug } from "@/data/tours";
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
import Testimonials from "./_components/Testimonials";
import RelatedTours from "./_components/RelatedTours";
import CommunityGrid from "./_components/CommunityGrid";
import BookingCard from "./_components/BookingCard";

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
  };
}

export default async function TourDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumbs tourName={tour.name} />

        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
            <div className="min-w-0">
              <div className="mt-2 flex items-start justify-between gap-4 md:mt-4">
                <h1 className="font-display text-h2-mobile md:text-h2-desktop text-midnight">
                  {tour.name}
                </h1>
                <div className="shrink-0 pt-3 md:pt-4">
                  <ShareButton title={tour.header.title} />
                </div>
              </div>

              <div className="mt-6 md:mt-8">
                <TourGallery gallery={tour.gallery} />
              </div>

              <div className="mt-6 rounded-lg bg-white px-5 py-8 md:px-10 md:py-10">
                <TourHeader header={tour.header} />
                {tour.keyFacts.length > 0 && <KeyFacts items={tour.keyFacts} />}
                {tour.whatsIncluded && (
                  <WhatsIncluded section={tour.whatsIncluded} />
                )}
                {tour.tripHighlights && (
                  <TripHighlights section={tour.tripHighlights} />
                )}
                {tour.map && <TourMap section={tour.map} />}
                {tour.itinerary.days.length > 0 && (
                  <Itinerary section={tour.itinerary} />
                )}
                {tour.whereWeStay && (
                  <WhereWeStay section={tour.whereWeStay} />
                )}
                {tour.faqs && <Faqs section={tour.faqs} />}
                {tour.thingsToKnow && (
                  <ThingsToKnow section={tour.thingsToKnow} />
                )}
              </div>

              <div className="mt-6 lg:hidden">
                <BookingCard booking={tour.booking} />
              </div>
            </div>

            <div className="hidden lg:block lg:pt-6">
              <BookingCard booking={tour.booking} sticky />
            </div>
          </div>
        </div>

        {tour.testimonials && <Testimonials section={tour.testimonials} />}
        {tour.relatedTours && <RelatedTours section={tour.relatedTours} />}
        {tour.community && <CommunityGrid section={tour.community} />}
      </main>
    </>
  );
}
