import type { Tour } from "@/types/tour";
import AutoFitText from "./AutoFitText";
import Icon from "./Icon";

// Rotating palette for location tags — green → orange → yellow → purple,
// then repeats. Sampled straight from the brand secondary palette in
// app/globals.css so additional colors can slot in later.
const TAG_PALETTE = [
  "bg-spring-green text-midnight",
  "bg-vivid-orange text-midnight",
  "bg-sunglow-yellow text-midnight",
  "bg-light-purple text-midnight",
];

export default function TourHeader({ header }: { header: Tour["header"] }) {
  return (
    <header className="w-full">
      <AutoFitText
        as="h2"
        className="font-sans text-h3-mobile md:text-h3-desktop text-midnight"
      >
        {header.title}
      </AutoFitText>
      <ul className="mt-6 flex flex-wrap gap-2">
        {header.tags.map((tag, i) => (
          <li
            key={tag.label}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-body text-b4-desktop ${
              TAG_PALETTE[i % TAG_PALETTE.length]
            }`}
          >
            <Icon name={tag.icon} className="size-4" />
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
