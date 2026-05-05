import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/app/components/global/Footer";
import {
  privacyMetadata,
  privacyHero,
  privacyLastUpdated,
  privacyIntro,
  privacySections,
  privacyOutro,
} from "@/data/privacyPolicy";
import { whyUsNewsletter } from "@/data/whyUs";

export const metadata: Metadata = privacyMetadata;

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="relative h-72 overflow-hidden md:h-[360px]">
      <Image
        src={privacyHero.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center px-6 pb-16 text-center md:pb-28">
        <h1 className="font-display text-h1-mobile text-white md:text-h1-desktop">
          {privacyHero.title}
        </h1>
      </div>
    </section>
  );
}

function ContentSection() {
  return (
    <div className="relative z-10 mx-auto -mt-20 w-full max-w-5xl px-4 pb-12 md:-mt-28 md:px-8 md:pb-16">
      <div className="rounded-lg bg-white px-6 py-10 shadow-medium md:px-16 md:py-16">
        <p className="mb-6 font-body text-b2-mobile text-midnight md:text-b2-desktop">
          Last update: {privacyLastUpdated}
        </p>

        <div className="mb-6 flex flex-col gap-4">
          {privacyIntro.map((para, i) => (
            <p
              key={i}
              className="font-body text-b2-mobile text-midnight md:text-b2-desktop"
            >
              {para}
            </p>
          ))}
        </div>

        {privacySections.map((section) => (
          <div key={section.heading}>
            <h2 className="mb-4 mt-8 font-sans font-bold text-h5-mobile text-midnight md:text-h5-desktop">
              {section.heading}
            </h2>
            <div className="flex flex-col gap-4">
              {section.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="font-body text-b2-mobile text-midnight md:text-b2-desktop"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}

        <p className="mt-10 font-body text-b2-mobile text-midnight md:text-b2-desktop">
          {privacyOutro}
        </p>
      </div>
    </div>
  );
}

function NewsletterSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-8 md:pb-24">
      <div
        className="overflow-hidden rounded-lg bg-white shadow-small"
        style={{ maxWidth: "100%", height: "640px" }}
      >
        <div className="flex h-full flex-col md:flex-row">
          <div className="flex flex-col justify-center gap-4 p-8 md:w-1/2 md:shrink-0 md:p-12">
            <h2 className="font-sans text-h3-mobile text-midnight md:text-h3-desktop">
              {whyUsNewsletter.heading}
            </h2>
            <p className="font-body text-b4-mobile text-dark-gray md:text-b4-desktop">
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
          <div className="relative flex-1">
            <Image
              src={whyUsNewsletter.image}
              alt="Travel experience"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="flex-1 bg-light-grey">
        <Hero />
        <ContentSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
