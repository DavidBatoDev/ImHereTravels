import type { TourKeyFact } from "@/types/tour";
import Icon from "./Icon";

const MONTHS: Record<string, string> = {
  January: "01", February: "02", March: "03", April: "04",
  May: "05", June: "06", July: "07", August: "08",
  September: "09", October: "10", November: "11", December: "12",
};

function toISODate(s: string): string {
  const m = s.match(/^(\w+)\s+(\d+),\s+(\d{4})$/);
  if (!m) return "";
  const mm = MONTHS[m[1]];
  return mm ? `${m[3]}-${mm}-${m[2].padStart(2, "0")}` : "";
}

const today = new Date().toISOString().split("T")[0];

export default function KeyFacts({ items, tourSlug }: { items: TourKeyFact[]; tourSlug?: string }) {
  return (
    <section className="mt-8 w-full md:mt-10">
      <ul className="flex flex-col gap-6">
        {items.map((fact) => {
          const showDateIndicator = fact.label === "Tour Dates";
          const values = showDateIndicator
            ? fact.values.filter((v) => {
                const iso = toISODate(v);
                return !iso || iso >= today;
              })
            : fact.values;

          return (
            <li key={fact.label} className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-light-grey text-midnight">
                <Icon name={fact.icon} className="size-5" />
              </span>
              <div>
                <p className="font-sans text-b2-mobile md:text-b2-desktop font-bold text-midnight">
                  {fact.label}
                </p>
                <ul className="mt-1 space-y-0.5">
                  {showDateIndicator && values.length === 0 && (
                    <li className="font-body text-b2-mobile md:text-b2-desktop text-dark-gray">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="mt-0.5 inline-block size-1.5 shrink-0 rounded-full bg-crimson-red"
                          aria-hidden="true"
                        />
                        <span>To be announced</span>
                      </span>
                    </li>
                  )}
                  {values.map((v, index) => (
                    <li
                      key={`${fact.label}-${v}-${index}`}
                      className="font-body text-b2-mobile md:text-b2-desktop text-dark-gray"
                    >
                      {showDateIndicator ? (() => {
                        const iso = tourSlug ? toISODate(v) : "";
                        const href = iso
                          ? `https://admin.imheretravels.com/reservation-booking-form?tour=${tourSlug}&tourdate=${iso}`
                          : "";
                        const inner = (
                          <span className="inline-flex items-center gap-2">
                            <span
                              className="mt-0.5 inline-block size-1.5 shrink-0 rounded-full bg-crimson-red"
                              aria-hidden="true"
                            />
                            <span>{v}</span>
                          </span>
                        );
                        return href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-crimson-red hover:underline underline-offset-2"
                          >
                            {inner}
                          </a>
                        ) : inner;
                      })() : (
                        v
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
