/**
 * Public TourRadar tour-review page per site tour slug.
 *
 * TourRadar's scraped review data (scripts/tourradar-export/fetch-tourradar-reviews.mjs
 * in admin/client) carries no per-reviewer profile URL or stable per-review anchor —
 * only a review id and the operator's tour id. So every TourRadar-sourced review card
 * for a tour links out to that tour's shared reviews section on TourRadar, not an
 * individual reviewer page.
 */
export const TOURRADAR_TOUR_URLS: Record<string, string> = {
  "india-discovery-tour": "https://www.tourradar.com/t/321149#reviews",
  "vietnam-expedition": "https://www.tourradar.com/t/324172#reviews",
  "philippine-sunrise": "https://www.tourradar.com/t/298995#reviews",
  "philippine-sunset": "https://www.tourradar.com/t/298994#reviews",
};

export function getTourRadarReviewsUrl(tourSlug: string): string | undefined {
  return TOURRADAR_TOUR_URLS[tourSlug];
}
