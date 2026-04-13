import Link from "next/link";
import { Calendar, Route } from "lucide-react";
import type { Tour } from "@/types/tour";

export default function BookingCard({
  booking,
  sticky = false,
}: {
  booking: Tour["booking"];
  sticky?: boolean;
}) {
  return (
    <aside
      className={`overflow-hidden rounded-lg bg-white shadow-medium ${
        sticky ? "lg:sticky lg:top-28" : ""
      }`}
    >
      <div className="px-6 pb-5 pt-6 md:px-7 md:pt-7">
        <div className="flex items-baseline gap-x-2 gap-y-1">
          <span className="font-body text-b4-desktop text-dark-gray">
            {booking.priceFromLabel}
          </span>
          <span className="font-body text-b4-desktop text-dark-gray">
            {booking.priceCurrency}
          </span>
          <span className="font-display text-h3-mobile md:text-h3-desktop text-midnight whitespace-nowrap leading-none">
            {booking.priceAmount}
          </span>
          <span className="font-body text-b4-mobile text-grey">/ person</span>
        </div>
        <p className="mt-2 font-body text-b4-mobile text-grey">
          {booking.footnote}
        </p>
      </div>

      <div className="border-t border-light-grey px-6 py-4 md:px-7">
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-light-grey text-midnight">
              <Calendar className="size-4" strokeWidth={2.25} />
            </span>
            <span className="font-body text-b4-mobile md:text-b4-desktop text-midnight">
              {booking.durationLabel}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-light-grey text-midnight">
              <Route className="size-4" strokeWidth={2.25} />
            </span>
            <span className="font-body text-b4-mobile md:text-b4-desktop text-midnight">
              {booking.routeLabel}
            </span>
          </li>
        </ul>
      </div>

      <div className="border-t border-light-grey px-6 py-5 md:px-7 md:py-6">
        {(() => {
          const isExternal = /^https?:\/\//.test(booking.ctaHref);
          const className =
            "inline-flex w-full items-center justify-center rounded-full bg-crimson-red px-6 py-3.5 font-body font-bold text-white shadow-small transition-all hover:bg-light-red hover:shadow-medium";
          return isExternal ? (
            <a
              href={booking.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {booking.ctaLabel}
            </a>
          ) : (
            <Link href={booking.ctaHref} className={className}>
              {booking.ctaLabel}
            </Link>
          );
        })()}
      </div>
    </aside>
  );
}
