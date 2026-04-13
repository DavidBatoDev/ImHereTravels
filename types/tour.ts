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
  | "instagram";

export interface TourCrumb {
  label: string;
  href?: string;
}

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
  image: string;
  imageAlt: string;
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

export interface TourBookingCard {
  durationLabel: string;
  routeLabel: string;
  priceFromLabel: string;
  priceCurrency: string;
  priceAmount: string;
  ctaLabel: string;
  ctaHref: string;
  footnote: string;
}

export interface Tour {
  slug: string;
  meta: { title: string; description: string };
  breadcrumbs: TourCrumb[];
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
