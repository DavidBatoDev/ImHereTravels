/**
 * Brazil's Treasures — 12-day Manaus-to-Rio adventure.
 *
 * Originally generated from data/json/tourPackages-04142026.json; hand-
 * enriched with itinerary details, accommodations, and FAQs sourced from
 * the live imheretravels.com Brazil's Treasures page.
 */
import type { Tour } from "@/types/tour";

export const brazilsTreasures: Tour = {
  slug: "brazils-treasures",
  name: "Brazil's Treasures",
  meta: {
    title: "Brazil's Treasures — 12 Day Manaus to Rio Adventure",
    description:
      "Join the 12-day Brazil's Treasures tour: Amazon River cruise, pink dolphins, Paraty island hopping, Sugarloaf, Christ the Redeemer, and Sambadrome Carnival.",
  },
  gallery: {
    hero: "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341307739_brazil-header-4.webp?alt=media&token=811f0f81-f1ba-4267-9da5-69c568c29335",
    heroAlt: "Brazil's Treasures — Rio skyline and Amazon rainforest",
    thumbnails: [
      {
        src: "/images/wp-content/uploads/2025/07/brazil-day-1.webp",
        alt: "Arrival in Manaus",
      },
      {
        src: "/images/wp-content/uploads/2025/07/brazil-day-2.webp",
        alt: "Grand Amazon River experience",
      },
      {
        src: "/images/wp-content/uploads/2025/07/brazil-day-4.webp",
        alt: "Transfer to Paraty",
      },
      {
        src: "/images/wp-content/uploads/2025/07/brazil-day-5.webp",
        alt: "Island hopping in Paraty",
      },
      {
        src: "/images/wp-content/uploads/2025/07/brazil-day-8.webp",
        alt: "City icons of Rio de Janeiro",
      },
      {
        src: "/images/wp-content/uploads/2025/07/brazil-day-9.webp",
        alt: "Favela jeep tour",
      },
      {
        src: "/images/wp-content/uploads/2025/07/brazil-day-10.webp",
        alt: "Helicopter ride over Rio",
      },
      {
        src: "/images/wp-content/uploads/2025/07/brazil-day-11.webp",
        alt: "Sambadrome Carnival night",
      },
    ],
  },
  header: {
    title: "12 Days | Brazil's Treasures",
    tags: [
      { label: "Manaus", icon: "location" },
      { label: "Amazon Rainforest", icon: "location" },
      { label: "Paraty", icon: "location" },
      { label: "Rio de Janeiro", icon: "location" },
    ],
    description:
      "Get ready to fall in love with Brazil, loud, colorful, and alive at every turn. From cruising the mighty Amazon River with pink dolphins to dancing through the cobbled charm of Paraty, this 12-day adventure is pure energy. You'll sip caipirinhas on Copacabana Beach, cable car up Sugarloaf, and dive deep into Rio's iconic culture from favela jeep tours to front row Carnival seats. It's the wild heart of the jungle, the soul of Afro-Brazilian music, and the sparkle of samba nights all in one unforgettable trip.",
  },
  keyFacts: [
    { icon: "days", label: "Tour Dates", values: ["February 3, 2026"] },
    {
      icon: "route",
      label: "Route",
      values: ["Manaus → São Paulo → Paraty → Rio de Janeiro"],
    },
    { icon: "days", label: "Days", values: ["12 Days and 11 Nights"] },
    { icon: "people", label: "Group Size", values: ["Maximum 20 people"] },
  ],
  whatsIncluded: {
    heading: "What's Included",
    items: [
      {
        icon: "transport",
        label: "Transport",
        value: "Boat, Domestic Flight, Off-road Jeep",
      },
      {
        icon: "accommodation",
        label: "Accommodation",
        value: "11 nights in Hotel",
      },
      {
        icon: "activities",
        label: "Activities",
        value:
          "Amazon River Cruise, Pink Dolphin Feeding, Indigenous Village Visit, City Tours, Beaches, Sugarloaf and Christ the Redeemer Tour, Jeep Favela Tour, Sambadrome Carnival Experience",
      },
      {
        icon: "meals",
        label: "Meals",
        value: "11 Breakfasts, 1 Lunch, 1 Dinner",
      },
      { icon: "team", label: "Team", value: "Trip Manager + Local Guides" },
      {
        icon: "plus",
        label: "Others",
        value: [
          "24/7 customer experience assistance",
          "Tour guide",
          "Full-board accommodation during the Amazon Rainforest stay (all meals included)",
          "Entrance fees to all major attractions and sites",
          "Private group experiences in Paraty and Rio de Janeiro",
          "Local experts and naturalists during the Amazon Rainforest stay",
          "Small group size to ensure personalized experiences",
          "All taxes and service charges included",
        ],
      },
      {
        icon: "info",
        label: "What's NOT included",
        value:
          "International flights to/from the destination, Travel insurance, Visas (if required), Personal expenses & optional activities",
      },
    ],
  },
  tripHighlights: {
    heading: "Trip Highlights",
    items: [
      {
        image:
          "/images/wp-content/uploads/2025/07/brazil-trip-highlight-1.webp",
        imageAlt: "Amazon River with pink dolphins",
        title: "Cruise the Amazon River and meet Pink Dolphins",
        subtitle: "",
      },
      {
        image:
          "/images/wp-content/uploads/2025/07/brazil-trip-highlight-2.webp",
        imageAlt: "São Paulo neighborhoods",
        title: "Explore São Paulo's buzzing Neighborhoods",
        subtitle: "",
      },
      {
        image:
          "/images/wp-content/uploads/2025/07/brazil-trip-highlight-3.webp",
        imageAlt: "Sambadrome Carnival",
        title:
          "Experience the electric energy of the Sambadrome during Carnival",
        subtitle: "",
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
        title: "Arrival in Manaus",
        description:
          "Welcome to Brazil! Upon arrival in Manaus, our local team will greet you at the airport and transfer you to your hotel for a well-deserved rest. Depending on your arrival time, you can explore the local area or unwind in your room. The Amazon vibes start here, surrounded by rainforest rhythm.",
        image: "/images/wp-content/uploads/2025/07/brazil-day-1.webp",
        imageAlt: "Arrival in Manaus",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "TRYP by Wyndham Manaus",
          },
          {
            icon: "activities",
            label: "Activity",
            value: "Meet and Greet (Dinner meals are not included)",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Grand Amazon River Experience",
        description:
          "Today, we journey deep into the Amazon River. Cruise past wooden stilt houses, witness the Meeting of the Waters, and feed friendly pink dolphins. We'll also visit an Indigenous village to learn about their traditions and way of life. A hearty Amazonian lunch onboard completes the adventure.",
        image: "/images/wp-content/uploads/2025/07/brazil-day-2.webp",
        imageAlt: "Amazon River cruise",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "TRYP by Wyndham Manaus",
          },
          {
            icon: "activities",
            label: "Activity",
            value:
              "Amazon River Cruise, Pink Dolphin Feeding, Indigenous Village Visit",
          },
          { icon: "meals", label: "Meals", value: "Breakfast, Lunch" },
        ],
      },
      {
        dayNumber: 3,
        title: "Flight to São Paulo",
        description:
          "We leave the jungle behind and fly to Brazil's largest city São Paulo. After landing, we'll head straight to our hotel in the vibrant neighborhood of Moema. Unwind from the flight or take a walk around the nearby streets filled with local cafés and energy.",
        image: "/images/wp-content/uploads/2025/07/brazil-day-3.webp",
        imageAlt: "São Paulo skyline",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Mercure Sao Paulo Paulista",
          },
          {
            icon: "activities",
            label: "Activity",
            value: "Domestic Flight to São Paulo, Transfer",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 4,
        title: "Transfer to Paraty",
        description:
          "After breakfast, we take a scenic drive down the Costa Verde to the colonial town of Paraty. With colorful buildings, cobblestone streets, and lush mountains, it's a photographer's dream. Check in to your charming hotel and enjoy a calm evening walking the quaint lanes or enjoying a drink at the square.",
        image: "/images/wp-content/uploads/2025/07/brazil-day-4.webp",
        imageAlt: "Paraty colonial town",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Pousada Porto Imperial",
          },
          {
            icon: "activities",
            label: "Activity",
            value: "Transfer / Scenic Drive",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 5,
        title: "Island Hopping in Paraty",
        description:
          "We set sail today for a tropical escape across Paraty's bay. Visit paradise islands, snorkel in clear waters, and soak in the sun. Our boat will stop at secret beaches and scenic spots while serving up delicious food and music onboard. Bring your sunscreen — it's a chill day!",
        image: "/images/wp-content/uploads/2025/07/brazil-day-5.webp",
        imageAlt: "Paraty island hopping",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Pousada Porto Imperial",
          },
          {
            icon: "activities",
            label: "Activity",
            value: "Private Boat Tour, Island Stops, Snorkeling",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 6,
        title: "Journey from Paraty to Rio de Janeiro",
        description:
          "Today we head to one of the most iconic cities in the world — Rio de Janeiro! After the road trip, check into your beachfront hotel in Copacabana. You'll have time to relax, stroll the famous sidewalk, or dip your toes into the Atlantic before dinner. The Marvelous City awaits.",
        image: "/images/wp-content/uploads/2025/07/brazil-day-6.webp",
        imageAlt: "Copacabana Beach Rio",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Americas Copacabana Hotel",
          },
          {
            icon: "activities",
            label: "Activity",
            value: "Private Transfer to Rio",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 7,
        title: "Chill in Rio or Join a Boat Cruise",
        description:
          "Wake up in Rio and kick off with an optional boat cruise around Guanabara Bay. See the skyline and Sugarloaf from the water, then spend the rest of the day doing what Rio does best — beach time! Grab a coconut, join a game of volleyball, or catch a sunset from Arpoador.",
        image:
          "https://i0.wp.com/imheretravels.com/wp-content/uploads/2024/09/Novo-Airao-20240315-Barco-KaterreDJI_0351-scaled.webp",
        imageAlt: "Guanabara Bay cruise",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Americas Copacabana Hotel",
          },
          {
            icon: "activities",
            label: "Activity",
            value: "Guanabara Bay Cruise (Optional)",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 8,
        title: "City Icons of Rio",
        description:
          "We're checking off the icons today! Visit Christ the Redeemer for panoramic views of the city, then take a cable car up Sugarloaf Mountain. Stop by the artistic Selarón Steps for some photos and get a real taste of Rio's magic. It's a day of legends and unforgettable sights.",
        image: "/images/wp-content/uploads/2025/07/brazil-day-8.webp",
        imageAlt: "Christ the Redeemer and Sugarloaf",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Americas Copacabana Hotel",
          },
          {
            icon: "activities",
            label: "Activity",
            value: "Sugarloaf, Christ the Redeemer, Selarón Steps",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 9,
        title: "Favela Jeep Tour",
        description:
          "Gain new perspective on Rio with a guided favela jeep tour, offering a raw and respectful look at the city's other side.",
        image: "/images/wp-content/uploads/2025/07/brazil-day-9.webp",
        imageAlt: "Rio favela jeep tour",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Americas Copacabana Hotel",
          },
          { icon: "activities", label: "Activity", value: "Jeep Favela Tour" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 10,
        title: "Helicopter Ride",
        description:
          "Soar above Rio's skyline on a breathtaking helicopter ride and/or just take it slow with a day lounging on Ipanema Beach.",
        image: "/images/wp-content/uploads/2025/07/brazil-day-10.webp",
        imageAlt: "Helicopter over Rio",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Americas Copacabana Hotel",
          },
          { icon: "activities", label: "Activity", value: "Helicopter Ride" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 11,
        title: "Sambadrome Carnival Night",
        description:
          "The grand finale is here! Tonight, you'll witness the spectacle of Brazil's Carnival at the Sambadrome. Dressed in sequins or sipping caipirinhas, it's a magical, musical night full of rhythm and sparkle.",
        image: "/images/wp-content/uploads/2025/07/brazil-day-11.webp",
        imageAlt: "Sambadrome Carnival parade",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Americas Copacabana Hotel",
          },
          {
            icon: "activities",
            label: "Activity",
            value: "Sambadrome Carnival Parade Experience",
          },
          { icon: "meals", label: "Meals", value: "Breakfast, Dinner" },
        ],
      },
      {
        dayNumber: 12,
        title: "Departure from Rio",
        description:
          "All great adventures come to an end. Enjoy your final moments in Rio with a beach stroll or souvenir run before your airport transfer. Until next time — tchau, Brasil!",
        image:
          "https://i0.wp.com/imheretravels.com/wp-content/uploads/2024/09/Rio-de-Janeiro-Afroturismo-20240314-0C0A6032-scaled.webp",
        imageAlt: "Rio departure",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Americas Copacabana Hotel (checkout)",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
    ],
  },
  whereWeStay: {
    heading: "Where we stay",
    items: [
      {
        image:
          "/images/wp-content/uploads/2026/02/TRYP-by-wyndham-manaus-accommodation2.webp",
        imageAlt: "TRYP by Wyndham Manaus",
        name: "TRYP by Wyndham Manaus",
        nights: "2 nights in Hotel",
      },
      {
        image:
          "/images/wp-content/uploads/2026/02/mercure-sao-paulo-paulista-accommodation.webp",
        imageAlt: "Mercure Sao Paulo Paulista",
        name: "Mercure Sao Paulo Paulista",
        nights: "1 night in Hotel",
      },
      {
        image:
          "/images/wp-content/uploads/2026/02/pousada-porto-imperial-accommodation.webp",
        imageAlt: "Pousada Porto Imperial",
        name: "Pousada Porto Imperial",
        nights: "2 nights in Hotel",
      },
      {
        image:
          "/images/wp-content/uploads/2026/02/americas-copacabana-hotel-accommodation2.webp",
        imageAlt: "Americas Copacabana Hotel",
        name: "Americas Copacabana Hotel",
        nights: "6 nights in Hotel",
      },
    ],
  },
  faqs: {
    heading: "FAQs",
    items: [
      {
        question: "Where does the trip start & finish?",
        answer: "It starts in Manaus and finishes in Rio de Janeiro.",
      },
      {
        question: "Which airport do I need to fly into?",
        answer: "Manaus International Airport, Manaus.",
      },
      {
        question: "What should I wear?",
        answer:
          "Pack comfortable clothes suitable for summer: shorts, sunglasses, hat, and sunscreen. Bring beach attire and light jackets for cooler evenings.",
      },
      {
        question: "Do you have an age limit for tours?",
        answer:
          "Our tours cater to adventurous travelers aged 18–45, with most guests between 21–35 years old. It's perfect for people from diverse backgrounds to share travel experiences.",
      },
      {
        question: "What is the local currency?",
        answer:
          "The official currency in Brazil is the Brazilian Real (BRL), often symbolized as R$. It's recommended to carry some cash for small purchases, but credit and debit cards are widely accepted in most cities and tourist areas.",
      },
      {
        question: "Which airport do I fly out from?",
        answer: "Rio de Janeiro–Galeão International Airport (GIG).",
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
    durationLabel: "12 Days and 11 Nights",
    routeLabel: "Manaus to Rio de Janeiro",
    priceFromLabel: "From",
    priceCurrency: "GBP",
    priceAmount: "£1,800",
    depositAmount: "£200",
    ctaLabel: "Reserve Now",
    ctaHref:
      "https://admin.imheretravels.com/reservation-booking-form?tour=brazils-treasures",
    footnote: "Additional fees may apply",
  },
  listingCard: {
    duration: "12 Days and 11 Nights",
    description:
      "Amazon pink dolphins, Paraty island hopping, Christ the Redeemer, Sugarloaf, and front-row Sambadrome Carnival.",
    price: "GBP £1,800",
    image:
      "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341307739_brazil-header-4.webp?alt=media&token=811f0f81-f1ba-4267-9da5-69c568c29335",
    imageAlt: "Brazil's Treasures",
  },
};

export default brazilsTreasures;

