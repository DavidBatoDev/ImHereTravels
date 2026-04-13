export type TourIcon =
  | "days"
  | "route"
  | "people"
  | "transport"
  | "airport"
  | "accommodation"
  | "activities"
  | "meals"
  | "team"
  | "plus"
  | "location"
  | "info"
  | "faq"
  | "download"
  | "instagram"
  | "luggage"
  | "shield"
  | "sun"
  | "handshake";

export interface TourTag {
  label: string;
  icon: TourIcon;
}

export interface TourKeyFact {
  icon: TourIcon;
  label: string;
  values: string[];
}

export interface TourIncludedItem {
  icon: TourIcon;
  label: string;
  value: string | string[];
}

export interface TourHighlight {
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
}

export interface TourDayDetail {
  icon: TourIcon;
  label: string;
  value: string;
}

export interface TourDay {
  dayNumber: number;
  title: string;
  description: string;
  // Optional — many JSON-sourced tours have no per-day photo. The day
  // card simply renders without an image when these are absent.
  image?: string;
  imageAlt?: string;
  details: TourDayDetail[];
}

export interface TourAccommodation {
  image: string;
  imageAlt: string;
  name: string;
  nights: string;
}

export interface TourFaq {
  question: string;
  answer: string;
}

export interface TourThingToKnow {
  icon: TourIcon;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface TourTip {
  icon: TourIcon;
  title: string;
  description: string;
}

export interface TourTestimonial {
  rating: number;
  date: string;
  body: string;
  avatar: string;
  author: string;
  location: string;
}

export interface TourRelated {
  slug: string;
  image: string;
  imageAlt: string;
  duration: string;
  title: string;
  description: string;
  priceFromLabel: string;
  priceCurrency: string;
  priceAmount: string;
}

export interface TourCommunityImage {
  src: string;
  alt: string;
  href: string;
}

export interface TourPriceCategory {
  label: string;
  amount: string; // e.g. "£2150"
  // Background color for the category badge next to the amount.
  badge?: "yellow" | "green" | "red" | "grey";
}

export interface TourBookingCard {
  durationLabel: string;
  routeLabel: string;
  priceFromLabel: string;
  priceCurrency: string;
  priceAmount: string;
  // Optional tiered pricing (e.g. Standard vs With Skiing). When set,
  // the card hides the single `priceAmount` and renders one row per
  // category instead. Leave undefined for single-price tours.
  priceCategories?: TourPriceCategory[];
  // Deposit amount shown in the reservation notice below the CTA
  // (e.g. "£300"). Omit to hide the notice.
  depositAmount?: string;
  ctaLabel: string;
  ctaHref: string;
  footnote: string;
}

export interface Tour {
  slug: string;
  // Short, human-facing tour name (e.g., "Philippine Sunrise"). Drives
  // both the page H1 and the breadcrumb leaf — breadcrumbs are always
  // Home › Tours › <name>, so we don't store the trail per tour.
  name: string;
  meta: { title: string; description: string };
  gallery: {
    hero: string;
    heroAlt: string;
    thumbnails: { src: string; alt: string }[];
  };
  header: {
    title: string;
    tags: TourTag[];
    description: string;
  };
  keyFacts: TourKeyFact[];
  // Optional sections — rendered only when the data is present.
  // Most JSON-sourced tours won't have all of these.
  whatsIncluded?: { heading: string; items: TourIncludedItem[] };
  tripHighlights?: { heading: string; items: TourHighlight[] };
  map?: { heading: string; image: string; imageAlt: string };
  itinerary: {
    heading: string;
    downloadLabel: string;
    downloadHref: string;
    days: TourDay[];
  };
  whereWeStay?: { heading: string; items: TourAccommodation[] };
  faqs?: { heading: string; items: TourFaq[] };
  thingsToKnow?: { heading: string; items: TourThingToKnow[] };
  tips?: { heading: string; items: TourTip[] };
  booking: TourBookingCard;
  testimonials?: { heading: string; items: TourTestimonial[] };
  relatedTours?: { heading: string; items: TourRelated[] };
  community?: { heading: string; images: TourCommunityImage[] };

  listingCard: {
    duration: string;
    description: string;
    price: string;
    image: string;
    imageAlt: string;
  };
}
