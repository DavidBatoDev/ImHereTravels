import Image from "next/image";
import type { Tour } from "@/types/tour";

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex gap-0.5 text-crimson-red"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4 fill-current">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({
  section,
}: {
  section: Tour["testimonials"];
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {section.items.map((t) => (
          <li
            key={t.author}
            className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-small"
          >
            <div className="flex items-center justify-between">
              <Stars count={t.rating} />
              <span className="font-body text-b4-desktop text-grey">
                {t.date}
              </span>
            </div>
            <p className="font-body text-b4-mobile md:text-b4-desktop text-midnight">
              {t.body}
            </p>
            <div className="mt-auto flex items-center gap-3 pt-2">
              <div className="relative size-10 overflow-hidden rounded-full bg-light-grey">
                <Image
                  src={t.avatar}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-body text-b4-desktop font-medium text-midnight">
                  {t.author}
                </p>
                <p className="font-body text-b4-desktop text-grey">
                  {t.location}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
