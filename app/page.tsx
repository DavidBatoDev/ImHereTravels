import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/global/Header";
import { hero, tours, destinations, testimonials, features } from "@/data/root";

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
          <svg
            width="136"
            height="36"
            viewBox="0 0 136 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label={hero.badge}
            role="img"
          >
            {/* Rounded: top-left, top-right, bottom-left — Sharp: bottom-right */}
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
          <h1 className="font-display text-h1-mobile md:text-h1-desktop">
            {hero.title.split("\n").map((line, i) => (
              <span key={i}>{line}{i < hero.title.split("\n").length - 1 && <br />}</span>
            ))}
          </h1>
          <PillButton href={hero.cta.href} className="mt-2">
            {hero.cta.label}
          </PillButton>
        </div>
      </div>
    </section>
  );
}

function NewTours() {
  return (
    <section id="tours" className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="mb-8 flex items-center justify-between md:mb-12">
        <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
          New Tours
        </h2>
        <div className="hidden gap-2 md:flex">
          <button
            aria-label="Previous tours"
            className="flex size-10 items-center justify-center rounded-full border border-midnight text-midnight hover:bg-midnight hover:text-white"
          >
            ‹
          </button>
          <button
            aria-label="Next tours"
            className="flex size-10 items-center justify-center rounded-full border border-midnight text-midnight hover:bg-midnight hover:text-white"
          >
            ›
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <li
            key={tour.title}
            className="overflow-hidden rounded-lg bg-white shadow-small"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-5 md:p-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-light-grey px-3 py-1 font-body text-b4-desktop text-midnight">
                <Image
                  src="/Icons/SVG/Pin/pin-solid-red.svg"
                  alt=""
                  width={14}
                  height={14}
                />
                {tour.duration}
              </span>
              <h3 className="mt-4 font-sans text-h5-mobile md:text-h5-desktop text-midnight">
                {tour.title}
              </h3>
              <p className="mt-2 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                {tour.description}
              </p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-body text-b4-desktop text-dark-gray">
                  From
                </span>
                <span className="font-sans text-h6-mobile md:text-h6-desktop text-midnight">
                  {tour.price}
                </span>
              </div>
            </div>
          </li>
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
      className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24"
    >
      <h2 className="mb-8 text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight md:mb-12">
        Your next destination
      </h2>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {destinations.map((destination) => (
          <li
            key={destination.name}
            className="group relative overflow-hidden rounded-md"
          >
            <Link href={destination.href} className="block">
              <div className="relative aspect-square w-full">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute bottom-4 left-4 font-sans text-h5-mobile md:text-h5-desktop text-white">
                  {destination.name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="mb-8 text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight md:mb-12">
        What people say about us
      </h2>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <li
            key={t.author}
            className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-small"
          >
            <div className="flex items-center justify-between">
              <StarRow />
              <span className="font-body text-b4-desktop text-grey">
                {t.date}
              </span>
            </div>
            <p className="font-body text-b4-mobile md:text-b4-desktop text-midnight">
              {t.quote}
            </p>
            <div className="mt-auto flex items-center gap-3 pt-2">
              <Image
                src={t.avatar}
                alt={t.author}
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />
              <div>
                <p className="font-body text-b4-desktop font-medium text-midnight">
                  {t.author}
                </p>
                <p className="font-body text-b4-desktop text-grey">
                  {t.location}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24"
    >
      <h2 className="mb-10 text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight md:mb-14">
        Why choose us?
      </h2>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <li
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
          </li>
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
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="overflow-hidden rounded-lg bg-light-grey">
        <div className="grid grid-cols-1 md:grid-cols-2">
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
          <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[360px]">
            <Image
              src="/figma/join-community.png"
              alt="Travelers enjoying a tropical beach"
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

function Footer() {
  const columns = [
    {
      heading: "About",
      links: [
        { label: "Destinations", href: "#destinations" },
        { label: "Why us?", href: "/why-us" },
        { label: "Tours", href: "#tours" },
      ],
    },
    {
      heading: "Help",
      links: [
        { label: "Contact Us", href: "/contact-us" },
        { label: "FAQs", href: "/faqs" },
        { label: "Personalized Tours", href: "/contact-us" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Travel Info", href: "#travel-info" },
        { label: "Newsletter", href: "/join-our-community" },
        { label: "Reviews", href: "#reviews" },
      ],
    },
  ];

  return (
    <footer className="mt-16 bg-light-grey">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/Logos/Horizontal/Digital/SVG/Red/Digital_Horizontal_Red.svg"
              alt="I'm Here Travels"
              width={120}
              height={36}
              className="h-8 w-auto"
            />
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-sans text-b2-desktop font-bold text-crimson-red">
                {col.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-b4-desktop text-midnight hover:text-crimson-red"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-sans text-b2-desktop font-bold text-crimson-red">
              Connect
            </h3>
            <ul className="mt-3 flex gap-3">
              {["Instagram", "Facebook", "YouTube"].map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full bg-crimson-red text-white hover:bg-light-red"
                  >
                    <span className="sr-only">{label}</span>
                    <span aria-hidden className="font-body text-b4-desktop">
                      {label[0]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-light-grey pt-6 md:flex-row md:justify-between">
          <Image
            src="/Logos/Clover/Digital/SVG/Red/Digital_Clover_Red.svg"
            alt=""
            width={28}
            height={28}
            className="size-7"
          />
          <p className="font-body text-b4-desktop text-grey">
            © 2026 I&apos;m Here Travels. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms-and-conditions"
              className="font-body text-b4-desktop text-grey hover:text-crimson-red"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="font-body text-b4-desktop text-grey hover:text-crimson-red"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
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
