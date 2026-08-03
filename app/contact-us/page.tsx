import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/global/Footer";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import {
  contactMetadata,
  contactHero,
  contactForm,
  contactLinks,
  contactFaqCta,
} from "@/data/contactUs";
import ContactForm from "./ContactForm";
import ContactLinks from "./ContactLinks";

export const metadata: Metadata = contactMetadata;

const BASE_URL = "https://www.imheretravels.com";

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${BASE_URL}/contact-us`,
  name: "Contact I'm Here Travels",
  description: "Questions about a tour? Ready to book? Reach our team via WhatsApp, Messenger, email, or phone.",
  url: `${BASE_URL}/contact-us`,
  publisher: { "@id": `${BASE_URL}/#organization` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Contact Us", item: `${BASE_URL}/contact-us` },
    ],
  },
};

/* ---------- Icons ---------- */

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="relative h-65 overflow-hidden md:h-90">
      <ImageWithSkeleton
        src={contactHero.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <h1 className="font-display text-h1-mobile text-white md:text-h1-desktop">
          {contactHero.title}
        </h1>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Form */}
        <div className="flex-1 rounded-lg bg-white p-8 md:p-10">
          <h2 className="mb-6 font-sans font-bold text-h5-mobile text-midnight md:text-h5-desktop">
            {contactForm.heading}
          </h2>
          <ContactForm />
        </div>

        {/* Get in touch */}
        <div className="rounded-lg bg-white p-8 md:w-96 md:shrink-0 md:p-10">
          <h2 className="mb-6 font-sans font-bold text-h5-mobile text-midnight md:text-h5-desktop">
            {contactLinks.heading}
          </h2>
          <ContactLinks />
        </div>
      </div>
    </div>
  );
}

function FaqCtaSection() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-8 md:pb-24">
      <div className="flex flex-col items-center gap-6 rounded-lg bg-white px-8 py-16 text-center md:py-20">
        <h2 className="font-display text-h2-mobile text-midnight md:text-h2-desktop">
          {contactFaqCta.heading}
        </h2>
        <p className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
          {contactFaqCta.body}
        </p>
        <Link
          href={contactFaqCta.button.href}
          className="inline-flex items-center justify-center rounded-full bg-crimson-red px-8 py-3 font-body font-bold text-b2-mobile text-white transition-colors hover:bg-light-red md:px-10 md:text-b2-desktop"
        >
          {contactFaqCta.button.label}
        </Link>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <main className="flex-1 bg-light-grey">
        <Hero />
        <ContactSection />
        <FaqCtaSection />
      </main>
      <Footer />
    </>
  );
}
