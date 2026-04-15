import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import Reveal from "@/app/components/global/Reveal";
import { getAllDestinations } from "@/data/destinations";
import { getAllTours } from "@/data/tours";

export const metadata: Metadata = {
  title: "All Destinations — I'm Here Travels",
  description:
    "Explore the world with I'm Here Travels. Discover small-group tours across the Philippines, Japan, India, Maldives, New Zealand and more — adventures built for curious, social travellers.",
  openGraph: {
    title: "All Destinations — I'm Here Travels",
    description:
      "Discover small-group adventures across Southeast Asia, East Asia, South Asia, Africa, Oceania and South America.",
    type: "website",
  },
};

export default function AllDestinationsPage() {
  const destinations = getAllDestinations();
  const featuredTours = getAllTours().slice(0, 6);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ── Hero band ──────────────────────────────────────────────────── */}
        <section className="bg-midnight px-4 py-14 text-white md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h1 className="font-display text-h1-mobile md:text-h1-desktop">
                All Destinations
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 max-w-2xl font-body text-b2-mobile md:text-b2-desktop text-white/80">
                From tropical archipelagos to Himalayan kingdoms — explore every
                corner of the world with a group of like-minded travellers.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Destination cards grid ─────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
            Browse by destination
          </h2>
          <p className="mt-3 max-w-xl font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
            Each destination page lists every available tour, key travel info,
            and local tips to help you plan.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {destinations.map((dest, i) => (
              <Reveal as="li" key={dest.slug} delay={i * 50}>
                <Link
                  href={`/all-destinations/${dest.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-small transition-shadow hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={dest.heroImage}
                      alt={dest.heroImageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-body text-b4-desktop text-midnight">
                      {dest.region}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-5">
                    <h3 className="font-sans text-h5-mobile md:text-h5-desktop text-midnight group-hover:text-crimson-red">
                      {dest.name}
                    </h3>
                    <p className="font-body text-b4-desktop text-dark-gray">
                      {dest.tourSlugs.length}{" "}
                      {dest.tourSlugs.length === 1 ? "tour" : "tours"}{" "}
                      available
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ── Featured tours strip ───────────────────────────────────────── */}
        <section className="bg-light-grey">
          <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
            <div className="mb-8 flex items-end justify-between md:mb-12">
              <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
                Featured tours
              </h2>
              <Link
                href="/tours"
                className="font-body text-b4-desktop text-crimson-red underline-offset-2 hover:underline"
              >
                View all tours
              </Link>
            </div>

            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredTours.map((tour, i) => (
                <Reveal as="li" key={tour.slug} delay={i * 70}>
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-small transition-shadow hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
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

            <div className="mt-10 flex justify-center">
              <Link
                href="/tours"
                className="inline-flex items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white transition-colors hover:bg-light-red"
              >
                View all tours
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
