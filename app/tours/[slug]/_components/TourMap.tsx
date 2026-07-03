import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import type { Tour } from "@/types/tour";

// Google blocks framing of normal /maps/place share URLs; only /maps/embed or the
// keyless ?output=embed form render in an iframe. Normalize whatever was saved (a share
// link, an @lat,lng URL, or a full <iframe> snippet) into a frameable src.
function toEmbedUrl(raw?: string): string {
  let s = (raw ?? "").trim();
  if (!s) return "";
  if (s.includes("<iframe")) {
    const m = s.match(/src=["']([^"']+)["']/i);
    if (m) s = m[1];
  }
  if (s.includes("/maps/embed")) return s;
  const coords =
    s.match(/@(-?\d+\.\d+),(-?\d+\.\d+)(?:,(\d+(?:\.\d+)?)z)?/) ||
    s.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if (coords) {
    const [, lat, lng, zoom] = coords;
    return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom ?? 14}&hl=en&output=embed`;
  }
  const place = s.match(/\/maps\/place\/([^/@?]+)/);
  const query = place ? decodeURIComponent(place[1].replace(/\+/g, " ")) : s;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export default function TourMap({ section }: { section: NonNullable<Tour["map"]> }) {
  return (
    <section className="mt-10 w-full md:mt-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>
      <div className="mt-8 relative aspect-video w-full overflow-hidden rounded-lg bg-light-grey">
        {section.embedUrl ? (
          <iframe
            src={toEmbedUrl(section.embedUrl)}
            title={section.imageAlt}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <ImageWithSkeleton
            src={section.image}
            alt={section.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
        )}
      </div>
    </section>
  );
}
