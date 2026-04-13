import type { Tour } from "@/types/tour";
import Icon from "./Icon";

export default function Tips({
  section,
}: {
  section: NonNullable<Tour["tips"]>;
}) {
  return (
    <section className="mt-10 w-full md:mt-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {section.items.map((tip) => (
          <li key={tip.title} className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-light-grey text-midnight">
              <Icon name={tip.icon} className="size-5" />
            </span>
            <div>
              <h3 className="font-sans text-b2-desktop font-bold text-midnight">
                {tip.title}
              </h3>
              <p className="mt-1 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                {tip.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
