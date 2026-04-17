import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/global/Footer";
import {
  travelInfoMetadata,
  travelInfoHero,
  travelInfoIntro,
  travelInfoCards,
} from "@/data/travelInformation";

export const metadata: Metadata = travelInfoMetadata;

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="relative h-65 overflow-hidden md:h-90">
      <Image
        src={travelInfoHero.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <h1 className="font-display text-h1-mobile text-white md:text-h1-desktop">
          {travelInfoHero.title}
        </h1>
      </div>
    </section>
  );
}

function CardsSection() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      {/* Intro */}
      <p className="mx-auto mb-10 max-w-3xl text-center font-body text-b2-mobile text-midnight md:mb-12 md:text-b2-desktop">
        {travelInfoIntro}
      </p>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {travelInfoCards.map((card) => (
          <div
            key={card.id}
            className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-xsmall transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-medium active:-translate-y-1 active:shadow-medium"
          >
            {/* Image */}
            <div className="relative h-70 w-full shrink-0 overflow-hidden">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="flex flex-col gap-2">
                <h2 className="font-sans font-bold text-h5-mobile text-midnight md:text-h5-desktop">
                  {card.title}
                </h2>
                <p className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
                  {card.body}
                </p>
              </div>
              <div className="pt-4">
                <Link
                  href={card.linkHref}
                  className="font-body text-b2-mobile text-midnight underline transition-colors duration-200 hover:text-crimson-red group-hover:text-crimson-red group-active:text-crimson-red md:text-b2-desktop"
                >
                  {card.linkLabel}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function TravelInformationPage() {
  return (
    <>
      <main className="flex-1 bg-light-grey">
        <Hero />
        <CardsSection />
      </main>
      <Footer />
    </>
  );
}
