import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/global/Footer";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import NewsletterForm from "@/app/components/global/NewsletterForm";
import { features, destinations } from "@/data/root";
import DestinationsCarousel from "./_components/DestinationsCarousel";
import {
  whyUsHero,
  whyUsIntro,
  whyUsDestinationsSection,
  whyUsReviewsSection,
  whyUsFaqsSection,
  whyUsFaqs,
  whyUsCta,
  whyUsInstagram,
  whyUsNewsletter,
} from "@/data/whyUs";
import { getAllTours } from "@/lib/tours-firestore";
import { getAllDestinations } from "@/lib/destinations-firestore";
import {
  computeReviewAggregate,
  getAllPublishedReviews,
  getFeaturedReviews,
} from "@/lib/reviews-firestore";
import ReviewCard from "@/app/components/reviews/ReviewCard";
import Stars from "@/app/components/reviews/Stars";
import type { PublicReview } from "@/types/review";

// Hero stats come from Firestore; refresh hourly like the other data pages.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Why Choose I'm Here Travels for Your Next Group Tour",
  description:
    "Small groups. Handpicked routes. Real local experiences. Discover why thousands of travellers choose I'm Here Travels for their next adventure across Asia, Africa and beyond.",
  openGraph: {
    title: "Why Choose I'm Here Travels for Your Next Group Tour",
    description:
      "Small groups. Handpicked routes. Real local experiences. Discover why thousands of travellers choose I'm Here Travels for their next adventure.",
    type: "website",
  },
};

/* ---------- Icons ---------- */

function ChevronDown() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 7.5l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ---------- Sections ---------- */

/**
 * Page hero. Deliberately built on the same bones as every other hero on the
 * site (`/contact-us`, `/faqs`, `/about-us`, home): full-bleed image, one flat
 * `bg-black/40` scrim, centered `font-display` H1 over it. What's extra here —
 * a subtitle, a second CTA and a live stat strip — sits inside that same
 * centered column so the page reads as a richer member of the family rather
 * than a different design.
 *
 * Height matches the home hero (55/60vh) rather than the 260/360px strip the
 * utility pages use, because this is a landing page, not a section header.
 */
