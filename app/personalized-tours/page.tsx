import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/app/components/global/Footer";
import {
  personalizedToursMetadata,
  personalizedToursHero,
  personalizedToursForm,
} from "@/data/personalizedTours";
import PersonalizedToursForm from "./PersonalizedToursForm";

export const metadata: Metadata = personalizedToursMetadata;

const BASE_URL = "https://www.imheretravels.com";

const personalizedToursJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/personalized-tours`,
  name: "Personalized Tour — I'm Here Travels",
  description: personalizedToursMetadata.description,
  url: `${BASE_URL}/personalized-tours`,
  publisher: { "@id": `${BASE_URL}/#organization` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Personalized Tour",
        item: `${BASE_URL}/personalized-tours`,
      },
    ],
  },
};

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="relative h-65 overflow-hidden md:h-90">
      <Image
        src={personalizedToursHero.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <h1 className="font-display text-h1-mobile text-white md:text-h1-desktop">
          {personalizedToursHero.title}
        </h1>
      </div>
    </section>
  );
}

function FormSection() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 md:px-8 md:py-16">
      <div className="mb-8 text-center">
        <h2 className="mb-4 font-display text-h2-mobile text-midnight md:text-h2-desktop">
          {personalizedToursForm.heading}
        </h2>
        <p className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
          {personalizedToursForm.body}
        </p>
      </div>

      <div className="rounded-lg bg-white p-8 md:p-10">
        <PersonalizedToursForm />
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function PersonalizedToursPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personalizedToursJsonLd) }}
      />
      <main className="flex-1 bg-light-grey">
        <Hero />
        <FormSection />
      </main>
      <Footer />
    </>
  );
}
