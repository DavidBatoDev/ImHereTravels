import type { Metadata } from "next";
import Footer from "@/app/components/global/Footer";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import { joinMetadata, joinHero, joinForm } from "@/data/joinOurCommunity";
import JoinCommunityForm from "./JoinCommunityForm";

export const metadata: Metadata = joinMetadata;

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="relative h-65 overflow-hidden md:h-90">
      <ImageWithSkeleton
        src={joinHero.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <h1 className="font-display text-h1-mobile text-white md:text-h1-desktop">
          {joinHero.title}
        </h1>
      </div>
    </section>
  );
}

function FormSection() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 md:px-8 md:py-16">
      {/* Heading + body */}
      <div className="mb-8 text-center">
        <h2 className="mb-3 font-sans font-bold text-h4-mobile text-midnight md:text-h4-desktop">
          {joinForm.heading}
        </h2>
        <p className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
          {joinForm.body}
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-lg bg-white p-8 md:p-10">
        <JoinCommunityForm />
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function JoinOurCommunityPage() {
  return (
    <>
      <main className="flex-1 bg-light-grey">
        <Hero />
        <FormSection />
      </main>
      <Footer />
    </>
  );
}