function Hero({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <section className="relative h-[55vh] min-h-[26rem] overflow-hidden md:h-[60vh]">
      <ImageWithSkeleton
        src={whyUsHero.image}
        alt={whyUsHero.imageAlt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-[center_60%]"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="max-w-3xl font-display text-h1-mobile text-white md:text-h1-desktop">
          {whyUsHero.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={whyUsHero.cta.href}
            className="inline-flex items-center justify-center rounded-full bg-crimson-red px-8 py-3 font-body font-bold text-b2-mobile text-white transition-colors hover:bg-light-red md:px-10 md:text-b2-desktop"
          >
            {whyUsHero.cta.label}
          </Link>
          <Link
            href={whyUsHero.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-full border border-white/70 px-8 py-3 font-body font-bold text-b2-mobile text-white transition-colors hover:bg-white hover:text-midnight md:px-10 md:text-b2-desktop"
          >
            {whyUsHero.secondaryCta.label}
          </Link>
        </div>

        {stats.length > 0 && (
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {stats.map((stat) => (
              <li key={stat.label} className="flex items-baseline gap-2">
                <span className="font-sans text-h6-mobile font-bold text-white md:text-h6-desktop">
                  {stat.value}
                </span>
                <span className="font-body text-b4-desktop text-white/80">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12 text-center md:py-16">
      <h2 className="font-sans text-h4-mobile text-midnight md:text-h4-desktop">
        {whyUsIntro.heading}
      </h2>
      <p className="mt-4 font-body text-b2-desktop text-midnight md:text-b1">
        {whyUsIntro.body}
      </p>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-8 md:pb-16">
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((f) => (
          <li
            key={f.title}
            className="flex flex-col items-center gap-8 rounded-lg bg-white px-10 py-12 text-center"
          >
            <div className="relative size-30 shrink-0">
              <Image
                src={f.icon}
                alt=""
                fill
                sizes="120px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-sans text-h4-mobile text-midnight md:text-h4-desktop">
                {f.title}
              </h3>
              <p className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
                {f.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function DestinationsSection() {
  return (
    <DestinationsCarousel
      heading={whyUsDestinationsSection.heading}
      items={destinations}
    />
  );
}

/** Real published reviews (same card as /reviews), with a live link to the hub. */
function ReviewsSection({
  reviews,
  aggregate,
}: {
  reviews: PublicReview[];
  aggregate: { average: number; count: number };
}) {
  if (reviews.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-sans text-h4-mobile text-midnight md:text-h4-desktop">
          {whyUsReviewsSection.heading}
        </h2>
        {aggregate.count > 0 && (
          <div className="flex items-center gap-2">
            <Stars count={aggregate.average} />
            <span className="font-sans text-h6-desktop font-bold text-midnight">
              {aggregate.average.toFixed(1)}
            </span>
            <span className="font-body text-b4-desktop text-dark-gray">
              from {aggregate.count} traveller{aggregate.count === 1 ? "" : "s"}
            </span>
          </div>
        )}
      </div>
      <ul className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} showTour />
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <Link
          href="/reviews"
          className="inline-flex items-center justify-center rounded-full border-2 border-midnight px-8 py-3 font-body font-bold text-b2-mobile text-midnight transition-colors hover:bg-midnight hover:text-white md:px-10 md:text-b2-desktop"
        >
          {whyUsReviewsSection.readAll}
        </Link>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <h2 className="mb-8 text-center font-sans text-h4-mobile text-midnight md:text-h4-desktop">
        With {whyUsInstagram.handle}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {whyUsInstagram.images.map((img, i) => (
          <Link
            key={i}
            href={whyUsInstagram.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={img.alt}
            className="group relative aspect-square overflow-hidden rounded-lg"
          >
            <ImageWithSkeleton
              src={img.src}
              alt={img.alt}
              fill
              rounded="lg"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute left-2 top-2 rounded-full bg-white/80 p-1 text-midnight">
              <InstagramIcon />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="overflow-hidden rounded-lg bg-white px-6 py-12 md:px-16 md:py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-h2-mobile text-midnight md:text-h2-desktop">
            {whyUsCta.heading}
          </h2>
          <p className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
            {whyUsCta.body}
          </p>
          <Link
            href={whyUsCta.button.href}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-crimson-red px-8 py-3 font-body font-bold text-b2-mobile text-white transition-colors hover:bg-light-red md:px-10 md:text-b2-desktop"
          >
            {whyUsCta.button.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-8 md:pb-24">
      <div
        className="overflow-hidden rounded-lg bg-white shadow-small"
        style={{ width: "1200px", maxWidth: "100%", height: "640px" }}
      >
        <div className="flex h-full flex-col md:flex-row">
          {/* Text + form */}
          <div className="flex flex-col justify-center gap-4 p-8 md:w-1/2 md:shrink-0 md:p-12">
            <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
              {whyUsNewsletter.heading}
            </h2>
            <p className="font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
              {whyUsNewsletter.body}
            </p>
            <NewsletterForm buttonClassName="mt-1 inline-flex w-fit items-center justify-center self-start rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white hover:bg-light-red" />
          </div>
          {/* Image — flex-1 so it fills exactly the remaining half */}
          <div className="relative flex-1">
            <ImageWithSkeleton
              src={whyUsNewsletter.image}
              alt="Travel experience"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[center_85%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default async function WhyUsPage() {
  const [allTours, allDestinations, allReviews, featuredReviews] =
    await Promise.all([
      getAllTours(),
      getAllDestinations(),
      getAllPublishedReviews(),
      getFeaturedReviews(3),
    ]);
  const aggregate = computeReviewAggregate(allReviews);

  // Only stats we can actually back with data make it into the banner.
  const heroStats = [
    allTours.length > 0
      ? { value: `${allTours.length}`, label: "small-group tours" }
      : null,
    allDestinations.length > 0
      ? { value: `${allDestinations.length}`, label: "destinations" }
      : null,
    aggregate.count > 0
      ? {
          value: `${aggregate.average.toFixed(1)}★`,
          label: `from ${aggregate.count} reviews`,
        }
      : null,
  ].filter((s): s is { value: string; label: string } => s !== null);

  return (
    <>
      <main className="flex-1 bg-light-grey">
        <Hero stats={heroStats} />
        <WhySection />
        <FeaturesSection />
        <DestinationsSection />
        <ReviewsSection reviews={featuredReviews} aggregate={aggregate} />
        <InstagramSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
