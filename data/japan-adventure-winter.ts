import type { Tour } from "@/types/tour";

export const japanAdventureWinter: Tour = {
  slug: "japan-adventure-winter",
  name: "Japan Adventure (Winter)",
  meta: {
    title: "Japan Adventure (Winter) — I'm Here Travels",
    description:
      "Experience the perfect blend of tradition and innovation on this unforgettable 10-day journey through Japan. From Tokyo to Nagano to Kyoto to Osaka, discover Japan's dynamic cities, rich heritage, and stunning winter landscapes.",
  },
  gallery: {
    hero: "/tours/japan-adventure-winter/japan-header-4.webp",
    heroAlt: "Japan Adventure (Winter)",
    thumbnails: [
      { src: "/tours/japan-adventure-winter/japan-header-1.webp", alt: "Japan Adventure (Winter)" },
      { src: "/tours/japan-adventure-winter/japan-header-2.webp", alt: "Japan Adventure (Winter)" },
      { src: "/tours/japan-adventure-winter/japan-header-3.webp", alt: "Japan Adventure (Winter)" },
      { src: "/tours/japan-adventure-winter/japan-header-5.webp", alt: "Japan Adventure (Winter)" },
      { src: "/tours/japan-adventure-winter/japan-header-6.webp", alt: "Japan Adventure (Winter)" },
      { src: "/tours/japan-adventure-winter/japan-header-7.webp", alt: "Japan Adventure (Winter)" },
    ],
  },
  header: {
    title: "10 Days | Japan Winter Adventure",
    tags: [{ label: "Japan", icon: "location" }],
    description:
      "Welcome to Japan. Experience the perfect blend of tradition and innovation on this unforgettable journey through Japan. We start off in Tokyo, the vibrant capital where modern skyscrapers meet historic temples. Enjoy a guided city tour featuring iconic sights like the Meiji Shrine and Shibuya Crossing. After a few days in Tokyo, we will ride the world-renowned bullet train to Kyoto, Japan's cultural heart. Explore ancient temples, serene gardens, and the famous Gion district, home to traditional tea houses and geisha culture. The final stop on the tour will be Sapporo. Discover its laid-back charm, local cuisine, and unique seasonal beauty during a scenic city tour. This tour offers the best of Japan's dynamic cities, rich heritage, and stunning landscapes.",
  },
  keyFacts: [
    { icon: "days", label: "Tour Dates", values: ["TBA"] },
    { icon: "days", label: "Duration", values: ["10 Days and 9 Nights"] },
    {
      icon: "route",
      label: "Route",
      values: ["Tokyo → Nagano → Kyoto → Osaka"],
    },
    { icon: "people", label: "Group Size", values: ["Maximum 20 people"] },
  ],
  whatsIncluded: {
    heading: "What's Included",
    items: [
      {
        icon: "transport",
        label: "Transport",
        value: "Private vehicle - All sightseeing transfers",
      },
      {
        icon: "accommodation",
        label: "Accommodation",
        value: "9 nights in Hotel",
      },
      {
        icon: "activities",
        label: "Activities",
        value:
          "Meet & Greet at Tokyo international airport, City Tour, Tea Ceremony, Bullet Train",
      },
      { icon: "meals", label: "Meals", value: "9 Breakfasts" },
      {
        icon: "plus",
        label: "Others",
        value: [
          "24/7 customer experience assistance",
          "Airport and domestic transfer assistance",
          "Tour Guide",
          "Private vehicle for all transfers & sightseeing",
        ],
      },
    ],
  },
  tripHighlights: {
    heading: "Trip Highlights",
    items: [
      {
        image: "/tours/japan-adventure-winter/japan-trip-highlight-1.webp",
        imageAlt: "Tokyo City Tour",
        title: "Tokyo City Tour",
        subtitle:
          "Explore Tokyo and immerse yourself in the various popular landmarks the capital has to offer",
      },
      {
        image: "/tours/japan-adventure-winter/japan-trip-highlight-2.webp",
        imageAlt: "Famous Bullet Train",
        title: "Famous Bullet Train",
        subtitle:
          "Hop aboard the infamous bullet train and make your way to Kyoto",
      },
      {
        image: "/tours/japan-adventure-winter/japan-trip-highlight-3.webp",
        imageAlt: "Tea Ceremony in Kyoto",
        title: "Tea Ceremony in Kyoto",
        subtitle:
          "Experience the traditional tea ceremony and, if you're keen, try making some tea sweets",
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
        title: "Welcome to Tokyo",
        description:
          "A driver will wait for you upon arrival at the airport and transfer you and your fellow travelers to your accommodation in downtown Tokyo. Use the rest of your day for your own first exploration of the city.",
        image: "/tours/japan-adventure-winter/japan-day-1.webp",
        imageAlt: "Welcome to Tokyo",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Moxy Tokyo Kinshicho",
          },
          { icon: "location", label: "Location", value: "Tokyo" },
          {
            icon: "activities",
            label: "Activities",
            value: "Meet & greet at the airport, Check in",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Tokyo City Tour",
        description:
          "Explore Japan's dynamic capital like a local! Hop on Tokyo's world-renowned public transport system and visit must-see neighborhoods and landmarks. Recommended stops: Akihabara (anime, gaming, tech), Ueno, Asakusa with its famous Sensoji Temple and Nakamise Shopping Street, Shibuya and the famous scramble crossing, Harajuku's fashion district and the nearby Meiji-jingu shrine, and Shinjuku — where we recommend getting a bird's-eye view of the city from the Tokyo Metropolitan Government Building's observation deck. Finish the day with a meal in a typical Japanese izakaya and try some local specialties.",
        image: "/tours/japan-adventure-winter/japan-day-2.webp",
        imageAlt: "Tokyo City Tour",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Moxy Tokyo Kinshicho",
          },
          { icon: "location", label: "Location", value: "Tokyo" },
          { icon: "activities", label: "Activities", value: "City Tour" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 3,
        title: "Tokyo Free Day",
        description:
          "Explore other areas of Tokyo and the surrounding area at your own pace or relax at the hotel — the day is yours. Recommended day trips include Kamakura and Enoshima by the coast, or for something more traditional, Kawagoe in nearby Saitama prefecture. Otherwise, indulge in fun activities such as a visit to the teamLab's digital art museum or go shopping in one of the countless malls.",
        image: "/tours/japan-adventure-winter/japan-day-3.webp",
        imageAlt: "Tokyo Free Day",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Moxy Tokyo Kinshicho",
          },
          { icon: "location", label: "Location", value: "Tokyo" },
          { icon: "activities", label: "Activities", value: "Free Day" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 4,
        title: "Tokyo to Nagano",
        description:
          "Start your journey in Tokyo and enjoy a scenic journey to Nagano. Upon arrival and hotel check-in, set out for a brief but enriching visit to the historic Zenkoji Temple, one of Japan's most important and revered Buddhist sites. Take a leisurely stroll along Nakamise Street, where charming shops and local treats offer a delightful glimpse into traditional culture.",
        image: "/tours/japan-adventure-winter/japan-day-4.webp",
        imageAlt: "Tokyo to Nagano",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Dormy Inn Nagano",
          },
          { icon: "location", label: "Location", value: "Nagano" },
          {
            icon: "activities",
            label: "Activities",
            value: "Zenkoji Temple and Nakamise Street Tour",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 5,
        title: "Nagano (Skiing Optional)",
        description:
          "Enjoy a free day in Nagano to explore at your own pace. For those seeking adventure, take advantage of the optional skiing experience and hit the slopes surrounded by the region's stunning alpine scenery.",
        image: "/tours/japan-adventure-winter/japan-day-5.webp",
        imageAlt: "Nagano (Skiing Optional)",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Dormy Inn Nagano",
          },
          { icon: "location", label: "Location", value: "Nagano" },
          { icon: "activities", label: "Activities", value: "Free Day" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 6,
        title: "Nagano to Kyoto",
        description:
          "Today after breakfast we will hop aboard the famous bullet train (shinkansen). Before check-in, we will immerse ourselves in Japan's rich culture by participating in a traditional Japanese tea ceremony and learning to make tea sweets under the guidance of a local teacher. The rest of the day is yours at leisure.",
        image: "/tours/japan-adventure-winter/japan-day-6.webp",
        imageAlt: "Nagano to Kyoto",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "S-Peria Hotel",
          },
          { icon: "location", label: "Location", value: "Kyoto" },
          { icon: "activities", label: "Activities", value: "Tea Ceremony" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 7,
        title: "Kyoto City Tour",
        description:
          "Step into Japan's ancient capital and immerse yourself in serene temples, historical streets, and unforgettable scenic beauty — all in comfort with a chartered bus for the day. Stops include Kinkakuji, Arashiyama with its bamboo grove and picturesque river, Nishiki Market (Kyoto's Kitchen — ideal for lunch), Kiyomizudera, and Gion. Afterwards rest up and prepare for dinner and possibly a few drinks.",
        image: "/tours/japan-adventure-winter/japan-day-7.webp",
        imageAlt: "Kyoto City Tour",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "S-Peria Hotel",
          },
          { icon: "location", label: "Location", value: "Kyoto" },
          { icon: "activities", label: "Activities", value: "City Tour" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 8,
        title: "Kyoto Free Day",
        description:
          "Enjoy a free day in Kyoto to explore the city at your pace. Wander through historic streets, visit iconic temples and shrines, or relax in traditional tea houses and gardens. From cultural landmarks to hidden corners, Kyoto offers endless discoveries. Make the day your own and experience the timeless beauty of Japan's ancient capital.",
        image: "/tours/japan-adventure-winter/japan-header-2.webp",
        imageAlt: "Kyoto Free Day",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "S-Peria Hotel",
          },
          { icon: "location", label: "Location", value: "Kyoto" },
          { icon: "activities", label: "Activities", value: "Free Day" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 9,
        title: "Kyoto to Osaka",
        description:
          "Depart from your Kyoto hotel and travel towards Osaka, with enriching stops along the way. Visit the iconic Fushimi Inari Taisha, then continue to Nara to explore Nara Park and the magnificent Todai-ji Temple. After this cultural side trip, arrive at your Osaka hotel, with the late afternoon free to relax or explore.",
        image: "/tours/japan-adventure-winter/japan-day-9.webp",
        imageAlt: "Kyoto to Osaka",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Sarasa Hotel Namba",
          },
          { icon: "location", label: "Location", value: "Osaka" },
          { icon: "activities", label: "Activities", value: "Nara Day tour" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 10,
        title: "Check Out, Until Next Time!",
        description:
          "Enjoy your last breakfast with a view before heading to the airport. You're leaving Japan but trust us, part of your heart will stay behind.",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Sarasa Hotel Namba (checkout)",
          },
          { icon: "location", label: "Location", value: "Osaka" },
          { icon: "activities", label: "Activities", value: "Check out" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
    ],
  },
  whereWeStay: {
    heading: "Where We Stay",
    items: [
      {
        image: "/tours/japan-adventure-winter/Moxy.png",
        imageAlt: "Moxy Tokyo Kinshicho",
        name: "Moxy Tokyo Kinshicho",
        nights: "3 nights (Days 1–3)",
      },
      {
        image: "/tours/japan-adventure-winter/Dormy-Inn.png",
        imageAlt: "Dormy Inn Nagano",
        name: "Dormy Inn Nagano",
        nights: "2 nights (Days 4–5)",
      },
      {
        image: "/tours/japan-adventure-winter/S-Peria.webp",
        imageAlt: "S-Peria Hotel",
        name: "S-Peria Hotel",
        nights: "3 nights (Days 6–8)",
      },
      {
        image: "/tours/japan-adventure-winter/Sarasa.png",
        imageAlt: "Sarasa Hotel Namba",
        name: "Sarasa Hotel Namba",
        nights: "1 night (Day 9, checkout Day 10)",
      },
    ],
  },
  faqs: {
    heading: "FAQs",
    items: [
      {
        question: "Where does the trip start & finish?",
        answer: "The trip begins in Tokyo and ends in Osaka.",
      },
      {
        question: "Which airport do I need to fly into?",
        answer: "Tokyo Haneda Airport (HND)",
      },
      {
        question: "What should I wear?",
        answer:
          "Weather in February will be quite cold, so pack a warm windproof coat or insulated jacket, sweaters and thermal tops, long pants (jeans or lined trousers), scarf, gloves and a warm hat, comfortable waterproof walking shoes or boots, and layers (you'll be indoors a lot, where it's heated). Optional: light rain jacket or compact umbrella.",
      },
      {
        question: "Do you have an age limit for tours?",
        answer:
          "Tours cater to adventurous travelers aged 18–45, with most guests between 21–35 years old. It's perfect for people from diverse backgrounds to share travel experiences.",
      },
      {
        question: "What is the local currency?",
        answer:
          "Japanese Yen (JPY). Advised to collect cash from airport ATMs; ATMs also available along the route.",
      },
      {
        question: "Which airport do I fly out from?",
        answer: "Kansai International Airport (KIX)",
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
    durationLabel: "10 Days and 9 Nights",
    routeLabel: "Tokyo → Nagano → Kyoto → Osaka",
    priceFromLabel: "From",
    priceCurrency: "GBP",
    priceAmount: "£1,999",
    depositAmount: "£300",
    ctaLabel: "Reserve Now",
    ctaHref:
      "https://admin.imheretravels.com/reservation-booking-form?tour=japan-adventure-winter",
    footnote: "Additional fees may apply",
  },
  community: {
    heading: "With @Imheretravels",
    images: [
      "/tours/japan-adventure-winter/japan-header-1.webp",
      "/tours/japan-adventure-winter/japan-header-3.webp",
      "/tours/japan-adventure-winter/japan-header-5.webp",
      "/tours/japan-adventure-winter/japan-header-6.webp",
      "/tours/japan-adventure-winter/japan-day-2.webp",
      "/tours/japan-adventure-winter/japan-day-3.webp",
      "/tours/japan-adventure-winter/japan-day-5.webp",
      "/tours/japan-adventure-winter/japan-day-7.webp",
      "/tours/japan-adventure-winter/japan-day-8.webp",
      "/tours/japan-adventure-winter/japan-trip-highlight-2.webp",
    ].map((src, i) => ({
      src,
      alt: `Japan winter travel photo ${i + 1}`,
      href: "https://www.instagram.com/imheretravels",
    })),
  },
  listingCard: {
    duration: "10 Days and 9 Nights",
    description:
      "Welcome to Japan. Experience the perfect blend of tradition and innovation on this unforgettable journey through Japan. We start off in Tokyo, the vibrant capital where modern skyscrapers meet historic temples.",
    price: "GBP £1,999",
    image: "/tours/japan-adventure-winter/japan-header-4.webp",
    imageAlt: "Japan Adventure (Winter)",
  },
};

export default japanAdventureWinter;
