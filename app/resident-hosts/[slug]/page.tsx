import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/app/components/global/Footer";
import Reveal from "@/app/components/global/Reveal";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import NewsletterForm from "@/app/components/global/NewsletterForm";
import type { Host } from "@/data/hosts";
import { getHostBySlug, getAllHostSlugs } from "@/lib/resident-hosts-firestore";
import { getActiveTourSlugById } from "@/lib/tours-firestore";
import GallerySectionClient from "./_components/GallerySectionClient";
import WhyTravelCarousel from "./_components/WhyTravelCarousel";

export const revalidate = 3600;

/* -------------------------------------------------------------------------- */
/* Static generation                                                            */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return (await getAllHostSlugs()).map((slug) => ({ slug }));
}

const BASE_URL = "https://www.imheretravels.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const host = await getHostBySlug(slug);
  if (!host) return {};
  const url = `${BASE_URL}/resident-hosts/${host.slug}`;
  return {
    title: host.meta.title,
    description: host.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: host.meta.title,
      description: host.meta.description,
      type: "profile",
      url,
      // og:image is supplied by the generated `opengraph-image.tsx` card.
    },
    twitter: {
      card: "summary_large_image",
      title: host.meta.title,
      description: host.meta.description,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Sub-components                                                               */
/* -------------------------------------------------------------------------- */


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
              <ImageWithSkeleton
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
        <ImageWithSkeleton
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
    <section className="relative w-full">
      {/* Red ImHere sticker — right */}
      <div className="pointer-events-none absolute -right-16 -top-20 hidden rotate-15 lg:block" aria-hidden="true">
        <Image src="/Stickers/Print/PNG/ImHere/Print_ImHereCircle_Red.png" alt="" width={300} height={300} className="object-contain" />
      </div>
      {/* Green Globe sticker — left */}
      <div className="pointer-events-none absolute -left-8 -bottom-20 z-20 hidden -rotate-[20deg] lg:block" aria-hidden="true">
        <Image src="/Stickers/Print/PNG/Globe/Print_Globe_Green.png" alt="" width={230} height={230} className="object-contain" />
      </div>
    <div className="mx-auto w-full max-w-5xl px-4 pt-16 pb-12 md:px-8 md:pt-24 md:pb-16">
      <div className={`grid grid-cols-1 items-center gap-8 ${host.profileImage ? "md:grid-cols-[220px_1fr] md:gap-20" : ""}`}>

        {/* Profile column — hidden when no profileImage */}
        {host.profileImage && (
          <Reveal>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="relative h-64 w-64 overflow-hidden rounded-full ring-4 ring-white shadow-medium">
                <ImageWithSkeleton
                  src={host.profileImage}
                  alt={host.displayName}
                  fill
                  rounded="full"
                  sizes="256px"
                  className="object-cover object-top"
                />
              </div>
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
        )}

        {/* Content column */}
        <div className={!host.profileImage ? "text-center" : ""}>
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
    </div>
    </section>
  );
}

