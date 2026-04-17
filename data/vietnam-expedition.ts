/**
 * Vietnam Expedition
 *
 * Auto-generated from data/json/tourPackages-04142026.json by
 * data/scripts/generate-tours.mjs. Safe to hand-edit — the generator
 * only writes files that don't exist yet (run with --force to overwrite).
 *
 * Add richer sections (whatsIncluded, faqs, testimonials, etc.) here as
 * curated content becomes available; see data/philippine-sunrise.ts for a
 * fully-fleshed example.
 */
import type { Tour } from "@/types/tour";

export const vietnamExpedition: Tour = {
  slug: "vietnam-expedition",
  name: "Vietnam Expedition",
  meta: {
    title: "Vietnam Expedition — I'm Here Travels",
    description:
      "Join us for an unforgettable journey through Vietnam’s rich culture and history on our North to South Expedition. We begin in the bustling city of Hanoi, where you'll meet your fellow travelers and st",
  },
  gallery: {
    hero: "/tours/vietnam-expedition/vietnam-header-1.webp",
    heroAlt: "Hanoi old quarter street corner, Vietnam",
    thumbnails: [
      { src: "/tours/vietnam-expedition/vietnam-header-2.webp", alt: "Rowing boat through limestone arch in Halong Bay" },
      { src: "/tours/vietnam-expedition/vietnam-header-3.webp", alt: "Train Street Hanoi with Vietnamese flag" },
      { src: "/tours/vietnam-expedition/vietnam-header-4.webp", alt: "Hue Imperial Citadel, Vietnam" },
      { src: "/tours/vietnam-expedition/vietnam-header-5.webp", alt: "Traditional Vietnamese village house" },
      { src: "/tours/vietnam-expedition/vietnam-header-6.webp", alt: "Hoi An Japanese Bridge at sunset" },
    ],
  },
  header: {
    title: "11 days | Vietnam Expedition",
    tags: [
      {
        label: "Vietnam",
        icon: "location",
      },
      {
        label: "Hanoi",
        icon: "location",
      },
      {
        label: "Hoi An",
        icon: "location",
      },
      {
        label: "Ho Chi Minh",
        icon: "location",
      },
    ],
    description:
      "Join us for an unforgettable journey through Vietnam’s rich culture and history on our North to South Expedition. We begin in the bustling city of Hanoi, where you'll meet your fellow travelers and start building lasting connections. From there, we embark on a scenic cruise through the breathtaking Halong Bay.\n\nOur next stop is Hue where everyone will experience the majestical Imperial City and explore its beautiful surroundings. From Hue we move onto Hoi A via Open Top Army Jeeps an unforgettable experience. In Hoi A you’ll learn to cook delicious Vietnamese dishes by local expert chefs, and create traditional lanterns. Finally, we arrive in the dynamic city of Ho Chi Minh. Here, we delve into Vietnam’s history with visits to the Cu Chi Tunnels, here you will learn about the underground tunnels the Vietnamese used during the war.\n\nThis tour promises to make you fall in love with Vietnam’s vibrant culture and fascinating history. Join us for a professional and exciting adventure that will leave you with lifelong memories.",
  },
  keyFacts: [
    {
      icon: "days",
      label: "Tour Dates",
      values: ["August 5, 2026"],
    },
    {
      icon: "days",
      label: "Duration",
      values: ["11 days"],
    },
    {
      icon: "route",
      label: "Location",
      values: ["Vietnam"],
    },
    {
      icon: "people",
      label: "Group Size",
      values: ["Maximum 15 people"],
    },
  ],
  tripHighlights: {
    heading: "Trip Highlights",
    items: [
      {
        image: "/tours/vietnam-expedition/vietnam-highlight-1.webp",
        imageAlt: "Explore Hoi An",
        title: "Explore Hoi An",
        subtitle: "Travel from Hue to Hoi An via Open Top Army Jeeps stopping along the way for the best Instagram pics",
      },
      {
        image: "/tours/vietnam-expedition/vietnam-highlight-2.webp",
        imageAlt: "Cooking Class",
        title: "Cooking Class",
        subtitle: "Immerse yourself in the Vietnamese cooking culture with a cooking class hosted by expert local chefs",
      },
      {
        image: "/tours/vietnam-expedition/vietnam-highlight-3.webp",
        imageAlt: "Cu Chi Tunnels",
        title: "Cu Chi Tunnels",
        subtitle: "Explore the Cu Chi Tunnels which were used by the Vietnamese people during the war to secretly move around undetected",
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
        title: "Hanoi Arrival",
        description:
          "Welcome to Hanoi, the capital of Vietnam! Get ready for the adventure of a lifetime. Our trusty driver will pick you up after your long flight and take you to our first hotel where you can freshen up and relax before our welcome dinner. Meet your fellow group members and make friends for life!",
        image: "/tours/vietnam-expedition/vietnam-day-1.webp",
        imageAlt: "Hanoi old quarter streets, Vietnam",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Lenid Hotel" },
          { icon: "location", label: "Location", value: "Hanoi" },
          { icon: "meals", label: "Meals", value: "N/A" },
        ],
      },
      {
        dayNumber: 2,
        title: "Cruise to Halong Bay - Kayaking and Beach Day",
        description:
          "Now that we’ve gotten to know each other a little, the adventure begins! We’re off to cruise around the famous Halong Bay. Spend the day kayaking in beautiful waters and relaxing on the beach with a drink in hand. What more could you ask for?",
        image: "/tours/vietnam-expedition/vietnam-day-2.webp",
        imageAlt: "Kayaking through Halong Bay limestone karsts",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Bhaya Classic Cruise" },
          { icon: "location", label: "Location", value: "Halong Bay" },
          { icon: "meals", label: "Meals", value: "Breakfast, Lunch, Dinner" },
          { icon: "activities", label: "Activities", value: "• Kayaking\n• Beach Day" },
        ],
      },
      {
        dayNumber: 3,
        title: "Hanoi Chill Day Before Overnight Train to Hue",
        description:
          "After a tranquil day in Halong Bay, it’s back to Hanoi. The day is yours to relax or explore the city before we board our overnight train Hanoi to Hue. This unique experience is something everyone should have at least once in their lifetime.",
        image: "/tours/vietnam-expedition/vietnam-day-3.webp",
        imageAlt: "Train Street Hanoi, Vietnam",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Overnight Train" },
          { icon: "location", label: "Location", value: "Hanoi - Hue" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 4,
        title: "Hue - Afternoon Explore the Citadel",
        description:
          "When we arrive in Hue we will go straight to the hotel for a short rest after the overnight train. In the afternoon we will make our way out to explore the majestic Imperial City. We will stroll through this beautiful historical complex to explore the intricate architecture and rich heritage of the Nguyen Dynasty you will see the many ancient wall, gates and gardens this Imperial City has to offer.",
        image: "/tours/vietnam-expedition/vietnam-day-4.webp",
        imageAlt: "Hue Imperial Citadel, Vietnam",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Alba Hotel" },
          { icon: "location", label: "Location", value: "Hue" },
          { icon: "activities", label: "Activities", value: "• Exploring the Citadel" },
        ],
      },
      {
        dayNumber: 5,
        title: "Paper Lotus Making",
        description:
          "Thanh Tien Village is a famous village in Vietnam for their offering paper flowers most importantly the lotus flower, in this particular village it dates back 300 years. We will spend half the day in this village with the traditional craft men were they will showcase to you the unique techniques used in making the paper lotus flower but also in visiting here we are supporting the local village making it more approachable to the younger generation and helping keep this local treasure alive.",
        image: "/tours/vietnam-expedition/vietnam-day-5.webp",
        imageAlt: "Traditional paper lotus making in Thanh Tien Village, Hue",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Alba Hotel" },
          { icon: "location", label: "Location", value: "Hue" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
          { icon: "activities", label: "Activities", value: "• Paper Lotus Making" },
        ],
      },
      {
        dayNumber: 6,
        title: "Hue to Hoi An by Open Top Army Jeep",
        description:
          "Today we have a long journey a head but an amazing one you’ll never forget. Once everyone has grabbed breakfast we will set off on a 5-6 journey from Hue to Hoi An via Open Top Army Jeeps. Let the wind blow through your hair while taking in the amazing views around you, along the way we stop at some amazing spots so you can get the best pictures. Once we get to the hotel we can check in and chill a bit before dinner.",
        image: "/tours/vietnam-expedition/vietnam-day-6.webp",
        imageAlt: "Hoi An ancient town Japanese Bridge at sunset",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hoang Trinh Hotel" },
          { icon: "location", label: "Location", value: "Hoi An" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 7,
        title: "Hoi An Basketboat and Cycling",
        description:
          "Once everyone has had breakfast we will meet with a local tour guide who will guide us through a beautiful countryside village by bicycle where you will see things like water buffalos and local farmers in the field. We will visit the bamboo craft are where we will get to experience the popular basket boats here you can learn to paddle the basket boats from the locals. In the afternoon you will have the time to chill and do your own thing maybe you’d like to explore the town more before we all meet for dinner and drinks.",
        image: "/tours/vietnam-expedition/vietnam-day-7.webp",
        imageAlt: "Basket boats in coconut palm waterway, Hoi An",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hoang Trinh Hotel" },
          { icon: "location", label: "Location", value: "Hoi An" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
          { icon: "activities", label: "Activities", value: "• Basketboat\n• Cycling" },
        ],
      },
      {
        dayNumber: 8,
        title: "Hoi An Cooking Class",
        description:
          "Time to dive into Vietnamese culture with a traditional cooking class, this class will be led by expert local chefs. Guest will emerge themselves in the rich culinary heritage of central Vietnam, everyone will fresh ingredients from various herbs, spices and local produce to whip up the perfect Vietnamese meal. Then, try your hand at making traditional Vietnamese lanterns, perfect to take home as a personal gift.",
        image: "/tours/vietnam-expedition/vietnam-day-8.webp",
        imageAlt: "Vietnamese cooking class with local chefs, Hoi An",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hoang Trinh Hotel" },
          { icon: "location", label: "Location", value: "Hoi An" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
          { icon: "activities", label: "Activities", value: "• Cooking Class\n• Lantern Making" },
        ],
      },
      {
        dayNumber: 9,
        title: "Free Day Then Night Train to Ho Chi Minh",
        description:
          "Early birds, enjoy a free day to relax and recharge your energy levels for the busy days ahead. In the evening, board the night train to Ho Chi Minh for an overnight journey.",
        image: "/tours/vietnam-expedition/vietnam-day-9.webp",
        imageAlt: "Ho Chi Minh City Hall, Ho Chi Minh City",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Liberty Parkview" },
          { icon: "location", label: "Location", value: "Ho Chi Minh" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 10,
        title: "Cu Chi Tunnels",
        description:
          "Today we dive into Vietnam’s history with a visit to the Cu Chi Tunnels. See how Vietnamese families lived and moved undetected during the Vietnam War. It’s a unique and fascinating experience!",
        image: "/tours/vietnam-expedition/vietnam-day-10.webp",
        imageAlt: "Cu Chi Tunnels tour, Ho Chi Minh City",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Liberty Parkview" },
          { icon: "location", label: "Location", value: "Ho Chi Minh" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
          { icon: "activities", label: "Activities", value: "• Cu Chi Tunnels" },
        ],
      },
      {
        dayNumber: 11,
        title: "Checkout",
        description:
          "It’s not goodbye, it’s see you later. Exchange contact info with your new friends before our vans pick us up for the airport and onward travels. Safe journeys!",
        image: "/tours/vietnam-expedition/vietnam-day-11.webp",
        imageAlt: "Farewell day in Ho Chi Minh City, Vietnam",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Alagon Saigon Hotel & Spa" },
          { icon: "location", label: "Location", value: "Ho Chi Minh" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
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
  booking: {
    durationLabel: "11 days",
    routeLabel: "Vietnam",
    priceFromLabel: "From",
    priceCurrency: "GBP",
    priceAmount: "£1,200",
    depositAmount: "£200",
    ctaLabel: "Reserve Now",
    ctaHref:
      "https://admin.imheretravels.com/reservation-booking-form?tour=vietnam-expedition",
    footnote: "Additional fees may apply",
  },
  listingCard: {
    duration: "11 days",
    description:
      "Join us for an unforgettable journey through Vietnam’s rich culture and history on our North to South Expedition. We begin in the bustling city of Hanoi, where ",
    price: "GBP £1,200",
    image:
      "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341305320_vietnam-header-4.webp?alt=media&token=be502580-7b8c-47ce-98c3-ce9c250af05e",
    imageAlt: "Vietnam Expedition",
  },
};

export default vietnamExpedition;
