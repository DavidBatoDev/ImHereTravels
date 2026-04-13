/**
 * India Discovery Tour — 13-day Golden Triangle adventure.
 *
 * Originally generated from data/json/tourPackages-04142026.json; hand-
 * enriched with itinerary, accommodations, and FAQs sourced from the
 * live imheretravels.com India Discovery Tour page.
 */
import type { Tour } from "@/types/tour";

export const indiaDiscoveryTour: Tour = {
  slug: "india-discovery-tour",
  name: "India Discovery Tour",
  meta: {
    title: "India Discovery Tour — 13 Day Delhi to Agra Adventure",
    description:
      "Join the 13-day India Discovery Tour: Taj Mahal, Mehrangarh Fort, Lake Pichola cruise, Amer Fort, and a safari in Ranthambore National Park. GBP £1,099.",
  },
  gallery: {
    hero: "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341302125_india-header-1.webp?alt=media&token=3f969113-15f2-4d4e-bc0c-0f5e8ac5043e",
    heroAlt: "India Discovery Tour — Taj Mahal and Rajasthan",
    thumbnails: [],
  },
  header: {
    title: "13 Days | India Discovery Tour",
    tags: [
      { label: "New Delhi", icon: "location" },
      { label: "Jodhpur", icon: "location" },
      { label: "Udaipur", icon: "location" },
      { label: "Jaipur", icon: "location" },
    ],
    description:
      "It's time to start exploring India. This tour is perfect for those first-time travellers that have always wanted to explore the wonders of India but don't want to do it alone. This tour will let you experience the amazing different sites India has to offer such as citadels, bustling local markets to the great monuments including the infamous Taj Mahal, the Pink Palaces of Jaipur and Ranthambhore National Park. We begin the tour in India's capital New Delhi and finish in Agra with various different locations along the way. Throughout the trip guests will get to immerse themselves in India's rich culture experiencing many Indian traditions and tasting some of the amazing dishes India has to offer. Join us for a once in a lifetime experience that will make you want to travel more.",
  },
  keyFacts: [
    { icon: "days", label: "Tour Dates", values: ["October 30, 2026"] },
    {
      icon: "route",
      label: "Route",
      values: ["New Delhi → Jodhpur → Udaipur → Jaipur → Sawai Madhopur → Agra"],
    },
    { icon: "days", label: "Days", values: ["13 Days and 12 Nights"] },
    { icon: "people", label: "Group Size", values: ["Maximum 20 people"] },
  ],
  whatsIncluded: {
    heading: "What's Included",
    items: [
      { icon: "transport", label: "Transport", value: "Van, Train" },
      { icon: "accommodation", label: "Accommodation", value: "12 nights in Hotel" },
      {
        icon: "activities",
        label: "Activities",
        value:
          "Sightseeing Old and New Delhi, Visit Mehrangarh Fort, Visit Ranakpur Jain Temples, Cruise over Lake Pichola, Visit Amer Fort, Canter Safari into Ranthambhore National Park, Visit the Taj Mahal",
      },
      { icon: "meals", label: "Meals", value: "11 Breakfasts, 2 Lunches, 2 Dinners" },
      { icon: "team", label: "Team", value: "Trip Manager + Local Guides" },
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
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-triphighlight-1.webp",
        imageAlt: "Taj Mahal",
        title: "Taj Mahal",
        subtitle: "",
      },
      {
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-header-7.webp",
        imageAlt: "Canter Safari in Ranthambhore National Park",
        title: "Canter Safari Ranthambhore National Park",
        subtitle: "",
      },
      {
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-triphighlight-3.webp",
        imageAlt: "Sunset cruise over Lake Pichola",
        title: "Cruise over Lake Pichola",
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
        title: "Airport, Meet & Greet",
        description:
          "You've made it to New Delhi, the capital of India, where this amazing cultural journey begins. New Delhi is a beautiful city that offers many different attractions from small bazaars to large temples. Once you arrive at New Delhi International Airport you will be met by a local tour guide who will take you to our start hotel, here they will assist you in checking in and making sure everything runs smoothly. In the evening after you've had a chance to rest we will meet for our dinner where you get the chance to meet everyone you will be travelling with for the next 12 days, and make some new lifelong friends.",
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-header-3.webp",
        imageAlt: "Arrival in New Delhi",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Deventure Hotel" },
          {
            icon: "activities",
            label: "Activity",
            value: "Meet and Greet (Dinner meals are not included)",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Sightseeing Old Delhi and New Delhi",
        description:
          "Now that the ice is broken with all your new travel companions the fun begins. We start the day with a good breakfast and afterwards you get the chance to chill for a bit before our first activity as the long travels can be exhausting. After breakfast we make our way to visit Qutub Minar, one of India's many UNESCO World Heritage sites. In the afternoon we will check out and do some sightseeing around Old Delhi and New Delhi — we'll visit Jama Masjid (India's largest mosque, which can accommodate 20,000 people at once), Raj Ghat (Mahatma Gandhi's memorial on the banks of the river Yamuna), and the India Gate (which has a distinct resemblance to the Arc de Triomphe in Paris). Once finished, we head to the station for everyone to experience an overnight train journey.",
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-day-2.webp",
        imageAlt: "Old Delhi sightseeing",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Mandore Express Overnight Train" },
          {
            icon: "activities",
            label: "Activity",
            value: "Sightseeing — Jama Masjid, Raj Ghat, India Gate — Overnight Train",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 3,
        title: "Arrival in Jodhpur and Chill Time",
        description:
          "Rise and shine — we hope everyone had a good night's sleep and enjoyed the overnight train especially if it's your first time. After we get off the train we will be met by our local driver in Jodhpur station, from here we then make our way to the next hotel to check in and have breakfast. We will then have the entire day to chill, enjoy the pool, walk around or get more sleep.",
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-day-3.webp",
        imageAlt: "Jodhpur arrival",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Devi Bhawan Boutique Hotel" },
          { icon: "activities", label: "Activity", value: "Mehrangarh Fort and Jaswant Thada" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 4,
        title: "Visit Mehrangarh Fort and Jaswant Thada",
        description:
          "After a fun night of everyone getting to know each other a little bit better we now move on to our next destination. After breakfast we will be taken to visit Mehrangarh Fort, which was originally a palace but has now been transformed into a museum that overlooks the walled city displaying various weapons, paintings, and elaborate royal palanquins. We then move on to Jaswant Thada, an intricately carved white marble mausoleum. The remainder of the evening guests can chill and relax before dinner.",
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-header-4.webp",
        imageAlt: "Mehrangarh Fort Jodhpur",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Devi Bhawan Boutique Hotel" },
          {
            icon: "activities",
            label: "Activity",
            value: "Visit Mehrangarh Fort — Jaswant Thada",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 5,
        title: "Travel to Udaipur",
        description:
          "Once everyone has eaten breakfast or just got that morning coffee, it's time to start making our way to Udaipur. Along the way we will stop and visit Ranakpur Jain Temples — built in the 15th century out of milk-white marble with the main temple being Chaumukha Mandir. The temple comprises 29 halls, 80 domes, and 1,444 individually carved pillars, so there is loads for everyone to explore. Once we have explored the temple, it's time to finish the journey to Udaipur so we can check in and relax at the hotel.",
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-day-5.webp",
        imageAlt: "Ranakpur Jain Temples",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Aaram Mahal Udaipur" },
          { icon: "activities", label: "Activity", value: "Ranakpur Jain Temples" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 6,
        title: "Time to Explore Udaipur",
        description:
          "We hope everyone had a pretty chill evening as today we're going to explore Udaipur, where we will visit the majestic City Palace complex overlooking beautiful Lake Pichola. The City Palace is a must-do — the various buildings added over the years along with the impeccable architecture make it an experience you won't forget. From here we move on to Sahelion-Ki-Bari, a major garden and a very popular tourist attraction in Udaipur. The day doesn't finish there — we set sail on a sunset cruise on Lake Pichola with local expert guides explaining the fascinating history of Udaipur City.",
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-header-6.webp",
        imageAlt: "Udaipur City Palace and Lake Pichola",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Aaram Mahal Udaipur" },
          {
            icon: "activities",
            label: "Activity",
            value: "City Palace Complex — Sahelion-Ki-Bari — Lake Pichola",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 7,
        title: "Travel to Sawai Madhopur",
        description:
          "Today we have a very early start as it's time to make our way to Ranthambore (Sawai Madhopur) via train — also known as the land of tigers. After checking into our new hotel and grabbing some lunch, we visit Ranthambore National Park, home to landmarks such as the 10th-century Ranthambore Fort and Ganesh Mandir Temple. Throughout the park you also get the chance to witness different wildlife such as leopards and tigers. The rest of the afternoon is your own to roam around or relax before meeting in the evening for dinner and drinks.",
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-day-7.webp",
        imageAlt: "Ranthambore National Park",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Ranthambhore Heritage Haveli" },
          { icon: "activities", label: "Activity", value: "Ranthambore National Park" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 8,
        title: "Safari in Ranthambore National Park",
        description:
          "We have an early start today so after breakfast we will go explore more of Ranthambore National Park. On today's expedition we will get to see more wildlife such as a large array of birds including water owls and other birds of prey. The National Park is also home to several large lakes containing muggers, turtles, crocodiles, and even pythons. If we're lucky, rarer sightings include leopards, sloth bears, and the majestic tiger. Once finished with the safari, we head back to the hotel for lunch, then everyone can chill or do more exploring before dinner.",
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-header-7.webp",
        imageAlt: "Canter safari in Ranthambore",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Ranthambhore Heritage Haveli" },
          { icon: "activities", label: "Activity", value: "Ranthambore National Park Safari" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 9,
        title: "Arrival in Jaipur",
        description:
          "It's a new day and a new destination. Once everyone has filled up with breakfast we make our way to Jaipur, a vibrant colourful city and Rajasthan's capital. In our first few days we have already explored a lot of what India has to offer, so today once we arrive at the hotel, everyone can relax and do things at their own pace, although we do have some optional activities guests can opt into. In the evening we will meet for dinner to try some more great Indian dishes and maybe a few drinks.",
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-day-9.webp",
        imageAlt: "Jaipur arrival",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hotel Mahal Khandela" },
          {
            icon: "activities",
            label: "Activity",
            value: "Optional activities — traditional cooking class",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 10,
        title: "Let's Explore Jaipur",
        description:
          "If you didn't explore Jaipur in your free time yesterday, today is the day. After breakfast we set off to Amer Fort — we'll be taken by jeep right up to the main gate so we can walk through its incredibly designed chambers and hallways. Next stop is the City Palace Museum, where everyone can view the superb collection of Rajasthani costumes and armoury. To finish this day tour off, we visit Birla Temple, a national landmark built of pure white marble in 1988. Afterwards everyone is free to explore the local bazaars and maybe collect some souvenirs.",
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-day-10.webp",
        imageAlt: "Amer Fort Jaipur",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hotel Mahal Khandela" },
          {
            icon: "activities",
            label: "Activity",
            value: "Amer Fort — City Palace Museum — Birla Temple",
          },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 11,
        title: "Taj Mahal",
        description:
          "The day has come where we get to visit the biggest highlight of India — the Taj Mahal, one of the seven wonders of the world, known for its impeccable symmetry and intricate marble architecture. After breakfast we check out of our hotel and make our way to Agra, where we check into our new hotel just to drop our bags and go explore. Agra is a prime tourist destination in India mainly because of the Taj Mahal, where people from all over the world come to visit — and now it's your turn.",
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-triphighlight-1.webp",
        imageAlt: "Taj Mahal",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Hotel Sun Ring Agra" },
          { icon: "activities", label: "Activity", value: "Taj Mahal" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 12,
        title: "Agra Back to Delhi",
        description:
          "After everyone has had some breakfast it's time to check out of our hotel, but before making our way back to Delhi we have one more stop. Today we visit Agra Fort, home to many pavilions, gardens, mosques, and royal audience halls — home of the Emperors for 3 generations, with truly breathtaking architecture. We then make our way to Delhi to check into our hotel and chill for a bit before our farewell dinner and drinks.",
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-header-2.webp",
        imageAlt: "Agra Fort",
        details: [
          { icon: "accommodation", label: "Accommodation", value: "Deventure Hotel Delhi" },
          { icon: "activities", label: "Activity", value: "Agra Fort" },
          { icon: "meals", label: "Meals", value: "Breakfast" },
        ],
      },
      {
        dayNumber: 13,
        title: "Checkout",
        description:
          "The time has come to go our separate ways but it's not goodbye, it's see you later. One final breakfast together where everyone can exchange Instagram handles if you haven't already. Some people may have planned more travels with your new friends for life, and our guides will be able to assist you on any further travels.",
        image: "https://imheretravels.com/wp-content/uploads/2025/01/india-day-13.webp",
        imageAlt: "Delhi departure",
        details: [{ icon: "meals", label: "Meals", value: "Breakfast" }],
      },
    ],
  },
  whereWeStay: {
    heading: "Where we stay",
    items: [
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/08/deventure-accommodation.webp",
        imageAlt: "Deventure Hotel",
        name: "Deventure Hotel",
        nights: "3 nights in Hotel",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/09/the-mandore-express-accommodation.webp",
        imageAlt: "Mandore Express Overnight Train",
        name: "Mandore Express Overnight Train",
        nights: "1 night on Train",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/01/devi-bhawan-boutique-hotel-accommodation.webp",
        imageAlt: "Devi Bhawan Boutique Hotel",
        name: "Devi Bhawan Boutique Hotel",
        nights: "2 nights in Hotel",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/01/aaram-mahal-udaipur-accommodation.webp",
        imageAlt: "Aaram Mahal Udaipur",
        name: "Aaram Mahal Udaipur",
        nights: "2 nights in Hotel",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/01/ranthambore-heritage-haveli-accommodation.webp",
        imageAlt: "Ranthambore Heritage Haveli",
        name: "Ranthambore Heritage Haveli",
        nights: "2 nights in Hotel",
      },
      {
        image: "https://imheretravels.com/wp-content/uploads/2025/01/hotel-mahal-khandela.webp",
        imageAlt: "Hotel Mahal Khandela",
        name: "Hotel Mahal Khandela",
        nights: "2 nights in Hotel",
      },
      {
        image:
          "https://imheretravels.com/wp-content/uploads/2025/01/hotel-sun-ring-agra-accommodation.webp",
        imageAlt: "Hotel Sun Ring Agra",
        name: "Hotel Sun Ring Agra",
        nights: "1 night in Hotel",
      },
    ],
  },
  faqs: {
    heading: "FAQs",
    items: [
      {
        question: "Where does the trip start & finish?",
        answer: "The trip starts in New Delhi and finishes in New Delhi.",
      },
      {
        question: "Which airport do I need to fly into?",
        answer: "Indira Gandhi International Airport, New Delhi.",
      },
      {
        question: "What should I wear?",
        answer:
          "For summer (March–June): light breathable fabrics, comfortable sandals, sunglasses, hat, sunscreen. For cooler months (October–February): pack layers, light jacket or sweater, comfortable walking shoes, scarf for temple visits. Always bring a shawl for religious sites.",
      },
      {
        question: "Do you have an age limit for tours?",
        answer:
          "Our tours cater to adventurous travelers aged 18–45, with most guests between 21–35 years old.",
      },
      {
        question: "What is the local currency?",
        answer:
          "The local currency is the Indian Rupee. We recommend collecting cash from the airport ATMs; ATMs are also available along the way.",
      },
      {
        question: "Which airport do I fly out from?",
        answer: "Indira Gandhi International Airport, New Delhi.",
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
    durationLabel: "13 Days and 12 Nights",
    routeLabel: "New Delhi to Agra",
    priceFromLabel: "From",
    priceCurrency: "GBP",
    priceAmount: "£1,099",
    depositAmount: "£200",
    ctaLabel: "Reserve Now",
    ctaHref: "https://book.stripe.com/eVacOX5dlezP6bK4if",
    footnote: "Additional fees may apply",
  },
  listingCard: {
    duration: "13 Days and 12 Nights",
    description:
      "The Taj Mahal, Mehrangarh Fort, Lake Pichola cruise, Amer Fort, and a canter safari through Ranthambhore National Park.",
    price: "GBP £1,099",
    image:
      "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/images%2F1759341302125_india-header-1.webp?alt=media&token=3f969113-15f2-4d4e-bc0c-0f5e8ac5043e",
    imageAlt: "India Discovery Tour",
  },
};

export default indiaDiscoveryTour;
