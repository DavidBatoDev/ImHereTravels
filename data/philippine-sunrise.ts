/**
 * Philippine Sunrise — 11-day Cebu-to-Siargao tour.
 *
 * Content sourced from Figma node 1658:15532 (desktop frame).
 * Image assets live in `public/tours/philippine-sunrise/` and were
 * downloaded from the Figma file (see commit history for details).
 *
 * Registered in `data/tours.ts` and rendered by `app/tours/[slug]/page.tsx`.
 */
import type { Tour } from "@/types/tour";

// Base path for all assets used by this tour. Centralized so the entire
// tour can be re-pathed (e.g., to a CDN) by changing one constant.
const IMG = "/tours/philippine-sunrise";

export const philippineSunrise: Tour = {
  // URL slug — must match the key used in `data/tours.ts`.
  slug: "philippine-sunrise",

  // Short name — used as the page H1 and the breadcrumb leaf.
  name: "Philippines Sunrise",

  // <title> and meta description set via `generateMetadata` in the page.
  meta: {
    title: "11 Days | Philippines Sunrise Getaway",
    description:
      "Experience the Philippines Sunrise Tour! Begin in Cebu with historical tours and vibrant nightlife, explore Moalboal's thrilling canyoneering and mesmerizing sardine run, then unwind in Siargao with surfing, island hopping, and stunning sunsets. This adventure promises unforgettable moments from start to finish!",
  },

  // Hero gallery: 1 main image + N thumbnails. Wired into a Swiper carousel.
  gallery: {
    hero: `${IMG}/hero-1.jpg`,
    heroAlt: "Travelers at a canyon in Moalboal, Philippines",
    thumbnails: [
      { src: `${IMG}/thumb-1.jpg`, alt: "Beachside in Moalboal" },
      { src: `${IMG}/thumb-2.jpg`, alt: "Canyoneering jump" },
      { src: `${IMG}/thumb-3.jpg`, alt: "Sunset in Siargao" },
      { src: `${IMG}/thumb-4.jpg`, alt: "Surf lesson" },
      { src: `${IMG}/thumb-5.jpg`, alt: "Island hopping boat" },
      { src: `${IMG}/thumb-6.jpg`, alt: "Group dinner" },
    ],
  },
  // Card title, location tags, and long-form description shown inside
  // the white content card under the hero. `title` is the H2 of the card.
  header: {
    title: "11 Days | Philippines Sunrise Getaway",
    tags: [
      { label: "Cebu", icon: "location" },
      { label: "Moalboal", icon: "location" },
      { label: "Siargao", icon: "location" },
    ],
    description:
      "Experience the Philippines Sunrise Tour! Begin in Cebu with historical tours and vibrant nightlife, explore Moalboal's thrilling canyoneering and mesmerizing sardine run, then unwind in Siargao with surfing, island hopping, and stunning sunsets. This adventure promises unforgettable moments from start to finish!",
  },
  // 4-up icon row summarising the trip (dates, length, route, group size).
  keyFacts: [
    {
      icon: "days",
      label: "Tour Dates",
      values: [
        "March 17, 2026",
        "April 25, 2026",
        "May 5, 2026",
        "May 17, 2026",
        "June 13, 2026 - Pride Tour",
        "July 3, 2026",
        "August 4, 2026",
        "August 21, 2026",
        "September 16, 2026",
        "October 11, 2026",
      ],
    },
    { icon: "days", label: "Duration", values: ["11 Days / 10 Nights"] },
    { icon: "route", label: "Route", values: ["Cebu -> Moalboal -> Siargao"] },
    { icon: "people", label: "Group Size", values: ["Maximum 22 people"] },
  ],
  // "What's Included" two-column icon list. `value` can be a string or an
  // array of strings — arrays render as a checkmark list (used for "Others").
  whatsIncluded: {
    heading: "What's Included",
    items: [
      { icon: "transport", label: "Transport", value: "Boat, Van, Plane" },
      {
        icon: "airport",
        label: "Flight",
        value: "Cebu to Siargao (included)",
      },
      {
        icon: "accommodation",
        label: "Accommodation",
        value: "10 nights in Hotel",
      },
      {
        icon: "activities",
        label: "Activities",
        value:
          "City Tour, Canyoneering, Snorkeling, Sardine Run, Surf, Island Hopping, Roadtrip",
      },
      { icon: "meals", label: "Meals", value: "8 Breakfasts, 2 Lunches" },
      { icon: "team", label: "Team", value: "Trip Manager + Local Guides" },
      {
        icon: "plus",
        label: "Others",
        value: [
          "24/7 customer experience assistance",
          "Environmental fees & taxes",
          "Local tourist taxes & fees",
        ],
      },
    ],
  },
  // Featured experience cards (image + headline + subtitle).
  tripHighlights: {
    heading: "Trip Highlights",
    items: [
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-triphighlight-1.webp",
        imageAlt: "Canyoneering in Moalboal",
        title: "Canyoneering in Moalboal",
        subtitle: "Enjoy waterfalls and fresh water rivers",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-triphighlight-2.webp",
        imageAlt: "Roadtrip up north of Siargao",
        title: "Roadtrip up north of Siargao",
        subtitle: "See hidden gems and surf in paradise",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-triphighlight-4.webp",
        imageAlt: "Sardine Run",
        title: "Sardine Run",
        subtitle: "See the spectacle marine life",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-triphighlight-3.webp",
        imageAlt: "Surf in paradise",
        title: "Surf in paradise",
        subtitle: "Catch some waves in crystal waters",
      },
    ],
  },
  // Static map image. Replace with an interactive map component later.
  map: {
    heading: "Where you'll go",
    image: `${IMG}/map.jpg`,
    imageAlt:
      "Map of the Philippine Sunrise route from Cebu to Moalboal to Siargao",
  },
  // Day-by-day itinerary. Each day is a collapsible accordion in the UI;
  // `dayNumber` drives the badge label and ordering.
  // `downloadHref` should resolve to a PDF — currently a placeholder path.
  itinerary: {
    heading: "Itinerary",
    downloadLabel: "Download Itinerary",
    downloadHref: `${IMG}/itinerary.pdf`,
    days: [
      {
        dayNumber: 1,
        title: "Cebu Arrival",
        description:
          "Hey there, sunshine! Welcome to Cebu! Get ready to kick off your adventure in style. We'll scoop you up and whisk you off to your hotel, where you can unwind or hit up Ayala mall for some retail therapy. Later, join us for dinner and get ready to meet your new squad over drinks!",
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-day-1.webp",
        imageAlt: "Cebu Arrival",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Red Planet (or similar)",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Meet and Greet (Dinner meals are not included)",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Cebu Historical Tour",
        description:
          "After a lazy morning to recharge, we're off on a historical tour of Churches and Temples Cebu City! Get ready to explore cool churches and temples. Afterward, recharge for the night ahead, Cebu's nightlife is waiting for us!",
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-day-2.webp",
        imageAlt: "Cebu Historical Tour",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Red Planet (or similar)",
          },
          { icon: "activities", label: "Activities", value: "City Tour" },
        ],
      },
      {
        dayNumber: 3,
        title: "Travel to Moalboal and Chill",
        description:
          "Rise and shine, adventurers! We're off to Moalboal! But first, we'll make a pitstop at the epic Simala Church for some Insta-worthy shots. Then, it's all about chilling beachside or poolside before we hit up Moalboal's hotspots!",
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-day-3.webp",
        imageAlt: "Travel to Moalboal and Chill",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Love's Dive Resort (or similar)",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Beachside & poolside chill",
          },
        ],
      },
      {
        dayNumber: 4,
        title: "Sardine Run and Snorkeling",
        description:
          "After a well-deserved lie-in, it's time for the main event: Moalboal's famous sardine run and snorkeling with turtles! Dive in and explore the vibrant underwater world before considering an optional discovery dive. Then, it's time to recharge for another epic night!",
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-day-4.webp",
        imageAlt: "Sardine Run and Snorkeling",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Love's Dive Resort (or similar)",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Sardine run, Snorkeling",
          },
          { icon: "meals", label: "Meals", value: "1 Breakfast" },
        ],
      },
      {
        dayNumber: 5,
        title: "Canyoneering",
        description:
          "Get ready to unleash your inner daredevil! Today, we're hitting the canyons for some adrenaline-pumping fun! Zip line through the canyon, take the plunge from insane heights, and get ready for an epic rush! Then, it's time to prep for another wild night in Moalboal!",
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-day-5-1.webp",
        imageAlt: "Canyoneering",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Love's Dive Resort (or similar)",
          },
          { icon: "activities", label: "Activities", value: "Canyoneering" },
          { icon: "meals", label: "Meals", value: "1 Breakfast, 1 Lunch" },
        ],
      },
      {
        dayNumber: 6,
        title: "Flight to Siargao and Sunset Chill",
        description:
          "Early birds, it's time to catch that flight to Siargao! Once we touch down, it's straight to the hotel to drop our bags and head out for Siargao's famous sunset. Get ready to soak in those island vibes and start the night off right!",
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-day-6.webp",
        imageAlt: "Flight to Siargao and Sunset Chill",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Siargao Seasky (or similar)",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Flight Cebu to Siargao",
          },
          { icon: "meals", label: "Meals", value: "1 Breakfast" },
        ],
      },
      {
        dayNumber: 7,
        title: "Surf and Chill Afternoon",
        description:
          "Surf's up, dudes and dudettes! Get ready to ride the waves like a pro with local instructors by your side. Afterward, kick back and chill with some optional activities before we hit Siargao's nightlife scene for round two!",
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-day-7.webp",
        imageAlt: "Surf and Chill Afternoon",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Siargao Seasky (or similar)",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Surfing with instructor",
          },
          { icon: "meals", label: "Meals", value: "1 Breakfast" },
        ],
      },
      {
        dayNumber: 8,
        title: "Island Hopping",
        description:
          "Hop on board for a day of island hopping around Siargao's hidden gems! We'll snorkel, swim, and soak up the sun while exploring the best of what this paradise has to offer.",
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-day-8.webp",
        imageAlt: "Island Hopping",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Siargao Seasky (or similar)",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Island Hopping with Trekking",
          },
          { icon: "meals", label: "Meals", value: "1 Breakfast, 1 Lunch" },
        ],
      },
      {
        dayNumber: 9,
        title: "North Trip",
        description:
          "Get ready for a full day road trip around Siargao! We'll explore stunning spots along the way, including the iconic Maasin River. Expect scenic drives, a delicious beachfront lunch stop, and plenty of time to soak in the island vibes while making memories to last a lifetime.",
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-day-9.webp",
        imageAlt: "North Trip",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Siargao Seasky (or similar)",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Roadtrip, Maasin River",
          },
          { icon: "meals", label: "Meals", value: "1 Breakfast" },
        ],
      },
      {
        dayNumber: 10,
        title: "Free Day in Siargao",
        description:
          "It's your day, your way! Whether you want to catch some extra waves, discover hidden cafes, explore the island at your own pace, or simply soak up the sun, this free day is all about doing what feels good. Embrace the Siargao vibes and make the most of your island escape.",
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/siargao-day-6.webp",
        imageAlt: "Free Day in Siargao",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Siargao Seasky (or similar)",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Free Day / Optional Activities",
          },
          { icon: "meals", label: "Meals", value: "1 Breakfast" },
        ],
      },
      {
        dayNumber: 11,
        title: "Checkout",
        description:
          "It's time to say goodbye (for now) and swap those Instagram handles with your newfound crew before going on your onward travels.",
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/philippinessunrise-day-11.webp",
        imageAlt: "Checkout",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Siargao Seasky (or similar) - checkout",
          },
          { icon: "meals", label: "Meals", value: "1 Breakfast" },
        ],
      },
    ],
  },
  // Accommodation cards — image + name + nights. "(or similar)" is used
  // because we book the listed property OR an equivalent if unavailable.
  whereWeStay: {
    heading: "Where We Stay",
    items: [
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/redplanet-accommodation.webp",
        imageAlt: "Red Planet (or similar)",
        name: "Red Planet (or similar)",
        nights: "2 nights (Days 1-2)",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/lovesdiveresort-accommodation.webp",
        imageAlt: "Love's Dive Resort in Moalboal",
        name: "Love's Dive Resort (or similar)",
        nights: "3 nights (Days 3-5)",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2024/05/seasky-accommodation.webp",
        imageAlt: "Siargao Seasky hotel",
        name: "Siargao Seasky (or similar)",
        nights: "5 nights (Days 6-10, checkout Day 11)",
      },
    ],
  },
  // Tour-specific FAQs (collapsible accordion). General site-wide FAQs
  // live elsewhere and are linked from `thingsToKnow` below.
  faqs: {
    heading: "FAQs",
    items: [
      {
        question: "Where does the trip start & finish?",
        answer: "The trip starts in Cebu and finishes in Siargao Island.",
      },
      {
        question: "Which airport do I need to fly into?",
        answer:
          "Mactan-Cebu International Airport, or fly into Manila NAIA and then connect to Cebu. You can arrive at any time on Day 1, though the meet and greet dinner is at around 6pm.",
      },
      { question: "What is the local currency?", answer: "Philippine Peso." },
      {
        question: "Do you have an age limit for tours?",
        answer:
          "Tours cater to adventurous travelers aged 18-45, with most guests between 21-35 years old. Perfect for people of all different backgrounds to share travel experiences.",
      },
      {
        question: "Which airport do I fly out from?",
        answer:
          "The tour finishes in Siargao Island. You'll need to book a flight out of Siargao to either Manila or Cebu to catch your flight home.",
      },
    ],
  },
  // Cross-links to site-wide help pages (Travel Info, General FAQs, etc.).
  thingsToKnow: {
    heading: "Things to know",
    items: [
      {
        icon: "info",
        title: "Travel Information",
        description:
          "Get ready for your trip! Find helpful links to everything you need from travel and health requirements to travel guides, visa information, and more here.",
        ctaLabel: "Show more",
        ctaHref: "/travel-information",
      },
      {
        icon: "faq",
        title: "General FAQs",
        description:
          "Have more questions? Check out our FAQs as we might already have the answers.",
        ctaLabel: "Show more",
        ctaHref: "/faqs",
      },
    ],
  },
  // Universal travel tips shown on every tour — override per-tour when
  // a trip has destination-specific advice worth surfacing.
  tips: {
    heading: "Tips",
    items: [
      {
        icon: "luggage",
        title: "Pack smart",
        description:
          "Bring comfortable walking shoes, quick-dry clothing, a reusable water bottle, and a power adapter suited for your destination.",
      },
      {
        icon: "shield",
        title: "Travel insurance",
        description:
          "We require all travelers to have valid travel insurance covering medical, cancellation, and activity risks for the duration of the trip.",
      },
      {
        icon: "sun",
        title: "Beat the climate",
        description:
          "Sunscreen, a hat, and insect repellent go a long way. Stay hydrated and listen to your body, especially on active days.",
      },
      {
        icon: "handshake",
        title: "Respect local customs",
        description:
          "Dress modestly at temples, learn a few local greetings, and tip where appropriate — small gestures make a big difference.",
      },
    ],
  },
  // Right-column sticky booking card on desktop, inline below content on
  // mobile/tablet. `ctaHref` points to the inquiry page until a dedicated
  // booking flow exists.
  booking: {
    durationLabel: "11 Days / 10 Nights",
    routeLabel: "Cebu -> Moalboal -> Siargao",
    priceFromLabel: "From",
    priceCurrency: "GBP",
    priceAmount: "£950",
    depositAmount: "£200",
    ctaLabel: "Reserve Now",
    ctaHref: "https://book.stripe.com/9B63cv2Bt2uB8dR8c7co032",
    footnote: "Additional fees may apply",
  },
  // Related-tour cards are auto-attached in `data/tours.ts` by picking
  // the next three tours in registry order and pulling their cover image
  // + price straight from the JSON. Override here only if a tour needs
  // hand-picked recommendations.

  // Instagram-style 10-image grid. All tiles currently link to the brand
  // Instagram profile; replace `href` per-image to deep-link individual posts.
  community: {
    heading: "With @Imheretravels",
    images: Array.from({ length: 10 }).map((_, i) => ({
      src: `${IMG}/community-${i + 1}.jpg`,
      alt: `Traveler photo ${i + 1}`,
      href: "https://www.instagram.com/imheretravels",
    })),
  },

  // Compact card data shown on `/tours` and home-page tour grids.
  // Kept separate from `header` so listing copy can be tighter than the
  // detail-page H2.
  listingCard: {
    duration: "11 Days / 10 Nights",
    description:
      "Cebu, Moalboal, and Siargao with city tours, canyoneering, sardine run, surf, and island hopping.",
    price: "GBP £950",
    image: "/figma/tour-philippines-sunrise.png",
    imageAlt: "Philippines Sunrise tour",
  },
};

export default philippineSunrise;
