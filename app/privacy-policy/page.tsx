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
    <section className="mx-auto w-full max-w-5xl px-4 pb-16 md:px-8 md:pb-24">
      <div className="overflow-hidden rounded-lg bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col gap-8 px-8 py-12 md:flex-1 md:pl-16 md:pr-20 md:py-12">
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-h2-mobile text-midnight md:text-h2-desktop">
                {whyUsNewsletter.heading}
              </h2>
              <p className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
                {whyUsNewsletter.body}
              </p>
            </div>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder={whyUsNewsletter.inputPlaceholder}
                className="w-full rounded-sm border border-grey/40 px-4 py-3 font-body text-b2-mobile text-midnight outline-none placeholder:text-grey focus:border-midnight md:text-b2-desktop"
              />
              <p className="font-body text-b4-desktop text-dark-gray">
                {whyUsNewsletter.privacyLabel}{" "}
                <span className="underline">{whyUsNewsletter.privacyLink}</span>
                .
              </p>
              <button
                type="submit"
                className="inline-flex w-fit items-center justify-center rounded-full bg-crimson-red px-10 py-3 font-body font-bold text-b2-mobile text-white transition-colors hover:bg-light-red md:text-b2-desktop"
              >
                {whyUsNewsletter.button}
              </button>
            </form>
          </div>
          <div className="relative h-64 md:h-auto md:flex-1">
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
