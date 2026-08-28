import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/global/Footer";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import NewsletterForm from "@/app/components/global/NewsletterForm";

const BASE_URL = "https://www.imheretravels.com";

export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
  },
};
import Reveal from "@/app/components/global/Reveal";
import HeroTitle from "@/app/components/global/HeroTitle";
import { hero, destinations, features } from "@/data/root";
import DestinationsMarquee from "@/app/components/global/DestinationsMarquee";
import NewToursCarousel from "@/app/components/home/NewToursCarousel";
import ReviewCard from "@/app/components/reviews/ReviewCard";
import Stars from "@/app/components/reviews/Stars";
import { getNewTours } from "@/lib/tours-firestore";
import {
  computeReviewAggregate,
  getAllPublishedReviews,
  getFeaturedReviews,
} from "@/lib/reviews-firestore";
import type { PublicReview } from "@/types/review";

// Homepage tours + reviews come from Firestore; refresh hourly like /tours.
export const revalidate = 3600;

/* -------------------------------------------------------------------------- */
/* Shared UI                                                                   */
/* -------------------------------------------------------------------------- */

function PillButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 font-body font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-crimson-red text-white hover:bg-light-red"
      : "border border-midnight text-midnight hover:bg-midnight hover:text-white";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Sections                                                                    */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative w-full">
      <div className="relative overflow-hidden">
        <div className="relative h-[55vh] w-full md:h-[60vh]">
          <ImageWithSkeleton
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-white md:gap-6">
          <Reveal y={12} delay={0}>
            <svg
              width="136"
              height="36"
              viewBox="0 0 136 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label={hero.badge}
              role="img"
            >
              <path
                d="M17,1 H119 A16,16 0 0,1 135,17 V35 H17 A16,16 0 0,1 1,19 V17 A16,16 0 0,1 17,1 Z"
                fill="#26D07C"
                stroke="#1C1F2A"
                strokeWidth="2"
              />
              <text
                x="68"
                y="23"
                textAnchor="middle"
                fill="#1C1F2A"
                fontFamily="DM Sans, sans-serif"
                fontSize="11"
                fontWeight="700"
                letterSpacing="1.8"
              >
                {hero.badge}
              </text>
            </svg>
          </Reveal>
          <HeroTitle
            text={hero.title}
            className="font-display text-h1-mobile md:text-h1-desktop"
          />
          <Reveal delay={900}>
            <PillButton href={hero.cta.href} className="mt-2">
              {hero.cta.label}
            </PillButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Destinations() {
  return (
    <section
      id="destinations"
      className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14"
    >
      <Reveal>
        <h2 className="mb-8 text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight md:mb-12">
          Your next destination
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <DestinationsMarquee items={destinations} />
      </Reveal>
    </section>
  );
}

/**
 * Real published reviews from `tourReviews`, rendered with the same card the
 * /reviews hub uses, plus the overall rating and a link into the hub.
 *
 * The whole section is omitted when there are no published reviews — an empty
 * "What people say about us" heading reads worse than no section at all.
 */
function Testimonials({
  reviews,
  aggregate,
}: {
  reviews: PublicReview[];
  aggregate: { average: number; count: number };
}) {
  if (reviews.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <Reveal>
        <h2 className="text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight">
          What people say about us
        </h2>
      </Reveal>
      {aggregate.count > 0 && (
        <Reveal delay={60}>
          <div className="mt-4 mb-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:mb-12">
            <Stars count={aggregate.average} />
            <span className="font-sans text-h6-mobile md:text-h6-desktop font-bold text-midnight">
              {aggregate.average.toFixed(1)}
            </span>
            <span className="font-body text-b4-desktop text-dark-gray">
              from {aggregate.count} traveller{aggregate.count === 1 ? "" : "s"}
            </span>
          </div>
        </Reveal>
      )}
      <ul className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <Reveal as="li" delay={i * 80} key={review.id}>
            <ReviewCard review={review} showTour as="div" />
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-10 flex justify-center" delay={reviews.length * 80 + 120}>
        <PillButton href="/reviews">
          {aggregate.count > 0
            ? `Read all ${aggregate.count} reviews`
            : "Read all reviews"}
        </PillButton>
      </Reveal>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14"
    >
      <Reveal>
        <h2 className="mb-10 text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight md:mb-14">
          Why choose us?
        </h2>
      </Reveal>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature, i) => (
          <Reveal
            as="li"
            delay={i * 80}
            key={feature.title}
            className="flex flex-col items-center gap-6 rounded-lg bg-white px-8 py-10 text-center shadow-small"
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={120}
              height={120}
              className="size-28 object-contain"
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-sans font-bold text-h5-mobile md:text-h5-desktop text-midnight">
                {feature.title}
              </h3>
              <p className="font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                {feature.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-10 flex justify-center" delay={features.length * 80 + 120}>
        <PillButton href="/why-us" variant="outline">
          Learn more
        </PillButton>
      </Reveal>
    </section>
  );
}

function JoinCommunity() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <Reveal>
        <div
          className="overflow-hidden rounded-lg bg-white shadow-small"
          style={{ width: "1200px", maxWidth: "100%", height: "640px" }}
        >
          <div className="grid h-full grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
            <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
              Join our community
            </h2>
            <p className="font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
              Stay up to date on the latest news, deals and tours when you sign
              up.
            </p>
            <NewsletterForm />
          </div>
          <div className="relative h-full w-full">
            <ImageWithSkeleton
              src="/figma/join-community.jpg"
              alt="Travelers enjoying a tropical beach"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[center_85%]"
            />
          </div>
        </div>
        </div>
      </Reveal>
    </section>
  );
}


/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default async function Home() {
  const [newTours, featuredReviews, allReviews] = await Promise.all([
    getNewTours(8),
    getFeaturedReviews(3),
    getAllPublishedReviews(),
  ]);

  // Display rating spans every source (Google/TourRadar included) — it's a
  // teaser into /reviews, not the first-party AggregateRating used in JSON-LD.
  const aggregate = computeReviewAggregate(allReviews);

  const tourCards = newTours.map((tour) => ({
    title: tour.name,
    duration: tour.listingCard.duration,
    description: tour.listingCard.description,
    price: tour.listingCard.price,
    image: tour.listingCard.image,
    href: `/tours/${tour.slug}`,
  }));

  return (
    <>
      <main className="flex-1">
        <Hero />
        {tourCards.length > 0 && <NewToursCarousel tours={tourCards} />}
        <Destinations />
        <Testimonials reviews={featuredReviews} aggregate={aggregate} />
        <WhyChooseUs />
        <JoinCommunity />
      </main>
      <Footer />
    </>
  );
}
