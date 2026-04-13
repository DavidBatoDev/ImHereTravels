import type { Tour } from "@/types/tour";
import Icon from "./Icon";

export default function WhatsIncluded({
  section,
}: {
  section: NonNullable<Tour["whatsIncluded"]>;
}) {
  return (
    <section className="mt-10 w-full md:mt-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {section.items.map((item) => (
          <li key={item.label} className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-light-grey text-midnight">
              <Icon name={item.icon} className="size-5" />
            </span>
            <div>
              <p className="font-sans text-b2-desktop font-bold text-midnight">
                {item.label}
              </p>
              {Array.isArray(item.value) ? (
                <ul className="mt-1 space-y-1">
                  {item.value.map((v) => (
                    <li
                      key={v}
                      className="flex items-start gap-2 font-body text-b4-mobile md:text-b4-desktop text-dark-gray"
                    >
                      <span aria-hidden className="text-spring-green">
                        ✓
                      </span>
                      {v}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                  {item.value}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
