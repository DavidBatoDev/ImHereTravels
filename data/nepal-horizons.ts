/**
 * Nepal Horizons — 9-day Kathmandu-to-Pokhara Himalayan adventure.
 *
 * Originally generated from data/json/tourPackages-04142026.json; hand-
 * enriched with itinerary, accommodations, and FAQs sourced from the
 * live imheretravels.com Nepal Horizons page.
 */
import type { Tour } from "@/types/tour";

export const nepalHorizons: Tour = {
  slug: "nepal-horizons",
  name: "Nepal Horizons",
  meta: {
    title: "Nepal Horizons — 9 Day Kathmandu to Pokhara Himalayan Adventure",
    description:
      "Join the 9-day Nepal Horizons tour: Kathmandu's sacred temples, Chitwan jungle safari, Bandipur village, and a hike to Australian Base Camp. GBP £1,099.",
  },
  gallery: {
    hero: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-triphighlight-1.webp",
    heroAlt: "Nepal Horizons — Himalayan temples and peaks",
    thumbnails: [],
  },
  header: {
    title: "9 Days | Nepal Horizons",
    tags: [
      { label: "Kathmandu", icon: "location" },
      { label: "Chitwan", icon: "location" },
      { label: "Bandipur", icon: "location" },
      { label: "Pokhara", icon: "location" },
    ],
    description:
      "Welcome to Nepal, a land of towering peaks, ancient cities, and unforgettable trails. This journey takes you from the vibrant streets and sacred temples of Kathmandu to the wild jungles of Chitwan and the serene lakeside charm of Pokhara. Along the way, hike through hillside villages, spot rhinos on safari, paddle peaceful rivers, and wake to mountain views that stop you in your tracks. With rich culture, deep spirituality, and Himalayan adventure at every turn, Nepal is ready to challenge and inspire.",
  },
  keyFacts: [
    { icon: "days", label: "Tour Dates", values: ["March 15, 2027"] },
    { icon: "route", label: "Route", values: ["Kathmandu → Chitwan → Bandipur → Pokhara"] },
    { icon: "days", label: "Days", values: ["9 Days and 8 Nights"] },
    { icon: "people", label: "Group Size", values: ["Maximum 20 people"] },
  ],
  whatsIncluded: {
    heading: "What's Included",
    items: [
      { icon: "transport", label: "Transport", value: "Private vehicle for all sightseeing transfers" },
      { icon: "accommodation", label: "Accommodation", value: "8 nights in Hotel" },
      {
        icon: "activities",
        label: "Activities",
        value:
          "Visit Pashupatinath Temple, Visit Boudhanath Stupa, Bhaktapur Golden Gate, Village Walk & Sunset by Riverbank, Canoeing in Chitwan, Jeep Safari in Chitwan National Park, Hike to Ramkot Village, Boating on Phewa Lake, Visit Tal Barahi Temple, Hike to Australian Base Camp, Panoramic Annapurna & Fishtail Views",
      },
      { icon: "meals", label: "Meals", value: "8 Breakfasts, 2 Lunches, 4 Dinners" },
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
        image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-triphighlight-1.webp",
        imageAlt: "Pashupatinath Temple and Durbar Square",
        title: "Sacred temples of Kathmandu",
        subtitle: "Explore Pashupatinath & Durbar Square, the spiritual heart of Nepal",
      },
      {
        image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-triphighlight-2.webp",
        imageAlt: "Jeep safari in Chitwan National Park",
        title: "Jungle adventure in Chitwan",
        subtitle: "Jungle walk & jeep safari in search of rhinos, tigers & rare birds",
      },
      {
        image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-triphighlight-3.webp",
        imageAlt: "Bandipur bazaar streets",
        title: "Cultural immersion in Bandipur",
        subtitle: "Charming bazaar streets for the authentic rural life",
      },
      {
        image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-triphighlight-4.webp",
        imageAlt: "Australian Base Camp Annapurna views",
        title: "Hike to Australian Base Camp",
        subtitle: "Scenic trek with panoramic views of Annapurna and Manaslu",
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
        title: "A Himalayan Welcome",
        description:
          "Welcome to Kathmandu! Settle in at your hotel — the rest of the day is free for you to relax after your journey or explore the nearby area at your own pace. Let's have an evening of culture with a welcome dinner at a local Nepali restaurant.",
        image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-day-1.webp",
        imageAlt: "Kathmandu arrival",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hotel Ama-La" },
          { icon: "activities", label: "Activity", value: "Meet & greet at the airport, Check in" },
          { icon: "meals", label: "Meals", value: "Dinner" },
        ],
      },
      {
        dayNumber: 2,
        title: "Heritage Hunt",
        description:
          "Let's start the day at the sacred Bagmati River, where the iconic Pashupatinath Temple whispers stories of devotion. Next, feel the calm energy at the majestic Boudhanath Stupa before stepping back in time at the historic Kathmandu Durbar Square. In the afternoon, wander through the charming streets of Bhaktapur filled with ancient palaces, stunning temples, and vibrant local life.",
        image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-day-2.webp",
        imageAlt: "Pashupatinath Temple and Bhaktapur",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hotel Ama-La" },
          {
            icon: "activities",
            label: "Activity",
            value:
              "Pashupatinath Temple, Boudhanath Stupa, Kathmandu Durbar Square, transfer to Bhaktapur, Golden Gate & Palace of 55 Windows",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 3,
        title: "Journey To Chitwan",
        description:
          "We'll take a scenic drive along the Trishuli River to Chitwan National Park. After a relaxed check-in and delicious lunch, let's take a stroll to the village to catch a beautiful sunset view by the riverbank.",
        image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-day-3.webp",
        imageAlt: "Trishuli River drive to Chitwan",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hotel Landmark Forest Park" },
          {
            icon: "activities",
            label: "Activity",
            value:
              "Transfer to Chitwan National Park, optional rafting on the Trishuli river",
          },
          { icon: "meals", label: "Meals", value: "Breakfast, Lunch & Dinner" },
        ],
      },
      {
        dayNumber: 4,
        title: "Into the Wild",
        description:
          "Wake up to nature and kick off the day with a peaceful canoe ride through Chitwan's waterways, spotting rare birds and maybe a croc or two! Then, let's lace up for a jungle walk with our expert naturalist — the best way to see wildlife up close. After lunch, hop on a Jeep Safari deep into the forest, on the lookout for rhinos, sloth bears, and if luck is on your side… the legendary Royal Bengal Tiger! Cap off the day with a Tharu Tribal Dance under the stars and a hearty dinner.",
        image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-day-4.webp",
        imageAlt: "Chitwan jungle safari",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hotel Landmark Forest Park" },
          {
            icon: "activities",
            label: "Activity",
            value: "Canoeing, Jungle walk, Bird watching, Jeep safari & Tharu Tribal Dance",
          },
          { icon: "meals", label: "Meals", value: "Breakfast, Lunch & Dinner" },
        ],
      },
      {
        dayNumber: 5,
        title: "Bandipur Awaits",
        description:
          "Say goodbye to the jungle and hello to Bandipur, a charming hilltop town frozen in time. Stroll its colorful bazaar, soak up those Himalayan views, and breathe in the mountain air. Ready for a little adventure? Hike to Ramkot Village and experience authentic rural life. Bonus: if you're feeling curious, you can taste local homemade liquor (Raksi) straight from the source — cheers to that!",
        image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-day-5.webp",
        imageAlt: "Bandipur bazaar",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hotel Durbar Himalaya" },
          { icon: "activities", label: "Activity", value: "Transfer to Bandipur, Hike to Ramkot Village" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 6,
        title: "Lakes & Peaks",
        description:
          "After a refreshing forest walk, we drive off to Pokhara, the ultimate chill-and-thrill destination. We'll glide across Phewa Lake in a boat, visit a temple on a tiny island, and soak in the mesmerizing reflection of Machhapuchhre (Fishtail Peak). Pure magic!",
        image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-day-6.webp",
        imageAlt: "Phewa Lake and Fishtail Peak",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hotel Landmark" },
          {
            icon: "activities",
            label: "Activity",
            value: "Transfer to Pokhara, boating on Phewa Lake, Tal Barahi Temple visit",
          },
          { icon: "meals", label: "Meals", value: "Breakfast and Dinner" },
        ],
      },
      {
        dayNumber: 7,
        title: "Hike to Heaven",
        description:
          "Fuel up — it's hike day! From Kande, we'll begin our scenic trek to Australian Base Camp, winding through lush forests, Gurung villages, and stone-paved trails, rewarded with jaw-dropping views of Annapurna, Manaslu, and Fishtail. After our scenic trek, we'll return to Pokhara for some well-earned downtime.",
        image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-day-7.webp",
        imageAlt: "Australian Base Camp trek",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hotel Landmark" },
          { icon: "activities", label: "Activity", value: "Scenic trek to Australian Base Camp" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 8,
        title: "Your Day, Your Way",
        description:
          "Today is yours! Stroll the lakeside, sip coffee in cozy cafés, shop for souvenirs, or simply relax. In the evening, we'll gather for a farewell dinner to toast our adventure together. Laughter, stories, and good vibes guaranteed.",
        image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-day-8.webp",
        imageAlt: "Pokhara lakeside",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hotel Landmark" },
          { icon: "activities", label: "Activity", value: "(Optional) Souvenir Shopping, Cafe Hopping" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 9,
        title: "Until Next Time",
        description:
          "Enjoy your last breakfast with a view before heading to the airport. You're leaving Nepal but trust us, part of your heart will stay behind.",
        image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-day-9.webp",
        imageAlt: "Nepal departure",
        details: [{ icon: "meals", label: "Meals", value: "Breakfast" }],
      },
    ],
  },
  whereWeStay: {
    heading: "Where we stay",
    items: [
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/08/hotel-ama-la-accommodation.webp",
        imageAlt: "Hotel Ama-La",
        name: "Hotel Ama-La",
        nights: "2 nights in Hotel",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/08/landmark-forest-park-accommodation.webp",
        imageAlt: "Landmark Forest Park",
        name: "Landmark Forest Park",
        nights: "2 nights in Hotel",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/08/hotel-durbar-himalaya-accommodation.webp",
        imageAlt: "Hotel Durbar Himalaya",
        name: "Hotel Durbar Himalaya",
        nights: "1 night in Hotel",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/08/hotel-landmark-pokhara-accommodation.webp",
        imageAlt: "Hotel Landmark Pokhara",
        name: "Hotel Landmark Pokhara",
        nights: "3 nights in Hotel",
      },
    ],
  },
  faqs: {
    heading: "FAQs",
    items: [
      {
        question: "Where does the trip start & finish?",
        answer:
          "The trip begins and ends in Kathmandu, Nepal, with arrivals and departures through Tribhuvan International Airport (KTM).",
      },
      {
        question: "Which airport do I need to fly into?",
        answer: "Kathmandu — Tribhuvan International Airport (KTM).",
      },
      {
        question: "What should I wear?",
        answer:
          "Pack comfortable trekking clothes and sturdy hiking shoes for daily activities. Bring layers including light jackets for cooler evenings and warmer gear for trekking days. Don't forget sun protection such as a hat, sunglasses, and sunscreen. When visiting temples, ensure you have modest clothing that covers shoulders and knees.",
      },
      {
        question: "Do you have an age limit for tours?",
        answer:
          "Our tours cater to adventurous travelers aged 18–45, with most guests between 21–35 years old.",
      },
      {
        question: "What is the local currency?",
        answer:
          "The local currency is Nepalese Rupee (NPR). We advise guests to first collect cash from the airport ATMs; ATMs are also available along the way.",
      },
      {
        question: "Which airport do I fly out from?",
        answer: "Kathmandu — Tribhuvan International Airport (KTM).",
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
    durationLabel: "9 Days and 8 Nights",
    routeLabel: "Kathmandu to Pokhara",
    priceFromLabel: "From",
    priceCurrency: "GBP",
    priceAmount: "£1,099",
    depositAmount: "£200",
    ctaLabel: "Reserve Now",
    ctaHref: "https://book.stripe.com/eVq14n2Bt1qxfGjgIDco03j",
    footnote: "Additional fees may apply",
  },
  listingCard: {
    duration: "9 Days and 8 Nights",
    description:
      "Kathmandu's sacred temples, Chitwan jungle safari, Bandipur's charm, and a scenic trek to Australian Base Camp.",
    price: "GBP £1,099",
    image: "https://imheretravels.com/wp-content/uploads/2025/08/nepal-triphighlight-1.webp",
    imageAlt: "Nepal Horizons",
  },
};

export default nepalHorizons;
