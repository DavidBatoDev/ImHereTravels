import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/global/Footer";
import PreDepartureWidget from "@/app/components/PreDepartureWidget";
import {
  preDepartureMetadata,
  preDepartureHero,
  preDepartureIntro,
  preDepartureSections,
  govtAdviceSection,
  preDepartureCta,
} from "@/data/preDeparture";

export const metadata: Metadata = preDepartureMetadata;

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative h-65 w-full overflow-hidden md:h-90">
      <Image
        src={preDepartureHero.image}
        alt="Pre-departure Information"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <h1 className="font-display text-h1-mobile text-white md:text-h1-desktop">
          {preDepartureHero.title}
        </h1>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Intro Card                                                                  */
/* -------------------------------------------------------------------------- */

function IntroCard() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-12">
      <div className="rounded-lg bg-white p-8 shadow-xsmall md:p-16">
        <h2 className="mb-6 font-sans text-h2-mobile text-midnight md:text-h2-desktop">
          {preDepartureIntro.heading}
        </h2>
        <p className="mb-6 font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
          {preDepartureIntro.body}
        </p>
        <p className="mb-6 font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
          <strong className="font-semibold text-midnight">
            {preDepartureIntro.warning}
          </strong>
          {preDepartureIntro.warningBody}
        </p>
        <p className="mb-4 font-body text-b2-mobile font-semibold text-midnight md:text-b2-desktop">
          {preDepartureIntro.bulletHeading}
        </p>
        <ul className="list-disc space-y-3 pl-5">
          {preDepartureIntro.bullets.map((bullet, i) => (
            <li
              key={i}
              className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Number Badge                                                                */
/* -------------------------------------------------------------------------- */

function NumberBadge({ number }: { number: string }) {
  return (
    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-sm border-2 border-crimson-red font-sans text-h4-mobile font-bold text-crimson-red md:size-14 md:text-h4-desktop">
      {number}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 01 — Entry Requirements (with Sherpa image)                        */
/* -------------------------------------------------------------------------- */

function Section01() {
  const section = preDepartureSections.find((s) => s.id === "01")!;
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-8 md:pb-10">
      <div className="rounded-lg bg-white p-8 shadow-xsmall md:p-12">
        <div className="mb-6 flex items-start gap-4">
          <NumberBadge number={section.number} />
          <div>
            <h2 className="font-sans text-h3-mobile text-midnight md:text-h3-desktop">
              {section.heading}
            </h2>
          </div>
        </div>
        <p className="mb-8 font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
          {section.body}
        </p>
        <PreDepartureWidget />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 02 — Government Advice (accordion)                                 */
/* -------------------------------------------------------------------------- */

function Section02() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-8 md:pb-10">
      <div className="rounded-lg bg-white p-8 shadow-xsmall md:p-12">
        <div className="mb-6 flex items-start gap-4">
          <NumberBadge number={govtAdviceSection.number} />
          <h2 className="font-sans text-h3-mobile text-midnight md:text-h3-desktop">
            {govtAdviceSection.heading}
          </h2>
        </div>
        <p className="mb-8 font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
          {govtAdviceSection.intro}
        </p>

        <div className="divide-y divide-grey/20 rounded-md border border-grey/20">
          {govtAdviceSection.countries.map((country) => (
            <details key={country.id} open className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 transition-colors hover:bg-light-grey">
                <span className="font-body text-b2-mobile font-semibold text-midnight md:text-b2-desktop">
                  {country.name}
                </span>
                {/* Chevron */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 rotate-0 text-midnight/50 transition-transform duration-200 group-open:rotate-180"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className="space-y-3 border-t border-grey/20 px-5 py-5">
                {country.links.map((link, i) => (
                  <div key={i}>
                    <span className="mb-1 block font-body text-b4-mobile text-dark-gray md:text-b4-desktop">
                      {link.label}
                    </span>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-b4-mobile text-crimson-red underline transition-colors hover:text-light-red md:text-b4-desktop"
                    >
                      {link.text}
                    </a>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>

        <p className="mt-6 font-body text-b4-mobile text-dark-gray md:text-b4-desktop">
          {govtAdviceSection.outro}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 03 — Health Information                                            */
/* -------------------------------------------------------------------------- */

function Section03() {
  const section = preDepartureSections.find((s) => s.id === "03")!;
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-8 md:pb-10">
      <div className="rounded-lg bg-white p-8 shadow-xsmall md:p-12">
        <div className="mb-6 flex items-start gap-4">
          <NumberBadge number={section.number} />
          <h2 className="font-sans text-h3-mobile text-midnight md:text-h3-desktop">
            {section.heading}
          </h2>
        </div>
        <div className="space-y-4">
          {section.paragraphs?.map((para, i) => {
            if (para.startsWith("https://")) {
              return (
                <a
                  key={i}
                  href={para}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-body text-b2-mobile text-crimson-red underline transition-colors hover:text-light-red md:text-b2-desktop"
                >
                  {para}
                </a>
              );
            }
            return (
              <p
                key={i}
                className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop"
              >
                {para}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section ? — Can't travel                                                   */
/* -------------------------------------------------------------------------- */

function SectionHelp() {
  const section = preDepartureSections.find((s) => s.id === "?")!;
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-8 md:pb-12">
      <div className="rounded-lg bg-white p-8 shadow-xsmall md:p-12">
        <div className="mb-6 flex items-start gap-4">
          <NumberBadge number={section.number} />
          <h2 className="font-sans text-h3-mobile text-midnight md:text-h3-desktop">
            {section.heading}
          </h2>
        </div>
        <div className="space-y-4">
          {section.paragraphs?.map((para, i) => (
            <p
              key={i}
              className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop"
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Contact CTA                                                                 */
/* -------------------------------------------------------------------------- */

function ContactCta() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-8 md:pb-16">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-10 shadow-xsmall md:flex-row md:justify-between md:p-14">
        <div>
          <h2 className="mb-1 font-display text-h2-mobile text-midnight md:text-h2-desktop">
            {preDepartureCta.heading}
          </h2>
          <p className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
            {preDepartureCta.body}
          </p>
        </div>
        <Link
          href={preDepartureCta.button.href}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-crimson-red px-8 py-3.5 font-body font-medium text-b4-mobile text-white transition-colors hover:bg-light-red md:text-b4-desktop"
        >
          {preDepartureCta.button.label}
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function PreDeparturePage() {
  return (
    <>
      <main className="flex-1 bg-light-grey">
        <Hero />
        <IntroCard />
        <Section01 />
        <Section02 />
        <Section03 />
        <SectionHelp />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
