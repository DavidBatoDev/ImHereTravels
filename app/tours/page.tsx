import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import { getAllTours } from "@/data/tours";

export const metadata = {
  title: "All Tours — I'm Here Travels",
  description:
    "Browse every I'm Here Travels adventure: small-group getaways across the Philippines, Maldives and beyond.",
};

export default function ToursPage() {
  const tours = getAllTours();
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 md:px-8 md:pb-24 md:pt-10">
          <h1 className="font-display text-h1-mobile md:text-h1-desktop text-midnight">
            All Tours
          </h1>
          <p className="mt-4 max-w-2xl font-body text-b2-mobile md:text-b2-desktop text-dark-gray">
            Small-group adventures across the Philippines, the Maldives and
            more.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <li
                key={tour.slug}
                className="overflow-hidden rounded-lg bg-white shadow-small"
              >
                <Link href={`/tours/${tour.slug}`} className="block">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={tour.listingCard.image}
                      alt={tour.listingCard.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                      {tour.listingCard.duration}
                    </span>
                    <h2 className="mt-4 font-sans text-h5-mobile md:text-h5-desktop text-midnight">
                      {tour.header.title.split("|").slice(-1)[0]?.trim() ??
                        tour.header.title}
                    </h2>
                    <p className="mt-2 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                      {tour.listingCard.description}
                    </p>
                    <div className="mt-5 flex items-baseline gap-2">
                      <span className="font-body text-b4-desktop text-dark-gray">
                        From
                      </span>
                      <span className="font-sans text-h6-mobile md:text-h6-desktop text-midnight">
                        {tour.listingCard.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
