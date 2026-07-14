import type { TourKeyFact } from "@/types/tour";
import Icon from "./Icon";

const MONTHS: Record<string, string> = {
  January: "01", February: "02", March: "03", April: "04",
  May: "05", June: "06", July: "07", August: "08",
  September: "09", October: "10", November: "11", December: "12",
};

function toISODate(s: string): string {
  const m = s.match(/^(\w+)\s+(\d{1,2})(?:[–-]\d{1,2})?,?\s+(\d{4})$/);
  if (!m) return "";
  const mm = MONTHS[m[1]];
  return mm ? `${m[3]}-${mm}-${m[2].padStart(2, "0")}` : "";
}

const today = new Date().toISOString().split("T")[0];

export default function KeyFacts({ items, tourSlug }: { items: TourKeyFact[]; tourSlug?: string }) {
  const orderedItems = [...items].sort((a, b) => {
    if (a.label === "Tour Dates") return -1;
    if (b.label === "Tour Dates") return 1;
    return 0;
  });

  return (
    <section className="mt-8 w-full md:mt-10">
      <ul className="flex flex-col gap-6">
        {orderedItems.map((fact) => {
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
                        const href = fact.links?.[index]
                          ?? (iso
                            ? `https://admin.imheretravels.com/reservation-booking-form?tour=${tourSlug}&tourdate=${iso}`
                            : "");
                        const price = fact.datePrices?.[index];
                        const inner = (
                          <span className="inline-flex items-center gap-2">
                            <span
                              className="inline-block size-1.5 shrink-0 rounded-full bg-crimson-red"
                              aria-hidden="true"
                            />
                            <span>{v}</span>
                          </span>
                        );
                        return (
                          <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
                            {href ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-crimson-red hover:underline underline-offset-2"
                              >
                                {inner}
                              </a>
                            ) : (
                              inner
                            )}
                            {/* Only surface a price when this date overrides the
                                default — the base "From" price is shown in the
                                booking card, so repeating it here is redundant. */}
                            {price && (price.isCustom || price.resFee) ? (
                              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                                {price.isCustom && price.amount ? (
                                  <span className="inline-flex items-center rounded-full border border-crimson-red/20 bg-light-red/10 px-2.5 py-0.5 font-sans font-bold text-crimson-red">
                                    {price.amount}
                                  </span>
                                ) : null}
                                {price.resFee ? (
                                  <span className="inline-flex items-center rounded-full bg-light-grey px-2 py-0.5 font-body text-b4-mobile md:text-b4-desktop font-medium text-dark-gray">
                                    Res. fee {price.resFee}
                                  </span>
                                ) : null}
                              </span>
                            ) : null}
                          </span>
                        );
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
