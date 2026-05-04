import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/app/components/global/Footer";
import Reveal from "@/app/components/global/Reveal";
import { getAllHostSlugs, getHostBySlug } from "@/data/hosts";

export const metadata: Metadata = {
  title: "Resident Hosts — I'm Here Travels",
  description:
    "Travel with our community hosts. Join group trips led by Dev, Jess, and more — curated experiences built around real connections.",
};

export default function ResidentHostsPage() {
  const hosts = getAllHostSlugs()
    .map((slug) => getHostBySlug(slug)!)
    .filter(Boolean);

  return (
    <>
      <main className="flex-1">
        {/* ── Hero band ─────────────────────────────────────────────────── */}
        <section className="bg-midnight px-4 py-14 text-white md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h1 className="font-display text-h1-mobile md:text-h1-desktop">
                Resident Hosts
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 max-w-2xl font-body text-b2-mobile md:text-b2-desktop text-white/80">
                Travel with someone you already follow. Our resident hosts lead
                group trips designed to bring their communities together through
                shared adventures.
              </p>
            </Reveal>
          </div>
        </section>

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
              const cardImage = host.heroImages?.[0] ?? host.heroImage;
              const showComingSoonPlaceholder = host.comingSoon && !cardImage;

              return (
                <Reveal as="li" key={host.slug} delay={i * 80}>
                  <Link
                    href={`/resident-hosts/${host.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-small transition-shadow hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red"
                  >
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      {cardImage ? (
                        <Image
                          src={cardImage}
                          alt={host.heroImageAlt}
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
