import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/app/components/global/Footer";
import Reveal from "@/app/components/global/Reveal";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import PageHero from "@/app/components/global/PageHero";
import { getAllHosts } from "@/lib/resident-hosts-firestore";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Resident Hosts — I'm Here Travels",
  description:
    "Travel with our community hosts. Join group trips led by Dev, Jess, and more — curated experiences built around real connections.",
};

export default async function ResidentHostsPage() {
  const hosts = await getAllHosts();

  return (
    <>
      <main className="flex-1">
        {/* ── Hero band ─────────────────────────────────────────────────── */}
        <PageHero
          title="Resident Hosts"
          description="Travel with someone you already follow. Our resident hosts lead group trips designed to bring their communities together through shared adventures."
          image="/figma/join-community.jpg"
        />

        {/* ── Host cards grid ───────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
            Meet our hosts
          </h2>
          <p className="mt-3 max-w-xl font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
            Each host brings their own community and style to every trip — pick
            the one that feels like your kind of travel.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hosts.map((host, i) => {
              // The card is about the person, so lead with their profile photo
              // (the same portrait used on their page, matching their Instagram
              // avatar). Fall back to the hero for hosts without one.
              const cardImage =
                host.profileImage ?? host.heroImages?.[0] ?? host.heroImage;
              // Profile photos are square (1080x1080, straight off Instagram).
              // A 4:3 frame would crop a quarter of the height away, so give
              // them a square frame and show the whole photo.
              const isProfilePhoto = Boolean(host.profileImage);
              const showComingSoonPlaceholder = host.comingSoon && !cardImage;

              return (
                <Reveal as="li" key={host.slug} delay={i * 80}>
                  <Link
                    href={`/resident-hosts/${host.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-small transition-shadow hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red"
                  >
                    <div
                      className={`relative w-full overflow-hidden ${
                        isProfilePhoto ? "aspect-square" : "aspect-4/3"
                      }`}
                    >
                      {cardImage ? (
                        <ImageWithSkeleton
                          src={cardImage}
                          alt={isProfilePhoto ? host.displayName : host.heroImageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : showComingSoonPlaceholder ? (
                        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-light-grey">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,51,64,0.12),transparent_55%)]" />
                          <span className="relative text-center font-body text-b2-mobile font-medium uppercase tracking-[0.35em] text-midnight/20 md:text-b2-desktop">
                            Coming Soon
                          </span>
                        </div>
                      ) : (
                        <div className="h-full w-full bg-crimson-red" />
                      )}
                      {host.comingSoon && !showComingSoonPlaceholder && (
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-body text-b4-desktop text-midnight">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-5">
                      <h3 className="font-sans text-h5-mobile md:text-h5-desktop text-midnight group-hover:text-crimson-red">
                        {host.pageTitle}
                      </h3>
                      {!host.comingSoon && host.upcomingTrips.length > 0 && (
                        <p className="font-body text-b4-desktop text-dark-gray">
                          {host.upcomingTrips.length}{" "}
                          {host.upcomingTrips.length === 1
                            ? "upcoming trip"
                            : "upcoming trips"}
                        </p>
                      )}
                      {host.comingSoon && (
                        <p className="font-body text-b4-desktop text-dark-gray">
                          Trips coming soon
                        </p>
                      )}
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
