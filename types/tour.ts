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
  links?: string[];
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
  // Full deposit note text. Defaults to "Reserve for {depositAmount} — deducted from total fees. Non-refundable."
  depositNote?: string;
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
  // Override the tour ID used in booking/reservation URLs when it differs
  // from the page slug (e.g. private variants that share an admin tour ID).
  bookingSlug?: string;
  meta: { title: string; description: string };
  gallery: {
    hero: string;
    heroAlt: string;
    thumbnails: { src: string; alt: string }[];
  };
  header: {
    title: string;
    tags: TourTag[];
    descriptionPrefix?: string;
    description: string;
  };
  keyFacts: TourKeyFact[];
  // Optional sections — rendered only when the data is present.
  // Most JSON-sourced tours won't have all of these.
  whatsIncluded?: { heading: string; items: TourIncludedItem[] };
  tripHighlights?: { heading: string; items: TourHighlight[] };
  map?: { heading: string; image: string; imageAlt: string; embedUrl?: string };
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
  // TourRadar per-tour "Tour Reviews" widget embed (from the Operator Dashboard).
  // When set, the tour page renders a "Reviews on TourRadar" section.
  tourRadarWidgetId?: string;
  tourRadarWidgetUrl?: string;
  booking: TourBookingCard;
  relatedTours?: { heading: string; items: TourRelated[] };
  community?: { heading: string; images: TourCommunityImage[] };
  /** When true the tour page shows a Coming Soon screen instead of full content */
  comingSoon?: boolean;
  /** When true the tour is a hosted tour (shown under /hosted-tours, excluded from /tours) */
  isHosted?: boolean;

  listingCard: {
    duration: string;
    description: string;
    price: string;
    image: string;
    imageAlt: string;
  };
}
