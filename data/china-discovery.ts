/**
 * China Discovery — 10-day Beijing-to-Shanghai adventure.
 *
 * Originally generated from data/json/tourPackages-04142026.json; hand-
 * enriched with itinerary, accommodations, and FAQs sourced from the
 * live imheretravels.com China Discovery page.
 */
import type { Tour } from "@/types/tour";

export const chinaDiscovery: Tour = {
  slug: "china-discovery",
  name: "China Discovery",
  meta: {
    title: "China Discovery — 10 Day Beijing to Shanghai Tour",
    description:
      "Join the 10-day China Discovery tour: Forbidden City, Mutianyu Great Wall, Shanghai Tower, Zhujiajiao Water Town. Small group, local guides, GBP £1,200.",
  },
  gallery: {
    hero: "https://imheretravels.com/wp-content/uploads/2025/10/china-trip-highlight-1.webp",
    heroAlt: "China Discovery — Beijing and Shanghai",
    thumbnails: [],
  },
  header: {
    title: "10 Days | China Discovery",
    tags: [
      { label: "Beijing", icon: "location" },
      { label: "Shanghai", icon: "location" },
      { label: "Zhujiajiao", icon: "location" },
    ],
    description:
      "Explore the perfect blend of ancient history and modern marvels on this unforgettable journey through China's most iconic cities. In Beijing, uncover centuries of imperial heritage with immersive city tours and a breathtaking visit to the Mutianyu section of the Great Wall, known for its stunning views and fewer crowds. Then, travel to Shanghai, where the skyline soars at the Shanghai Tower, one of the world's tallest buildings. Step back in time with a peaceful escape to Zhujiajiao Water Town, a charming ancient village with canals, stone bridges, and traditional architecture. Experience rich history and culture alongside the futuristic vibes China has to offer.",
  },
  keyFacts: [
    { icon: "days", label: "Tour Dates", values: ["April 19, 2026"] },
    {
      icon: "route",
      label: "Route",
      values: [
        "Beijing → Shanghai → Mutianyu Great Wall → Shanghai Tower → Zhujiajiao Water Town",
      ],
    },
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
          "Meet & Greet at Beijing Capital International Airport, City Tour, Tea Ceremony, Bullet Train",
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
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-trip-highlight-1.webp",
        imageAlt: "Beijing City Tour",
        title: "Beijing City Tour",
        subtitle:
          "Explore Beijing and immerse yourself in the various popular landmarks the city has to offer including the Forbidden City",
      },
      {
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-trip-highlight-2.webp",
        imageAlt: "Mutianyu Great Wall",
        title: "Mutianyu Great Wall",
        subtitle:
          "Tick off one of the 7 wonders of the world — visit Mutianyu Great Wall either hiking along the wall or taking the cable car and admiring the views in comfort",
      },
      {
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-trip-highlight-3.webp",
        imageAlt: "Shanghai Tower",
        title: "Shanghai Tower",
        subtitle:
          "Hop on the elevator to the top of China's tallest building to get those amazing views and pics",
      },
      {
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-trip-highlight-4.webp",
        imageAlt: "Zhujiajiao Water Town",
        title: "Zhujiajiao Water Town",
        subtitle:
          "Explore the ancient Chinese city and experience the rich culture and beautiful architecture it has to offer",
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
        title: "Welcome to Beijing",
        description:
          "A driver will wait for you upon arrival at the airport and transfer you and your fellow travelers to your accommodation in downtown Beijing. Spend the rest of the day to chill or go out exploring before meeting the rest of the group in the evening.",
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-day-1.webp",
        imageAlt: "Beijing arrival",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Beijing Longge Hotel" },
          { icon: "activities", label: "Activity", value: "Meet & Greet at the Airport, Check In" },
        ],
      },
      {
        dayNumber: 2,
        title: "Beijing City Tour",
        description:
          "Start your day at Tiananmen Square, the symbolic heart of Beijing, then visit the nearby Forbidden City to explore centuries of imperial history. Enjoy authentic Chinese cuisine for lunch before heading to the Hutongs, where you can stroll through traditional lanes and experience local life. Continue to Houhai, a lively lake area with cafés, street performances, and cultural sites. Return to the hotel in the evening to freshen up for dinner and drinks.",
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-day-2.webp",
        imageAlt: "Tiananmen Square and Forbidden City",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Beijing Longge Hotel" },
          {
            icon: "activities",
            label: "Activity",
            value: "City Tour (Tiananmen Square, Forbidden City, Hutongs, Houhai)",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 3,
        title: "Mutianyu Great Wall",
        description:
          "After breakfast, set out on a private tour to the Mutianyu section of the Great Wall, one of the most scenic and well-preserved parts of this world wonder. Hike or take the cable car to enjoy stunning mountain views and capture the perfect photo. In the afternoon, return to Beijing to explore the Summer Palace, China's largest and best-preserved imperial garden. Wander through its tranquil grounds and admire the serene views of Kunming Lake and Longevity Hill, a perfect blend of adventure and culture.",
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-day-3.webp",
        imageAlt: "Mutianyu Great Wall",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Beijing Longge Hotel" },
          { icon: "activities", label: "Activity", value: "Mutianyu Great Wall, Summer Palace" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 4,
        title: "789 Art Zone Beijing and Markets",
        description:
          "After a lay-in and breakfast, visit the 789 Art Zone Beijing to grab coffee and admire artworks and small boutiques. Head to vibrant local markets to discover unique handicrafts, souvenirs, and street food. The afternoon is at your own leisurely pace, with the guide available to assist. In the evening, meet again for dinner.",
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-day-4.webp",
        imageAlt: "789 Art Zone Beijing",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Beijing Longge Hotel" },
          {
            icon: "activities",
            label: "Activity",
            value: "789 Art Zone Beijing, Local Markets (Free Afternoon)",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 5,
        title: "Beijing Explore on Your Own",
        description:
          "Enjoy a day to explore Beijing on your own, wandering through its historic streets, markets, and cultural sites. Discover hidden gems, try local snacks, or visit museums at your own pace.",
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-day-5.webp",
        imageAlt: "Beijing free day",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Beijing Longge Hotel" },
          { icon: "activities", label: "Activity", value: "Free Day" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 6,
        title: "Beijing to Shanghai",
        description:
          "Once everyone has grabbed some breakfast we will go and grab the high-speed train to Shanghai. Along the way relax and enjoy the beautiful scenic views. When we get to Shanghai and get checked in, we will make our way to the Bund to take a stroll along the waterfront where you can experience the historic buildings on one side and the city skyscrapers on the other. As the sun goes down capture that amazing sunset pic before hopping aboard a Huangpu River cruise, from here we will head back to the hotel to prepare for dinner and drinks.",
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-day-6.webp",
        imageAlt: "Shanghai Bund",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Holiday Inn Express Shanghai Gongkang",
          },
          {
            icon: "activities",
            label: "Activity",
            value: "High-speed Train, Bund Visit, Huangpu River Cruise",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 7,
        title: "Explore Shanghai Landmarks",
        description:
          "Start your day at Yu Garden, famous for its elegant pavilions, winding corridors, and tranquil ponds. After capturing some great photos, head to the bustling City God Temple Market to explore traditional shops, street food, and local crafts. Next, visit Pudong to take in breathtaking city views from the top of Shanghai Tower, China's tallest building. Conclude the day at the Shanghai Museum, where you can discover the country's rich history and culture before returning to the hotel to freshen up for dinner.",
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-day-7.webp",
        imageAlt: "Yu Garden and Shanghai Tower",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Holiday Inn Express Shanghai Gongkang",
          },
          {
            icon: "activities",
            label: "Activity",
            value: "Yu Garden, City God Temple Market, Shanghai Tower, Shanghai Museum",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 8,
        title: "Zhujiajiao Water Town",
        description:
          "Grab some breakfast and fuel up before making our way to Zhujiajiao Water Town, an ancient Chinese town known for its picturesque canals, stone bridges, and traditional architecture. Walk along the cobblestone streets exploring local shops, try traditional snacks and just soak up the local culture. In the afternoon we make our way back to Shanghai where you have time to relax and chill or go out exploring more — it's entirely up to you.",
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-day-8.webp",
        imageAlt: "Zhujiajiao Water Town canals",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Holiday Inn Express Shanghai Gongkang",
          },
          { icon: "activities", label: "Activity", value: "Zhujiajiao Water Town" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 9,
        title: "Shanghai Free Day",
        description:
          "The day is yours to do as you please. Take a well-deserved lay-in before grabbing some breakfast. Go out and explore more of Shanghai — check out shops and grab some amazing street food. The guide will be available throughout the day if you need any suggestions or help. In the evening we will meet again for one final dinner as a group.",
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-day-9.webp",
        imageAlt: "Shanghai skyline",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Holiday Inn Express Shanghai Gongkang",
          },
          { icon: "activities", label: "Activity", value: "Free Day" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 10,
        title: "Until Next Time",
        description:
          "It's time to check out. After breakfast, our local guide can assist you with your onward travels — he can give you guidance on getting from the metro to a direct train to the airport. Before leaving make sure you've gotten everyone's Instagram handles to stay in touch.",
        image: "https://imheretravels.com/wp-content/uploads/2025/10/china-day-10.webp",
        imageAlt: "Shanghai departure",
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
          "https://imheretravels.com/wp-content/uploads/2025/10/long-ge-hotel-accommodation.webp",
        imageAlt: "Long Ge Hotel Beijing",
        name: "Long Ge Hotel (Beijing)",
        nights: "5 nights in Hotel",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/10/holiday-inn-express-accommodation.webp",
        imageAlt: "Holiday Inn Express Shanghai Gongkang",
        name: "Holiday Inn Express Shanghai Gongkang",
        nights: "4 nights in Hotel",
      },
    ],
  },
  faqs: {
    heading: "FAQs",
    items: [
      {
        question: "Where does the trip start & finish?",
        answer: "The trip begins in Beijing and ends in Shanghai.",
      },
      {
        question: "Which airport do I need to fly into?",
        answer: "Beijing Capital International Airport (PEK).",
      },
      {
        question: "What should I wear?",
        answer:
          "Pack long pants, lighter pants or skirt/dress, tops long and short sleeved, sweater, light jacket, warmer jacket for Beijing nights, comfortable footwear, outfits for dinners, underwear, socks, sunglasses, scarf, hat. Temperatures vary between night and day — layering options are best.",
      },
      {
        question: "Do you have an age limit for tours?",
        answer:
          "Our tours cater to adventurous travelers aged 18–45, with most guests between 21–35 years old. It's perfect for people from diverse backgrounds to share travel experiences.",
      },
      {
        question: "What is the local currency?",
        answer:
          "The local currency is the Chinese Yuan, also known as Renminbi (RMB). We advise guests to first collect cash from the airport ATMs; ATMs are also available along the route.",
      },
      {
        question: "Which airport do I fly out from?",
        answer: "Shanghai Pudong International Airport (PVG).",
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
    routeLabel: "Beijing to Shanghai",
    priceFromLabel: "From",
    priceCurrency: "GBP",
    priceAmount: "£1,200",
    depositAmount: "£200",
    ctaLabel: "Reserve Now",
    ctaHref: "https://book.stripe.com/3cI6oHekb8SZdybakfco03I",
    footnote: "Additional fees may apply",
  },
  listingCard: {
    duration: "10 Days and 9 Nights",
    description:
      "Tiananmen, the Forbidden City, Mutianyu Great Wall, Shanghai Tower, and a peaceful escape to Zhujiajiao Water Town.",
    price: "GBP £1,200",
    image: "https://imheretravels.com/wp-content/uploads/2025/10/china-trip-highlight-1.webp",
    imageAlt: "China Discovery",
  },
};

export default chinaDiscovery;
