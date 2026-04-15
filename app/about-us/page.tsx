import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import {
  aboutHero,
  aboutIntro,
  aboutMission,
  aboutVision,
  aboutPurpose,
  team,
  aboutCta,
  stickers,
} from "@/data/aboutUs";

export const metadata: Metadata = {
  title: "About Us | I'm Here Travels",
  description:
    "Founded in 2023 by Amer and Shawn from the shores of Siargao Island, Philippines. At I'm Here Travels, we create awesome, fun, and unforgettable travel experiences.",
};

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="relative h-65 overflow-hidden md:h-90">
      <Image
        src={aboutHero.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <h1 className="font-display text-h1-mobile text-white md:text-h1-desktop">
          {aboutHero.title}
        </h1>
      </div>
    </section>
  );
}

function IntroText() {
  return (
    /* full-width so absolutely-positioned stickers can sit at the real edges */
    <section className="relative w-full">
      {/* ── Red ImHere sticker — RIGHT (half off-screen) ── */}
      <div className={stickers.introRight.wrapperClass} aria-hidden="true">
        <Image
          src={stickers.introRight.src}
          alt=""
          width={stickers.introRight.size}
          height={stickers.introRight.size}
          className="object-contain"
        />
      </div>

      {/* ── Green Globe sticker — LEFT ── */}
      <div className={stickers.introLeft.wrapperClass} aria-hidden="true">
        <Image
          src={stickers.introLeft.src}
          alt=""
          width={stickers.introLeft.size}
          height={stickers.introLeft.size}
          className="object-contain"
        />
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 py-12 text-center md:py-16">
        {aboutIntro.map((paragraph, i) => (
          <p
            key={i}
            className={`font-body text-b2-desktop text-midnight md:text-b1${i > 0 ? " mt-6" : ""}`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    /* full-width outer wrapper for sticker positioning */
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          {/* Text — left on desktop */}
          <div className="flex flex-col gap-6 md:flex-1">
            <h2 className="font-display text-h1-mobile text-midnight md:text-h1-desktop">
              {aboutMission.title}
            </h2>
            <p className="font-body text-b2-desktop text-midnight md:text-b1">
              {aboutMission.body}
            </p>
          </div>

          {/* Image — right on desktop, top on mobile */}
          <div className="relative aspect-3/4 w-full md:order-last md:aspect-auto md:h-140 md:w-120 md:flex-none lg:w-150">
            {/* Clipped image */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <Image
                src={aboutMission.image}
                alt={aboutMission.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>

            {/* ── Orange Heart sticker — on top of photo, bottom-right ── */}
            <div className={stickers.missionPhoto.wrapperClass} aria-hidden="true">
              <Image
                src={stickers.missionPhoto.src}
                alt=""
                width={stickers.missionPhoto.size}
                height={stickers.missionPhoto.size}
                className="object-contain"
              />
            </div>
          </div>
        </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 md:px-8 md:pb-24">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
        {/* Image — left on desktop, top on mobile */}
        <div className="relative aspect-3/4 w-full md:aspect-auto md:h-140 md:w-120 md:flex-none lg:w-150">
          {/* Clipped image */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <Image
              src={aboutVision.image}
              alt={aboutVision.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </div>

          {/* ── Yellow Asterisk sticker — on top of photo, bottom-left ── */}
          <div className={stickers.visionPhoto.wrapperClass} aria-hidden="true">
            <Image
              src={stickers.visionPhoto.src}
              alt=""
              width={stickers.visionPhoto.size}
              height={stickers.visionPhoto.size}
              className="object-contain"
            />
          </div>
        </div>

        {/* Text — right on desktop */}
        <div className="flex flex-col gap-6 md:flex-1">
          <h2 className="font-display text-h1-mobile text-midnight md:text-h1-desktop">
            {aboutVision.title}
          </h2>
          <p className="font-body text-b2-desktop text-midnight md:text-b1">
            {aboutVision.body}
          </p>
        </div>
      </div>
    </section>
  );
}

function PurposeSection() {
  return (
    <section className="relative h-100 md:h-150 lg:h-180">
      {/* Background — clipped to section bounds */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={aboutPurpose.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center text-white">
        <h2 className="font-display text-h1-mobile md:text-h1-desktop">
          {aboutPurpose.title}
        </h2>
        <p className="max-w-md font-body text-b2-desktop md:text-b1">
          {aboutPurpose.body}
        </p>
      </div>

      {/* ── Red Flag sticker — RIGHT ── */}
      <div className={stickers.purposeRight.wrapperClass} aria-hidden="true">
        <Image
          src={stickers.purposeRight.src}
          alt=""
          width={stickers.purposeRight.size}
          height={stickers.purposeRight.size}
          className="object-contain"
        />
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="mb-12 text-center font-display text-h1-mobile text-midnight md:text-h1-desktop">
        Meet our team
      </h2>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {team.map((member) => (
          <li
            key={member.name}
            className="flex flex-col gap-6 rounded-lg bg-white p-8 md:p-10"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative size-35 shrink-0 overflow-hidden rounded-full md:size-45">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-sans font-bold text-h6-mobile text-midnight md:text-h6-desktop">
                  {member.name}
                </p>
                <p className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
                  {member.role}
                </p>
              </div>
            </div>
            <p className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
              {member.bio}
            </p>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-8 md:pb-24">
      <div className="flex flex-col items-center gap-6 rounded-lg bg-white px-8 py-12 text-center md:py-16">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-h2-mobile text-midnight md:text-h2-desktop">
            {aboutCta.title}
          </h2>
          <p className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
            {aboutCta.subtitle}
          </p>
        </div>
        <Link
          href={aboutCta.button.href}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-crimson-red px-8 py-3 font-body font-bold text-b2-mobile text-white transition-colors hover:bg-light-red md:px-10 md:text-b2-desktop"
        >
          {aboutCta.button.label}
        </Link>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default function AboutPage() {
  return (
    <>
      <Header />
      {/* overflow-x-clip prevents horizontal scroll from stickers peeking out */}
      <main className="flex-1 overflow-x-clip bg-light-grey">
        <Hero />
        <IntroText />
        <MissionSection />
        <VisionSection />
        <PurposeSection />
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
