/**
 * Bhutan Quest — 7-day Punakha-to-Paro Himalayan adventure.
 *
 * Originally generated from data/json/tourPackages-04142026.json; hand-
 * enriched with itinerary details, accommodations, and FAQs sourced from
 * the live imheretravels.com Bhutan Quest page.
 */
import type { Tour } from "@/types/tour";

export const bhutanQuest: Tour = {
  slug: "bhutan-quest",
  name: "Bhutan Quest",
  meta: {
    title: "Bhutan Quest — 7 Day Himalayan Adventure",
    description:
      "Join the 7-day Bhutan Quest: trek to Tiger's Nest, raft the Mo Chhu, visit Dzongs, and explore Thimphu. Small group, local guides, GBP £1,355.",
  },
  gallery: {
    hero: "/images/wp-content/uploads/2025/08/bhutan-header-1.webp",
    heroAlt: "Bhutan Quest — Himalayan landscapes",
    thumbnails: [],
  },
  header: {
    title: "7 Days | Bhutan Quest",
    tags: [
      { label: "Bhutan", icon: "location" },
      { label: "Punakha", icon: "location" },
      { label: "Thimphu", icon: "location" },
      { label: "Paro", icon: "location" },
    ],
    description:
      "If you enjoy trekking and exploring beautiful vistas then our Bhutan tour is the tour for you. This tour is full of adventure, rich culture, amazing architecture and will let you experience some of the most beautiful landscapes Bhutan has to offer. Nestled in the Himalaya's Bhutan is a hidden treasure that you have to explore starting in Punakha, visiting Thimphu Bhutan's capital city and finishing in Paro, along the way you get to visit many fortresses known as Dzongs, monasteries and ancient temples as well as trekking to the famous tigers nest temple getting all the views from above.",
  },
  keyFacts: [
    { icon: "days", label: "Tour Dates", values: ["To be announced"] },
    { icon: "days", label: "Duration", values: ["7 Days and 6 Nights"] },
    { icon: "route", label: "Route", values: ["Punakha → Gangtey → Thimphu → Paro"] },
    { icon: "people", label: "Group Size", values: ["Maximum 20 people"] },
  ],
  whatsIncluded: {
    heading: "What's Included",
    items: [
      { icon: "transport", label: "Transport", value: "Van / Coach" },
      { icon: "accommodation", label: "Accommodation", value: "6 nights in Hotel" },
      {
        icon: "activities",
        label: "Activities",
        value: "Sightseeing Dzongs, Trekking, White water rafting, Beer Tasting",
      },
      { icon: "meals", label: "Meals", value: "6 Breakfasts, 5 Lunches, 6 Dinners" },
      {
        icon: "plus",
        label: "Others",
        value: [
          "24/7 customer experience assistance",
          "Airport and domestic transfer assistance",
          "Tour Guide",
          "Daily Government SDF/Tourism Tax included in the price",
        ],
      },
    ],
  },
  tripHighlights: {
    heading: "Trip Highlights",
    items: [
      {
        image:
          "https://i0.wp.com/imheretravels.com/wp-content/uploads/2025/08/bhutan-triphighlight-12.webp?w=1280&ssl=1",
        imageAlt: "Punakha Dzong",
        title: "Punakha Dzong",
        subtitle: "Visit one of Bhutan's most beautiful and famous Dzongs",
      },
      {
        image:
          "https://i0.wp.com/imheretravels.com/wp-content/uploads/2025/08/bhutan-triphighlight-2.webp?w=1280&ssl=1",
        imageAlt: "White water rafting on Mo Chhu River",
        title: "White Water Rafting",
        subtitle:
          "Ride the white water rapids on Mo Chhu River followed by a beautiful riverside picnic",
      },
      {
        image:
          "https://i0.wp.com/imheretravels.com/wp-content/uploads/2025/08/bhutan-triphighlight-3.webp?w=1280&ssl=1",
        imageAlt: "Tiger's Nest Temple in Paro",
        title: "Tiger's Nest Temple",
        subtitle:
          "Hike to Bhutan's iconic Tiger's Nest Temple in Paro for breathtaking views of the valley and river",
      },
      {
        image:
          "/images/wp-content/uploads/2025/10/bhutan-triphighlight-4.webp",
        imageAlt: "Dochula Pass with 108 chortens",
        title: "Dochula Pass",
        subtitle:
          "At 3000m, it's famed for 108 chortens honoring soldiers from the 2003 operation",
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
        title: "Arrival in Bhutan",
        description:
          "You've made it to Bhutan arriving in Paro international airport where you will be greeted by your local guide who will transfer you to our first hotel where you can relax and chill or go out to explore — the choice is yours. In the evening we will have dinner to meet your fellow travel companions.",
        image: "/images/wp-content/uploads/2025/08/bhutan-day-1.webp",
        imageAlt: "Bhutan Day 1 — Arrival in Paro",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "River Valley Resort (or similar)" },
          { icon: "activities", label: "Activity", value: "Meet and greet dinner" },
          { icon: "meals", label: "Meals", value: "Dinner" },
        ],
      },
      {
        dayNumber: 2,
        title: "Ride the Rapids",
        description:
          "After a leisurely breakfast we will take a short van ride to visit the famous Punakha Dzong which served as both the religious and administrative centre of Bhutan in the past. After Punakha Dzong we make our way to visit Punakha Suspension Bridge — the longest suspension bridge in Bhutan. This is where the real fun begins: we then make our way to white-water rafting in Mo Chu river to get the adrenaline pumping. Lunch will then be served as a riverside picnic along the same river we just rafted down before making our way to Gangtey.",
        image: "/images/wp-content/uploads/2025/08/bhutan-day-2.webp",
        imageAlt: "White-water rafting on Mo Chhu River",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "ABC Eco Lodge" },
          {
            icon: "activities",
            label: "Activity",
            value: "Punakha Dzong, Suspension Bridge, White-water rafting",
          },
          { icon: "meals", label: "Meals", value: "Breakfast, Lunch, Dinner" },
        ],
      },
      {
        dayNumber: 3,
        title: "Visit Gangteng Monastery",
        description:
          "Fuel up on breakfast before visiting Gangteng Monastery, a key Nyingmapa site. We'll then enjoy our first trek along the valley's nature trail, famous for its winter Black-Necked Crane migration. Afterward, we'll drive the winding hillside roads to Thimphu, Bhutan's capital (population ~90,000). Following hotel check-in, we'll visit the impressive Tashichho Dzong, then return to the hotel to freshen up before dinner and a well-deserved drink.",
        image: "/images/wp-content/uploads/2025/08/bhutan-day-3.webp",
        imageAlt: "Gangteng Monastery valley",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Damisa Bhutan" },
          {
            icon: "activities",
            label: "Activity",
            value: "Visit Gangteng Monastery, Nature trail of the valley, Visit Tashichho Dzong",
          },
          { icon: "meals", label: "Meals", value: "Breakfast, Lunch, Dinner" },
        ],
      },
      {
        dayNumber: 4,
        title: "Thimphu City Tour",
        description:
          "Today we explore Thimphu, Bhutan's capital, beginning at the Memorial Chorten with its golden spires and bells. We'll then visit the Folk Heritage Museum for insight into Bhutanese life, followed by the National Library of Bhutan (est. 1967) to see rare texts and traditional handmade papers. In the evening, we return to the hotel to freshen up before dinner.",
        image: "/images/wp-content/uploads/2025/08/bhutan-day-4.webp",
        imageAlt: "Thimphu city Memorial Chorten",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Damisa Bhutan" },
          {
            icon: "activities",
            label: "Activity",
            value: "City tour, Memorial Chorten, Folk Heritage Museum, National Library of Bhutan",
          },
          { icon: "meals", label: "Meals", value: "Breakfast, Lunch, Dinner" },
        ],
      },
      {
        dayNumber: 5,
        title: "Visit the National Museum and Paro Dzong",
        description:
          "After breakfast, we travel from Thimphu to Paro, the final leg of our journey. We'll begin with the National Museum of Bhutan, showcasing art and bronze statues from across the country, then visit the 16th-century Paro Dzong, a masterpiece of Bhutanese architecture. To end the day, we'll relax at the Namgay Artisanal Brewery, sampling local beers with views of flights landing at Paro airport.",
        image: "/images/wp-content/uploads/2025/08/bhutan-day-5.webp",
        imageAlt: "Paro Dzong",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Rema Resort" },
          {
            icon: "activities",
            label: "Activity",
            value: "National Museum of Bhutan, Paro Dzong, Namgay Artisanal Brewery",
          },
          { icon: "meals", label: "Meals", value: "Breakfast, Lunch, Dinner" },
        ],
      },
      {
        dayNumber: 6,
        title: "Tiger's Nest Temple",
        description:
          "After breakfast, we set out on a hike to Tiger's Nest (Taktsang Monastery), one of Bhutan's most iconic sites. From the viewpoint, enjoy breathtaking vistas of the Paro Valley and river, before continuing on to the monastery to learn its rich history. Post-hike, guests may opt for a traditional hot stone bath to recover, before gathering in the evening for a farewell dinner to celebrate our adventure.",
        image: "/images/wp-content/uploads/2025/08/bhutan-day-6.webp",
        imageAlt: "Tiger's Nest Temple hike",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Rema Resort" },
          { icon: "activities", label: "Activity", value: "Tiger's Nest, Farewell dinner" },
          { icon: "meals", label: "Meals", value: "Breakfast, Lunch, Dinner" },
        ],
      },
      {
        dayNumber: 7,
        title: "Checkout",
        description:
          "Grab everyone's insta handles and checkout after one last breakfast together. Our local guide will help organise airport transfers for everyone — it's not goodbye, it's see you later.",
        image: "/images/wp-content/uploads/2025/08/bhutan-day-7.webp",
        imageAlt: "Paro airport departure",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Rema Resort (checkout)" },
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
          "/images/wp-content/uploads/2025/08/river-valley-hotel-accommodation.webp",
        imageAlt: "River Valley Resort",
        name: "River Valley Resort (or similar)",
        nights: "1 night in Hotel",
      },
      {
        image:
          "/images/wp-content/uploads/2025/08/abc-lodge-accommodation.webp",
        imageAlt: "ABC Lodge",
        name: "ABC Lodge",
        nights: "1 night in Hotel",
      },
      {
        image:
          "/images/wp-content/uploads/2025/08/damisa-hotel-accommodation.webp",
        imageAlt: "Damisa Bhutan",
        name: "Damisa Bhutan",
        nights: "2 nights in Hotel",
      },
      {
        image:
          "/images/wp-content/uploads/2025/08/rema-resort-accommodation.webp",
        imageAlt: "Rema Resort",
        name: "Rema Resort",
        nights: "2 nights in Hotel",
      },
    ],
  },
  faqs: {
    heading: "FAQs",
    items: [
      {
        question: "Where does the trip start & finish?",
        answer: "The trip starts at Punakha and finishes in Paro.",
      },
      {
        question: "Which airport do I need to fly into?",
        answer: "Paro International Airport — Paro, Bhutan.",
      },
      {
        question: "What should I wear?",
        answer:
          "Comfortable summer clothes: shorts, sunglasses, hat, sunscreen. Bring hiking/trekking attire for treks and appropriate clothing for temple visits. A pre-departure pack will provide full details.",
      },
      {
        question: "Do you have an age limit for tours?",
        answer:
          "Our tours cater to adventurous travelers aged 18–45, with most guests between 21–35 years old.",
      },
      {
        question: "What is the local currency?",
        answer:
          "Bhutanese Ngultrum; Indian Rupee is also accepted. We recommend collecting cash from airport ATMs; ATMs are also available along the route.",
      },
      {
        question: "Which airport do I fly out from?",
        answer: "Paro International Airport — Paro.",
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
    durationLabel: "7 Days and 6 Nights",
    routeLabel: "Punakha to Paro",
    priceFromLabel: "From",
    priceCurrency: "GBP",
    priceAmount: "£1,355",
    depositAmount: "£200",
    ctaLabel: "Reserve Now",
    ctaHref:
      "https://book.stripe.com/28E7sLgsj2uB1Ptcsnco03i?fbclid=IwY2xjawMejFRleHRuA2FlbQIxMABicmlkETF6TXRsZ2dPRUJYZEt4SVN4AR4N7sepwMB2yPOiNSxBQhjiiy_PYWltBBXk1ltQS67XVIfzH2qoeeaJ85QuEw_aem_XT90MlTlbaajhPYS5OBpAg",
    footnote: "Additional fees may apply",
  },
  listingCard: {
    duration: "7 Days and 6 Nights",
    description:
      "Trek to Tiger's Nest, raft the Mo Chhu, and explore Bhutan's most stunning Dzongs, monasteries, and Himalayan landscapes.",
    price: "GBP £1,355",
    image: "/images/wp-content/uploads/2025/08/bhutan-header-1.webp",
    imageAlt: "Bhutan Quest",
  },
};

export default bhutanQuest;
