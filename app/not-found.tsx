import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/global/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you were looking for has wandered off the map. Let's get you back on the trail.",
  robots: { index: false, follow: false },
};

const suggestions = [
  {
    href: "/tours",
    label: "Browse all tours",
    description: "Small-group adventures across Asia, Africa and beyond.",
    icon: "/Icons/SVG/Globe/globe-solid-red.svg",
  },
  {
    href: "/all-destinations",
    label: "All destinations",
    description: "Every place we travel, in one curated list.",
    icon: "/Icons/SVG/Pin/pin-solid-red.svg",
  },
  {
    href: "/contact-us",
    label: "Contact us",
    description: "Lost? Our team can point you in the right direction.",
    icon: "/Icons/SVG/Heart/heart-solid-red.svg",
  },
];

export default function NotFound() {
  return (
    <>
      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-light-grey">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-light-red/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-16 size-96 rounded-full bg-sunglow-yellow/30 blur-3xl"
          />

          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-5 px-4 py-8 text-center md:gap-8 md:px-8 md:py-16">
            <p className="font-body text-b4-mobile md:text-b4-desktop uppercase tracking-[0.2em] text-crimson-red">
              Error 404
            </p>

            <h1
              aria-label="404"
              className="font-display text-[4rem] leading-none tracking-tight text-midnight sm:text-[5.5rem] md:text-[9rem]"
            >
              <span className="text-crimson-red">4</span>
              <span className="relative inline-block align-middle mx-1 md:mx-3">
                <Image
                  src="/Icons/SVG/Globe/globe-solid-red.svg"
                  alt=""
                  width={176}
                  height={176}
                  className="inline-block size-14 sm:size-20 md:size-36 animate-[spin_18s_linear_infinite]"
                  priority
                />
              </span>
              <span className="text-crimson-red">4</span>
            </h1>

            <div className="flex flex-col items-center gap-2 md:gap-3">
              <h2 className="font-sans text-h4-mobile md:text-h3-desktop text-midnight">
                This trail doesn't go anywhere.
              </h2>
              <p className="max-w-xl font-body text-b4-mobile md:text-b2-desktop text-dark-gray">
                The page you were looking for has wandered off the map. Let's
                get you back on the trail.
              </p>
            </div>

            <div className="flex flex-row flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-crimson-red px-5 py-2.5 font-body text-b4-mobile md:text-b4-desktop font-medium text-white transition-colors hover:bg-light-red"
              >
                Take me home
              </Link>
              <Link
                href="/tours"
                className="inline-flex items-center justify-center rounded-full border border-midnight px-5 py-2.5 font-body text-b4-mobile md:text-b4-desktop font-medium text-midnight transition-colors hover:bg-midnight hover:text-white"
              >
                Browse tours
              </Link>
            </div>

            <ul className="mt-2 grid w-full grid-cols-1 gap-3 sm:grid-cols-3 md:mt-4 md:gap-5">
              {suggestions.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex h-full items-center gap-3 rounded-md bg-white p-3 text-left shadow-xsmall transition-shadow hover:shadow-small md:flex-col md:items-start md:gap-2 md:rounded-lg md:p-5"
                  >
                    <Image
                      src={s.icon}
                      alt=""
                      width={40}
                      height={40}
                      className="size-8 shrink-0 object-contain md:size-10"
                    />
                    <div className="flex flex-1 flex-col gap-0.5">
                      <h3 className="font-sans font-bold text-h6-mobile md:text-h6-desktop text-midnight">
                        {s.label}
                      </h3>
                      <p className="hidden font-body text-b4-desktop text-dark-gray md:block">
                        {s.description}
                      </p>
                    </div>
                    <svg
                      viewBox="0 0 20 20"
                      className="size-4 shrink-0 fill-crimson-red transition-transform group-hover:translate-x-1 md:hidden"
                      aria-hidden
                    >
                      <path d="M7.5 4l6 6-6 6-1.4-1.4L10.7 10 6.1 5.4z" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
