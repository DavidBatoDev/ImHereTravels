import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import {
  contactMetadata,
  contactHero,
  contactForm,
  contactLinks,
  contactFaqCta,
} from "@/data/contactUs";

export const metadata: Metadata = contactMetadata;

/* ---------- Icons ---------- */

function WhatsappIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2.333C7.557 2.333 2.333 7.557 2.333 14c0 2.03.542 3.933 1.488 5.571L2.333 25.667l6.27-1.468A11.59 11.59 0 0014 25.667c6.443 0 11.667-5.224 11.667-11.667S20.443 2.333 14 2.333zm-3.36 6.79c-.21-.507-.432-.517-.632-.526l-.538-.007c-.187 0-.49.07-.747.35-.256.28-.978.955-.978 2.33s1.001 2.705 1.14 2.892c.14.187 1.933 3.08 4.76 4.2 2.354.929 2.827.745 3.337.698.51-.047 1.643-.672 1.876-1.32.233-.648.233-1.204.163-1.32-.07-.117-.257-.187-.538-.327s-1.643-.81-1.9-.9c-.256-.094-.443-.14-.63.14-.186.28-.723.9-.885 1.087-.163.187-.326.21-.607.07-.28-.14-1.183-.436-2.254-1.39-.833-.743-1.394-1.66-1.558-1.94-.163-.28-.017-.432.122-.571.125-.125.28-.327.42-.49.14-.164.187-.28.28-.467.094-.187.047-.35-.023-.49-.07-.14-.617-1.53-.856-2.089z"
        fill="currentColor"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14 2.333C7.557 2.333 2.333 7.557 2.333 14S7.557 25.667 14 25.667 25.667 20.443 25.667 14 20.443 2.333 14 2.333zm5.74 7.91l-2.45 11.55c-.175.79-.655.98-1.33.61l-3.68-2.71-1.775 1.71c-.197.197-.362.362-.74.362l.263-3.745 6.79-6.14c.295-.263-.065-.408-.455-.146l-8.39 5.285-3.61-1.13c-.785-.247-.8-.785.163-1.162l14.1-5.44c.655-.237 1.228.143 1.015 1.155l.099-.004z"
        fill="currentColor"
      />
    </svg>
  );
}

function ViberIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M22.167 5.46C20.357 3.8 17.28 2.357 14.023 2.333h-.058C10.708 2.333 7.62 3.777 5.81 5.437 4.2 6.917 3.36 8.957 3.337 11.3c-.023 2.1.513 4.083 1.563 5.717.28.42.583.82.91 1.19v3.72c0 .7.677 1.25 1.353.957l3.21-1.333a13.15 13.15 0 003.6.497h.058c3.245-.013 6.324-1.33 8.193-3.613 1.53-1.89 2.31-4.33 2.31-7.07.014-2.613-.84-4.8-2.367-5.904z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M17.698 18.27l-.002.006c-.292.7-.945 1.154-1.697 1.154-.083 0-.168-.005-.253-.016-4.76-.61-8.6-4.45-9.21-9.21a1.75 1.75 0 01.325-1.31 1.75 1.75 0 011.385-.686h.698c.28 0 .535.16.66.415l1.05 2.1c.138.28.083.617-.14.84l-.87.87a8.16 8.16 0 004.55 4.55l.87-.87a.74.74 0 01.84-.14l2.1 1.05c.254.127.415.382.415.66v.7a1.75 1.75 0 01-.72 1.387z"
        fill="currentColor"
      />
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
        d="M25.667 19.833v3.5a2.333 2.333 0 01-2.544 2.333 23.1 23.1 0 01-10.079-3.582 22.75 22.75 0 01-7-7 23.1 23.1 0 01-3.582-10.127A2.333 2.333 0 014.783 2.333h3.5a2.333 2.333 0 012.333 2.007c.148 1.12.422 2.22.817 3.278a2.333 2.333 0 01-.525 2.462L9.46 11.027a18.667 18.667 0 007 7l1.947-1.947a2.333 2.333 0 012.462-.525c1.059.395 2.158.669 3.278.817a2.333 2.333 0 012.52 2.461z"
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
  whatsapp: WhatsappIcon,
  telegram: TelegramIcon,
  viber: ViberIcon,
  email: EmailIcon,
  phone: PhoneIcon,
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
          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder={contactForm.fields.firstName}
                className="w-full rounded-sm border-[1.5px] border-grey/60 px-4 py-3 font-body text-b2-mobile text-midnight outline-none placeholder:text-grey focus:border-midnight md:text-b2-desktop"
              />
              <input
                type="text"
                placeholder={contactForm.fields.lastName}
                className="w-full rounded-sm border-[1.5px] border-grey/60 px-4 py-3 font-body text-b2-mobile text-midnight outline-none placeholder:text-grey focus:border-midnight md:text-b2-desktop"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="email"
                placeholder={contactForm.fields.email}
                className="w-full rounded-sm border-[1.5px] border-grey/60 px-4 py-3 font-body text-b2-mobile text-midnight outline-none placeholder:text-grey focus:border-midnight md:text-b2-desktop"
              />
              <input
                type="tel"
                placeholder={contactForm.fields.phone}
                className="w-full rounded-sm border-[1.5px] border-grey/60 px-4 py-3 font-body text-b2-mobile text-midnight outline-none placeholder:text-grey focus:border-midnight md:text-b2-desktop"
              />
            </div>
            <textarea
              placeholder={contactForm.fields.message}
              rows={4}
              className="w-full resize-y rounded-sm border-[1.5px] border-grey/60 px-4 py-3 font-body text-b2-mobile text-midnight outline-none placeholder:text-grey focus:border-midnight md:text-b2-desktop"
            />
            {contactForm.checkboxes.map((label, i) => (
              <label key={i} className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 size-4 shrink-0 cursor-pointer accent-crimson-red"
                />
                <span className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
                  {label}
                </span>
              </label>
            ))}
            <div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-crimson-red px-10 py-3 font-body font-bold text-b2-mobile text-white transition-colors hover:bg-light-red md:text-b2-desktop"
              >
                {contactForm.submitLabel}
              </button>
            </div>
          </form>
        </div>

        {/* Get in touch */}
        <div className="rounded-lg bg-white p-8 md:w-96 md:shrink-0 md:p-10">
          <h2 className="mb-6 font-sans font-bold text-h5-mobile text-midnight md:text-h5-desktop">
            {contactLinks.heading}
          </h2>
          <div className="flex flex-col gap-3">
            {contactLinks.items.map((item) => {
              const Icon = iconMap[item.type];
              const isWhatsapp = item.type === "whatsapp";
              return (
                <Link
                  key={item.type}
                  href={item.href}
                  className={`flex h-16 items-center justify-between rounded-sm px-6 py-3 transition-opacity hover:opacity-80 ${
                    isWhatsapp
                      ? "bg-[#25d366] text-white"
                      : "border-[1.5px] border-midnight text-midnight"
                  }`}
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
      <Header />
      <main className="flex-1 bg-light-grey">
        <Hero />
        <ContactSection />
        <FaqCtaSection />
      </main>
      <Footer />
    </>
  );
}
