import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import Reveal from "@/app/components/global/Reveal";
import HeroTitle from "@/app/components/global/HeroTitle";
import { hero, tours, destinations, testimonials, features } from "@/data/root";
import DestinationsMarquee from "@/app/components/global/DestinationsMarquee";

/* -------------------------------------------------------------------------- */
/* Shared UI                                                                   */
/* -------------------------------------------------------------------------- */

function StarRow() {
  return (
    <div className="flex gap-0.5 text-crimson-red" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4 fill-current">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

function PillButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 font-body font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-crimson-red text-white hover:bg-light-red"
      : "border border-midnight text-midnight hover:bg-midnight hover:text-white";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Sections                                                                    */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative w-full">
      <div className="relative overflow-hidden">
        <div className="relative h-[55vh] w-full md:h-[60vh]">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-white md:gap-6">
          <Reveal y={12} delay={0}>
            <svg
              width="136"
              height="36"
              viewBox="0 0 136 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label={hero.badge}
              role="img"
            >
              <path
                d="M17,1 H119 A16,16 0 0,1 135,17 V35 H17 A16,16 0 0,1 1,19 V17 A16,16 0 0,1 17,1 Z"
                fill="#26D07C"
                stroke="#1C1F2A"
                strokeWidth="2"
              />
              <text
                x="68"
                y="23"
                textAnchor="middle"
                fill="#1C1F2A"
                fontFamily="DM Sans, sans-serif"
                fontSize="11"
                fontWeight="700"
                letterSpacing="1.8"
              >
                {hero.badge}
              </text>
            </svg>
          </Reveal>
          <HeroTitle
            text={hero.title}
            className="font-display text-h1-mobile md:text-h1-desktop"
          />
          <Reveal delay={900}>
            <PillButton href={hero.cta.href} className="mt-2">
              {hero.cta.label}
            </PillButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function NewTours() {
  return (
    <section id="tours" className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="mb-8 md:mb-12">
        <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
          New Tours
        </h2>
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour, i) => (
          <Reveal
            as="li"
            delay={i * 80}
            key={tour.title}
            className="h-full"
          >
            <Link
              href={tour.href}
              className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-small transition-shadow hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-light-grey px-3 py-1 font-body text-b4-desktop text-midnight">
                  <Image
                    src="/Icons/SVG/Pin/pin-solid-red.svg"
                    alt=""
                    width={14}
                    height={14}
                  />
                  {tour.duration}
                </span>
                <h3 className="mt-4 font-sans text-h5-mobile md:text-h5-desktop text-midnight group-hover:text-crimson-red">
                  {tour.title}
                </h3>
                <p className="mt-2 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                  {tour.description}
                </p>
                <div className="mt-auto flex items-baseline gap-2 pt-5">
                  <span className="font-body text-b4-desktop text-dark-gray">
                    From
                  </span>
                  <span className="font-sans text-h6-mobile md:text-h6-desktop text-midnight">
                    {tour.price}
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <PillButton href="#all-tours">View All Tours</PillButton>
      </div>
    </section>
  );
}

function Destinations() {
  return (
    <section
      id="destinations"
      className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14"
    >
      <h2 className="mb-8 text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight md:mb-12">
        Your next destination
      </h2>
      <DestinationsMarquee items={destinations} />
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <h2 className="mb-8 text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight md:mb-12">
        What people say about us
      </h2>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal
            as="li"
            delay={i * 80}
            key={t.author}
            className="flex flex-col gap-6 rounded-lg bg-white p-8 shadow-small md:p-10"
          >
            <div className="flex items-center justify-between">
              <StarRow />
              <span className="font-body text-b4-desktop text-grey">
                {t.date}
              </span>
            </div>
            <p className="font-body text-b2-mobile md:text-b2-desktop text-midnight">
              {t.quote}
            </p>
            <div className="mt-auto flex items-center gap-4 pt-2">
              <Image
                src={t.avatar}
                alt={t.author}
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="font-sans text-h6-mobile md:text-h6-desktop font-bold text-midnight">
                  {t.author}
                </p>
                <p className="font-body text-b4-desktop text-vivid-orange">
                  {t.location}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14"
    >
      <h2 className="mb-10 text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight md:mb-14">
        Why choose us?
      </h2>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature, i) => (
          <Reveal
            as="li"
            delay={i * 100}
            key={feature.title}
            className="flex flex-col items-center gap-6 rounded-lg bg-white px-8 py-10 text-center shadow-small"
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={120}
              height={120}
              className="size-28 object-contain"
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-sans font-bold text-h5-mobile md:text-h5-desktop text-midnight">
                {feature.title}
              </h3>
              <p className="font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                {feature.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
      <div className="mt-10 flex justify-center">
        <PillButton href="/why-us" variant="outline">
          Learn more
        </PillButton>
      </div>
    </section>
  );
}

function JoinCommunity() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div
        className="overflow-hidden rounded-lg bg-white shadow-small"
        style={{ width: "1200px", maxWidth: "100%", height: "640px" }}
      >
        <div className="grid h-full grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
            <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
              Join our community
            </h2>
            <p className="font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
              Stay up to date on the latest news, deals and tours when you sign
              up.
            </p>
            <form
              className="mt-2 flex flex-col gap-3"
              action="#"
              method="post"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-full border border-grey bg-white px-5 py-3 font-body text-b4-desktop text-midnight placeholder:text-grey focus:border-crimson-red focus:outline-none"
              />
              <p className="font-body text-b4-desktop text-grey">
                By submitting you agree with our{" "}
                <Link
                  href="/privacy-policy"
                  className="underline hover:text-crimson-red"
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center self-start rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white hover:bg-light-red"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="relative h-full w-full">
            <Image
              src="/figma/join-community.jpg"
              alt="Travelers enjoying a tropical beach"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[center_85%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <NewTours />
        <Destinations />
        <Testimonials />
        <WhyChooseUs />
        <JoinCommunity />
      </main>
      <Footer />
    </>
  );
}
