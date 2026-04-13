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
    title: "Philippines Sunrise Getaway — 11 Day Cebu to Siargao Tour",
    description:
      "Join the 11-day Philippines Sunrise Getaway: canyoneering in Moalboal, sardine runs, and surfing in Siargao. Small group, local guides, GBP £950.",
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
      { label: "Philippines", icon: "location" },
      { label: "Cebu", icon: "location" },
      { label: "Siargao", icon: "location" },
    ],
    description:
      "From Cebu's historic streets to Siargao's legendary waves, the Philippines Sunrise Getaway strings together eleven days of canyoneering, snorkeling with sardines, island hopping and sunset chills. Travel with a crew of up to 22 like-minded adventurers, a trip manager and local guides who know exactly where to take you next.",
  },
  // 4-up icon row summarising the trip (dates, length, route, group size).
  keyFacts: [
    {
      icon: "days",
      label: "Tour Dates",
      values: ["October 2–13, 2024", "October 17–28, 2024"],
    },
    { icon: "days", label: "Days", values: ["11 Days"] },
    { icon: "route", label: "Route", values: ["Cebu to Siargao"] },
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
        label: "Airport",
        value: "Van pick up and drop off, Flight Cebu to Siargao",
      },
      { icon: "accommodation", label: "Accommodation", value: "10 nights in Hotel" },
      {
        icon: "activities",
        label: "Activities",
        value: "Canyoneering, Snorkeling, Surfing, Island Hopping, Roadtrip",
      },
      { icon: "meals", label: "Meals", value: "9 Breakfasts, 2 Lunches" },
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
        image: `${IMG}/highlight-canyoneering.jpg`,
        imageAlt: "Canyoneering in Moalboal",
        title: "Canyoneering in Moalboal",
        subtitle: "Enjoy waterfalls and fresh water rivers",
      },
      {
        image: `${IMG}/highlight-roadtrip.jpg`,
        imageAlt: "Roadtrip up north of Siargao",
        title: "Roadtrip up north of Siargao",
        subtitle: "See hidden gems and surf in paradise",
      },
    ],
  },
  // Static map image. Replace with an interactive map component later.
  map: {
    heading: "Where you'll go",
    image: `${IMG}/map.jpg`,
    imageAlt: "Map of the Philippine Sunrise route from Cebu to Siargao",
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
          "Hey there, sunshine! Welcome to Cebu! Get ready to kick off your adventure in style. We'll scoop you up and whisk you off to your hotel, where you can unwind or hit up Ayala mall for some retail therapy. Later, join us for a welcome dinner and get ready to meet your new squad over drinks!",
        image: `${IMG}/day-1.jpg`,
        imageAlt: "Cebu city arrival",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Red Planet (or similar)" },
          { icon: "activities", label: "Activity", value: "Welcome dinner" },
          { icon: "meals", label: "Meals", value: "Welcome shots" },
        ],
      },
      {
        dayNumber: 2,
        title: "Cebu Historical Tour",
        description:
          "After a lazy morning to recharge, we're off on a historical tour of churches and temples in Cebu City. Get ready to explore cool churches and temples, like the awesome Temple of Leah. Afterward, recharge for the night ahead — Cebu's nightlife is waiting for us!",
        image: `${IMG}/day-2.jpg`,
        imageAlt: "Temple of Leah in Cebu",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Red Planet (or similar)" },
          { icon: "activities", label: "Activity", value: "City Tour" },
        ],
      },
      {
        dayNumber: 3,
        title: "Travel to Moalboal and Chill",
        description:
          "Rise and shine, adventurers! We're off to Moalboal! But first, we'll make a pitstop at the epic Simala Church for some Insta-worthy shots. Then, it's all about chilling beachside or poolside before we hit up Moalboal's hotspots!",
        image: `${IMG}/day-3.jpg`,
        imageAlt: "Moalboal beach",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Love's Dive Resort (or similar)" },
          { icon: "activities", label: "Activity", value: "Beachside & poolside chill" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 4,
        title: "Sardine Run and Snorkeling",
        description:
          "After a well-deserved lie-in, it's time for the main event — Moalboal's famous sardine run and snorkeling with turtles! Dive in and explore the vibrant underwater world before considering an optional discovery dive. Then, it's time to recharge for another epic night!",
        image: `${IMG}/day-4.jpg`,
        imageAlt: "Sardine run in Moalboal",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Love's Dive Resort (or similar)" },
          { icon: "activities", label: "Activity", value: "Sardine run, Snorkeling" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 5,
        title: "Canyoneering",
        description:
          "Get ready to unleash your inner daredevil! Today, we're hitting the canyons for some adrenaline-pumping fun! Zip line through the canyon, take the plunge from insane heights, and get ready for an epic rush! Then, it's time to prep for another wild night in Moalboal!",
        image: `${IMG}/day-5.jpg`,
        imageAlt: "Canyoneering jump",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Love's Dive Resort (or similar)" },
          { icon: "activities", label: "Activity", value: "Canyoneering" },
          { icon: "meals", label: "Meals", value: "Breakfast, Lunch" },
        ],
      },
      {
        dayNumber: 6,
        title: "Flight to Siargao and Sunset Chill",
        description:
          "Early birds, it's time to catch that flight to Siargao! Once we touch down, it's straight to the hotel to drop our bags and head out for Siargao's famous sunset. Get ready to soak in those island vibes and start the night off right!",
        image: `${IMG}/day-6.jpg`,
        imageAlt: "Sunset in Siargao",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Siargao Seasky (or similar)" },
          { icon: "transport", label: "Transport", value: "Flight Cebu to Siargao" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 7,
        title: "Surf and Chill Afternoon",
        description:
          "Surf's up, dudes and dudettes! Get ready to ride the waves like a pro with local instructors by your side. Afterward, kick back and chill with some optional activities before we hit Siargao's nightlife scene for round two!",
        image: `${IMG}/day-7.jpg`,
        imageAlt: "Surfing in Siargao",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Siargao Seasky (or similar)" },
          { icon: "activities", label: "Activity", value: "Surfing with instructor" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 8,
        title: "Island Hopping",
        description:
          "Hop on board for a day of island hopping around Siargao's hidden gems! We'll snorkel, swim, and soak up the sun while exploring the best of what this paradise has to offer.",
        image: `${IMG}/day-8.jpg`,
        imageAlt: "Island hopping in Siargao",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Siargao Seasky (or similar)" },
          { icon: "activities", label: "Activity", value: "Island Hopping with Trekking" },
          { icon: "meals", label: "Meals", value: "Breakfast, Lunch" },
        ],
      },
      {
        dayNumber: 9,
        title: "North Trip with Surf",
        description:
          "Get ready to chase those waves as we head north for some epic surf spots! Along the way, we'll hit up beach clubs for refreshments and make memories to last a lifetime.",
        image: `${IMG}/day-9.jpg`,
        imageAlt: "North Siargao surf spot",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Siargao Seasky (or similar)" },
          { icon: "activities", label: "Activity", value: "Roadtrip, Surf" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 10,
        title: "Wakeboarding and Yoga",
        description:
          "Wake up and seize the day! Get your adrenaline fix with some wakeboarding action before unwinding with a soothing yoga session. It's the perfect balance of thrill and chill!",
        image: `${IMG}/day-10.jpg`,
        imageAlt: "Wakeboarding in Siargao",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Siargao Seasky (or similar)" },
          { icon: "activities", label: "Activity", value: "Wakeboarding, Yoga" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 11,
        title: "Checkout Day",
        description:
          "It's time to say goodbye (for now) and swap those Instagram handles with your newfound crew before hopping on your transfer van to the airport.",
        image: `${IMG}/day-11.jpg`,
        imageAlt: "Siargao airport transfer",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Siargao Seasky (or similar)" },
          { icon: "transport", label: "Transport", value: "Van drop off" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
    ],
  },
  // Accommodation cards — image + name + nights. "(or similar)" is used
  // because we book the listed property OR an equivalent if unavailable.
  whereWeStay: {
    heading: "Where we stay",
    items: [
      {
        image: `${IMG}/stay-loves-dive.jpg`,
        imageAlt: "Love's Dive Resort in Moalboal",
        name: "Love's Dive Resort (or similar)",
        nights: "3 nights in Hotel",
      },
      {
        image: `${IMG}/stay-siargao-seasky.jpg`,
        imageAlt: "Siargao Seasky hotel",
        name: "Siargao Seasky (or similar)",
        nights: "6 nights in Hotel",
      },
    ],
  },
  // Tour-specific FAQs (collapsible accordion). General site-wide FAQs
  // live elsewhere and are linked from `thingsToKnow` below.
  faqs: {
    heading: "FAQs",
    items: [
      {
        question: "Where does the tour start & finish?",
        answer: "The trip starts in Cebu and finishes in Siargao Island.",
      },
      {
        question: "Which airport do I need to fly in to?",
        answer:
          "You can either fly into Mactan–Cebu International Airport directly or fly into Manila NAIA and then fly from Manila to Cebu. You can arrive at any time on day 1, though we do have a Welcome Dinner at around 6pm.",
      },
      {
        question: "Which airport do I fly out from?",
        answer:
          "The tour finishes in Siargao Island. You'll need to book your flight out of Siargao to either Manila or Cebu to catch your flight back home.",
      },
      {
        question: "Do you have an age limit for tours?",
        answer:
          "Our tours cater to adventurous travelers aged 18–45, with most guests between 21–35 years old. Perfect for people of all different backgrounds to share travel experiences.",
      },
      {
        question: "What is the local currency?",
        answer: "The local currency in the Philippines is the Philippine Peso.",
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
        ctaHref: "/travel-info",
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
    durationLabel: "11 Day Tour",
    routeLabel: "Cebu to Siargao",
    priceFromLabel: "From",
    priceCurrency: "GBP",
    priceAmount: "£950",
    depositAmount: "£200",
    ctaLabel: "Reserve Now",
    ctaHref: "https://book.stripe.com/9B63cv2Bt2uB8dR8c7co032",
    footnote: "Additional fees may apply",
  },
  // Tour-specific reviews. `rating` is 1–5; component renders that many
  // filled stars. Avatars are square — UI crops to circles.
  testimonials: {
    heading: "What people say about us",
    items: [
      {
        rating: 5,
        date: "May 2023",
        body: "Had an amazing time on the trial tour! Action packed with lots of fun things on the itinerary, and a great bunch of people. Would definitely go again!",
        avatar: `${IMG}/avatar-flynn.jpg`,
        author: "Flynn Deanne",
        location: "London, United Kingdom",
      },
      {
        rating: 5,
        date: "February 2024",
        body: "My experience has been amazing, I'll never forget it. I met extraordinary people and explored beautiful places. I definitely recommend to book a trip!",
        avatar: `${IMG}/avatar-manuel.jpg`,
        author: "Manuel Madonna",
        location: "Milan, Italy",
      },
      {
        rating: 5,
        date: "July 2024",
        body: "I enjoyed the tour! Seamless coordination of transportation and accommodation made me feel like a VIP throughout the trip! LOVED every bit of it!! I highly recommend!",
        avatar: `${IMG}/avatar-bella.jpg`,
        author: "Bella Millan",
        location: "Cagayan, Philippines",
      },
    ],
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
    duration: "11 Day Tour",
    description:
      "Canyoneering, sardine runs and Siargao sunsets on an 11-day Cebu-to-Siargao getaway.",
    price: "GBP £950",
    image: "/figma/tour-philippines-sunrise.png",
    imageAlt: "Philippines Sunrise tour",
  },
};

export default philippineSunrise;
