"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Tour, TourDay } from "@/types/tour";
import Icon from "./Icon";

export default function Itinerary({
  section,
}: {
  section: Tour["itinerary"];
}) {
  return (
    <section className="mt-10 w-full md:mt-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
          {section.heading}
        </h2>
        <Link
          href={section.downloadHref}
          className="inline-flex items-center gap-2 rounded-full border border-midnight px-5 py-2.5 font-body text-b4-desktop text-midnight transition-colors hover:border-crimson-red hover:text-crimson-red"
        >
          <Icon name="download" className="size-4" />
          {section.downloadLabel}
        </Link>
      </div>

      <ol className="mt-8 divide-y divide-light-grey border-t border-light-grey">
        {section.days.map((day, i) => (
          <DayItem key={day.dayNumber} day={day} defaultOpen={i === 0} />
        ))}
      </ol>
    </section>
  );
}

function DayItem({ day, defaultOpen }: { day: TourDay; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <li className="py-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
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
          className={`size-5 shrink-0 text-midnight transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.25, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <div
              className={`mt-5 grid grid-cols-1 gap-6 ${
                day.image ? "md:grid-cols-[1fr_348px]" : ""
              }`}
            >
              <p className="font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                {day.description}
              </p>
              {day.image && (
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-light-grey md:row-span-2">
                  <Image
                    src={day.image}
                    alt={day.imageAlt ?? day.title}
                    fill
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
                        <p className="font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
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
    </li>
  );
}
