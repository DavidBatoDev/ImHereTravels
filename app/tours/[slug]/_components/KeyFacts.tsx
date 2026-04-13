import type { TourKeyFact } from "@/types/tour";
import Icon from "./Icon";

export default function KeyFacts({ items }: { items: TourKeyFact[] }) {
  return (
    <section className="mt-8 w-full md:mt-10">
      <ul className="grid grid-cols-1 gap-6 rounded-lg border border-light-grey p-6 sm:grid-cols-2 md:p-8 lg:grid-cols-4">
        {items.map((fact) => (
          <li key={fact.label} className="flex items-start gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-light-grey text-midnight">
              <Icon name={fact.icon} className="size-5" />
            </span>
            <div>
              <p className="font-sans text-b4-desktop font-bold text-midnight">
                {fact.label}
              </p>
              <ul className="mt-1 space-y-0.5">
                {fact.values.map((v) => (
                  <li
                    key={v}
                    className="font-body text-b4-mobile md:text-b4-desktop text-dark-gray"
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
