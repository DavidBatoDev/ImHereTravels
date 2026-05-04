import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/app/components/global/Footer";
import Reveal from "@/app/components/global/Reveal";
import { getHostBySlug, getAllHostSlugs, type Host } from "@/data/hosts";
import WhyTravelInteractive from "./_components/WhyTravelInteractive";
import TripMomentsGallery from "./_components/TripMomentsGallery";

/* -------------------------------------------------------------------------- */
/* Static generation                                                            */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return getAllHostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const host = getHostBySlug(slug);
  if (!host) return {};
  return {
    title: host.meta.title,
    description: host.meta.description,
  };
}

/* -------------------------------------------------------------------------- */
/* Sub-components                                                               */
/* -------------------------------------------------------------------------- */

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-crimson-red"
    >
      <circle cx="9" cy="9" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 9l2.5 2.5L12.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Sections                                                                     */
/* -------------------------------------------------------------------------- */

function HeroSection({ host }: { host: Host }) {
  const hasTriPanel = host.heroImages && host.heroImages.length === 3;

  return (
    <section className="relative h-65 w-full overflow-hidden md:h-90">
      {hasTriPanel ? (
        <div className="absolute inset-0 grid grid-cols-3">
          {host.heroImages!.map((src, i) => (
            <div key={i} className="relative h-full w-full overflow-hidden">
              <Image
                src={src}
                alt={host.heroImageAlt}
                fill
                priority={i === 0}
                sizes="33vw"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      ) : host.heroImage ? (
        <Image
          src={host.heroImage}
          alt={host.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-crimson-red" />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <Reveal y={20}>
          <h1 className="font-display text-h1-mobile text-white md:text-h1-desktop">
            {host.pageTitle}
          </h1>
        </Reveal>
        {!host.comingSoon && (
          <Reveal y={12} delay={160}>
            <a
              href="#upcoming-trips"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-body font-medium text-midnight transition-colors hover:bg-light-grey"
            >
              View Upcoming Trips
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function ComingSoonSection({ host }: { host: Host }) {
  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-24 text-center md:px-8">
      <Reveal>
        <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
          Coming Soon
        </h2>
      </Reveal>
      <Reveal delay={80}>
        <p className="mt-4 font-body text-b2-mobile md:text-b2-desktop text-dark-gray">
          Exciting trips with {host.displayName} are on the way — check back soon!
        </p>
      </Reveal>
      <Reveal delay={160}>
        <Link
          href="/tours"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white hover:bg-light-red"
        >
          Browse All Tours
        </Link>
      </Reveal>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function IntroSection({ host }: { host: Host }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 md:px-8 md:py-16">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[220px_1fr] md:gap-20">

        {/* Profile column */}
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            {host.profileImage ? (
              <div className="relative h-64 w-64 overflow-hidden rounded-full ring-4 ring-white shadow-medium">
                <Image
                  src={host.profileImage}
                  alt={host.displayName}
                  fill
                  sizes="256px"
                  className="object-cover object-top"
                />
              </div>
            ) : (
              <div className="h-44 w-44 rounded-full bg-grey/20" />
            )}
            <p className="font-sans text-h6-mobile md:text-h6-desktop text-midnight font-bold">
              {host.displayName}
            </p>
            {host.instagram && (
              <a
                href={`https://instagram.com/${host.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-body text-b4-desktop text-dark-gray hover:text-crimson-red transition-colors"
              >
                <InstagramIcon />
                {host.instagram}
              </a>
            )}
          </div>
        </Reveal>

        {/* Content column */}
        <div>
          <Reveal>
            <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
              {host.pageTitle}
            </h2>
          </Reveal>
          <div className="mt-5 flex flex-col gap-4">
            {host.intro.map((para, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="font-body text-b2-mobile md:text-b2-desktop text-dark-gray">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function UpcomingTripsSection({ host }: { host: Host }) {
  return (
    <section id="upcoming-trips" className="bg-light-grey">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
            Upcoming Trips with {host.displayName}
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {host.upcomingTrips.map((trip, i) => {
            const inner = (
              <>
                {trip.image && (
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={trip.image}
                      alt={trip.imageAlt ?? trip.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="font-sans text-h5-mobile md:text-h5-desktop text-midnight group-hover:text-crimson-red">
                    {trip.name}
                  </h3>
                  <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-light-grey px-3 py-1 font-body text-b4-desktop text-crimson-red">
                    {trip.dates}
                  </span>
                  {trip.tourSlug && (
                    <p className="mt-auto pt-5 font-body text-b4-desktop text-dark-gray group-hover:text-crimson-red">
                      View tour details →
                    </p>
                  )}
                </div>
              </>
            );

            return (
              <Reveal as="li" key={trip.name} delay={i * 80}>
                {trip.tourSlug ? (
                  <Link
                    href={`/tours/${trip.tourSlug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-small transition-shadow hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-small">
                    {inner}
                  </div>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function WhyTravelSection({ host }: { host: Host }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto overflow-hidden rounded-lg bg-white shadow-small" style={{ maxWidth: "1200px" }}>
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:gap-8 md:p-8">
          <div className="flex flex-col justify-center">
            <Reveal>
              <h2 className="font-sans text-h4-mobile md:text-h4-desktop text-midnight">
                Why Travel With Us
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <WhyTravelInteractive points={host.whyTravel} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GallerySection({ host }: { host: Host }) {
  return (
    <section className="bg-light-grey">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <h2 className="mb-8 text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight">
          Real Moments from Our Trips
        </h2>

        <TripMomentsGallery />
      </div>
    </section>
  );
}

function HowItWorksSection({ host }: { host: Host }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="mb-10 text-center">
        <Reveal>
          <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
            How It Works
          </h2>
        </Reveal>
      </div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {host.howItWorks.map((step, i) => (
          <Reveal as="li" key={i} delay={i * 80}>
            <div className="flex flex-col gap-3 rounded-lg bg-white p-6 shadow-small h-full">
              <span className="font-display text-h2-mobile md:text-h2-desktop text-crimson-red leading-none">
                {i + 1}
              </span>
              <p className="font-body text-b2-mobile md:text-b2-desktop text-dark-gray">
                {step}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div
        className="mx-auto overflow-hidden rounded-lg bg-white shadow-small"
        style={{ width: "1200px", maxWidth: "100%", height: "640px" }}
      >
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
              alt="Travelers enjoying a destination together"
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

/* -------------------------------------------------------------------------- */
/* Page                                                                         */
/* -------------------------------------------------------------------------- */

export default async function ResidentHostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const host = getHostBySlug(slug);
  if (!host) notFound();

  return (
    <>
      <main className="flex-1">
        <HeroSection host={host} />

        {host.comingSoon ? (
          <ComingSoonSection host={host} />
        ) : (
          <>
            <IntroSection host={host} />
            <UpcomingTripsSection host={host} />
            <WhyTravelSection host={host} />
            <GallerySection host={host} />
            <HowItWorksSection host={host} />
          </>
        )}

        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
