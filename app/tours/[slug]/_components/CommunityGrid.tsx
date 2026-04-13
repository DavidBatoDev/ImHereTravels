import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/types/tour";
import Icon from "./Icon";

export default function CommunityGrid({
  section,
}: {
  section: Tour["community"];
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <h2 className="text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
        {section.images.map((img, i) => (
          <li
            key={i}
            className="relative aspect-square overflow-hidden rounded-md bg-light-grey"
          >
            <Link
              href={img.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={img.alt}
              className="group block h-full w-full"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-2 top-2 flex size-7 items-center justify-center rounded-full bg-white/90 text-crimson-red">
                <Icon name="instagram" className="size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
