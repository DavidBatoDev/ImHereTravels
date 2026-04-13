import Image from "next/image";
import type { Tour } from "@/types/tour";

export default function TourMap({ section }: { section: Tour["map"] }) {
  return (
    <section className="mt-10 w-full md:mt-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>
      <div className="mt-8 relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-light-grey">
        <Image
          src={section.image}
          alt={section.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
      </div>
    </section>
  );
}
