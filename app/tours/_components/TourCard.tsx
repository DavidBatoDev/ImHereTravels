import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/types/tour";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <li className="group overflow-hidden rounded-lg bg-white shadow-small transition-shadow hover:shadow-medium">
      <Link href={`/tours/${tour.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={tour.listingCard.image}
            alt={tour.listingCard.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-light-grey px-3 py-1 font-body text-b4-desktop text-midnight">
            <Image
              src="/Icons/SVG/Pin/pin-solid-red.svg"
              alt=""
              width={14}
              height={14}
            />
            {tour.listingCard.duration}
          </span>
          <h2 className="mt-4 font-sans text-h5-mobile md:text-h5-desktop text-midnight transition-colors group-hover:text-crimson-red">
            {tour.header.title.split("|").slice(-1)[0]?.trim() ?? tour.header.title}
          </h2>
          <p className="mt-2 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
            {tour.listingCard.description}
          </p>
          <div className="mt-auto flex items-baseline gap-2 pt-5">
            <span className="font-body text-b4-desktop text-dark-gray">From</span>
            <span className="font-sans text-h6-mobile md:text-h6-desktop text-midnight">
              {tour.listingCard.price}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
