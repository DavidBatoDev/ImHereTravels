import Image from "next/image";
import type { Tour } from "@/types/tour";

export default function WhereWeStay({
  section,
}: {
  section: Tour["whereWeStay"];
}) {
  return (
    <section className="mt-10 w-full md:mt-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {section.items.map((a) => (
          <li
            key={a.name}
            className="overflow-hidden rounded-lg bg-white shadow-small"
          >
            <div className="relative aspect-[4/3] w-full bg-light-grey">
              <Image
                src={a.image}
                alt={a.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            <div className="p-5 md:p-6">
              <h3 className="font-sans text-h5-mobile md:text-h5-desktop text-midnight">
                {a.name}
              </h3>
              <p className="mt-2 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                {a.nights}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
