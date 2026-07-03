import Image from "next/image";
import Link from "next/link";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
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
      <ul className="mt-6 grid grid-cols-1 gap-5 md:mt-8 md:grid-cols-2 lg:grid-cols-3">
        {section.items.map((t) => (
          <li
            key={t.slug}
            className="mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-small md:max-w-none"
          >
            <Link
              href={`/tours/${t.slug}`}
              className="flex h-full flex-col"
            >
              <div className="relative aspect-4/3 w-full bg-light-grey">
                <ImageWithSkeleton
                  src={t.image}
                  alt={t.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4 md:p-6">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-light-grey px-2.5 py-0.5 font-body text-b4-mobile text-midnight md:px-3 md:py-1 md:text-b4-desktop">
                  <Image
                    src="/Icons/SVG/Pin/pin-solid-red.svg"
                    alt=""
                    width={14}
                    height={14}
                  />
                  {t.duration}
                </span>
                <h3 className="mt-3 font-sans text-h6-mobile text-midnight md:mt-4 md:text-h5-desktop">
                  {t.title}
                </h3>
                <p className="mt-1.5 font-body text-b4-mobile text-dark-gray md:mt-2 md:text-b4-desktop">
                  {t.description}
                </p>
                <div className="mt-auto flex items-baseline gap-2 pt-4 md:pt-5">
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
