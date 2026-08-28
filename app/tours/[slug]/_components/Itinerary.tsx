"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import type { Tour, TourDay } from "@/types/tour";
import Icon from "./Icon";

/* -------------------------------------------------------------------------- */
/* Tuning                                                                     */
/* -------------------------------------------------------------------------- */

/** Reading eye-line: a day becomes active once its heading crosses this line. */
const TRIGGER_RATIO = 0.38;
/** A heading must cross the line by this much before it takes over, so a
 *  heading parked on the line cannot flicker with its neighbour. */
const CROSS_HYSTERESIS_PX = 24;
/* Expand/collapse motion, matched to FaqAccordion so both accordions on the
 * tour page feel like the same control. */
const EASE = [0.22, 1, 0.36, 1] as const;
const HEIGHT_S = 0.4;
const OPACITY_S = 0.25;
const SLIDE_S = 0.3;
/** How long after a switch another one is refused. Deliberately shorter than
 *  the animation: with deferred collapse an overlapping switch is harmless (the
 *  outgoing day was staying open anyway), whereas blocking for the full
 *  animation ignored ~590px of scrolling and made the list skip a day. */
const SWITCH_LOCK_MS = 200;

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
  // Days that are no longer active but are held open until they have scrolled
  // out of sight. See the "deferred collapse" note below.
  const [lingering, setLingering] = useState<number[]>([]);
  const lingeringRef = useRef<number[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  // True while a row is expanding / collapsing, so a fast scroll cannot stack a
  // second switch on top of the first. Cleared by a SINGLE timer that is always
  // reset, so an earlier switch can never unlock a later one.
  const isTransitioning = useRef(false);
  const unlockTimer = useRef<number | null>(null);
  // One evaluation per frame at most, so a burst of scroll events does not
  // re-run the measuring loop dozens of times.
  const rafId = useRef<number | null>(null);
  // Scroll position our own re-anchoring last moved the page to. A scroll event
  // landing exactly here is ours, not the reader's. Identifying our scrolls by
  // position rather than by a timer matters: a timer long enough to cover a
  // collapse animation also blinded us to half a second of real scrolling, and
  // the list skipped a day.
  const anchoredY = useRef<number | null>(null);

  /**
   * Viewport top of a row's heading. Safe to read straight off the rect only
   * because DayItem carries no `layout` prop: nothing transforms the <li>, so
   * this is pure layout and an in-flight animation cannot feed its own motion
   * back into the trigger test.
   */
  const rowTop = useCallback((index: number) => {
    const row = rowRefs.current[index];
    if (!row) return null;
    return row.getBoundingClientRect().top;
  }, []);

  /** Layout-only document offset of a row — the anchoring reference. */
  const rowDocTop = useCallback(
    (index: number) => {
      const t = rowTop(index);
      return t === null ? null : t + window.scrollY;
    },
    [rowTop],
  );

  // All the scroll-tracking logic lives inside one effect: `evaluate` needs
  // `setActiveDay`, and the unlock inside `setActiveDay` needs `evaluate` back,
  // so as separate hooks they could only reach each other through a ref — which
  // the React compiler (rightly) rejects. Plain closures sharing refs are
  // simpler.
  const activateRef = useRef<(index: number, fromClick?: boolean) => void>(
    () => {},
  );
  const evaluateRef = useRef<() => void>(() => {});

  useEffect(() => {
    /**
     * Deferred collapse.
     *
     * A day's panel is 4-6x the height of a collapsed row, so closing the
     * outgoing day removes a large block of layout. Wherever that block sits,
     * something has to move: leave the scroll alone and the day being read
     * jumps up by the panel height; re-anchor the scroll and everything ABOVE
     * the reading line slides down instead — which is what read as the section
     * "expanding upwards", and what kept re-showing the sticky header.
     *
     * There is no third option while the collapse happens on screen. So it
     * doesn't: the outgoing day stays open until it has scrolled entirely out
     * of view, and only collapses then. The removal is off-screen, the
     * anchoring below absorbs it into the scroll position, and nothing the
     * reader can see moves at all. The cost is that two days are briefly open
     * at once while one is on its way out.
     */
    function pruneLingering() {
      if (lingeringRef.current.length === 0) return;
      const vh = window.innerHeight;
      const next = lingeringRef.current.filter((i) => {
        if (i === activeIndexRef.current) return false;
        const el = rowRefs.current[i];
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.bottom > 0 && r.top < vh; // still on screen — keep it open
      });
      if (next.length === lingeringRef.current.length) return;
      lingeringRef.current = next;
      setLingering(next);
    }

    function setActiveDay(index: number, fromClick = false) {
      if (index === activeIndexRef.current) return;
      const outgoing = activeIndexRef.current;
      activeIndexRef.current = index;

      if (fromClick) {
        // An explicit choice: close everything else straight away. The reader
        // asked for this jump, and anchoring keeps the row they clicked still.
        lingeringRef.current = [];
        setLingering([]);
      } else if (!lingeringRef.current.includes(outgoing)) {
        lingeringRef.current = [...lingeringRef.current, outgoing];
        setLingering(lingeringRef.current);
      }

      isTransitioning.current = true;
      if (unlockTimer.current !== null) window.clearTimeout(unlockTimer.current);
      unlockTimer.current = window.setTimeout(() => {
        unlockTimer.current = null;
        isTransitioning.current = false;
        // Re-check straight away. During a continuous scroll the reading line
        // has moved on while this row was opening, and without this the list
        // would sit on a stale day until the next scroll event arrived.
        evaluate();
      }, SWITCH_LOCK_MS);
      setActiveIndex(index);
    }

    function evaluate() {
      if (document.documentElement.dataset.reviewsScrollLock === "true") return;

      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      pruneLingering();

      const triggerY = window.innerHeight * TRIGGER_RATIO;
      const bounds = sectionEl.getBoundingClientRect();
      if (bounds.top > triggerY || bounds.bottom < triggerY) return;

      // Scrollspy rule: the active day is the LAST one whose heading has
      // crossed the trigger line. A heading crosses exactly once, so this is
      // monotonic with scroll direction — unlike the old "nearest heading
      // inside a 106px band", where two adjacent headings (~74px apart) both
      // qualified and the winner flipped on a few pixels of movement.
      const current = activeIndexRef.current;
      let next = -1;
      for (let i = 0; i < rowRefs.current.length; i++) {
        const top = rowTop(i);
        if (top === null) continue;
        // An extra nudge past the line is needed to move forward off the
        // current row.
        const threshold =
          i > current ? triggerY - CROSS_HYSTERESIS_PX : triggerY;
        if (top <= threshold) next = i;
        else break;
      }

      // Nothing has crossed the line yet — the whole list still sits below it.
      // Keep whatever is open rather than falling back to day 1: this branch is
      // reached right after a click, once re-anchoring has pushed the list down
      // past the line, and defaulting to 0 there snapped the reader straight
      // back to day 1.
      if (next < 0) return;

      setActiveDay(next);
    }

    activateRef.current = setActiveDay;
    evaluateRef.current = evaluate;

    // Tracking is live: a day opens as its heading reaches the reading line,
    // while the reader is still scrolling.
    function onScroll() {
      if (rafId.current !== null) return;
      rafId.current = window.requestAnimationFrame(() => {
        rafId.current = null;
        // Retiring an off-screen day is never gated: it is invisible by
        // definition, and holding it back behind the switch lock let a third
        // day pile up open during a fast scroll.
        // Retiring an off-screen day is never gated: it is invisible by
        // definition, and holding it back behind the switch lock let a third
        // day pile up open during a fast scroll.
        pruneLingering();
        // Our own re-anchoring scroll is not a reason to re-pick the day. It
        // also must not override a day the reader picked by clicking: the
        // correction that follows a click would otherwise immediately snap back
        // to whatever happens to be at the reading line.
        if (anchoredY.current !== null && Math.abs(window.scrollY - anchoredY.current) <= 1) return;
        anchoredY.current = null;
        // A switch is still animating. Don't stack another on top of it; the
        // unlock re-evaluates, so nothing is lost by ignoring this event.
        if (isTransitioning.current) return;
        evaluate();
      });
    }

    // Run once on mount so day 1 expands immediately if the section is visible.
    evaluate();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) window.cancelAnimationFrame(rafId.current);
      if (unlockTimer.current !== null) window.clearTimeout(unlockTimer.current);
    };
  }, [rowTop]);

  /**
   * Scroll anchoring.
   *
   * Whenever one of our rows resizes we measure the active row's document
   * offset and scroll by exactly its change. Only layout can move a row in
   * document space — never the reader's own scrolling — so this cancels the
   * shift without fighting the gesture. The observer watches only the day rows,
   * so it cannot fire for unrelated layout elsewhere on the page.
   *
   * This has to run in a ResizeObserver rather than a rAF loop. Observer
   * callbacks are delivered after layout and before paint, so they see the
   * height the animation just wrote. A rAF callback runs *before* the frame's
   * layout and therefore measures the previous frame's height — the correction
   * then lands a frame late, and since most of the height change is crammed
   * into the first two or three (expensive) frames of the transition, that lag
   * alone was worth a ~130px visible lurch.
   */
  const anchor = useRef<{ index: number; docTop: number | null }>({
    index: 0,
    docTop: null,
  });

  useLayoutEffect(() => {
    // Re-baseline before the newly active row has animated at all.
    anchor.current = { index: activeIndex, docTop: rowDocTop(activeIndex) };
  }, [activeIndex, rowDocTop]);

  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    let releaseTimer: number | null = null;

    const ro = new ResizeObserver(() => {
      const a = anchor.current;
      const now = rowDocTop(a.index);
      if (now === null) return;

      if (a.docTop !== null) {
        const delta = now - a.docTop;
        if (Math.abs(delta) >= 1) {
          // Tell the sticky header this scroll is ours, not the reader's, so it
          // does not read the backwards correction as "scrolled up" and
          // reappear on every step of the itinerary.
          document.documentElement.dataset.scrollAnchoring = "true";
          if (releaseTimer !== null) window.clearTimeout(releaseTimer);
          releaseTimer = window.setTimeout(() => {
            releaseTimer = null;
            delete document.documentElement.dataset.scrollAnchoring;
          }, 120);
          // `behavior: "instant"` is required — globals.css sets
          // `scroll-behavior: smooth` on <html>, which would animate the
          // correction and defeat the whole point.
          const target = window.scrollY + delta;
          window.scrollTo({ top: target, behavior: "instant" });
          anchoredY.current = window.scrollY;
        }
      }
      // Carry the value measured BEFORE the correction: a document offset
      // cannot be changed by scrolling, and re-reading it here catches scrollY
      // and the rect mid-update, which double-counted every delta.
      a.docTop = now;
    });

    rowRefs.current.forEach((el) => el && ro.observe(el));
    return () => {
      ro.disconnect();
      if (releaseTimer !== null) window.clearTimeout(releaseTimer);
      delete document.documentElement.dataset.scrollAnchoring;
    };
  }, [rowDocTop]);

  return (
    <section ref={sectionRef} className="mt-10 w-full md:mt-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>

      {/* overflow-anchor:none — this component does its own scroll anchoring.
          Leaving the browser's native one on meant both fired and the shift
          was corrected twice (the page scrolled 12px for a 6px shift), which
          is what remained of the lurch on the first switch. */}
      <ol className="mt-8 divide-y divide-light-grey border-t border-light-grey [overflow-anchor:none]">
        {section.days.map((day, i) => (
          <DayItem
            key={day.dayNumber}
            day={day}
            open={activeIndex === i || lingering.includes(i)}
            onClick={() => activateRef.current(i, true)}
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
}

const DayItem = forwardRef<HTMLLIElement, DayItemProps>(function DayItem(
  { day, open, onClick },
  ref,
) {
  return (
    // No `layout` prop: the content height animation already reflows the rows
    // below smoothly, and the transform it applied both added a visible glide
    // and polluted every rect-based measurement in the parent.
    <li ref={ref} className="py-6">
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
        <motion.span
          className="ml-auto shrink-0 text-midnight"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: SLIDE_S, ease: EASE }}
        >
          <ChevronDown aria-hidden strokeWidth={2} className="size-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: HEIGHT_S, ease: EASE },
              opacity: { duration: OPACITY_S, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            {/* The slide rides on the content, never on the box whose height is
                animating — putting y on the box fights its own reflow. */}
            <motion.div
              initial={{ y: -6 }}
              animate={{ y: 0 }}
              exit={{ y: -6 }}
              transition={{ duration: SLIDE_S, ease: EASE }}
              className={`mt-5 grid grid-cols-1 gap-x-6 gap-y-4 ${
                day.image ? "md:grid-cols-[1fr_348px]" : ""
              }`}
            >
              <p className="font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                {day.description}
              </p>
              {day.image && (
                <div className="relative aspect-16/10 overflow-hidden rounded-md bg-light-grey md:row-span-2">
                  <ImageWithSkeleton
                    src={day.image}
                    alt={day.imageAlt ?? day.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 348px"
                    className="object-cover"
                  />
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
});
