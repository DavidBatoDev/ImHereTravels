import type { TourKeyFact } from "@/types/tour";
import Icon from "./Icon";

export default function KeyFacts({ items }: { items: TourKeyFact[] }) {
  return (
    <section className="mt-8 w-full md:mt-10">
      <ul className="flex flex-col gap-6">
        {items.map((fact) => (
          <li key={fact.label} className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-light-grey text-midnight">
              <Icon name={fact.icon} className="size-5" />
            </span>
            <div>
              <p className="font-sans text-b2-mobile md:text-b2-desktop font-bold text-midnight">
                {fact.label}
              </p>
              <ul className="mt-1 space-y-0.5">
                {fact.values.map((v) => (
                  <li
                    key={v}
                    className="font-body text-b2-mobile md:text-b2-desktop text-dark-gray"
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
