"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type WhyTravelInteractiveProps = {
  points: string[];
};

const pointNotes = [
  "A single, coordinated plan keeps the trip feeling smooth from first enquiry to departure.",
  "Local teams bring practical knowledge and on-the-ground context that generic planning cannot replace.",
  "Curated itineraries keep the best parts front and center instead of stretching the schedule thin.",
  "Community-led travel works best when the group vibe is intentional, welcoming, and easy to join.",
  "Support matters most when plans change, so help stays close throughout the trip.",
];

export default function WhyTravelInteractive({ points }: WhyTravelInteractiveProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  if (points.length === 0) {
    return null;
  }

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % points.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [isPaused, points.length]);

  const activePoint = points[activeIndex] ?? points[0];
  const activeNote = pointNotes[activeIndex] ?? "Use the arrows to explore another angle on the trip.";

  const handlePrev = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + points.length) % points.length);
  };

  const handleNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % points.length);
  };

  return (
    <div
      className="rounded-lg border border-light-grey bg-light-grey/70 p-4 md:p-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activePoint}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex w-fit items-center rounded-full bg-crimson-red px-2.5 py-1 font-body text-b4-mobile font-medium text-white md:text-b4-desktop">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous reason"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-light-grey bg-white text-midnight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red"
              >
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                  <path d="m5 12 5-5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next reason"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-light-grey bg-white text-midnight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-red"
              >
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                  <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <h3 className="font-sans text-h6-mobile text-midnight md:text-h6-desktop">
            {activePoint}
          </h3>
          <p className="max-w-xl font-body text-b4-mobile text-dark-gray md:text-b4-desktop">
            {activeNote}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}