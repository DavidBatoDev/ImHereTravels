"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import type { Tour, TourDay } from "@/types/tour";
import Icon from "./Icon";

/* -------------------------------------------------------------------------- */
/* Parent — manages single active index + scroll tracking                     */
/* -------------------------------------------------------------------------- */

export default function Itinerary({
  section,
}: {
  section: Tour["itinerary"];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  // True while the previously-active row is still collapsing / the newly
  // active one is still expanding. Auto-switching is blocked until it clears,
  // so a fast scroll can never fire a second switch mid-transition — which is
  // what was showing two days expanded at once (the old one hadn't finished
  // closing before the next one started opening).
  const isTransitioning = useRef(false);

  const setActiveDay = (index: number) => {
    if (index === activeIndexRef.current) return;
    activeIndexRef.current = index;
    isTransitioning.current = true;
    // Safety net: if onAnimationComplete never fires for some edge case
    // (e.g. the row unmounts mid-transition), don't leave the lock stuck.
    window.setTimeout(() => {
      isTransitioning.current = false;
    }, 700);
    setActiveIndex(index);
  };

  useEffect(() => {
    // Trigger line: near natural reading eye-line, not the top edge.
    // A row opens only while its heading is in this band, so the expanded
    // details appear while the user can still comfortably read them. Kept
    // tight so a small scroll doesn't already have two adjacent headings
    // both qualifying as "close enough".
    const TRIGGER_RATIO = 0.42;
    const ACTIVATION_BELOW_LINE_PX = 90;
    const ACTIVATION_ABOVE_LINE_PX = 16;

    function onScroll() {
      if (document.documentElement.dataset.reviewsScrollLock === "true") return;
      if (isTransitioning.current) return;

      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const triggerY = window.innerHeight * TRIGGER_RATIO;
      const sectionBounds = sectionEl.getBoundingClientRect();
      if (sectionBounds.top > triggerY || sectionBounds.bottom < triggerY) {
        return;
      }

      let bestIdx = 0;
      let bestDist = Infinity;

      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const { top } = el.getBoundingClientRect();
        const offset = top - triggerY;
        if (offset < -ACTIVATION_ABOVE_LINE_PX || offset > ACTIVATION_BELOW_LINE_PX) {
          return;
        }
        const dist = Math.abs(offset);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });

      if (bestDist === Infinity) return;
      setActiveDay(bestIdx);
    }

    // Run once on mount so day 1 expands immediately if the section is visible.
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="mt-10 w-full md:mt-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>

      <ol className="mt-8 divide-y divide-light-grey border-t border-light-grey">
        {section.days.map((day, i) => (
          <DayItem
            key={day.dayNumber}
            day={day}
            open={activeIndex === i}
            onClick={() => setActiveDay(i)}
            onSettled={() => {
              isTransitioning.current = false;
            }}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
          />
        ))}
      </ol>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* DayItem — controlled open state, forwarded ref for scroll tracking         */
/* -------------------------------------------------------------------------- */

interface DayItemProps {
  day: TourDay;
  open: boolean;
  onClick: () => void;
  onSettled: () => void;
}

const DayItem = forwardRef<HTMLLIElement, DayItemProps>(function DayItem(
  { day, open, onClick, onSettled },
  ref,
) {
  return (
    <motion.li
      ref={ref}
      layout="position"
      className="py-6"
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-crimson-red font-sans text-b4-desktop font-bold text-white"
          >
            {day.dayNumber}
          </span>
          <h3 className="font-sans text-h6-mobile md:text-h6-desktop text-midnight">
            <span className="font-bold">Day {day.dayNumber}</span>{" "}
            <span className="font-bold text-crimson-red">{day.title}</span>
          </h3>
        </div>
        <ChevronDown
          aria-hidden
          strokeWidth={2}
          className={`size-5 shrink-0 text-midnight transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0, y: -6 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -6 }}
            transition={{
              height: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
              opacity: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              y: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            className="overflow-hidden"
            onAnimationComplete={onSettled}
          >
            <div
              className={`mt-5 grid grid-cols-1 gap-x-6 gap-y-4 ${
                day.image ? "md:grid-cols-[1fr_348px]" : ""
              }`}
            >
              <p className="font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                {day.description}
              </p>
              {day.image && (
                <div className="relative aspect-16/10 overflow-hidden rounded-md bg-light-grey md:row-span-2">
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <ImageWithSkeleton
                      src={day.image}
                      alt={day.imageAlt ?? day.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 348px"
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              )}
              {day.details.length > 0 && (
                <ul className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  {day.details.map((d) => (
                    <li key={d.label} className="flex items-start gap-3">
                      <span className="shrink-0 text-midnight">
                        <Icon name={d.icon} className="size-5" />
                      </span>
                      <div>
                        <p className="font-sans text-b4-desktop font-bold text-midnight">
                          {d.label}
                        </p>
                        <p className="font-body text-b4-mobile md:text-b4-desktop text-dark-gray whitespace-pre-line">
                          {d.value}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
});