function UpcomingTripsSection({ host, trips }: { host: Host; trips: Host["upcomingTrips"] }) {
  return (
    <section id="upcoming-trips" className="relative z-0 bg-light-grey">
      {/* Orange Heart Circle sticker — bottom-right, behind cards */}
      <div className="pointer-events-none absolute -bottom-20 -right-20 -z-10 hidden rotate-12 lg:block" aria-hidden="true">
        <Image src="/Stickers/Print/PNG/Heart-Circle/Print_Heart_Circle_Orange.png" alt="" width={250} height={250} className="object-contain" />
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
            Upcoming Trips with {host.displayName}
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip, i) => {
            const isTBA = !trip.duration;
            const inner = (
              <>
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {trip.image ? (
                    <ImageWithSkeleton
                      src={trip.image}
                      alt={trip.imageAlt ?? trip.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-cover transition-transform duration-300 group-hover:scale-105 ${isTBA ? "brightness-75" : ""}`}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-grey/20" />
                  )}
                  {/* Duration / Coming Soon pill — overlaid on image */}
                  <div className="absolute bottom-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-b4-desktop backdrop-blur-sm ${isTBA ? "bg-midnight/60 text-white/80" : "bg-white/90 text-midnight shadow-xxsmall"}`}>
                      <Image src="/Icons/SVG/Pin/pin-solid-red.svg" alt="" width={12} height={12} />
                      {isTBA ? "Coming Soon" : trip.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className={`font-sans text-h5-mobile md:text-h5-desktop transition-colors ${isTBA ? "text-dark-gray" : "text-midnight group-hover:text-crimson-red"}`}>
                    {trip.name}
                  </h3>
                  {trip.description && (
                    <p className="mt-2 line-clamp-2 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                      {trip.description}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="mt-auto pt-5 flex items-end justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      {!isTBA && trip.dates && trip.dates !== "TBA" && (
                        <span className="font-body text-b4-desktop text-dark-gray">
                          {trip.dates}
                        </span>
                      )}
                      {trip.price ? (
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-body text-b4-desktop text-dark-gray">From</span>
                            <span className="font-sans text-h6-mobile md:text-h6-desktop text-midnight">
                              {trip.price}
                            </span>
                          </div>
                          {trip.priceNote && (
                            <p className="mt-0.5 font-body text-b4-mobile text-grey">
                              *{trip.priceNote}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="font-body text-b4-desktop text-grey italic">Dates &amp; pricing TBA</span>
                      )}
                    </div>

                    {trip.tourSlug && !isTBA && (
                      <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-crimson-red px-4 py-2 font-body text-b4-desktop font-medium text-white transition-colors group-hover:bg-light-red">
                        View Tour
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-px"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    )}
                  </div>
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
      <div className="mb-10 text-center">
        <Reveal>
          <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
            Why Travel With Us
          </h2>
        </Reveal>
      </div>
      <WhyTravelCarousel points={host.whyTravel} notes={host.whyTravelNotes} />
    </section>
  );
}

function GallerySection({ host }: { host: Host }) {
  const slides = host.gallerySlides ?? [];
  // A host may have no gallery (e.g. newly created in the admin). Render nothing
  // rather than the empty "Real Moments" section (and avoid a render crash).
  if (slides.length === 0) return null;
  return <GallerySectionClient slides={slides} />;
}

function HowItWorksSection({ host }: { host: Host }) {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      {/* Red Flag Outline sticker — sits at circle height so step 4 overlays it */}
      <div className="pointer-events-none absolute -right-4 -top-12 hidden rotate-10 lg:block" aria-hidden="true">
        <Image src="/Stickers/Print/PNG/Flag-Outline/Print_Flag_Outline_Red.png" alt="" width={250} height={250} className="object-contain" />
      </div>
      <div className="mb-12 text-center">
        <Reveal>
          <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
            How It Works
          </h2>
        </Reveal>
      </div>

      <ul className="relative grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-0">
        {/* Dashed connector line spanning circle centers — desktop only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute hidden md:block"
          style={{ top: 28, left: "12.5%", right: "12.5%", borderTop: "2px dashed #d1d5db" }}
        />

        {host.howItWorks.map((step, i) => (
          <Reveal as="li" key={i} delay={i * 100}>
            <div className="flex flex-col items-center text-center">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-crimson-red shadow-small">
                <span className="font-display text-h4-mobile text-white leading-none">
                  {i + 1}
                </span>
              </div>
              <p className="mt-5 px-2 font-sans font-bold text-b2-mobile md:text-b2-desktop text-midnight">
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
            <NewsletterForm
              formClassName="flex flex-col gap-3"
              buttonClassName="inline-flex items-center justify-center self-start rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white hover:bg-light-red"
            />
          </div>
          <div className="relative h-full w-full">
            <ImageWithSkeleton
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
  const host = await getHostBySlug(slug);
  if (!host) notFound();

  // Resolve each trip's linked tour by ID → current slug so "View Tour" links
  // survive tour renames; fall back to the stored slug when there's no ID.
  //
  // Visibility: a real trip card only shows while its linked tour is *active*.
  // That means draft/scheduled tours (not yet published) and archived tours
  // both drop off this page until they go live — a tour scheduled to publish
  // later won't appear here until the publish time flips it to active.
  // Coming-Soon / TBA placeholder cards (no duration, or comingSoon) always
  // show; cards with no tour link at all are left untouched.
  const tourSlugById = await getActiveTourSlugById();
  const activeTourSlugs = new Set(Object.values(tourSlugById));
  const resolvedTrips = host.upcomingTrips
    .filter((trip) => {
      if (trip.comingSoon || !trip.duration) return true; // placeholder card
      if (trip.tourId) return Boolean(tourSlugById[trip.tourId]); // linked by id
      if (trip.tourSlug) return activeTourSlugs.has(trip.tourSlug); // linked by slug
      return true; // no tour link — leave as-is
    })
    .map((trip) => ({
      ...trip,
      tourSlug: trip.tourId ? tourSlugById[trip.tourId] ?? trip.tourSlug : trip.tourSlug,
    }));

  return (
    <>
      <main className="flex-1 overflow-x-clip">
        <HeroSection host={host} />

        {host.comingSoon ? (
          <ComingSoonSection host={host} />
        ) : (
          <>
            <IntroSection host={host} />
            <UpcomingTripsSection host={host} trips={resolvedTrips} />
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
