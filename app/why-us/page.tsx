import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import { features, destinations } from "@/data/root";
import DestinationsCarousel from "./_components/DestinationsCarousel";
import {
  whyUsHero,
  whyUsIntro,
  whyUsDestinationsSection,
  whyUsReviewsSection,
  whyUsReviews,
  whyUsFaqsSection,
  whyUsFaqs,
  whyUsCta,
  whyUsInstagram,
  whyUsNewsletter,
} from "@/data/whyUs";

export const metadata: Metadata = {
  title: "Why Us | I'm Here Travels",
  description:
    "Discover why I'm Here Travels is the best choice for your next adventure — small group tours, handpicked destinations, and unforgettable experiences.",
};

/* ---------- Icons ---------- */

function ChevronLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 12L6 8l4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function Hero() {
  return (
    <section className="relative h-65 overflow-hidden md:h-90">
      <Image
        src={whyUsHero.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="font-display text-h1-mobile text-white md:text-h1-desktop">
          {whyUsHero.title}
        </h1>
        <Link
          href={whyUsHero.cta.href}
          className="inline-flex items-center justify-center rounded-full bg-crimson-red px-8 py-3 font-body font-bold text-b2-mobile text-white transition-colors hover:bg-light-red md:px-10 md:text-b2-desktop"
        >
          {whyUsHero.cta.label}
        </Link>
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

function ReviewsSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-sans text-h4-mobile text-midnight md:text-h4-desktop">
          {whyUsReviewsSection.heading}
        </h2>
        <div className="hidden items-center gap-4 md:flex">
          <button
            className="flex size-10 items-center justify-center rounded-full border-[2.5px] border-grey text-grey"
            aria-label="Previous review"
          >
            <ChevronLeft />
          </button>
          <button
            className="flex size-10 items-center justify-center rounded-full border-[2.5px] border-midnight text-midnight"
            aria-label="Next review"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {whyUsReviews.map((r, i) => (
          <li key={i} className="flex flex-col gap-3 rounded-lg bg-white p-10">
            <div className="flex items-start justify-between">
              <span className="font-body text-b2-mobile text-crimson-red md:text-b2-desktop">
                {"★".repeat(r.stars)}
              </span>
              <span className="font-body text-b4-desktop text-dark-gray">
                {r.date}
              </span>
            </div>
            <p className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
              {r.quote}
            </p>
            <div className="mt-2 flex items-center gap-4 border-t border-light-grey pt-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={r.avatar}
                  alt={r.author}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
                  {r.author}
                </span>
                <span className="font-body text-b4-desktop text-dark-gray underline">
                  {r.tour}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <button className="inline-flex items-center justify-center rounded-full border-2 border-midnight px-8 py-3 font-body font-bold text-b2-mobile text-midnight transition-colors hover:bg-midnight hover:text-white md:px-10 md:text-b2-desktop">
          {whyUsReviewsSection.readAll}
        </button>
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
            <Image
              src={img.src}
              alt={img.alt}
              fill
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
            <form className="mt-2 flex flex-col gap-3">
              <input
                type="email"
                placeholder={whyUsNewsletter.inputPlaceholder}
                className="w-full rounded-full border border-grey bg-white px-5 py-3 font-body text-b4-desktop text-midnight placeholder:text-grey focus:border-crimson-red focus:outline-none"
              />
              <p className="font-body text-b4-desktop text-grey">
                {whyUsNewsletter.privacyLabel}{" "}
                <span className="underline hover:text-crimson-red">{whyUsNewsletter.privacyLink}</span>
                .
              </p>
              <button
                type="submit"
                className="mt-1 inline-flex w-fit items-center justify-center self-start rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white hover:bg-light-red"
              >
                {whyUsNewsletter.button}
              </button>
            </form>
          </div>
          {/* Image — flex-1 so it fills exactly the remaining half */}
          <div className="relative flex-1">
            <Image
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

export default function WhyUsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-light-grey">
        <Hero />
        <WhySection />
        <FeaturesSection />
        <DestinationsSection />
        <ReviewsSection />
        <InstagramSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
