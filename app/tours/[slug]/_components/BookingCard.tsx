import Link from "next/link";
import { Calendar, Route } from "lucide-react";
import type { Tour, TourPriceCategory } from "@/types/tour";

const BADGE_STYLES: Record<
  NonNullable<TourPriceCategory["badge"]>,
  string
> = {
  yellow: "bg-sunglow-yellow text-midnight",
  green: "bg-spring-green text-midnight",
  red: "bg-crimson-red text-white",
  grey: "bg-light-grey text-midnight",
};

export default function BookingCard({
  booking,
  sticky = false,
}: {
  booking: Tour["booking"];
  sticky?: boolean;
}) {
  const hasCategories =
    booking.priceCategories && booking.priceCategories.length > 0;
  const isExternal = /^https?:\/\//.test(booking.ctaHref);
  const ctaClass =
    "inline-flex w-full items-center justify-center rounded-full bg-crimson-red px-6 py-3.5 font-body font-bold text-white shadow-small transition-all hover:bg-light-red hover:shadow-medium";

  return (
    <aside
      className={`overflow-hidden rounded-lg bg-white shadow-medium ${
        sticky ? "lg:sticky lg:top-28" : ""
      }`}
    >
      <div className="px-6 pb-5 pt-6 md:px-7 md:pt-7">
        <p className="font-sans text-h5-mobile md:text-h5-desktop font-bold text-midnight">
          {booking.durationLabel}
        </p>
        <p className="mt-1 font-body text-b2-mobile md:text-b1 text-dark-gray">
          {booking.routeLabel}
        </p>
      </div>

      <div className="border-t border-light-grey px-6 py-4 md:px-7">
        {hasCategories ? (
          <ul className="space-y-3">
            {booking.priceCategories!.map((cat) => (
              <li
                key={cat.label}
                className="flex items-center justify-between gap-3"
              >
                <span className="font-display text-h4-mobile md:text-h4-desktop text-midnight whitespace-nowrap leading-none">
                  {cat.amount}
                </span>
                <span
                  className={`inline-flex shrink-0 items-center justify-center rounded-md px-3 py-1.5 font-body text-b4-desktop font-bold ${
                    BADGE_STYLES[cat.badge ?? "grey"]
                  }`}
                >
                  {cat.label}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-body text-b4-desktop text-dark-gray">
              {booking.priceFromLabel}
            </span>
            <span className="font-body text-b4-desktop text-dark-gray">
              {booking.priceCurrency}
            </span>
            <span className="font-display text-h3-mobile md:text-h3-desktop text-midnight whitespace-nowrap leading-none">
              {booking.priceAmount}
            </span>
          </div>
        )}
      </div>

      <div className="px-6 pb-4 md:px-7">
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
        {isExternal ? (
          <a
            href={booking.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClass}
          >
            {booking.ctaLabel}
          </a>
        ) : (
          <Link href={booking.ctaHref} className={ctaClass}>
            {booking.ctaLabel}
          </Link>
        )}
        {booking.depositAmount && (
          <p className="mt-4 text-center font-body text-b4-mobile text-dark-gray">
            Reserve for {booking.depositAmount} — deducted from total fees.
            Non-refundable.
          </p>
        )}
      </div>
    </aside>
  );
}
