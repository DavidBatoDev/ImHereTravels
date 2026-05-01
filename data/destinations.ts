/**
 * Destinations registry.
 *
 * Source of truth for every destination landing page the site can render.
 * The dynamic route `app/all-destinations/[slug]/page.tsx` looks up
 * destinations here by slug, and `generateStaticParams` uses
 * `getAllDestinationSlugs()` to prerender each page.
 *
 * Each destination groups one or more tours under a single country/region
 * page, providing curated content (hero, description, FAQs, community grid).
 *
 * To add a new destination:
 *   1. Add an entry to ALL_DESTINATIONS below.
 *   2. Reference existing tour slugs from `data/tours.ts` in `tourSlugs`.
 *   3. Add assets to `public/` if needed.
 */

export type DestinationFaq = {
  question: string;
  answer: string;
};

export type DestinationCommunityImage = {
  src: string;
  alt: string;
  href: string;
};

export type DestinationQuickFact = {
  /** One of: "currency" | "beer" | "hello" | "dish" */
  icon: string;
  label: string;
  value: string;
};

export type DestinationHighlight = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

export type DestinationReview = {
  stars: number;
  date: string;
  text: string;
  author: string;
  location: string;
  tourName?: string;
  avatar?: string;
};

export type Destination = {
  slug: string;
  name: string;
  region: string;
  meta: { title: string; description: string };
  heroImage: string;
  heroImageAlt: string;
  /** Intro paragraphs shown on the destination detail page. */
  description: string[];
  /** Tour slugs (keys in `data/tours.ts`) that belong to this destination. */
  tourSlugs: string[];
  /** Quick-glance facts shown below the hero (currency, beer, greeting, dish). */
  quickFacts?: DestinationQuickFact[];
  /** Featured experience cards shown in the Highlights carousel. */
  highlights?: DestinationHighlight[];
  /** Traveller reviews shown in the Reviews carousel. */
  reviews?: DestinationReview[];
  faqs?: DestinationFaq[];
  community?: {
    heading: string;
    images: DestinationCommunityImage[];
  };
};

/* -------------------------------------------------------------------------- */
/* Destination entries                                                          */
/* -------------------------------------------------------------------------- */

