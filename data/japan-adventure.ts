/**
 * Japan Adventure — 10-day Tokyo-to-Sapporo journey.
 *
 * Originally generated from data/json/tourPackages-04142026.json; hand-
 * enriched with itinerary, accommodations, and FAQs sourced from the
 * live imheretravels.com Japan Adventure page.
 */
import type { Tour } from "@/types/tour";

export const japanAdventure: Tour = {
  slug: "japan-adventure",
  name: "Japan Adventure",
  meta: {
    title: "Japan Adventure — 10 Day Tokyo to Sapporo Tour",
    description:
      "Join the 10-day Japan Adventure: Tokyo city tour, bullet train to Kyoto, tea ceremony, and Sapporo's snowy charm. Optional skiing. GBP £2,150.",
  },
  gallery: {
    hero: "/images/wp-content/uploads/2025/10/japan-trip-highlight-1.webp",
    heroAlt: "Japan Adventure — Tokyo, Kyoto, Sapporo",
    thumbnails: [],
  },
  header: {
    title: "10 Days | Japan Adventure",
    tags: [
      { label: "Tokyo", icon: "location" },
      { label: "Kyoto", icon: "location" },
      { label: "Sapporo", icon: "location" },
    ],
    description:
      "Experience the perfect blend of tradition and innovation on this unforgettable journey through Japan. We start off in Tokyo, the vibrant capital where modern skyscrapers meet historic temples. Enjoy a guided city tour featuring iconic sights like the Meiji Shrine and Shibuya Crossing. After a few days in Tokyo, we will ride the world-renowned bullet train to Kyoto, Japan's cultural heart. Explore ancient temples, serene gardens, and the famous Gion district, home to traditional tea houses and geisha culture. The final stop on the tour will be Sapporo. Discover its laid-back charm, local cuisine, and unique seasonal beauty during a scenic city tour. This tour offers the best of Japan's dynamic cities, rich heritage, and stunning landscapes.",
  },
  keyFacts: [
    { icon: "days", label: "Tour Dates", values: ["To be announced"] },
    { icon: "route", label: "Route", values: ["Tokyo → Kyoto → Sapporo"] },
    { icon: "days", label: "Days", values: ["10 Days and 9 Nights"] },
    { icon: "people", label: "Group Size", values: ["Maximum 20 people"] },
  ],
  whatsIncluded: {
    heading: "What's Included",
    items: [
      { icon: "transport", label: "Transport", value: "Private vehicle, All sightseeing transfers" },
      { icon: "accommodation", label: "Accommodation", value: "9 nights in Hotel" },
      {
        icon: "activities",
        label: "Activities",
        value:
          "Meet & Greet at Tokyo international airport, City Tour, Tea Ceremony, Bullet Train, Optional: Skiing (all gear and equipment included)",
      },
      { icon: "meals", label: "Meals", value: "9 Breakfasts" },
      { icon: "team", label: "Team", value: "Trip Manager + Local Guides" },
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
        image: "/images/wp-content/uploads/2025/10/japan-trip-highlight-1.webp",
        imageAlt: "Tokyo City Tour",
        title: "Tokyo City Tour",
        subtitle:
          "Explore Tokyo and immerse yourself in the various popular landmarks the capital has to offer",
      },
      {
        image: "/images/wp-content/uploads/2025/10/japan-trip-highlight-2.webp",
        imageAlt: "Japan bullet train",
        title: "Famous Bullet Train",
        subtitle: "Hop aboard the infamous bullet train and make your way to Kyoto",
      },
      {
        image: "/images/wp-content/uploads/2025/10/japan-trip-highlight-3.webp",
        imageAlt: "Traditional tea ceremony in Kyoto",
        title: "Tea Ceremony in Kyoto",
        subtitle:
          "Experience the traditional tea ceremony and, if you're keen, try making some tea sweets",
      },
      {
        image: "/images/wp-content/uploads/2025/10/japan-trip-highlight-4.webp",
        imageAlt: "Skiing in Sapporo",
        title: "Skiing in Sapporo (optional)",
        subtitle: "Extend your winter adventure with a trip to a nearby ski resort",
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
        image: "/images/wp-content/uploads/2025/10/japan-day-1.webp",
        imageAlt: "Tokyo arrival",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Sunshine City Prince Hotel (or similar)",
          },
          {
            icon: "activities",
            label: "Activity",
            value: "Meet & greet at the airport and Check in",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Tokyo City Tour",
        description:
          "Explore Japan's dynamic capital like a local! Hop on Tokyo's world-renowned public transport system and visit must-see neighborhoods and landmarks. Recommended stops: Akihabara (anime, gaming, tech), Ueno, Asakusa with its famous Sensoji Temple and Nakamise Shopping Street, Shibuya and the famous scramble crossing, Harajuku's fashion district and the nearby Meiji-jingu shrine, and Shinjuku — where we recommend getting a bird's-eye view of the city from the Tokyo Metropolitan Government Building's observation deck. Finish the day with a meal in a typical Japanese izakaya and try some local specialties.",
        image: "/images/wp-content/uploads/2025/10/japan-day-2.webp",
        imageAlt: "Tokyo Shibuya scramble",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Sunshine City Prince Hotel (or similar)",
          },
          { icon: "activities", label: "Activity", value: "City Tour" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 3,
        title: "Tokyo Free Day",
        description:
          "Explore other areas of Tokyo and the surrounding area at your own pace or relax at the hotel — the day is yours. Recommended day trips include Kamakura and Enoshima by the coast, or for something more traditional, Kawagoe in nearby Saitama prefecture. Otherwise, indulge in fun activities such as a visit to the teamLabs digital art museum or go shopping in one of the countless malls.",
        image: "/images/wp-content/uploads/2025/10/japan-day-3.webp",
        imageAlt: "Tokyo free day",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Sunshine City Prince Hotel (or similar)",
          },
          { icon: "activities", label: "Activity", value: "Free day" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 4,
        title: "Tokyo to Kyoto",
        description:
          "Today after breakfast we will hop aboard the famous bullet train (shinkansen) from Tokyo to the old capital of Kyoto. The rest of the day is free for you to explore on your own. We recommend checking out Yasaka Shrine and the Higashiyama area, or a trip to Fushimi Inari Taisha.",
        image: "/images/wp-content/uploads/2025/10/japan-day-4.webp",
        imageAlt: "Shinkansen bullet train to Kyoto",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "S-Peria Hotel (or similar)" },
          { icon: "activities", label: "Activity", value: "Bullet Train" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 5,
        title: "Kyoto City Tour",
        description:
          "Step into Japan's ancient capital and immerse yourself in serene temples, historical streets, and unforgettable scenic beauty — all in comfort with a chartered bus for the day. Stops include Kinkakuji, Arashiyama with its bamboo grove and picturesque river, Nishiki Market (Kyoto's Kitchen — ideal for lunch), Kiyomizudera, and Gion. Afterwards rest up and prepare for dinner and possibly a few drinks.",
        image: "/images/wp-content/uploads/2025/10/japan-day-5.webp",
        imageAlt: "Kyoto Kinkakuji and Gion",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "S-Peria Hotel (or similar)" },
          { icon: "activities", label: "Activity", value: "Kyoto City Tour" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 6,
        title: "Tea Ceremony",
        description:
          "Today we will dive into some of Japan's rich culture as we experience a traditional Japanese tea ceremony and try your hand at tea sweets making under the guidance of a local teacher. The rest of the day is yours at leisure.",
        image: "/images/wp-content/uploads/2025/10/japan-day-6.webp",
        imageAlt: "Japanese tea ceremony",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "S-Peria Hotel (or similar)" },
          { icon: "activities", label: "Activity", value: "Tea Ceremony" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 7,
        title: "Kyoto to Sapporo",
        description:
          "You will transfer from Kyoto to one of Osaka's airports and then fly to Japan's northernmost prefecture and island of Hokkaido. After arriving in the regional capital of Sapporo the rest of the day is at leisure — go out exploring or just relax at the hotel, it's entirely up to you.",
        image: "/images/wp-content/uploads/2025/10/japan-day-7.webp",
        imageAlt: "Travel to Sapporo",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "New Otani Inn (or similar)" },
          { icon: "activities", label: "Activity", value: "Travel to Sapporo" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 8,
        title: "Sapporo City Tour",
        description:
          "Enjoy the freedom of exploring Hokkaido's snowy capital at your own pace. Sapporo is a charming city with a cozy winter atmosphere, ideal for foodies, culture lovers, and snow seekers alike. Stops include Sapporo Clock Tower, Nijo Market, Sapporo's TV Tower and Odori Park, Ramen Yokocho, the Sapporo Beer Museum or Shiroi Koibito Park, and Tanukikoji Shopping Street. Then rest up and prepare for dinner.",
        image: "/images/wp-content/uploads/2025/10/japan-day-8.webp",
        imageAlt: "Sapporo snowy streets",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "New Otani Inn (or similar)" },
          { icon: "activities", label: "Activity", value: "Sapporo City Tour" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 9,
        title: "Ski Day (Optional)",
        description:
          "Extend your winter adventure with a trip to a nearby ski resort! Perfect for skiing, snowboarding, or simply soaking in snowy mountain views with a cup of hot cocoa. Otherwise this day is at leisure. We recommend a day trip to nearby Otaru, a historic port town, for those less interested in hitting the slopes. If you have onward travels, our local tour guide can assist you with airport transfers.",
        image: "/images/wp-content/uploads/2025/10/japan-day-9-1.webp",
        imageAlt: "Skiing in Hokkaido",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "New Otani Inn (or similar)" },
          { icon: "activities", label: "Activity", value: "Ski (Optional)" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 10,
        title: "Until Next Time",
        description:
          "Enjoy your last breakfast with a view before heading to the airport. You're leaving Japan but trust us, part of your heart will stay behind.",
        image: "/images/wp-content/uploads/2025/10/japan-day-10.webp",
        imageAlt: "Sapporo departure",
        details: [
          { icon: "activities", label: "Activity", value: "Check Out" },
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
          "/images/wp-content/uploads/2026/02/sunshine-city-prince-hotel-accommodation.webp",
        imageAlt: "Sunshine City Prince Hotel",
        name: "Sunshine City Prince Hotel (or similar)",
        nights: "3 nights in Hotel",
      },
      {
        image:
          "/images/wp-content/uploads/2025/10/s-peria-hotel-accommodation.webp",
        imageAlt: "S-Peria Hotel",
        name: "S-Peria Hotel (or similar)",
        nights: "3 nights in Hotel",
      },
      {
        image:
          "/images/wp-content/uploads/2026/02/new-otani-inn-sapporo-accommodation.webp",
        imageAlt: "New Otani Inn Sapporo",
        name: "New Otani Inn Sapporo (or similar)",
        nights: "3 nights in Hotel",
      },
    ],
  },
  faqs: {
    heading: "FAQs",
    items: [
      {
        question: "Where does the trip start & finish?",
        answer: "The trip begins in Tokyo and ends in Sapporo.",
      },
      {
        question: "Which airport do I need to fly into?",
        answer: "Tokyo Haneda Airport (HND).",
      },
      {
        question: "What should I wear?",
        answer:
          "Weather in February will be quite cold, so pack a warm windproof coat or insulated jacket, sweaters and thermal tops, long pants (jeans or lined trousers), scarf, gloves and a warm hat, comfortable waterproof walking shoes or boots, and layers (you'll be indoors a lot, where it's heated). Optional: light rain jacket or compact umbrella.",
      },
      {
        question: "Do you have an age limit for tours?",
        answer:
          "Our tours cater to adventurous travelers aged 18–45, with most guests between 21–35 years old. It's perfect for people from diverse backgrounds to share travel experiences.",
      },
      {
        question: "What is the local currency?",
        answer:
          "The local currency is Japanese Yen (JPY). We advise collecting cash from the airport ATMs; ATMs are also available along the way.",
      },
      {
        question: "Which airport do I fly out from?",
        answer: "New Chitose Airport (CTS), Sapporo.",
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
    durationLabel: "10 Day Tour",
    routeLabel: "Tokyo - Sapporo",
    priceFromLabel: "From",
    priceCurrency: "GBP",
    priceAmount: "£2,150",
    priceCategories: [
      { label: "Standard", amount: "£2150", badge: "yellow" },
      { label: "With Skiing", amount: "£2370", badge: "green" },
    ],
    depositAmount: "£300",
    ctaLabel: "Reserve Now",
    ctaHref: "https://book.stripe.com/fZubJ1ekbfhngKneAvco03G",
    footnote: "Additional fees may apply",
  },
  listingCard: {
    duration: "10 Days and 9 Nights",
    description:
      "Tokyo's neon streets, the shinkansen to Kyoto, a traditional tea ceremony, and Sapporo's snowy charm — with optional skiing.",
    price: "GBP £2,150",
    image: "/images/wp-content/uploads/2025/10/japan-trip-highlight-1.webp",
    imageAlt: "Japan Adventure",
  },
};

export default japanAdventure;
