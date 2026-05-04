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
 *
 * Host-specific content lives in its own file, e.g. data/travelWithDev.ts
 */

import {
  devSlug,
  devDisplayName,
  devPageTitle,
  devInstagram,
  devProfileImage,
  devHeroImage,
  devHeroImageAlt,
  devMeta,
  devIntro,
  devUpcomingTrips,
  devWhyTravel,
  devHowItWorks,
  devGalleryImages,
} from "./travelWithDev";

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
  /** Circular profile photo shown in the intro section */
  profileImage?: string;
  /** Instagram handle (without @) */
  instagram?: string;
  /** When true the page shows a "Coming Soon" screen instead of full content */
  comingSoon?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Host entries                                                                 */
/* -------------------------------------------------------------------------- */

const ALL_HOSTS: Host[] = [
  {
    slug:         devSlug,
    displayName:  devDisplayName,
    pageTitle:    devPageTitle,
    heroImage:    devHeroImage,
    heroImageAlt: devHeroImageAlt,
    meta:         devMeta,
    intro:        devIntro,
    upcomingTrips: devUpcomingTrips,
    whyTravel:    devWhyTravel,
    howItWorks:   devHowItWorks,
    profileImage: devProfileImage,
    instagram:    devInstagram,
    galleryImages: devGalleryImages,
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
