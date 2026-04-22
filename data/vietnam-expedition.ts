/**
 * Vietnam North to South Expedition — 11-day Hanoi-to-Da Nang tour.
 *
 * Content sourced from the Notion "Vietnam Expedition" page
 * (last edited 2026-04-20). Route: Hanoi → Ninh Binh → Bai Tu Long →
 * Hue → Hoi An → Da Nang. Earlier revisions of this file described a
 * Ho Chi Minh-ending itinerary — that route has been retired.
 *
 * Image assets live in `public/tours/vietnam-expedition/`. Some day
 * images still reflect the old itinerary (e.g. day-10 is Cu Chi
 * Tunnels) and should be replaced when new assets are available.
 */
import type { Tour } from "@/types/tour";

const IMG = "/tours/vietnam-expedition";

export const vietnamExpedition: Tour = {
  slug: "vietnam-expedition",
  name: "Vietnam Expedition",
  meta: {
    title: "11 Days | Vietnam North to South Expedition",
    description:
      "Journey through Vietnam from vibrant Hanoi and the limestone landscapes of Ninh Binh and Bai Tu Long Bay, to imperial Hue, lantern-lit Hoi An, and beachside Da Nang.",
  },
  gallery: {
    hero: `${IMG}/vietnam-header-1.webp`,
    heroAlt: "Hanoi old quarter street corner, Vietnam",
    thumbnails: [
      { src: `${IMG}/vietnam-header-2.webp`, alt: "Rowing boat through limestone karsts in Bai Tu Long Bay" },
      { src: `${IMG}/vietnam-header-3.webp`, alt: "Train Street Hanoi with Vietnamese flag" },
      { src: `${IMG}/vietnam-header-4.webp`, alt: "Hue Imperial Citadel, Vietnam" },
      { src: `${IMG}/vietnam-header-5.webp`, alt: "Traditional Vietnamese village house" },
      { src: `${IMG}/vietnam-header-6.webp`, alt: "Hoi An Japanese Bridge at sunset" },
    ],
  },
  header: {
    title: "11 Days | Vietnam North to South Expedition",
    tags: [
      { label: "Hanoi", icon: "location" },
      { label: "Ninh Binh", icon: "location" },
      { label: "Hue", icon: "location" },
      { label: "Hoi An", icon: "location" },
      { label: "Da Nang", icon: "location" },
    ],
    description:
      "Join us for an unforgettable journey through the heart of Vietnam, where culture, nature, and local experiences come together seamlessly. Your adventure begins in the vibrant capital of Hanoi, where you'll soak in the city's charm and dive into its famous street food scene.\n\nFrom there, escape to the stunning landscapes of Ninh Binh and enjoy a scenic boat ride through Trang An's limestone karsts. The journey continues to the breathtaking Bai Tu Long Bay, where you'll cruise through emerald waters and enjoy the beauty of Vietnam's quieter, less crowded bays.\n\nTravel south overnight to Hue, the former imperial capital, and explore its rich history in a unique way—by jeep. Then, make your way to the lantern-lit streets of Hoi An, where you'll wander through ancient alleys and experience its timeless charm.\n\nWrap up your adventure in Da Nang, with time to relax on its beautiful beaches and explore the city's modern highlights.\n\nThis tour promises to make you fall in love with Vietnam's vibrant culture and fascinating history. Join us for a professional and exciting adventure that will leave you with lifelong memories.",
  },
  keyFacts: [
    {
      icon: "days",
      label: "Tour Dates",
      values: ["Aug 5, 2026"],
    },
    {
      icon: "days",
      label: "Duration",
      values: ["11 Days"],
    },
    {
      icon: "route",
      label: "Route",
      values: ["Hanoi → Ninh Binh → Hue → Hoi An → Da Nang"],
    },
    {
      icon: "people",
      label: "Group Size",
      values: ["Maximum 22 people"],
    },
  ],
  whatsIncluded: {
    heading: "What's Included",
    items: [
      { icon: "transport", label: "Transport", value: "Boat, Van" },
      { icon: "meals", label: "Meals", value: "8 Breakfasts, 2 Lunches, 1 Dinner" },
      {
        icon: "accommodation",
        label: "Accommodation",
        value: [
          "8 nights in Hotel",
          "1 night on Cruise Boat",
          "1 night on Overnight Train",
        ],
      },
      {
        icon: "activities",
        label: "Activities",
        value: [
          "Hanoi — Welcome Dinner",
          "Hanoi City tour & street food tasting",
          "Ninh Binh — Trang An boat trip",
          "Bai Tu Long — cruise, kayaking & beach day",
          "Hue — city tour by jeep",
          "Hoi An walking tour",
          "Da Nang — beach day & city tour",
        ],
      },
      {
        icon: "plus",
        label: "Add-on Activities",
        value: [
          "Hanoi — Visit Train Street",
          "Hoi An — Tailor Shops",
          "Da Nang — Marble Mountain",
        ],
      },
      { icon: "team", label: "Team", value: "Tour Guide" },
      {
        icon: "plus",
        label: "Others",
        value: [
          "24/7 customer experience assistance",
          "Environmental fees and taxes",
          "Local tourist taxes and fees",
          "Airport pick up",
          "Bai Tu Long → Hanoi → Hue overnight train transfer",
        ],
      },
    ],
  },
  tripHighlights: {
    heading: "Trip Highlights",
    items: [
      {
        image: `${IMG}/vietnam-highlight-1.png`,
        imageAlt: "Cruising Bai Tu Long Bay",
        title: "Ninh Binh → Bai Tu Long",
        subtitle:
          "Cruise around Bai Tu Long Bay and experience the amazing views it has to offer.",
      },
      {
        image: `${IMG}/vietnam-highlight-2.webp`,
        imageAlt: "Exploring Hue by jeep car",
        title: "Hue — Discover the city by jeep",
        subtitle:
          "Explore Hue's rich history and culture on a scenic jeep tour, visiting royal tombs and the Imperial Citadel and experiencing local coffee traditions.",
      },
      {
        image: `${IMG}/vietnam-highlight-3.png`,
        imageAlt: "Hoi An ancient town walking tour",
        title: "Hoi An Walking Tour",
        subtitle:
          "Discover Hoi An's charm on a guided walking tour, exploring its ancient streets, iconic landmarks, and local flavors.",
      },
      {
        image: `${IMG}/vietnam-header-5.webp`,
        imageAlt: "Da Nang city skyline",
        title: "Da Nang City Tour",
        subtitle:
          "Explore Da Nang's highlights on a full-day city tour, from Marble Mountains and cultural sites to scenic Son Tra Peninsula and the iconic Lady Buddha.",
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
        title: "Hanoi Arrival — Welcome Dinner",
        description:
          "Welcome to Hanoi, the capital of Vietnam! Get ready for the adventure of a lifetime. Our trusty driver will pick you up after your long flight and take you to our first hotel where you can freshen up and relax before our welcome dinner. Meet your fellow group members at our welcome dinner and make friends for life!",
        image: `${IMG}/vietnam-day-1.webp`,
        imageAlt: "Hanoi old quarter streets, Vietnam",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "San Premium Hotel" },
          { icon: "location", label: "Location", value: "Hanoi" },
        ],
      },
      {
        dayNumber: 2,
        title: "Hanoi City Tour — Street Food Tasting",
        description:
          "Now that we've gotten to know each other a little, the adventure begins! Start your day exploring Hanoi's cultural and historical landmarks, including the Ho Chi Minh Complex and Temple of Literature. Continue with optional visits to museums or temples such as Hoa Lo Prison or Quan Thanh Temple. In the afternoon, enjoy a cyclo/electric car ride around Hoan Kiem Lake and the Old Quarter. End the day with a guided street food tour, tasting Hanoi's iconic dishes while discovering its vibrant local food culture.",
        image: `${IMG}/vietnam-day-2.jpg`,
        imageAlt: "Hanoi street food and Old Quarter",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "San Premium Hotel" },
          { icon: "location", label: "Location", value: "Hanoi" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
          { icon: "activities", label: "Activities", value: "• Hanoi City Tour\n• Street food tasting" },
        ],
      },
      {
        dayNumber: 3,
        title: "Hanoi → Ninh Binh — Trang An Boat Trip",
        description:
          "After breakfast and hotel check-out, we travel by road to Ninh Binh. Upon arrival, you'll settle in before heading out in the afternoon to explore the stunning Trang An Grottoes, an extraordinary natural wonder featuring majestic limestone mountains rising dramatically over a vast landscape of rice fields and waterways.",
        image: `${IMG}/vietnam-day-3.png`,
        imageAlt: "Trang An limestone karsts and waterways, Ninh Binh",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Tam Coc Botique Garden" },
          { icon: "location", label: "Location", value: "Ninh Binh" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
          { icon: "activities", label: "Activities", value: "• Trang An boat trip" },
        ],
      },
      {
        dayNumber: 4,
        title: "Ninh Binh → Bai Tu Long Bay",
        description:
          "Depart for the legendary Ha Long Bay/Bai Tu Long Bay. Upon arrival at the port, you'll be warmly welcomed on board your cruise. Settle into your cabin before a short trip briefing, then enjoy a delicious fresh seafood lunch as you sail into the breathtaking waters of Bai Tu Long Bay, surrounded by dramatic limestone formations rising from emerald-green seas.\n\nIn the afternoon, dive into adventure with kayaking around hidden corners of the bay, getting up close to its stunning natural beauty. Return to the cruise to relax and take in a magical sunset over the water.\n\nEnd the day with a delightful dinner on board, followed by an overnight stay surrounded by the peaceful beauty of the bay.",
        image: `${IMG}/vietnam-day-4.png`,
        imageAlt: "Kayaking through Bai Tu Long Bay limestone karsts",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Verdure Lotus Cruise" },
          { icon: "location", label: "Location", value: "Ninh Binh → Bai Tu Long Bay" },
          { icon: "meals", label: "Meals", value: "Lunch, Dinner" },
          { icon: "activities", label: "Activities", value: "• Cruise\n• Kayaking\n• Beach day" },
        ],
      },
      {
        dayNumber: 5,
        title: "Bai Tu Long Bay → Hanoi → Night Train to Hue",
        description:
          "Start your morning with a final breath of fresh air in the stunning Bai Tu Long Bay as you enjoy breakfast on board and cruise through its peaceful scenery. Relax as you check out of your cabin while the boat heads back to port, followed by a tasty lunch onboard.\n\nBy late morning, you'll be back on shore and heading to Hanoi. Once there, you'll have a short break to soak in the city vibe before continuing your journey with a night train to Hue.",
        image: `${IMG}/vietnam-day-5.jpg`,
        imageAlt: "Overnight sleeper train from Hanoi to Hue",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Overnight Train" },
          { icon: "location", label: "Location", value: "Hanoi → Night train to Hue" },
          { icon: "meals", label: "Meals", value: "Breakfast, Lunch" },
        ],
      },
      {
        dayNumber: 6,
        title: "Hue Arrival — Discover the City by Jeep",
        description:
          "Arrive in Hue and transfer to your hotel and settle in. Begin your Jeep adventure with a taste of traditional Vietnamese salt coffee while discovering local culture and everyday life. Explore the impressive Khai Dinh Tomb, a striking fusion of Eastern and Western architecture, then continue to the peaceful Minh Mang Tomb, beautifully set within nature. In the afternoon, step back in time at the historic Hue Citadel, the former heart of the Nguyen Dynasty, rich with imperial history and stories of Vietnam's past. After the tour, return to your hotel with unforgettable memories of Hue.",
        image: `${IMG}/vietnam-day-6.jpeg`,
        imageAlt: "Hue Imperial Citadel, Vietnam",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Thanh Lich Hotel" },
          { icon: "location", label: "Location", value: "Hue" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
          { icon: "activities", label: "Activities", value: "• City tour by jeep\n• Khai Dinh Tomb\n• Minh Mang Tomb\n• Hue Citadel" },
        ],
      },
      {
        dayNumber: 7,
        title: "Hue → Hoi An",
        description:
          "Enjoy breakfast at your hotel before setting off on a scenic drive to Hoi An, a UNESCO World Heritage town known for its charming ancient streets and beautifully preserved architecture.\n\nAlong the way, stop at the stunning Lang Co Beach, with its long stretch of white sand and crystal-clear waters, and continue to the breathtaking Hai Van Pass, where ocean and mountains meet in a spectacular view that has inspired countless artists.\n\nArrive in Hoi An by afternoon and check in to your hotel. The evening is yours to relax and soak in the magical atmosphere of this historic town.",
        image: `${IMG}/vietnam-day-7.webp`,
        imageAlt: "Scenic drive through Hai Van Pass between Hue and Hoi An",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Kiman Hoi An Hotel" },
          { icon: "location", label: "Location", value: "Hoi An" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 8,
        title: "Hoi An Walking Tour",
        description:
          "Our guide will pick you up from your hotel for a half-day walking tour through the enchanting Hoi An Ancient Town, a UNESCO World Cultural Heritage site.\n\nStroll through its charming old streets while discovering local flavors and rich history. Along the way, visit iconic landmarks such as the Japanese Covered Bridge, Chinese Assembly Halls, Phuoc Kien Pagoda, Sa Huynh Museum, and the bustling local market.\n\nThis experience offers a perfect blend of culture, history, and cuisine before ending your tour in the heart of Hoi An.",
        image: `${IMG}/vietnam-day-8.png`,
        imageAlt: "Hoi An ancient town Japanese Bridge",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Kiman Hoi An Hotel" },
          { icon: "location", label: "Location", value: "Hoi An" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
          { icon: "activities", label: "Activities", value: "• Walking tour" },
        ],
      },
      {
        dayNumber: 9,
        title: "Hoi An → Da Nang — Free Day",
        description:
          "Enjoy a comfortable transfer from your hotel to Da Nang. After checking in, the rest of the day is yours to unwind, soak up the sun, feel the sea breeze, and relax on Da Nang's beautiful sandy beaches. A perfect day to slow down and enjoy the coastal charm.",
        image: `${IMG}/vietnam-day-9.png`,
        imageAlt: "Da Nang beach and coastline",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Sekong Hotel" },
          { icon: "location", label: "Location", value: "Da Nang" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 10,
        title: "Da Nang City Tour",
        description:
          "Get ready for an exciting full-day adventure in Da Nang! Starting with a morning pick-up from your hotel. Discover the stunning Marble Mountains, explore the artistry of Non Nuoc Stone Carving Village, and dive into history at the Cham Sculpture Museum.\n\nIn the afternoon, head to the breathtaking Son Tra Peninsula and visit the iconic Linh Ung Pagoda, where you'll be rewarded with panoramic city views and the towering 67m Lady Buddha statue. Wrap up the day with a lively visit to Han Market before returning to your hotel, then celebrate the perfect ending with a memorable farewell dinner.",
        image: `${IMG}/vietnam-day-10.png`,
        imageAlt: "Lady Buddha statue at Linh Ung Pagoda, Da Nang",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Sekong Hotel" },
          { icon: "location", label: "Location", value: "Da Nang" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
          { icon: "activities", label: "Activities", value: "• City & historical tour\n• Marble Mountains\n• Son Tra Peninsula\n• Lady Buddha" },
        ],
      },
      {
        dayNumber: 11,
        title: "Checkout",
        description:
          "It's not goodbye, it's see you later. Exchange contact info with your new friends before our vans pick us up for the airport and onward travels. Safe journeys!",
        image: `${IMG}/vietnam-day-11.png`,
        imageAlt: "Farewell day in Da Nang, Vietnam",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Sekong Hotel" },
          { icon: "location", label: "Location", value: "Da Nang" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
    ],
  },
  whereWeStay: {
    heading: "Where We Stay",
    items: [
      {
        image: `${IMG}/San Premuim Hotel.png`,
        imageAlt: "San Premium Hotel, Hanoi",
        name: "San Premium Hotel",
        nights: "2 nights in hotel (Days 1-2)",
      },
      {
        image: `${IMG}/Tam Coc Botique Garden.png`,
        imageAlt: "Tam Coc Botique Garden, Ninh Binh",
        name: "Tam Coc Botique Garden",
        nights: "1 night in hotel (Day 3)",
      },
      {
        image: `${IMG}/verdure lotus cruise.png`,
        imageAlt: "Verdure Lotus Cruise, Bai Tu Long Bay",
        name: "Verdure Lotus Cruise",
        nights: "1 night on cruise (Day 4)",
      },
      {
        image: `${IMG}/overnight-train-accommodation.webp`,
        imageAlt: "Overnight sleeper train, Hanoi to Hue",
        name: "Overnight Train",
        nights: "1 night on sleeper train (Day 5)",
      },
      {
        image: `${IMG}/Thanh Lich Hotel.png`,
        imageAlt: "Thanh Lich Hotel, Hue",
        name: "Thanh Lich Hotel",
        nights: "1 night in hotel (Day 6)",
      },
      {
        image: `${IMG}/Kiman Hoi an.png`,
        imageAlt: "Kiman Hoi An Hotel",
        name: "Kiman Hoi An Hotel",
        nights: "2 nights in hotel (Days 7-8)",
      },
      {
        image: `${IMG}/Sekong Dananng.png`,
        imageAlt: "Sekong Hotel, Da Nang",
        name: "Sekong Hotel",
        nights: "2 nights in hotel (Days 9-10)",
      },
    ],
  },
  faqs: {
    heading: "FAQs",
    items: [
      {
        question: "Where does the trip start & finish?",
        answer: "The trip starts in Hanoi and finishes in Da Nang.",
      },
      {
        question: "Which airport do I need to fly into?",
        answer: "You can fly into Noi Bai International Airport Hanoi — code (HAN).",
      },
      {
        question: "What is the local currency?",
        answer: "Local currency in Vietnam is Vietnamese Dong.",
      },
      {
        question: "Which airport do I fly out from?",
        answer: "You can fly out of Da Nang International Airport — code (DAD).",
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
    durationLabel: "11 Days",
    routeLabel: "Hanoi → Ninh Binh → Hue → Hoi An → Da Nang",
    priceFromLabel: "From",
    priceCurrency: "GBP",
    priceAmount: "£1,099",
    depositAmount: "£200",
    ctaLabel: "Reserve Now",
    ctaHref:
      "https://admin.imheretravels.com/reservation-booking-form?tour=vietnam-expedition",
    footnote: "Additional fees may apply",
  },
  listingCard: {
    duration: "11 Days",
    description:
      "Hanoi, Ninh Binh, Bai Tu Long Bay, Hue, Hoi An and Da Nang — culture, cruises, jeep tours and lantern-lit ancient streets.",
    price: "GBP £1,099",
    image:
      "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341305320_vietnam-header-4.webp?alt=media&token=be502580-7b8c-47ce-98c3-ce9c250af05e",
    imageAlt: "Vietnam North to South Expedition",
  },
};

export default vietnamExpedition;
