import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/global/Footer";
import {
  contactMetadata,
  contactHero,
  contactForm,
  contactLinks,
  contactFaqCta,
} from "@/data/contactUs";
import ContactForm from "./ContactForm";

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

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.003 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.256.592 4.46 1.718 6.4L3.2 28.8l6.56-1.72a12.77 12.77 0 0 0 6.243 1.6h.005c7.067 0 12.797-5.73 12.8-12.8 0-3.42-1.332-6.633-3.752-9.054A12.72 12.72 0 0 0 16.003 3.2Zm0 23.36h-.004a10.63 10.63 0 0 1-5.416-1.483l-.389-.23-4.03 1.057 1.076-3.93-.253-.403a10.61 10.61 0 0 1-1.627-5.668c.003-5.871 4.78-10.648 10.649-10.648 2.843 0 5.514 1.109 7.525 3.121a10.57 10.57 0 0 1 3.117 7.53c-.002 5.87-4.779 10.647-10.648 10.647Zm5.84-7.974c-.32-.16-1.893-.934-2.186-1.04-.293-.107-.507-.16-.72.16-.214.32-.827 1.04-1.013 1.253-.187.214-.374.24-.694.08-.32-.16-1.35-.497-2.572-1.586-.95-.847-1.592-1.895-1.779-2.215-.186-.32-.02-.493.14-.653.144-.143.32-.374.48-.56.16-.187.213-.32.32-.534.107-.214.054-.4-.026-.56-.08-.16-.72-1.735-.987-2.375-.26-.624-.524-.54-.72-.55-.186-.01-.4-.012-.613-.012a1.18 1.18 0 0 0-.854.4c-.293.32-1.12 1.094-1.12 2.668 0 1.574 1.146 3.095 1.306 3.308.16.214 2.253 3.44 5.46 4.826.763.33 1.359.527 1.823.675.766.243 1.463.209 2.014.127.614-.092 1.893-.774 2.16-1.521.266-.747.266-1.387.186-1.521-.08-.134-.293-.214-.613-.374Z" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16 3.2C8.83 3.2 3.2 8.456 3.2 15.536c0 3.703 1.543 6.91 4.056 9.123.21.185.338.444.346.723l.07 2.297a1.024 1.024 0 0 0 1.437.905l2.562-1.13a1.03 1.03 0 0 1 .686-.051c1.17.322 2.413.495 3.695.495 7.17 0 12.8-5.255 12.8-12.336 0-7.08-5.63-12.336-12.852-12.336Zm7.687 9.47-3.76 5.965a1.92 1.92 0 0 1-2.776.513l-2.994-2.243a.77.77 0 0 0-.925.003L8.189 19.97c-.539.41-1.242-.235-.878-.807l3.76-5.966a1.92 1.92 0 0 1 2.775-.512l2.994 2.243a.77.77 0 0 0 .925-.003l4.044-3.067c.538-.41 1.242.236.878.807Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9l11 7.5L25 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M6.5 4.5h3l2 5-2.5 1.5a11 11 0 0 0 5.5 5.5l1.5-2.5 5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 6.5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M7.5 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const iconMap = {
  whatsapp: WhatsAppIcon,
  messenger: MessengerIcon,
  email: EmailIcon,
  phone: PhoneIcon,
};

const hoverClass: Record<keyof typeof iconMap, string> = {
  whatsapp: "hover:bg-spring-green hover:border-spring-green",
  messenger: "hover:bg-[#0084FF] hover:border-[#0084FF]",
  email: "hover:bg-crimson-red hover:border-crimson-red",
  phone: "hover:bg-spring-green hover:border-spring-green",
};

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="relative h-65 overflow-hidden md:h-90">
      <Image
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
          <div className="flex flex-col gap-3">
            {contactLinks.items.map((item) => {
              const Icon = iconMap[item.type];
              const external = "external" in item && item.external;
              return (
                <Link
                  key={item.type}
                  href={item.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`flex h-16 items-center justify-between rounded-sm border-[1.5px] border-midnight px-6 py-3 text-midnight transition-colors hover:text-white ${hoverClass[item.type]}`}
                >
                  <span className="flex items-center gap-3">
                    <Icon />
                    <span className="font-body text-b2-mobile md:text-b2-desktop">
                      {item.label}
                    </span>
                  </span>
                  <ChevronRightIcon />
                </Link>
              );
            })}
          </div>
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
