import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/global/Footer";
import { joinMetadata, joinHero, joinForm } from "@/data/joinOurCommunity";

export const metadata: Metadata = joinMetadata;

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="relative h-65 overflow-hidden md:h-90">
      <Image
        src={joinHero.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <h1 className="font-display text-h1-mobile text-white md:text-h1-desktop">
          {joinHero.title}
        </h1>
      </div>
    </section>
  );
}

function FormSection() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 md:px-8 md:py-16">
      {/* Heading + body */}
      <div className="mb-8 text-center">
        <h2 className="mb-3 font-sans font-bold text-h4-mobile text-midnight md:text-h4-desktop">
          {joinForm.heading}
        </h2>
        <p className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
          {joinForm.body}
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-lg bg-white p-8 md:p-10">
        <form className="flex flex-col gap-5">
          {/* Email */}
          <input
            type="email"
            placeholder={joinForm.fields.email}
            className="w-full rounded-sm border-[1.5px] border-grey/60 px-4 py-3 font-body text-b2-mobile text-midnight outline-none placeholder:text-grey focus:border-midnight md:text-b2-desktop"
          />

          {/* First + Last name */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder={joinForm.fields.firstName}
              className="w-full rounded-sm border-[1.5px] border-grey/60 px-4 py-3 font-body text-b2-mobile text-midnight outline-none placeholder:text-grey focus:border-midnight md:text-b2-desktop"
            />
            <input
              type="text"
              placeholder={joinForm.fields.lastName}
              className="w-full rounded-sm border-[1.5px] border-grey/60 px-4 py-3 font-body text-b2-mobile text-midnight outline-none placeholder:text-grey focus:border-midnight md:text-b2-desktop"
            />
          </div>

          {/* Country select */}
          <div className="relative">
            <select
              defaultValue=""
              className="w-full appearance-none rounded-sm border-[1.5px] border-grey/60 bg-white px-4 py-3 font-body text-b2-mobile text-grey outline-none focus:border-midnight md:text-b2-desktop"
            >
              <option value="" disabled>
                {joinForm.fields.country}
              </option>
              <option value="AU">Australia</option>
              <option value="CA">Canada</option>
              <option value="PH">Philippines</option>
              <option value="SG">Singapore</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
              <option value="NZ">New Zealand</option>
              <option value="other">Other</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-grey">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          {/* Privacy checkbox */}
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 size-4 shrink-0 cursor-pointer accent-crimson-red"
            />
            <span className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
              {joinForm.privacyCheckbox}
            </span>
          </label>

          {/* Disclaimer */}
          <p className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
            {joinForm.disclaimer}{" "}
            <Link href={joinForm.disclaimerLinkHref} className="underline hover:text-crimson-red">
              {joinForm.disclaimerLinkLabel}
            </Link>
            .
          </p>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-crimson-red px-10 py-3 font-body font-bold text-b2-mobile text-white transition-colors hover:bg-light-red md:text-b2-desktop"
            >
              {joinForm.submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function JoinOurCommunityPage() {
  return (
    <>
      <main className="flex-1 bg-light-grey">
        <Hero />
        <FormSection />
      </main>
      <Footer />
    </>
  );
}
