import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import Reveal from "@/app/components/global/Reveal";

/**
 * Standard interior-page hero: a full-bleed cover photo under a brand scrim,
 * with a left-aligned title + optional description. Matches the image-hero
 * treatment used across the site (about-us, faqs, contact-us, …) so section
 * pages read consistently instead of showing a flat dark band.
 *
 * The scrim is darkest on the left (keeps the white text legible) and fades
 * toward the right so the cover photo shows through. Swap the look of any page
 * by changing the `image` prop — that's the only thing to touch.
 */
export default function PageHero({
  title,
  description,
  image,
  imageAlt = "",
}: {
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden px-4 py-14 text-white md:px-8 md:py-20">
      <ImageWithSkeleton
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/70 to-midnight/40" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <h1 className="font-display text-h1-mobile md:text-h1-desktop">{title}</h1>
        </Reveal>
        {description && (
          <Reveal delay={120}>
            <p className="mt-4 max-w-2xl font-body text-b2-mobile md:text-b2-desktop text-white/80">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
