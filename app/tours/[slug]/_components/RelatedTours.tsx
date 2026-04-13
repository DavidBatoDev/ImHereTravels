import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/types/tour";

export default function RelatedTours({
  section,
}: {
  section: NonNullable<Tour["relatedTours"]>;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {section.items.map((t) => (
          <li
            key={t.slug}
            className="overflow-hidden rounded-lg bg-white shadow-small"
          >
            <Link href={`/tours/${t.slug}`} className="block">
              <div className="relative aspect-[4/3] w-full bg-light-grey">
                <Image
                  src={t.image}
                  alt={t.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="p-5 md:p-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-light-grey px-3 py-1 font-body text-b4-desktop text-midnight">
                  <Image
                    src="/Icons/SVG/Pin/pin-solid-red.svg"
                    alt=""
                    width={14}
                    height={14}
                  />
                  {t.duration}
                </span>
                <h3 className="mt-4 font-sans text-h5-mobile md:text-h5-desktop text-midnight">
                  {t.title}
                </h3>
                <p className="mt-2 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                  {t.description}
                </p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-body text-b4-desktop text-dark-gray">
                    {t.priceFromLabel}
                  </span>
                  <span className="font-sans text-h6-mobile md:text-h6-desktop text-midnight">
                    {t.priceCurrency} {t.priceAmount}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
