/**
 * New Zealand Expedition — 15-day Auckland-to-Queenstown adventure.
 *
 * Originally generated from data/json/tourPackages-04142026.json; hand-
 * enriched with itinerary, accommodations, and FAQs sourced from the
 * live imheretravels.com New Zealand Expedition page.
 */
import type { Tour } from "@/types/tour";

export const newZealandExpedition: Tour = {
  slug: "new-zealand-expedition",
  name: "New Zealand Expedition",
  meta: {
    title: "New Zealand Expedition — 15 Day Auckland to Queenstown Adventure",
    description:
      "Join the 15-day New Zealand Expedition: Auckland, Raglan surf, Waitomo glowworms, Rotorua, Milford Sound cruise, glacier adventures, and Queenstown thrills.",
  },
  gallery: {
    hero: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-day-11.webp",
    heroAlt: "New Zealand Expedition — alpine peaks and coastal wonders",
    thumbnails: [],
  },
  header: {
    title: "15 Days | New Zealand Expedition",
    tags: [
      { label: "Auckland", icon: "location" },
      { label: "Wellington", icon: "location" },
      { label: "Christchurch", icon: "location" },
      { label: "Queenstown", icon: "location" },
    ],
    description:
      "Embark on an unforgettable 15-day journey through Aotearoa, the land of the long white cloud. From the vibrant cityscapes of Auckland and Wellington to the serene beauty of Rotorua's geothermal wonders and Queenstown's adrenaline-pumping adventures, this expedition offers a perfect blend of culture, nature, and thrill. Experience Māori traditions, explore glowworm-lit caves, cruise the majestic Milford Sound, and immerse yourself in the diverse landscapes that make New Zealand a traveler's paradise.",
  },
  keyFacts: [
    { icon: "days", label: "Tour Dates", values: ["To be announced"] },
    {
      icon: "route",
      label: "Route",
      values: [
        "North: Auckland → Raglan → Waitomo → Rotorua → Wellington",
        "South: Christchurch → Franz Josef → Queenstown → Milford Sound",
      ],
    },
    { icon: "days", label: "Days", values: ["15 Days and 14 Nights"] },
    { icon: "people", label: "Group Size", values: ["Maximum 16 people"] },
  ],
  whatsIncluded: {
    heading: "What's Included",
    items: [
      {
        icon: "transport",
        label: "Transport",
        value:
          "Private Coach, Ferry (Wellington → Picton), Coastal Pacific Scenic Train (Picton → Christchurch)",
      },
      { icon: "accommodation", label: "Accommodation", value: "14 nights in shared hostel accommodation" },
      {
        icon: "activities",
        label: "Activities",
        value:
          "Optional: Whakarewarewa Living Māori Village and Traditional Hāngī Lunch, Lake Tarawera Water Taxi, Guided Hike & Natural Hot Pools, Kiwi Hatchery Conservation Experience, Time Tripper Underwater Experience, Milford Sound Day Trip",
      },
      { icon: "meals", label: "Meals", value: "15 Breakfasts, 1 Lunch, 1 Dinner" },
      { icon: "team", label: "Team", value: "Local Guides" },
      {
        icon: "plus",
        label: "Others",
        value: [
          "24/7 customer experience assistance",
          "Interislander Ferry",
          "Tour Guide",
        ],
      },
    ],
  },
  tripHighlights: {
    heading: "Trip Highlights",
    items: [
      {
        image: "https://imheretravels.com/wp-content/uploads/2025/05/new-zealand-day-22.webp",
        imageAlt: "Raglan Beach surf",
        title: "Raglan Beach",
        subtitle: "Catch your first waves in a beginner-friendly surf session",
      },
      {
        image: "https://imheretravels.com/wp-content/uploads/2025/08/new-zealand-trip-highlight-4.webp",
        imageAlt: "Kuirau Park geothermal wonders",
        title: "Kuirau Park",
        subtitle: "Stroll through the park and witness bubbling, hissing geothermal wonders",
      },
      {
        image: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-day-9.webp",
        imageAlt: "Arthur's Pass",
        title: "Arthur's Pass",
        subtitle: "Cross dramatic mountain ranges via Arthur's Pass to reach Franz Josef",
      },
      {
        image: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-day-13.webp",
        imageAlt: "Lake Matheson reflections",
        title: "Lake Matheson",
        subtitle: "Breathtaking reflections of New Zealand's tallest mountains",
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
        title: "Kia Ora, Auckland!",
        description:
          "Welcome to New Zealand! Land in the buzzing city of Auckland and get ready for two weeks of unmatched adventure. After check-in at our cozy stay, feel free to explore the harborfront, grab a flat white, or shop local in Ponsonby.",
        image: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-day-1.webp",
        imageAlt: "Auckland arrival",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Haka House Auckland" },
          {
            icon: "activities",
            label: "Activity",
            value: "Meet and greet at the airport, check-in at the hotel",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Ride the Waves in Raglan",
        description:
          "We're off to the surf town of Raglan where chill meets thrill. Catch your first waves in a beginner-friendly surf session or just lay back and let the beach breeze do its thing. Cap it off with a golden sunset by the sea.",
        image: "https://imheretravels.com/wp-content/uploads/2025/05/new-zealand-day-22.webp",
        imageAlt: "Raglan Beach surf",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Raglan Backpackers" },
          { icon: "activities", label: "Activity", value: "Optional: Surf lesson, Beach Time" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 3,
        title: "Glow Up in Waitomo",
        description:
          "Enter the enchanting underground world of Waitomo Caves, glowing with thousands of bioluminescent worms. Take it slow with a boat ride or go bold with black water rafting. Either way, it's magic.",
        image: "https://imheretravels.com/wp-content/uploads/2025/05/new-zealand-day-32.webp",
        imageAlt: "Waitomo glowworm caves",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Kiwipaka Waitomo" },
          {
            icon: "activities",
            label: "Activity",
            value: "Optional: Glowworm Cave Tour, Black Water Rafting",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 4,
        title: "Kiwi Encounters & Redwood Walks",
        description:
          "Start the day at the Kiwi Hatchery and learn about these iconic creatures and maybe even see a chick! Then stroll the towering Whakarewarewa Redwoods before diving into the living Māori Village.",
        image: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-header-6.webp",
        imageAlt: "Rotorua Redwoods",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Rock Solid Backpackers Rotorua" },
          {
            icon: "activities",
            label: "Activity",
            value: "Optional: Kiwi Hatchery, Redwood Forest walk, Whakarewarewa Living Māori Village",
          },
          { icon: "meals", label: "Meals", value: "Breakfast, Lunch" },
        ],
      },
      {
        dayNumber: 5,
        title: "Hot Pools & High Thrills",
        description:
          "We hike the scenic Tarawera Trail to find secret lakeside hot pools — nature's spa! After lunch, choose your adventure: white-water rafting, ziplining, or relaxing at a geo spa. Your energy, your call.",
        image: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-day-5.webp",
        imageAlt: "Tarawera hot pools",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Rock Solid Backpackers Rotorua" },
          {
            icon: "activities",
            label: "Activity",
            value: "Optional: Tarawera Hike, Spa, Rafting, Ziplining",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 6,
        title: "Capital Vibes in Wellington",
        description:
          "Take in one more Rotorua sunrise before heading to artsy, coffee-loving Wellington. Settle in and explore Cuba Street's cool corners or just chill by the waterfront.",
        image: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-day-6.webp",
        imageAlt: "Wellington waterfront",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Haka House Wellington" },
          { icon: "activities", label: "Activity", value: "Drive from Rotorua to Wellington" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 7,
        title: "Free to Roam the Capital",
        description:
          "You're free to explore! Pop into the interactive Te Papa Museum, café-hop, or hike up Mt. Victoria for killer views. Snap, sip, and soak it in.",
        image: "https://imheretravels.com/wp-content/uploads/2025/05/new-zealand-day-72.webp",
        imageAlt: "Mt. Victoria Wellington",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Haka House Wellington" },
          { icon: "activities", label: "Activity", value: "Explore the Capital" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 8,
        title: "Coastal Cruise & Scenic Rails",
        description:
          "Today we'll catch an early ferry across the Cook Strait and through the magnificent Marlborough Sounds to the South Island. If the weather's good, head out to the viewing deck to witness some incredible scenes and spot some wildlife. When we arrive in Picton at the top of the South Island, we'll cruise down the east coast towards Christchurch and see the stunning Marlborough wine country.",
        image: "https://imheretravels.com/wp-content/uploads/2025/05/new-zealand-day-82.webp",
        imageAlt: "Interislander Ferry Marlborough Sounds",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "The Bealey Christchurch" },
          {
            icon: "activities",
            label: "Activity",
            value: "Optional: Ferry ride, Coastal Pacific Train",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 9,
        title: "Into the Alps! Franz Josef Bound",
        description:
          "Cross dramatic mountain ranges via Arthur's Pass to reach Franz Josef, your alpine home for glacier adventures. Tonight's all about cozy vibes and glacier dreams.",
        image: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-day-9.webp",
        imageAlt: "Arthur's Pass",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Rainforest Retreat Franz Josef" },
          { icon: "activities", label: "Activity", value: "Arthur's Pass Scenic Drive" },
          { icon: "meals", label: "Meals", value: "Breakfast, Dinner" },
        ],
      },
      {
        dayNumber: 10,
        title: "Glacier Day, Your Way",
        description:
          "This is your glacier playground — heli-hike over icy terrain, kayak past blue ice, or walk scenic glacier trails. The Franz Josef Glacier is the kind of place that humbles and awes all at once.",
        image: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-day-10.webp",
        imageAlt: "Franz Josef Glacier",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Rainforest Retreat Franz Josef" },
          {
            icon: "activities",
            label: "Activity",
            value: "Optional: Heli-hiking, Kayaking, Guided Glacier Walk",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 11,
        title: "From Ice to Adventure! Queenstown Calls",
        description:
          "After a quick stop at the reflective Lake Matheson, roll into Queenstown — the adrenaline capital! Get your bearings and start dreaming up your next thrill.",
        image: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-day-11.webp",
        imageAlt: "Queenstown arrival",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Haka House Queenstown" },
          { icon: "activities", label: "Activity", value: "Lake Matheson walk" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 12,
        title: "Adventure Mode: ON",
        description:
          "Today's yours to take it to the limit. Skydiving, bungy jumping, canyon swinging, or just soaking in mountain views over local brews — Queenstown lets you write your story.",
        image: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-day-12.webp",
        imageAlt: "Queenstown adventure",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Haka House Queenstown" },
          {
            icon: "activities",
            label: "Activity",
            value: "Optional: Bungy, Skydive, Spa, Gondola Rides",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 13,
        title: "Into the Wild! Milford Sound",
        description:
          "Head to one of the world's most jaw-dropping locations: Milford Sound. Sail between towering peaks, waterfalls, and maybe spot dolphins along the way.",
        image: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-day-13.webp",
        imageAlt: "Milford Sound cruise",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Haka House Queenstown" },
          { icon: "activities", label: "Activity", value: "Optional: Milford Sound Day Cruise" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 14,
        title: "Wine, Water, or Whatever You Want",
        description:
          "It's your last full day, and Queenstown's got range. Wine tasting, lake cruising, mountain biking, or last-minute shopping — choose your flavor.",
        image: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-day-14-1.webp",
        imageAlt: "Queenstown wine country",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Haka House Queenstown" },
          {
            icon: "activities",
            label: "Activity",
            value: "Optional: Winery Tour, Jet Boating, Souvenir Shopping",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 15,
        title: "Haere Rā, Queenstown",
        description:
          "Pack your bags and your memories, it's time to head home (or onward!). This goodbye hits different, but your travel fam and camera roll say it all.",
        image: "https://imheretravels.com/wp-content/uploads/2025/05/new-zealand-day-15.webp",
        imageAlt: "Queenstown departure",
        details: [
          {
            icon: "accommodation",
            label: "Accommodation",
            value: "Haka House Queenstown (checkout)",
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
          "https://imheretravels.com/wp-content/uploads/2025/05/haka-house-auckland-accommodation.webp",
        imageAlt: "Haka House Auckland",
        name: "Haka House Auckland",
        nights: "1 night in Dorm",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/05/raglan-backpackers-auckland-accommodation.webp",
        imageAlt: "Raglan Backpackers",
        name: "Raglan Backpackers",
        nights: "1 night in Dorm",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/05/kwipaka-waitomo-auckland-accommodation.webp",
        imageAlt: "Kiwipaka Waitomo",
        name: "Kiwipaka Waitomo",
        nights: "1 night in Dorm",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/05/rock-solid-backpackers-auckland-accommodation.webp",
        imageAlt: "Rock Solid Backpackers Rotorua",
        name: "Rock Solid Backpackers Rotorua",
        nights: "2 nights in Dorm",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/05/haka-house-wellington-accommodation.webp",
        imageAlt: "Haka House Wellington",
        name: "Haka House Wellington",
        nights: "2 nights in Dorm",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/05/bealey-quarter-accommodation.webp",
        imageAlt: "The Bealey Christchurch",
        name: "The Bealey Christchurch",
        nights: "1 night in Dorm",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/05/rainforest-retreat-franz-josef-accommodation.webp",
        imageAlt: "Rainforest Retreat Franz Josef",
        name: "Rainforest Retreat Franz Josef",
        nights: "2 nights in Dorm",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/05/haka-house-queenstown-accommodation.webp",
        imageAlt: "Haka House Queenstown",
        name: "Haka House Queenstown",
        nights: "4 nights in Dorm",
      },
    ],
  },
  faqs: {
    heading: "FAQs",
    items: [
      {
        question: "Where does the trip start & finish?",
        answer:
          "The trip starts in Auckland (Day 1 – Arrival and Hotel Check-in) and ends in Queenstown (Day 15 – Departure and Airport Transfers).",
      },
      {
        question: "Which airport do I need to fly into?",
        answer:
          "You need to fly into Auckland Airport (AKL) to start the tour. For departure, you'll fly out of Queenstown Airport (ZQN) at the end of the trip.",
      },
      {
        question: "What should I wear?",
        answer:
          "In New Zealand during spring/summer, expect mild to warm temperatures with cooler evenings. Pack lightweight breathable clothing for daytime, warm layers (hoodies, fleece) and a windbreaker or waterproof jacket for evenings, sturdy walking/hiking shoes, swimwear, and smart casual for cultural evenings. Essentials: sunglasses, hat, sunscreen (UV is strong in NZ), daypack, reusable water bottle. Layering is key.",
      },
      {
        question: "Do you have an age limit for tours?",
        answer:
          "Our tours cater to adventurous travelers aged 18–45, with most guests between 21–35 years old.",
      },
      {
        question: "What is the local currency?",
        answer:
          "The local currency is the New Zealand Dollar (NZD / NZ$). Credit and debit cards are widely accepted, but it's handy to have some cash for small purchases or remote areas.",
      },
      {
        question: "Which airport do I fly out from?",
        answer: "You will fly out from Queenstown Airport (ZQN) at the end of the tour.",
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
    durationLabel: "15 Days and 14 Nights",
    routeLabel: "Auckland to Queenstown",
    priceFromLabel: "From",
    priceCurrency: "GBP",
    priceAmount: "£1,899",
    depositAmount: "£200",
    ctaLabel: "Reserve Now",
    ctaHref: "https://book.stripe.com/8wM5mv35dfDTas02aV",
    footnote: "Additional fees may apply",
  },
  listingCard: {
    duration: "15 Days and 14 Nights",
    description:
      "Auckland, Waitomo glowworms, Māori culture in Rotorua, the Interislander ferry, Franz Josef Glacier, Milford Sound, and Queenstown thrills.",
    price: "GBP £1,899",
    image: "https://imheretravels.com/wp-content/uploads/2025/02/new-zealand-day-11.webp",
    imageAlt: "New Zealand Expedition",
  },
};

export default newZealandExpedition;
