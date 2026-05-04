/**
 * Resident Hosts registry.
 *
 * Each host entry drives a page at /resident-hosts/[slug].
 * The dynamic route uses `getHostBySlug` and `getAllHostSlugs`
 * for static generation.
 *
 * To add a new host:
 *   1. Add an entry to ALL_HOSTS below.
 *   2. Add the host to the nav dropdown in Header.tsx.
 */

export type HostTrip = {
  name: string;
  /** Human-readable date range, e.g. "March 19–31, 2027" or "TBA" */
  dates: string;
  /** If set, the trip card links to /tours/[tourSlug] */
  tourSlug?: string;
  image?: string;
  imageAlt?: string;
};

export type Host = {
  slug: string;
  displayName: string;
  pageTitle: string;
  /** Null until the host provides a photo — hero renders a solid bg-crimson-red instead */
  heroImage: string | null;
  heroImageAlt: string;
  meta: { title: string; description: string };
  /** Bio / intro paragraphs shown below the hero */
  intro: string[];
  upcomingTrips: HostTrip[];
  whyTravel: string[];
  howItWorks: string[];
  /** Empty until host provides real photos — gallery renders placeholders */
  galleryImages: { src: string; alt: string }[];
  /** 3 images for a split-panel hero (left → right). Overrides single heroImage when present. */
  heroImages?: string[];
  /** When true the page shows a "Coming Soon" screen instead of full content */
  comingSoon?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Host entries                                                                 */
/* -------------------------------------------------------------------------- */

const ALL_HOSTS: Host[] = [
  {
    slug: "dev",
    displayName: "Dev",
    pageTitle: "Travel with Dev",
    heroImage: null,
    heroImageAlt: "Dev's group travel adventures",
    heroImages: [
      "/images/wp-content/uploads/2025/01/india-header-2.webp",
      "/tours/philippine-sunrise/Sunrise_1.jpg",
      "/images/wp-content/uploads/2025/07/brazil-trip-highlight-1.webp",
    ],
    meta: {
      title: "Travel with Dev | I'm Here Travels",
      description:
        "Join Dev on her group trips designed to bring her community together through travel. Cultural experiences, adventure-filled itineraries, and meaningful connections.",
    },
    intro: [
      "Join Dev on her group trips designed to bring her community together through travel.",
      "Dev has been hosting with us since 2024 and has successfully led multiple sold-out trips — creating unforgettable experiences and strong connections within her community.",
      "From cultural experiences to adventure-filled itineraries, each trip is designed to create meaningful connections, lasting memories, and real shared experiences.",
      "Whether you're joining solo or with friends, you'll be part of a welcoming group that travels with intention.",
    ],
    upcomingTrips: [
      {
        name: "India Holi Tour 2027",
        dates: "March 19–31, 2027",
        tourSlug: "india-holi-festival-tour",
        image: "/images/wp-content/uploads/2025/01/india-header-2.webp",
        imageAlt: "India Holi Festival",
      },
      {
        name: "PH Sunrise & Sunset",
        dates: "TBA",
        image: "/tours/philippine-sunrise/hero-1.jpg",
        imageAlt: "Philippines Sunrise & Sunset",
      },
      {
        name: "Brazil",
        dates: "TBA",
        image: "/images/wp-content/uploads/2025/07/brazil-trip-highlight-1.webp",
        imageAlt: "Brazil's Treasures",
      },
    ],
    whyTravel: [
      "End-to-end planning — we handle everything",
      "Trusted local teams and guides",
      "Carefully curated, experience-first itineraries",
      "Strong community-focused trips",
      "Available on-ground support",
    ],
    howItWorks: [
      "Choose your host & trip",
      "Secure your spot with a deposit",
      "Pay in installments up to 4 times",
      "Travel and meet your community",
    ],
    galleryImages: [
      { src: "/images/wp-content/uploads/2025/01/india-triphighlight-1.webp", alt: "India Holi Festival" },
      { src: "/images/wp-content/uploads/2025/01/india-day-5.webp", alt: "India Holi Festival" },
      { src: "/tours/philippine-sunrise/community-1.jpg", alt: "Philippines Sunrise" },
      { src: "/tours/philippine-sunrise/community-3.jpg", alt: "Philippines Sunrise" },
      { src: "/images/wp-content/uploads/2025/07/brazil-trip-highlight-2.webp", alt: "Brazil's Treasures" },
      { src: "/images/wp-content/uploads/2025/07/brazil-day-3.webp", alt: "Brazil's Treasures" },
    ],
  },
  {
    slug: "jess",
    displayName: "Jess",
    pageTitle: "Travel with Jess",
    heroImage: null,
    heroImageAlt: "Jess's group travel adventures",
    meta: {
      title: "Travel with Jess | I'm Here Travels",
      description:
        "Travel with Jess on upcoming community group trips. Details coming soon.",
    },
    intro: [],
    upcomingTrips: [],
    whyTravel: [],
    howItWorks: [],
    galleryImages: [],
    comingSoon: true,
  },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                      */
/* -------------------------------------------------------------------------- */

export function getAllHostSlugs(): string[] {
  return ALL_HOSTS.map((h) => h.slug);
}

export function getHostBySlug(slug: string): Host | undefined {
  return ALL_HOSTS.find((h) => h.slug === slug);
}
