import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/global/Footer";
import FaqAccordion from "./_components/FaqAccordion";
import { faqsHero, faqCategories, faqsCta, faqsMetadata } from "@/data/faqs";

export const metadata: Metadata = faqsMetadata;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories
    .flatMap((cat) => cat.items)
    .map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
};

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="relative h-65 overflow-hidden md:h-90">
      <Image
        src={faqsHero.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <h1 className="font-display text-h1-mobile text-white md:text-h1-desktop">
          {faqsHero.title}
        </h1>
      </div>
    </section>
  );
}

function FAQCategories() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 md:px-8 md:py-16">
      <div className="flex flex-col gap-12 md:gap-16">
        {faqCategories.map((cat) => (
          <section key={cat.heading}>
            <h2 className="mb-8 text-center font-sans text-h4-mobile text-midnight md:text-h4-desktop">
              {cat.heading}
            </h2>
            <div className="rounded-lg bg-white px-6 py-4 md:px-10 md:py-6">
              <FaqAccordion items={cat.items} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 md:px-8 md:pb-24">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-8 py-16 text-center md:py-20">
        <h2 className="font-display text-h2-mobile text-midnight md:text-h2-desktop">
          {faqsCta.heading}
        </h2>
        <p className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
          {faqsCta.body}
        </p>
        <Link
          href={faqsCta.button.href}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-crimson-red px-8 py-3 font-body font-bold text-b2-mobile text-white transition-colors hover:bg-light-red md:px-10 md:text-b2-desktop"
        >
          {faqsCta.button.label}
        </Link>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function FAQsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="flex-1 bg-light-grey">
        <Hero />
        <FAQCategories />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
