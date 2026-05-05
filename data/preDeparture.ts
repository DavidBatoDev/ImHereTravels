/* -------------------------------------------------------------------------- */
/* Metadata                                                                    */
/* -------------------------------------------------------------------------- */

export const preDepartureMetadata = {
  title: "Pre-departure Information | I'm Here Travels",
  description:
    "Be prepared before your trip. Review entry requirements, government travel advice, and health information to ensure a smooth travel experience.",
};

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const preDepartureHero = {
  image: "/figma/join-community.jpg",
  title: "Pre-departure Information",
};

/* -------------------------------------------------------------------------- */
/* Intro                                                                       */
/* -------------------------------------------------------------------------- */

export const preDepartureIntro = {
  heading: "Be prepared before you go on your trip",
  body: "Make sure you're well-prepared before embarking on your trip by carefully reviewing the following information, which is aimed at ensuring a smooth travel experience:",
  warning:
    "Entry requirements and restrictions imposed by foreign governments can change frequently, regardless of your travel date.",
  warningBody:
    " These regulations may vary based on factors such as your country of residence, passport nationality, destination, transit points, and travel history. Thus, travellers are responsible for researching and understanding the latest travel and health requirements and restrictions relevant to their destinations at the time of travel.",
  bulletHeading: "Key points to remember:",
  bullets: [
    "Stay updated on the latest travel and health requirements and restrictions for all destinations, not just your tour's starting country.",
    "Avoid booking international flights until you've done your own research or consulted with our team or your travel agent.",
    "Be aware of additional entry requirements if your itinerary includes multiple countries.",
    "Traveling with minors (under 18) may necessitate extra documentation for entry into certain countries. Please contact the Embassy for clarification.",
    "Boating trip itineraries may be subject to change due to weather conditions and other factors. Your flexibility ensures a safe and enjoyable journey. We appreciate your cooperation and eagerly anticipate an incredible adventure together!",
  ],
};

/* -------------------------------------------------------------------------- */
/* Sections                                                                    */
/* -------------------------------------------------------------------------- */

export const preDepartureSections = [
  {
    id: "01",
    number: "01",
    heading: "Review Entry Requirements and Restrictions Advice",
    body: "Please review and check entry requirements and restrictions for both your outbound and return trips. Don't forget to grab the source links by using the tool below, powered by Sherpa.",
    sherpaImage: "/figma/dest-philippines-sunrise.jpg",
  },
  {
    id: "03",
    number: "03",
    heading:
      "Check Travellers' Health Information & your Healthcare Provider / Clinic",
    paragraphs: [
      "While some countries may ask for immunization against specific diseases before entry, it's also a good idea to consider other vaccinations based on the common health risks at your destination.",
      "We recommend checking out the Traveller's Health Resources from the US Centers for Disease Control & Prevention for health guidance:",
      "https://wwwnc.cdc.gov/travel/",
      "Once you've gone through the CDC advice, reach out to your healthcare provider or clinic. They can offer personalized advice based on your health history and let you know if any exemptions apply to you.",
      "It's a good idea to get in touch with your healthcare provider or travel medicine clinic early on, ideally around 6-8 weeks before your planned travel date.",
    ],
    cdcLink: "https://wwwnc.cdc.gov/travel/",
  },
  {
    id: "?",
    number: "?",
    heading:
      "It seems like I can't travel to my destination. What should I do now?",
    paragraphs: [
      "If you're within a month of your planned travel date and facing current travel restrictions that prevent you from reaching your destination, feel free to reach out to us. We're here to help review your options and find the best solution for you.",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Government links accordion                                                  */
/* -------------------------------------------------------------------------- */

export const govtAdviceSection = {
  number: "02",
  heading: "Travel Advice & Resources by your home government",
  intro:
    "Below are links provided and updated by various governments. If you have any queries about the information on these pages, reach out to your home government.",
  outro:
    "If your country isn't listed, contact your home government for Travel Advice & Resources.",
  countries: [
    {
      id: "australia",
      name: "Australia",
      links: [
        {
          label: "Travel Advice & Destination Information:",
          href: "http://smartraveller.gov.au/",
          text: "http://smartraveller.gov.au/",
        },
        {
          label: "Before You Go Checklist:",
          href: "https://www.smartraveller.gov.au/consular-services/resources/before-you-go-checklist",
          text: "https://www.smartraveller.gov.au/consular-services/resources/before-you-go-checklist",
        },
      ],
    },
    {
      id: "canada",
      name: "Canada",
      links: [
        {
          label: "Travel Advice & Destination Information:",
          href: "https://travel.gc.ca/",
          text: "https://travel.gc.ca/",
        },
        {
          label: "Interactive Tool - Ask Travel:",
          href: "https://travel.gc.ca/assistance/ask-travel",
          text: "https://travel.gc.ca/assistance/ask-travel",
        },
      ],
    },
    {
      id: "eu",
      name: "European Union - Member States - Directory",
      links: [
        {
          label:
            "Please click below for the European Commission's Travel Advice Directory:",
          href: "https://ec.europa.eu/consularprotection/content/travel-advice_en",
          text: "https://ec.europa.eu/consularprotection/content/travel-advice_en",
        },
      ],
    },
    {
      id: "nz",
      name: "New Zealand",
      links: [
        {
          label: "Travel Advice & Destination Information:",
          href: "https://www.safetravel.govt.nz/",
          text: "https://www.safetravel.govt.nz/",
        },
        {
          label: "Quick Checklist & Tips:",
          href: "https://www.safetravel.govt.nz/quick-checklist-and-tips",
          text: "https://www.safetravel.govt.nz/quick-checklist-and-tips",
        },
      ],
    },
    {
      id: "uk",
      name: "United Kingdom",
      links: [
        {
          label: "Travel Advice & Destination Information:",
          href: "https://www.gov.uk/browse/abroad",
          text: "https://www.gov.uk/browse/abroad",
        },
        {
          label: "Foreign Travel Checklist:",
          href: "https://www.gov.uk/guidance/foreign-travel-checklist",
          text: "https://www.gov.uk/guidance/foreign-travel-checklist",
        },
      ],
    },
    {
      id: "usa",
      name: "United States of America",
      links: [
        {
          label: "Travel Advice & Destination Information:",
          href: "https://travel.state.gov/content/travel/en/international-travel.html",
          text: "https://travel.state.gov/content/travel/en/international-travel.html",
        },
        {
          label: "Traveler's Checklist:",
          href: "https://travel.state.gov/content/travel/en/international-travel/before-you-go/travelers-checklist.html",
          text: "https://travel.state.gov/content/travel/en/international-travel/before-you-go/travelers-checklist.html",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Contact CTA                                                                 */
/* -------------------------------------------------------------------------- */

export const preDepartureCta = {
  heading: "Have more questions?",
  body: "Let us help you!",
  button: { label: "Contact Us", href: "/contact-us" },
};
