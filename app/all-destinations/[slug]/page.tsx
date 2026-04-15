import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import Reveal from "@/app/components/global/Reveal";
import FaqAccordion from "@/app/faqs/_components/FaqAccordion";
import HighlightsSection from "./_components/HighlightsSection";
import ReviewsSection from "./_components/ReviewsSection";
import {
  getDestinationBySlug,
  getAllDestinationSlugs,
  type DestinationQuickFact,
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
    title: destination.meta.title,
    description: destination.meta.description,
    openGraph: {
      title: destination.meta.title,
      description: destination.meta.description,
      images: [{ url: destination.heroImage, alt: destination.heroImageAlt }],
      type: "website",
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Quick-fact icon                                                              */
/* -------------------------------------------------------------------------- */

function QuickFactIcon({ icon }: { icon: string }) {
  const cls = "size-5 shrink-0";
  if (icon === "currency")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 14.5c0 1.1.9 2 2 2h2a2 2 0 0 0 0-4h-2a2 2 0 0 1 0-4h2c1.1 0 2 .9 2 2M12 7v2m0 8v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  if (icon === "beer")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 8h11l-1.5 10H6.5L5 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 8V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 10h2a2 2 0 0 1 0 4h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  if (icon === "hello")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 11V6a1.5 1.5 0 0 1 3 0v4m0 0V5a1.5 1.5 0 0 1 3 0v5m0 0V7a1.5 1.5 0 0 1 3 0v5l.5 3A4 4 0 0 1 13.5 19H12a5 5 0 0 1-5-5v-3a1.5 1.5 0 0 1 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  // dish
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="16" rx="8" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 16C4.5 11.5 7.5 8 12 8s7.5 3.5 7.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 8V5m-2 0h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const tours = destination.tourSlugs
    .map((s) => getTourBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getTourBySlug>>[];

  // Derive highlights by merging tripHighlights from every related tour.
  // Falls back to destination.highlights (manual override) if no tour highlights exist.
  const highlights =
    destination.highlights ??
    tours.flatMap((tour) =>
      (tour.tripHighlights?.items ?? []).map((item) => ({
        image: item.image,
        imageAlt: item.imageAlt,
        title: item.title,
        description: item.subtitle,
      })),
    );

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative h-65 w-full overflow-hidden md:h-90">
          <Image
            src={destination.heroImage}
            alt={destination.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <Reveal y={16}>
              <span className="inline-block rounded-full bg-crimson-red px-4 py-1 font-body text-b4-desktop text-white">
                {destination.region}
              </span>
            </Reveal>
            <Reveal y={20} delay={80}>
              <h1 className="font-display text-h1-mobile text-white md:text-h1-desktop">
                {destination.name}
              </h1>
            </Reveal>
            <Reveal y={16} delay={160}>
              <p className="font-body text-b2-mobile text-white/80 md:text-b2-desktop">
                {destination.tourSlugs.length}{" "}
                {destination.tourSlugs.length === 1 ? "tour" : "tours"} available
              </p>
            </Reveal>
            <Reveal y={12} delay={240}>
              <Link
                href={`/tours?destination=${destination.slug}`}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-body font-medium text-midnight transition-colors hover:bg-light-grey"
              >
                View All Tours
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── Quick facts ──────────────────────────────────────────────── */}
        {destination.quickFacts && destination.quickFacts.length > 0 && (
          <section className="border-b border-light-grey bg-white">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-4 overflow-x-auto px-4 py-5 md:gap-8 md:px-8">
              {destination.quickFacts.map((fact: DestinationQuickFact) => (
                <div
                  key={fact.icon}
                  className="flex shrink-0 items-center gap-2.5 rounded-full border border-light-grey px-4 py-2.5 text-midnight"
                >
                  <QuickFactIcon icon={fact.icon} />
                  <div className="text-left">
                    <p className="font-body text-[10px] uppercase tracking-widest text-grey">
                      {fact.label}
                    </p>
                    <p className="font-sans text-b4-desktop font-bold text-midnight">
                      {fact.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Intro / Welcome ──────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-4xl px-4 py-12 text-center md:px-8 md:py-16">
          <Reveal>
            <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
              Welcome to {destination.name}
            </h2>
          </Reveal>
          <div className="mt-6 flex flex-col gap-4">
            {destination.description.map((para, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="font-body text-b2-mobile md:text-b2-desktop text-dark-gray">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Top tours ────────────────────────────────────────────────── */}
        {tours.length > 0 && (
          <section className="bg-light-grey">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
              <div className="mb-8 text-center md:mb-12">
                <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
                  Top {destination.name} Tours
                </h2>
                <p className="mt-3 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                  Small-group adventures — every detail taken care of.
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tours.map((tour, i) => (
                  <Reveal as="li" key={tour.slug} delay={i * 80}>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-small transition-shadow hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red"
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
                          {tour.header.title.split("|").slice(-1)[0]?.trim() ??
                            tour.header.title}
                        </h3>
                        <p className="mt-2 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                          {tour.listingCard.description}
                        </p>
                        <div className="mt-auto flex items-baseline gap-2 pt-5">
                          <span className="font-body text-b4-desktop text-dark-gray">
                            From
                          </span>
                          <span className="font-sans text-h6-mobile md:text-h6-desktop text-midnight">
                            {tour.listingCard.price}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── Highlights carousel ───────────────────────────────────────── */}
        {highlights.length > 0 && (
          <HighlightsSection
            heading={`${destination.name} Highlights`}
            items={highlights}
          />
        )}

        {/* ── Reviews carousel ─────────────────────────────────────────── */}
        {destination.reviews && destination.reviews.length > 0 && (
          <section className="bg-light-grey">
            <ReviewsSection
              heading={`${destination.name} Tour Reviews`}
              items={destination.reviews}
              slug={destination.slug}
            />
          </section>
        )}

        {/* ── Community / Instagram grid ────────────────────────────────── */}
        {destination.community && (
          <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
            <h2 className="mb-8 text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight">
              {destination.community.heading}
            </h2>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
              {destination.community.images.map((img, i) => (
                <li
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-md bg-light-grey"
                >
                  <Link
                    href={img.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={img.alt}
                    className="group block h-full w-full"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-2 top-2 flex size-7 items-center justify-center rounded-full bg-white/90">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="text-crimson-red"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── FAQs ─────────────────────────────────────────────────────── */}
        {destination.faqs && destination.faqs.length > 0 && (
          <section className="bg-light-grey">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
              <h2 className="mb-10 text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight">
                {destination.name} FAQs
              </h2>
              <div
                className="mx-auto rounded-lg bg-white p-6 shadow-small md:p-10"
                style={{ width: "1200px", maxWidth: "100%" }}
              >
                <FaqAccordion
                  items={destination.faqs.map((f) => ({
                    q: f.question,
                    a: f.answer,
                  }))}
                />
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/faqs"
                  className="font-body text-b4-desktop text-crimson-red underline-offset-2 hover:underline"
                >
                  View all FAQs →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── Join our community ───────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto overflow-hidden rounded-lg bg-white shadow-small" style={{ width: "1200px", maxWidth: "100%", height: "640px" }}>
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
                <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
                  Join our community
                </h2>
                <p className="font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                  Stay up to date on the latest news, deals and tours when you sign up.
                </p>
                <form
                  className="flex flex-col gap-3"
                  action="#"
                  method="post"
                  aria-label="Newsletter signup"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-full border border-grey bg-white px-5 py-3 font-body text-b4-desktop text-midnight placeholder:text-grey focus:border-crimson-red focus:outline-none"
                  />
                  <p className="font-body text-b4-desktop text-grey">
                    By submitting you agree with our{" "}
                    <Link
                      href="/privacy-policy"
                      className="underline hover:text-crimson-red"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center self-start rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white hover:bg-light-red"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="relative h-full w-full">
                <Image
                  src="/figma/join-community.jpg"
                  alt="Travelers enjoying a tropical destination"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[center_85%]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