const ALL_DESTINATIONS: Destination[] = [
  /* ——— Philippines ——————————————————————————————————————————————————————— */
  {
    slug: "philippines",
    name: "Philippines",
    region: "Southeast Asia",
    meta: {
      title: "Philippines Tours — I'm Here Travels",
      description:
        "Explore the Philippines with I'm Here Travels. From canyoneering in Cebu and the sardine run in Moalboal to surfing in Siargao and island-hopping in El Nido — discover our small-group Philippines tours.",
    },
    heroImage: "/tours/philippine-sunrise/Sunrise_1.jpg",
    heroImageAlt: "Travelers at a canyon waterfall in Moalboal, Philippines",
    description: [
      "The Philippines is a tropical archipelago of over 7,000 islands, blessed with pristine white-sand beaches, crystal-clear turquoise waters, and some of the world's best diving and snorkelling spots. From the historic streets of Cebu and Manila to the legendary surf breaks of Siargao and the dramatic limestone karsts of El Nido, the Philippines offers an unmatched blend of adventure, culture, and natural beauty.",
      "Explore lively cities rich in Spanish colonial history, zip-line through jungle canyons, witness the magical sardine run, island-hop through hidden lagoons, and share sunset drinks with a group of new friends. I'm Here Travels runs regular small-group departures throughout the year — so there is always the perfect time to explore.",
    ],
    tourSlugs: ["philippine-sunrise", "philippine-sunset"],
    quickFacts: [
      { icon: "currency", label: "Currency", value: "Philippine Peso" },
      { icon: "beer", label: "Local Beer", value: "San Miguel" },
      { icon: "hello", label: "Say Hello", value: "Kumusta" },
      { icon: "dish", label: "Famous Dish", value: "Chicken Adobo" },
    ],
    reviews: [
      {
        stars: 5,
        date: "May 2023",
        text: "Had an amazing time on the trial tour! Action packed with lots of fun things on the itinerary, and a great bunch of people. Would definitely go again!",
        author: "Flynn Deanne",
        location: "London, United Kingdom",
        tourName: "Philippines Sunrise",
        avatar: "/figma/avatar-flynn.png",
      },
      {
        stars: 5,
        date: "February 2024",
        text: "My experience has been amazing, I'll never forget it. I met extraordinary people and explored beautiful places. I definitely recommend to book a trip!",
        author: "Manuel Madonna",
        location: "Milan, Italy",
        tourName: "Philippines Sunset",
        avatar: "/figma/avatar-manuel.png",
      },
      {
        stars: 5,
        date: "July 2024",
        text: "I enjoyed the tour! Seamless coordination of transportation and accommodation made me feel like a VIP throughout the trip. LOVED every bit of it! Highly recommend!",
        author: "Bella Millers",
        location: "Cagayan, Philippines",
        tourName: "Philippines Sunrise",
        avatar: "/figma/avatar-bella.png",
      },
    ],
    faqs: [
      {
        question: "How do I get to the Philippines?",
        answer:
          "The Philippines is served by two main international airports: Ninoy Aquino International Airport (NAIA) in Manila and Mactan-Cebu International Airport in Cebu. Most major carriers fly direct from London, the US, Australia, and across Asia. A short domestic connection may be needed depending on your tour's starting city.",
      },
      {
        question: "Do I need a visa to visit the Philippines?",
        answer:
          "Most nationalities — including UK, US, Australian, Canadian, and EU passport holders — receive a free 30-day visa on arrival. Some nationalities may require a pre-arranged visa. Check with your national embassy well in advance of your departure date.",
      },
      {
        question: "What is the local currency?",
        answer:
          "The Philippine Peso (PHP). ATMs are widely available in cities and major tourist areas. Credit cards are accepted at hotels and larger restaurants, but cash is preferred in smaller towns, markets, and for activities.",
      },
      {
        question: "What is the best time to visit the Philippines?",
        answer:
          "The dry season runs from November to May and is generally the best time to visit. I'm Here Travels runs departures from March through November, with specific regions offering excellent conditions even outside the peak dry season.",
      },
      {
        question: "What is the age range for Philippines tours?",
        answer:
          "Our Philippines tours welcome adventurous travellers aged 18–45, with most guests between 21–35 years old. Tours are designed for people of all backgrounds who want to share unforgettable travel experiences together.",
      },
    ],
    community: {
      heading: "With @Imheretravels",
      images: Array.from({ length: 10 }).map((_, i) => ({
        src: `/tours/philippine-sunrise/community-${i + 1}.jpg`,
        alt: `I'm Here Travels community photo ${i + 1}`,
        href: "https://www.instagram.com/imheretravels",
      })),
    },
  },

  /* ——— Maldives ——————————————————————————————————————————————————————— */
  {
    slug: "maldives",
    name: "Maldives",
    region: "South Asia",
    meta: {
      title: "Maldives Tours — I'm Here Travels",
      description:
        "Tick off the Maldives bucket list with I'm Here Travels. Explore turquoise atolls, snorkel vibrant coral reefs, and unwind on an island paradise on our small-group Maldives tour.",
    },
    heroImage:
      "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341315607_maldives-header-1.webp?alt=media&token=f8ec555a-c844-4b1d-a4ce-cac0ca5fdd0e",
    heroImageAlt: "Crystal-clear turquoise lagoon in the Maldives",
    description: [
      "The Maldives is one of the world's most iconic island destinations — a collection of coral atolls scattered across the Indian Ocean, each offering powder-white beaches, vibrant reef ecosystems, and some of the clearest water on earth.",
      "Join I'm Here Travels for an 8-day small-group adventure that takes you beyond the resort bubble. Dive with manta rays, snorkel colourful reefs in Rasdhoo, explore the buzz of Malé, and spend nights on an uninhabited island under a sky full of stars.",
    ],
    tourSlugs: ["maldives-bucketlist"],
  },

  /* ——— Japan ——————————————————————————————————————————————————————————— */
  {
    slug: "japan",
    name: "Japan",
    region: "East Asia",
    meta: {
      title: "Japan Tours — I'm Here Travels",
      description:
        "Experience Japan with I'm Here Travels. Explore Tokyo, ride the bullet train to Kyoto, and discover the ancient temples, neon-lit streets, and ski slopes of Japan on our small-group tours.",
    },
    heroImage: "/figma/dest-japan-adventure.jpg",
    heroImageAlt: "Cherry blossoms and temples in Japan",
    description: [
      "Japan is a country of extraordinary contrasts — ancient temples and futuristic skylines, tranquil tea ceremonies and high-speed bullet trains, world-class street food and Michelin-starred restaurants. It is a destination that consistently surprises and delights.",
      "I'm Here Travels offers two Japan adventures: a classic 10-day summer journey from Tokyo to Kyoto, and a winter edition that takes you through Tokyo, Nagano, Kyoto, and Osaka with optional skiing in Nagano.",
    ],
    tourSlugs: ["japan-adventure", "japan-adventure-winter"],
  },

  /* ——— India ——————————————————————————————————————————————————————————— */
  {
    slug: "india",
    name: "India",
    region: "South Asia",
    meta: {
      title: "India Tours — I'm Here Travels",
      description:
        "Discover India with I'm Here Travels. From the Golden Triangle and the Taj Mahal to the colourful chaos of Holi Festival — explore India on a small-group tour built for curious travellers.",
    },
    heroImage:
      "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341302125_india-header-1.webp?alt=media&token=3f969113-15f2-4d4e-bc0c-0f5e8ac5043e",
    heroImageAlt: "The Taj Mahal at sunrise in India",
    description: [
      "India is a sensory overload in the best possible way — a vast, vibrant subcontinent of ancient civilisations, diverse cuisines, sacred rivers, and epic landscapes that stretch from the Himalayas to tropical beaches.",
      "Choose from our India Discovery Tour covering the iconic Golden Triangle, or time your visit for the legendary Holi Festival and experience one of the world's most colourful and joyful celebrations alongside locals.",
    ],
    tourSlugs: ["india-discovery-tour", "india-holi-festival-tour"],
  },

  /* ——— Nepal ——————————————————————————————————————————————————————————— */
  {
    slug: "nepal",
    name: "Nepal",
    region: "South Asia",
    meta: {
      title: "Nepal Tours — I'm Here Travels",
      description:
        "Trek the Himalayas and explore Kathmandu with I'm Here Travels. Our Nepal Horizons tour takes you through ancient temples, high-altitude trails, and warm hospitality in the roof of the world.",
    },
    heroImage: "/figma/dest-nepal-horizons.jpg",
    heroImageAlt: "Himalayan peaks and temples in Nepal",
    description: [
      "Nepal is home to eight of the world's ten highest mountains and a culture deeply rooted in Buddhist and Hindu traditions. From the chaotic, colourful streets of Kathmandu to the serene mountain trails of the Himalayas, Nepal is a destination that humbles and inspires in equal measure.",
      "Our Nepal Horizons tour blends cultural immersion with trekking adventure — perfect for those seeking both altitude and depth on their travels.",
    ],
    tourSlugs: ["nepal-horizons"],
  },

  /* ——— Bhutan ——————————————————————————————————————————————————————————— */
  {
    slug: "bhutan",
    name: "Bhutan",
    region: "South Asia",
    meta: {
      title: "Bhutan Tours — I'm Here Travels",
      description:
        "Explore the Kingdom of Bhutan with I'm Here Travels. Trek to the Tiger's Nest monastery, discover Himalayan valleys, and experience one of the world's last untouched kingdoms on our Bhutan Quest tour.",
    },
    heroImage:
      "https://i0.wp.com/imheretravels.com/wp-content/uploads/2025/08/bhutan-triphighlight-12.webp?w=1280&ssl=1",
    heroImageAlt: "Tiger's Nest monastery perched on a Bhutan cliffside",
    description: [
      "Bhutan is the world's last Himalayan Buddhist kingdom — a land of dramatic mountain landscapes, ancient monasteries, and a unique philosophy that measures progress in Gross National Happiness rather than GDP.",
      "The Bhutan Quest tour takes you to the iconic Tiger's Nest monastery, through ancient dzong fortresses, across rhododendron-covered mountain passes, and into a culture that has deliberately preserved its identity from the outside world.",
    ],
    tourSlugs: ["bhutan-quest"],
  },

  /* ——— Sri Lanka ——————————————————————————————————————————————————————— */
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    region: "South Asia",
    meta: {
      title: "Sri Lanka Tours — I'm Here Travels",
      description:
        "Discover Sri Lanka with I'm Here Travels. Ancient temples, wildlife safaris, tea plantations, and tropical beaches — our Sri Lanka Wander tour covers it all on a small-group adventure.",
    },
    heroImage:
      "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341313258_srilanka-header-22.webp?alt=media&token=a9755c83-5fac-4284-87dd-9325e1b24727",
    heroImageAlt: "Lush green tea plantations in Sri Lanka",
    description: [
      "Sri Lanka packs an astonishing amount of diversity into a small island. Ancient rock fortresses, spice-scented colonial cities, misty tea-covered highlands, wildlife reserves roamed by elephants and leopards, and golden beaches lapped by warm Indian Ocean waters.",
      "The Sri Lanka Wander tour takes you through the cultural triangle, into the hill country, and down to the coast — giving you a genuine taste of everything this incredible island has to offer.",
    ],
    tourSlugs: ["sri-langka-wander-tour"],
  },

  /* ——— Vietnam ——————————————————————————————————————————————————————————— */
  {
    slug: "vietnam",
    name: "Vietnam",
    region: "Southeast Asia",
    meta: {
      title: "Vietnam Tours — I'm Here Travels",
      description:
        "Explore Vietnam with I'm Here Travels. From Hanoi's Old Quarter and Halong Bay to Hoi An's lantern-lit streets and Ho Chi Minh City's energy — discover Vietnam on a small-group expedition.",
    },
    heroImage:
      "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341305320_vietnam-header-4.webp?alt=media&token=be502580-7b8c-47ce-98c3-ce9c250af05e",
    heroImageAlt: "Limestone karsts and emerald waters of Halong Bay, Vietnam",
    description: [
      "Vietnam is a country of staggering natural beauty and remarkable resilience. Stretching over 1,600 kilometres from north to south, it moves seamlessly from cool misty mountains and emerald bay waters in the north to ancient trading towns, royal citadels, and buzzing southern metropolises.",
      "The Vietnam Expedition traces the length of this extraordinary country, giving you iconic highlights alongside hidden gems that only small-group travel can reach.",
    ],
    tourSlugs: ["vietnam-expedition"],
  },

  /* ——— China ——————————————————————————————————————————————————————————— */
  {
    slug: "china",
    name: "China",
    region: "East Asia",
    meta: {
      title: "China Tours — I'm Here Travels",
      description:
        "Discover China with I'm Here Travels. Walk the Great Wall, explore ancient hutongs, and discover the world's fastest-changing country on our small-group China Discovery tour.",
    },
    heroImage: "/figma/dest-china-discovery.jpg",
    heroImageAlt: "The Great Wall of China stretching across mountain ridges",
    description: [
      "China is one of the world's oldest and most complex civilisations — a country that can simultaneously offer ancient wonders and hyper-modern cities, remote wilderness and teeming megacities, millennia of history and relentless forward momentum.",
      "Our China Discovery tour takes you through the country's most iconic destinations while leaving room for the kind of authentic, unscripted moments that make travel meaningful.",
    ],
    tourSlugs: ["china-discovery"],
  },

  /* ——— Tanzania ——————————————————————————————————————————————————————— */
  {
    slug: "tanzania",
    name: "Tanzania",
    region: "Africa",
    meta: {
      title: "Tanzania Tours — I'm Here Travels",
      description:
        "Experience Tanzania with I'm Here Travels. Safari through the Serengeti, witness the Great Migration, and explore Zanzibar's spice-scented shores on our small-group Tanzania Exploration tour.",
    },
    heroImage:
      "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341299042_tanzania-header-1.webp?alt=media&token=889b4689-5d81-4658-9afd-3066ddc16fbb",
    heroImageAlt: "Elephants on the Serengeti plains at sunset, Tanzania",
    description: [
      "Tanzania is Africa at its most wild and wonderful — home to the Serengeti, the Ngorongoro Crater, Mount Kilimanjaro, and the pristine beaches and coral reefs of Zanzibar. Few destinations on earth offer such a dramatic concentration of natural wonders.",
      "The Tanzania Exploration tour immerses you in the full East African experience: epic game drives, Maasai culture, and the turquoise waters of the Indian Ocean.",
    ],
    tourSlugs: ["tanzania-exploration"],
  },

  /* ——— New Zealand ——————————————————————————————————————————————————— */
  {
    slug: "new-zealand",
    name: "New Zealand",
    region: "Oceania",
    meta: {
      title: "New Zealand Tours — I'm Here Travels",
      description:
        "Explore New Zealand with I'm Here Travels. Fiords, glaciers, Maori culture, and adventure sports — discover the Land of the Long White Cloud on our small-group New Zealand Expedition.",
    },
    heroImage:
      "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341296278_new-zealand-header-1.webp?alt=media&token=0f4c3603-faac-4a9b-98a0-6a64c61cac13",
    heroImageAlt: "Dramatic fiord landscape in Milford Sound, New Zealand",
    description: [
      "New Zealand is the adventure capital of the world — a breathtakingly beautiful island nation of volcanic peaks, ancient fiords, rolling green farmland, and a Maori culture whose traditions still run deep.",
      "The New Zealand Expedition takes you across both the North and South Islands, with stops at geothermal wonders, glowworm caves, world-famous fiords, and plenty of opportunities for bungee jumping, kayaking, and hiking along the way.",
    ],
    tourSlugs: ["new-zealand-expedition"],
  },

  /* ——— Argentina ——————————————————————————————————————————————————————— */
  {
    slug: "argentina",
    name: "Argentina",
    region: "South America",
    meta: {
      title: "Argentina Tours — I'm Here Travels",
      description:
        "Explore Argentina with I'm Here Travels. Tango in Buenos Aires, hike near Patagonia's glaciers, and discover the wine country and waterfalls of South America on our Argentina's Wonders tour.",
    },
    heroImage:
      "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341310782_argentina-header-2.webp?alt=media&token=6148f26b-1c54-47bd-8833-5a6472e273d8",
    heroImageAlt: "Perito Moreno glacier in Argentine Patagonia",
    description: [
      "Argentina is South America's most diverse country — a land stretching from the steamy subtropical jungles of the north to the wind-blasted glaciers of Patagonia, with world-class steak, Malbec wine, and the passionate rhythms of tango in between.",
      "Argentina's Wonders tour takes you through Buenos Aires' elegant boulevards, the thundering Iguazú Falls, Mendoza's vineyards, and the raw grandeur of Patagonia.",
    ],
    tourSlugs: ["argentinas-wonders"],
  },

  /* ——— Brazil ——————————————————————————————————————————————————————————— */
  {
    slug: "brazil",
    name: "Brazil",
    region: "South America",
    meta: {
      title: "Brazil Tours — I'm Here Travels",
      description:
        "Discover Brazil with I'm Here Travels. From Rio de Janeiro's iconic beaches and the Amazon rainforest to the Pantanal wetlands and Iguazú Falls — explore Brazil on a small-group adventure.",
    },
    heroImage:
      "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341307739_brazil-header-4.webp?alt=media&token=811f0f81-f1ba-4267-9da5-69c568c29335",
    heroImageAlt: "Aerial view of Rio de Janeiro with Sugarloaf Mountain, Brazil",
    description: [
      "Brazil is the continent-sized giant of South America — a country of extraordinary biodiversity, infectious rhythms, and some of the most iconic natural and urban landscapes on the planet. From the carnival energy of Rio to the world's largest rainforest, Brazil never stops surprising.",
      "Brazil's Treasures tour dives deep into the country's rich diversity, from the vibrant street culture of its cities to the unparalleled wildlife of the Amazon and Pantanal.",
    ],
    tourSlugs: ["brazils-treasures"],
  },
];

/* -------------------------------------------------------------------------- */
/* Registry helpers                                                             */
/* -------------------------------------------------------------------------- */

export const destinations: Record<string, Destination> = Object.fromEntries(
  ALL_DESTINATIONS.map((d) => [d.slug, d]),
);

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations[slug];
}

export function getAllDestinationSlugs(): string[] {
  return Object.keys(destinations);
}

export function getAllDestinations(): Destination[] {
  return Object.values(destinations);
}

export function getTourDestination(tourSlug: string): Destination | undefined {
  return ALL_DESTINATIONS.find((d) => d.tourSlugs.includes(tourSlug));
}
