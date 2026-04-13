import type { Tour } from "@/types/tour";
import Icon from "./Icon";

export default function TourHeader({ header }: { header: Tour["header"] }) {
  return (
    <header className="w-full">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {header.title}
      </h2>
      <ul className="mt-6 flex flex-wrap gap-2">
        {header.tags.map((tag) => (
          <li
            key={tag.label}
            className="inline-flex items-center gap-2 rounded-full bg-light-grey px-3 py-1.5 font-body text-b4-desktop text-midnight"
          >
            <Icon name={tag.icon} className="size-4 text-midnight" />
            {tag.label}
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-3xl font-body text-b2-mobile md:text-b2-desktop text-dark-gray">
        {header.description}
      </p>
    </header>
  );
}
