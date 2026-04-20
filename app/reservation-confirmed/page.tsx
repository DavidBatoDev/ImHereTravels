import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/global/Footer";

const BELLA_EMAIL = "bella@imheretravels.com";

export const metadata: Metadata = {
  title: "Payment successful",
  description:
    "Your payment has been successfully processed. To confirm, please send the receipt to bella@imheretravels.com.",
  robots: { index: false, follow: false },
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="size-14 md:size-16"
    >
      <path
        d="M12 24.5l8.5 8.5L36 16"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="size-6 shrink-0"
    >
      <rect
        x="3"
        y="6"
        width="22"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 9l11 7.5L25 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="size-6 shrink-0"
    >
      <path
        d="M6 3h16v22l-3-2-2.5 2-2.5-2-2.5 2-2.5-2L6 25V3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 9h8M10 13h8M10 17h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
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

function Confetti() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 360"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" strokeLinecap="round" strokeWidth="4">
        <circle cx="52" cy="50" r="6" fill="#FED141" />
        <rect x="100" y="30" width="14" height="14" rx="3" fill="#685BC7" transform="rotate(18 107 37)" />
        <path d="M30 130 l18 -10" stroke="#FF8200" />
        <circle cx="72" cy="220" r="5" fill="#26D07C" />
        <rect x="38" y="290" width="12" height="12" rx="2" fill="#FF585D" transform="rotate(-20 44 296)" />
        <path d="M150 310 l16 8" stroke="#B397F7" />

        <circle cx="540" cy="60" r="6" fill="#26D07C" />
        <rect x="490" y="30" width="14" height="14" rx="3" fill="#FF8200" transform="rotate(-14 497 37)" />
        <path d="M572 130 l-18 -12" stroke="#685BC7" />
        <circle cx="520" cy="230" r="5" fill="#FED141" />
        <rect x="540" y="285" width="12" height="12" rx="2" fill="#B397F7" transform="rotate(18 546 291)" />
        <path d="M440 305 l-16 10" stroke="#FF585D" />
      </g>
    </svg>
  );
}

export default function ReservationConfirmedPage() {
  return (
    <>
      <main className="flex-1 bg-light-grey">
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 size-[24rem] rounded-full bg-spring-green/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-16 size-[28rem] rounded-full bg-sunglow-yellow/30 blur-3xl"
          />
          <Confetti />

          <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-2 md:gap-12 md:px-8 md:py-20">
            {/* Left: confirmation message */}
            <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
              <div className="relative flex items-center justify-center">
                <span
                  aria-hidden
                  className="absolute inline-flex size-24 animate-ping rounded-full bg-spring-green/40 md:size-28"
                />
                <span
                  aria-hidden
                  className="absolute inline-flex size-20 rounded-full bg-spring-green/20 md:size-24"
                />
                <span className="relative inline-flex size-20 items-center justify-center rounded-full bg-spring-green shadow-large md:size-24">
                  <CheckIcon />
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <p className="font-body text-b4-mobile md:text-b4-desktop uppercase tracking-[0.2em] text-spring-green">
                  Payment successful
                </p>
                <h1 className="font-display text-h2-mobile md:text-h1-desktop text-midnight">
                  Your payment was{" "}
                  <span className="text-crimson-red">successfully processed.</span>
                </h1>
                <p className="max-w-xl font-body text-b2-mobile md:text-b2-desktop text-dark-gray">
                  Thank you — a receipt has been sent to your inbox. To confirm
                  your payment, please send the receipt to the email on the side  .
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 md:items-start">
                <a
                  href={`mailto:${BELLA_EMAIL}?subject=${encodeURIComponent(
                    "Payment receipt"
                  )}&body=${encodeURIComponent(
                    "Hi Bella,\n\nMy payment has been successfully processed. Please find the receipt attached to confirm.\n\nThanks!"
                  )}`}
                  className="inline-flex items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white transition-colors hover:bg-light-red"
                >
                  Email Bella
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-midnight px-6 py-3 font-body font-medium text-midnight transition-colors hover:bg-midnight hover:text-white"
                >
                  Back to home
                </Link>
              </div>
            </div>

            {/* Right: next step card */}
            <div className="w-full overflow-hidden rounded-lg bg-white shadow-medium">
              <div className="flex items-center gap-4 bg-midnight px-6 py-4 text-white md:px-8">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-crimson-red font-sans font-bold text-h6-desktop">
                  1
                </span>
                <div>
                  <p className="font-body text-b4-desktop uppercase tracking-[0.18em] text-light-grey/80">
                    Next step
                  </p>
                  <h2 className="font-sans text-h6-mobile font-bold md:text-h5-desktop">
                    Send us your receipt to confirm
                  </h2>
                </div>
              </div>

              <div className="flex flex-col gap-4 px-6 py-6 md:px-8 md:py-7">
                <p className="font-body text-b2-mobile md:text-b2-desktop text-midnight">
                  To confirm your payment, please forward the receipt from your
                  inbox to the email below.
                </p>

                <a
                  href={`mailto:${BELLA_EMAIL}?subject=${encodeURIComponent(
                    "Payment receipt"
                  )}&body=${encodeURIComponent(
                    "Hi Bella,\n\nMy payment has been successfully processed. Please find the receipt attached to confirm.\n\nThanks!"
                  )}`}
                  className="group flex items-center justify-between gap-4 rounded-md border-[1.5px] border-midnight bg-light-grey px-4 py-3 transition-colors hover:border-crimson-red hover:bg-white"
                >
                  <span className="flex items-center gap-3 text-midnight">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-crimson-red text-white">
                      <EmailIcon />
                    </span>
                    <span className="flex flex-col text-left">
                      <span className="font-body text-b4-mobile md:text-b4-desktop text-grey">
                        Send your receipt to
                      </span>
                      <span className="font-body text-b2-mobile font-bold md:text-b1">
                        {BELLA_EMAIL}
                      </span>
                    </span>
                  </span>
                  <span className="text-crimson-red transition-transform group-hover:translate-x-1">
                    <ChevronRightIcon />
                  </span>
                </a>

                <div className="flex items-start gap-3 rounded-sm bg-light-yellow/50 px-4 py-3">
                  <span className="mt-0.5 text-vivid-orange">
                    <ReceiptIcon />
                  </span>
                  <p className="font-body text-b4-mobile md:text-b4-desktop text-midnight">
                    <span className="font-bold">Receipt sent.</span> Check your
                    inbox for the receipt and attach or forward it to the email
                    above. Not there? Have a peek in your spam folder.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
