/**
 * Tanzania Exploration (Danielle & Erin)
 *
 * Private/custom variant of the Tanzania Exploration tour. Content is a
 * copy of `tanzania-exploration.ts` — edit here for Danielle & Erin-specific
 * overrides (dates, pricing, itinerary tweaks) without affecting the
 * public tour.
 */
import type { Tour } from "@/types/tour";

export const danielleErinTanzaniaExploration: Tour = {
  slug: "danielleerintanzania",
  name: "Tanzania Exploration (Danielle & Erin)",
  meta: {
    title: "10 Days | Tanzania Exploration (Danielle & Erin)",
    description:
     "This tour will let you experience all of that with Mini Trekking Kilimanjaro, guided game drives to experience the vast wildlife and marine life and then finishing the tour off back in Kilimanjaro after experiencing the amazing beaches in Zanzibar. Join us to experience these amazing destinations and meet people who will become friend’s for life!"
  },
  gallery: {
    hero: "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341299042_tanzania-header-1.webp?alt=media&token=889b4689-5d81-4658-9afd-3066ddc16fbb",
    heroAlt: "Tanzania Exploration (Danielle & Erin)",
    thumbnails: [
      {
        src: "/images/wp-content/uploads/2025/01/tanzania-day-3.webp",
        alt: "Kilimanjaro minitrek through the rainforest",
      },
      {
        src: "/images/wp-content/uploads/2025/08/tanzania-day-22.webp",
        alt: "Chemka Hot Springs",
      },
      {
        src: "/images/wp-content/uploads/2025/01/tanzania-day-4.webp",
        alt: "Tarangire National Park game drive",
      },
      {
        src: "/images/wp-content/uploads/2025/01/tanzania-day-5.webp",
        alt: "Early morning game drive in Ngorongoro Crater",
      },
      {
        src: "/images/wp-content/uploads/2025/01/tanzania-day-9.webp",
        alt: "Swimming with dolphins off Zanzibar",
      },
      {
        src: "/images/wp-content/uploads/2025/01/tanzania-day-10.webp",
        alt: "Blue Lagoon snorkeling and sunset in Zanzibar",
      },
    ],
  },
  header: {
    title: "10 Days | Tanzania Exploration (Danielle & Erin)",
    tags: [
      {
        label: "Tanzania",
        icon: "location",
      },
      {
        label: "Safari",
        icon: "location",
      },
      {
        label: "Marine Safari",
        icon: "location",
      },
      {
        label: "Kilimanjaro",
        icon: "location",
      },
      {
        label: "Zanzibar",
        icon: "location",
      },
    ],
    description:
      "This tour will let you experience all of that with Mini Trekking Kilimanjaro, guided game drives to experience the vast wildlife and marine life and then finishing the tour off back in Kilimanjaro after experiencing the amazing beaches in Zanzibar. Join us to experience these amazing destinations and meet people who will become friend’s for life!"
  },
  keyFacts: [
    {
      icon: "days",
      label: "Tour Dates",
      values: ["September 18, 2026"],
    },
    {
      icon: "days",
      label: "Duration",
      values: ["10 Days and 9 Nights"],
    },
    {
      icon: "route",
      label: "Route",
      values: ["Moshi -> Arusha -> Karatu -> Zanzibar"],
    },
    {
      icon: "people",
      label: "Group Size",
      values: ["Maximum 20 people"],
    },
  ],
  whatsIncluded: {
    heading: "What's Included",
    items: [
      {
        icon: "airport",
        label: "Flights",
        value: "Roundtrip flights from Kilimanjaro <-> Zanzibar",
      },
      {
        icon: "meals",
        label: "Meals",
        value: "9 breakfasts, 4 lunches, 3 dinners",
      },
      {
        icon: "transport",
        label: "Transport",
        value:
          "Private tour bus, Safari Land Cruiser, Airport transfer (excluding the airport drop-off on the last day)",
      },
      {
        icon: "activities",
        label: "Activities",
        value: [
          "Visit to Chemka Hotsprings",
          "Day Tour on Mt Kilimanjaro",
          "Game drives in Tarangire National Park",
          "Game drives in Ngorongoro Crater",
          "Blue Lagoon Snorkeling Zanzibar",
          "Sunset Beach Party",
          "Dolphin Tour",
          "Swim with the Tortoise",
        ],
      },
      {
        icon: "accommodation",
        label: "Stay",
        value: "Hostels and Hotel",
      },
      {
        icon: "plus",
        label: "Others",
        value: [
          "24/7 customer experience assistance",
          "Airport and domestic transfer assistance",
          "Tour Guide",
        ],
      },
    ],
  },
  tripHighlights: {
    heading: "Trip Highlights",
    items: [
      {
        image: "/images/wp-content/uploads/2025/01/tanzania-day-3.webp",
        imageAlt: "Kilimanjaro Mini Trekking",
        title: "Kilimanjaro Mini Trekking",
        subtitle:
          "Experience a mini trek up a section of the famous Kilimanjaro",
      },
      {
        image: "/images/wp-content/uploads/2025/01/tanzania-day-5.webp",
        imageAlt: "Game Drive",
        title: "Game Drive",
        subtitle:
          "Two unforgettable game drives across Tarangire and Ngorongoro",
      },
      {
        image: "/images/wp-content/uploads/2025/01/tanzania-day-9.webp",
        imageAlt: "Safari Blue Tour",
        title: "Safari Blue Tour",
        subtitle: "Experience the vibrant marine life Zanzibar has to offer",
      },
    ],
  },
  itinerary: {
    heading: "Itinerary",
    downloadLabel: "Download Itinerary",
    downloadHref: "",
    days: [
      {
        dayNumber: 1,
        title: "Airport Pickup and Welcome Dinner",
        description:
          "Today is the day that your dreams finally become a reality - you have arrived in this once in a lifetime destination Tanzania. You will be collected at the airport by one of our representatives and transported to our first accommodation to rest up before the welcome dinner.",
        image: "/images/wp-content/uploads/2025/01/tanzania-day-1.webp",
        imageAlt: "Airport Pickup and Welcome Dinner",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Kilimanjaro Crane Hotel",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Welcome Dinner",
          },
          {
            icon: "meals",
            label: "Meals",
            value: "Dinner",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Chemka Hot Springs",
        description:
          "Arrive in Moshi and take the morning to rest and recover from your journey. In the afternoon, embark on a scenic one-hour drive through authentic Tanzanian villages to Chemka Hot Springs, fed by Kilimanjaro's underground mineral waters. Swim in the crystal-clear, warm pond (up to 10 meters deep) surrounded by lush trees, relax on the shore with snacks, and soak in the tranquil natural setting before returning to your accommodation.",
        image: "/images/wp-content/uploads/2025/08/tanzania-day-22.webp",
        imageAlt: "Chemka Hot Springs",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Kilimanjaro Crane Hotel",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Visit waterfalls",
          },
          {
            icon: "meals",
            label: "Meals",
            value: "Breakfast & Lunch",
          },
        ],
      },
      {
        dayNumber: 3,
        title: "Kilimanjaro Minitrekking",
        description:
          "Get ready for an exciting adventure! In the morning, we'll pick you up in Moshi and drive you to the Kilimanjaro National Park Gate (Marangu Gate, 1860m). Once we're all set with the registration, you'll kick off your trek through the vibrant rainforest of Kilimanjaro! As you hike, you'll be surrounded by incredible vegetation and, if you're lucky, you might even spot black and white colobus monkeys, playful blue monkeys, and a variety of colourful birds. After about 3-4 hours of hiking, you'll reach Mandara Hut (2700m), where you can kick back, relax, and enjoy a delicious lunch. Once we've finished lunch our guide will take you on a short 15-minute hike up to Maundi Crater, where you'll be blown away by stunning views of Mount Kilimanjaro, northern Tanzania, and even Kenya! It's then time to head back to Marangu Gate, where our transport will be waiting to take us back to our hotel. As you make your way down, you can enjoy the sunset and reminisce about the unforgettable day you've had!",
        image: "/images/wp-content/uploads/2025/01/tanzania-day-3.webp",
        imageAlt: "Kilimanjaro Minitrekking",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Njiro Legacy",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Minitrekking",
          },
          {
            icon: "meals",
            label: "Meals",
            value: "Breakfast, Lunch & Dinner",
          },
        ],
      },
      {
        dayNumber: 4,
        title: "Visit Tarangire National Park",
        description:
          "In the morning once everyone's gotten breakfast we will make our journey to Karatu via Tarangire National Park. In the Tarangire National Park we will experience a guided game drive where we will see Elephants, baobabs and there's even the possibility of sighting lions, giraffes, hippo to name but a few. From here we make our way to our accommodation in Karatu to check in and relax.",
        image: "/images/wp-content/uploads/2025/01/tanzania-day-4.webp",
        imageAlt: "Visit Tarangire National Park",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Omega View Hotel",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Guided Game Drive",
          },
          {
            icon: "meals",
            label: "Meals",
            value: "Breakfast, Lunch & Dinner",
          },
        ],
      },
      {
        dayNumber: 5,
        title: "Early Morning Game Drive",
        description:
          "We have an early morning today and better to wear some warm clothes as the temperatures can be low in the early morning as we head out on another game drive to Ngorongoro Crater. The early morning game drive is the perfect way to see the different wildlife and the breathtaking landscape areas they inhabit as most of the wildlife is out and about exploring which gives the perfect time for some amazing photography. The game drive isn't just about the wildlife you will also be able to get some amazing shots of Ngorongoro Crater and the beautiful scenery surrounding it. Once everyone has gotten the perfect insta shot it's time to go back and relax with some lunch before making our way to Arusha our next destination.",
        image: "/images/wp-content/uploads/2025/01/tanzania-day-5.webp",
        imageAlt: "Early Morning Game Drive",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Njiro Legacy",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Early Game Drive",
          },
          {
            icon: "meals",
            label: "Meals",
            value: "Breakfast & Lunch",
          },
        ],
      },
      {
        dayNumber: 6,
        title: "Travel to Zanzibar",
        description:
          "Today once we've had breakfast our transport will take us to the airport where we will catch our flight to the magnificent Zanzibar. When we arrive in Zanzibar we will be collected at the airport and take to our new accommodation where the afternoon is our own guest can relax and rest or go out and do some exploring before dinner its entirely up to you!",
        image: "/images/wp-content/uploads/2025/01/tanzania-day-6.webp",
        imageAlt: "Travel to Zanzibar",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Demani Lodge",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Flight to Zanzibar",
          },
          {
            icon: "meals",
            label: "Meals",
            value: "Breakfast",
          },
        ],
      },
      {
        dayNumber: 7,
        title: "Turtle Sanctuary & Swimming With The Dolphins",
        description:
          "Morning trip to Kizimkazi's natural turtle lagoon to learn about conservation efforts and swim with green and hawksbill turtles. Feed and snorkel alongside these gentle creatures in crystal-clear waters before heading back to the lodge. In the afternoon, depart for Mnemba Island to search for bottlenose and humpback dolphins, with opportunities to swim and snorkel among them. Explore vibrant coral reefs teeming with marine life before returning to shore.",
        image: "/images/wp-content/uploads/2025/01/tanzania-day-9.webp",
        imageAlt: "Turtle Sanctuary & Swimming With The Dolphins",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Demani Lodge",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Culture Tours",
          },
          {
            icon: "meals",
            label: "Meals",
            value: "Breakfast",
          },
        ],
      },
      {
        dayNumber: 8,
        title: "Blue Lagoon & Sunset Party",
        description:
          "Morning drive to Michamvi for the Blue Lagoon Snorkeling Tour. Board a traditional dhow and snorkel among colorful coral gardens, tropical fish, and sea stars in calm, turquoise waters. Enjoy fresh fruit or seafood lunch on the beach. In the late afternoon, embark on a sunset cruise along the Indian Ocean aboard a wooden dhow, complete with drinks, snacks, and live music as the sky fills with vibrant sunset colors.",
        image: "/images/wp-content/uploads/2025/01/tanzania-day-10.webp",
        imageAlt: "Blue Lagoon & Sunset Party",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Demani Lodge",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Chill out and Relax",
          },
          {
            icon: "meals",
            label: "Meals",
            value: "Breakfast",
          },
        ],
      },
      {
        dayNumber: 9,
        title: "Free Day in Zanzibar",
        description:
          "Today is yours to enjoy at your own pace! Relax on the beach, explore Stone Town, or book optional activities. Your tour guide can help arrange any activities you're interested in!",
        image: "/images/wp-content/uploads/2025/01/tanzania-day-8.webp",
        imageAlt: "Free Day in Zanzibar",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Demani Lodge",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Chill out and Relax",
          },
          {
            icon: "meals",
            label: "Meals",
            value: "Breakfast",
          },
        ],
      },
      {
        dayNumber: 10,
        title: "Checkout",
        description:
          "It's not goodbye, it's see you later. Time to exchange insta handles if you haven't already with your new friends before our transport picks us up for the airport and onward travels. Safe journeys!",
        image: "/images/wp-content/uploads/2025/01/tanzania-day-4.webp",
        imageAlt: "Checkout",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "La Lindrin Lodge",
          },
          {
            icon: "activities",
            label: "Activities",
            value: "Checkout",
          },
          {
            icon: "meals",
            label: "Meals",
            value: "Breakfast",
          },
        ],
      },
    ],
  },
  whereWeStay: {
    heading: "Where We Stay",
    items: [
      {
        image:
          "/images/wp-content/uploads/2025/08/kilimanjaro-crane-hotel-accommodation.webp",
        imageAlt: "Kilimanjaro Crane Hotel",
        name: "Kilimanjaro Crane Hotel",
        nights: "2 nights in hotel",
      },
      {
        image:
          "/images/wp-content/uploads/2025/08/njiro-legacy-accommodation.webp",
        imageAlt: "Njiro Legacy",
        name: "Njiro Legacy",
        nights: "2 nights in hotel",
      },
      {
        image:
          "/images/wp-content/uploads/2025/01/omega-view-hotel-accommodation.webp",
        imageAlt: "Omega View Hotel",
        name: "Omega View Hotel",
        nights: "1 night in hotel",
      },
      {
        image:
          "/images/wp-content/uploads/2025/01/demani-lodge-accommodation3.webp",
        imageAlt: "Demani Lodge",
        name: "Demani Lodge",
        nights: "4 nights in dorm",
      },
      {
        image:
          "/images/wp-content/uploads/2025/01/lindrin-lodge-accommodation.webp",
        imageAlt: "La Lindrin Lodge",
        name: "La Lindrin Lodge",
        nights: "Day-use facility on departure day",
      },
    ],
  },
  faqs: {
    heading: "FAQs",
    items: [
      {
        question: "Where does the trip start & finish?",
        answer: "The trip starts in Moshi and finishes in Zanzibar.",
      },
      {
        question: "Which airport do I need to fly into?",
        answer: "Moshi - Kilimanjaro Airport (JRO)",
      },
      {
        question: "Do you have an age limit for tours?",
        answer:
          "Our tours cater to adventurous travelers aged 18-45, with most guests between 21-35 years old. Perfect for people of all different backgrounds to share travel experiences.",
      },
      {
        question: "What is the local currency?",
        answer: "Tanzania Schilling (TSh)",
      },
      {
        question: "Which airport do I fly out from?",
        answer: "Zanzibar - Obeid Amani Karume International Airport (ZNZ)",
      },
    ],
  },
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
  tips: {
    heading: "Tips / Notes",
    items: [
      {
        icon: "handshake",
        title: "Tipping guideline",
        description: "US$10.00pp per day",
      },
      {
        icon: "airport",
        title: "International flights",
        description: "International flights are not included",
      },
      {
        icon: "accommodation",
        title: "Pre and post nights",
        description: "Pre and post nights accommodation is not included",
      },
    ],
  },
  booking: {
    durationLabel: "10 Days and 9 Nights",
    routeLabel: "Moshi -> Arusha -> Karatu -> Zanzibar -> Moshi",
    priceFromLabel: "From",
    priceCurrency: "GBP",
    priceAmount: "£1,999",
    depositAmount: "£300",
    ctaLabel: "Reserve Now",
    ctaHref:
      "https://admin.imheretravels.com/reservation-booking-form?tour=danielleerintanzania",
    footnote: "Additional fees may apply",
  },
  listingCard: {
    duration: "10 Days and 9 Nights",
    description:
      "Hosted by Danielle & Erin. Kilimanjaro mini trek, Tarangire and Ngorongoro game drives, Zanzibar marine adventures, with roundtrip domestic flights included.",
    price: "GBP £1,999",
    image:
      "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341299042_tanzania-header-1.webp?alt=media&token=889b4689-5d81-4658-9afd-3066ddc16fbb",
    imageAlt: "Tanzania Exploration (Danielle & Erin)",
  },
};

export default danielleErinTanzaniaExploration;
