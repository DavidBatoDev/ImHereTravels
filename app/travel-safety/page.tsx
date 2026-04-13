import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import {
  travelSafetyMetadata,
  travelSafetyHero,
  travelSafetyIntro,
  travelSafetySections,
  travelSafetyCta,
} from "@/data/travelSafety";

export const metadata: Metadata = travelSafetyMetadata;

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative h-65 w-full overflow-hidden md:h-90">
      <Image
        src={travelSafetyHero.image}
        alt="Travel Safety"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <h1 className="font-display text-h1-mobile text-white md:text-h1-desktop">
          {travelSafetyHero.title}
        </h1>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared primitives                                                           */
/* -------------------------------------------------------------------------- */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-sans text-h5-mobile font-bold text-midnight md:text-h5-desktop">
      {children}
    </h2>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {items.map((item, i) => (
        <li
          key={i}
          className="font-body text-b2-mobile text-midnight md:text-b2-desktop"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Main content card                                                           */
/* -------------------------------------------------------------------------- */

function ContentCard() {
  const basics = travelSafetySections.find((s) => s.id === "basics")!;
  const health = travelSafetySections.find((s) => s.id === "health")!;
  const transport = travelSafetySections.find((s) => s.id === "transport")!;
  const stay = travelSafetySections.find((s) => s.id === "stay")!;
  const exploration = travelSafetySections.find((s) => s.id === "exploration")!;
  const activities = travelSafetySections.find((s) => s.id === "activities")!;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-12">
      <div className="rounded-lg bg-white p-8 shadow-xsmall md:p-16">

        {/* Safety First */}
        <SectionHeading>{travelSafetyIntro.heading}</SectionHeading>
        <div className="mb-4">
          <BodyText>{travelSafetyIntro.body}</BodyText>
        </div>
        <div className="mb-4">
          <BulletList items={travelSafetyIntro.bullets} />
        </div>
        <BodyText>{travelSafetyIntro.closing}</BodyText>

        {/* 1. The Basics */}
        <div className="mt-16">
          <SectionHeading>{basics.heading}</SectionHeading>
          {basics.intro && (
            <div className="mb-4">
              <BodyText>{basics.intro}</BodyText>
            </div>
          )}
          {basics.bullets && <BulletList items={basics.bullets} />}
        </div>

        {/* 2. Health First */}
        <div className="mt-16">
          <SectionHeading>{health.heading}</SectionHeading>
          {health.body && <BodyText>{health.body}</BodyText>}
        </div>

        {/* 3. Transport */}
        <div className="mt-16">
          <SectionHeading>{transport.heading}</SectionHeading>
          {transport.intro && (
            <div className="mb-1">
              <BodyText>{transport.intro}</BodyText>
            </div>
          )}
          {transport.subheading && (
            <div className="mb-6">
              <BodyText>{transport.subheading}</BodyText>
            </div>
          )}
          {transport.subsections && (
            <div className="space-y-6">
              {transport.subsections.map((sub) => (
                <div key={sub.label}>
                  <p className="mb-2 font-body text-b2-mobile font-semibold text-midnight md:text-b2-desktop">
                    {sub.label}
                  </p>
                  <BulletList items={sub.bullets} />
                </div>
              ))}
            </div>
          )}
          {transport.closing && (
            <div className="mt-6">
              <BodyText>{transport.closing}</BodyText>
            </div>
          )}
        </div>

        {/* 4. Your Stay */}
        <div className="mt-16">
          <SectionHeading>{stay.heading}</SectionHeading>
          {stay.intro && (
            <div className="mb-4">
              <BodyText>{stay.intro}</BodyText>
            </div>
          )}
          {stay.bullets && <BulletList items={stay.bullets} />}
        </div>

        {/* 5. Exploration */}
        <div className="mt-16">
          <SectionHeading>{exploration.heading}</SectionHeading>
          {exploration.intro && (
            <div className="mb-4">
              <BodyText>{exploration.intro}</BodyText>
            </div>
          )}
          {exploration.bullets && <BulletList items={exploration.bullets} />}
        </div>

        {/* 6. Other Activities */}
        <div className="mt-16">
          <SectionHeading>{activities.heading}</SectionHeading>
          {activities.body && <BodyText>{activities.body}</BodyText>}
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
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-10 text-center shadow-xsmall md:p-16">
        <h2 className="font-display text-h2-mobile text-midnight md:text-h2-desktop">
          {travelSafetyCta.heading}
        </h2>
        <p className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
          {travelSafetyCta.body}
        </p>
        <div className="pt-4">
          <Link
            href={travelSafetyCta.button.href}
            className="inline-flex items-center justify-center rounded-full bg-crimson-red px-8 py-3.5 font-body font-medium text-b4-mobile text-white transition-colors hover:bg-light-red md:text-b4-desktop"
          >
            {travelSafetyCta.button.label}
          </Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function TravelSafetyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-light-grey">
        <Hero />
        <ContentCard />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
