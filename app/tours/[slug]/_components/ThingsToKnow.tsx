import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Tour } from "@/types/tour";
import Icon from "./Icon";

export default function ThingsToKnow({
  section,
}: {
  section: Tour["thingsToKnow"];
}) {
  return (
    <section className="mt-10 w-full md:mt-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {section.items.map((t) => (
          <li
            key={t.title}
            className="flex flex-col gap-4 rounded-lg border border-light-grey p-6 md:p-8"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-light-grey text-midnight">
              <Icon name={t.icon} className="size-6" />
            </span>
            <h3 className="font-sans text-h5-mobile md:text-h5-desktop text-midnight">
              {t.title}
            </h3>
            <p className="font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
              {t.description}
            </p>
            <Link
              href={t.ctaHref}
              className="mt-auto inline-flex items-center gap-1 font-body text-b4-desktop font-bold text-crimson-red hover:underline"
            >
              {t.ctaLabel}
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
