import Image from "next/image";

// Static testimonials shared across every tour detail page.
// Edit this list directly — there's no per-tour override.
const HEADING = "What people say about us";

const ITEMS = [
  {
    rating: 5,
    date: "May 2023",
    body: "Had an amazing time on the trial tour! Action packed with lots of fun things on the itinerary, and a great bunch of people. Would definitely go again!",
    avatar: "/tours/philippine-sunrise/avatar-flynn.jpg",
    author: "Flynn Deanne",
    location: "London, United Kingdom",
  },
  {
    rating: 5,
    date: "February 2024",
    body: "My experience has been amazing, I'll never forget it. I met extraordinary people and explored beautiful places. I definitely recommend to book a trip!",
    avatar: "/tours/philippine-sunrise/avatar-manuel.jpg",
    author: "Manuel Madonna",
    location: "Milan, Italy",
  },
  {
    rating: 5,
    date: "July 2024",
    body: "I enjoyed the tour! Seamless coordination of transportation and accommodation made me feel like a VIP throughout the trip! LOVED every bit of it!! I highly recommend!",
    avatar: "/tours/philippine-sunrise/avatar-bella.jpg",
    author: "Bella Millan",
    location: "Cagayan, Philippines",
  },
];

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

export default function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {HEADING}
      </h2>
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((t) => (
          <li
            key={t.author}
            className="flex flex-col gap-6 rounded-lg bg-white p-8 shadow-small md:p-10"
          >
            <div className="flex items-center justify-between">
              <Stars count={t.rating} />
              <span className="font-body text-b4-desktop text-grey">
                {t.date}
              </span>
            </div>
            <p className="font-body text-b2-mobile md:text-b2-desktop text-midnight">
              {t.body}
            </p>
            <div className="mt-auto flex items-center gap-4 pt-2">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-light-grey">
                <Image
                  src={t.avatar}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-sans text-h6-mobile md:text-h6-desktop font-bold text-midnight">
                  {t.author}
                </p>
                <p className="font-body text-b4-desktop text-vivid-orange">
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
