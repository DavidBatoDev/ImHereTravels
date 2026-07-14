"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Item = { q: string; a: string };

type FaqAccordionProps = {
  items: Item[];
  defaultOpen?: number | null;
  scrollActive?: boolean;
  expandAll?: boolean | null;
};

function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 7.5l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FaqAccordion({
  items,
  defaultOpen = 0,
  scrollActive = false,
  expandAll = null,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const openIndexRef = useRef<number | null>(defaultOpen);
  const listRef = useRef<HTMLDListElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  // True while a row is still collapsing/expanding. Auto-switching waits for
  // this to clear so a fast scroll can't fire a second switch mid-transition
  // — which is what showed two items expanded at once.
  const isTransitioning = useRef(false);

  const setOpenItem = (index: number | null) => {
    if (index === openIndexRef.current) return;
    openIndexRef.current = index;
    isTransitioning.current = true;
    // Safety net: if onAnimationComplete never fires for some edge case
    // (e.g. the row unmounts mid-transition), don't leave the lock stuck.
    window.setTimeout(() => {
      isTransitioning.current = false;
    }, 600);
    setOpenIndex(index);
  };

  useEffect(() => {
    if (!scrollActive || items.length === 0 || expandAll === true) return;

    // Kept tight so a small scroll doesn't already have two adjacent
    // questions both qualifying as "close enough".
    const TRIGGER_RATIO = 0.42;
    const ACTIVATION_BELOW_LINE_PX = 90;
    const ACTIVATION_ABOVE_LINE_PX = 16;

    function onScroll() {
      if (document.documentElement.dataset.reviewsScrollLock === "true") return;
      if (isTransitioning.current) return;

      const listEl = listRef.current;
      if (!listEl) return;

      const triggerY = window.innerHeight * TRIGGER_RATIO;
      const listBounds = listEl.getBoundingClientRect();
      if (listBounds.top > triggerY || listBounds.bottom < triggerY) {
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
      setOpenItem(bestIdx);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items.length, scrollActive, expandAll]);

  return (
    <dl ref={listRef}>
      {items.map((item, i) => {
        const isOpen = expandAll != null ? expandAll : openIndex === i;
        return (
          <motion.div
            key={i}
            layout="position"
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
          >
            <div className="py-2">
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-3 text-left font-sans text-h6-mobile text-midnight md:text-h6-desktop"
              >
                <span>{item.q}</span>
                <motion.span
                  className="ml-auto shrink-0"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ChevronDown />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.25, ease: "easeOut" },
                    }}
                    className="overflow-hidden"
                    onAnimationComplete={() => {
                      isTransitioning.current = false;
                    }}
                  >
                    <motion.p
                      initial={{ y: -6 }}
                      animate={{ y: 0 }}
                      exit={{ y: -6 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="pt-2 pb-4 whitespace-pre-line font-body text-b2-mobile text-midnight md:text-b2-desktop"
                    >
                      {item.a}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {i < items.length - 1 && <div className="h-px w-full bg-[#d7d6db]" />}
          </motion.div>
        );
      })}
    </dl>
  );
}
