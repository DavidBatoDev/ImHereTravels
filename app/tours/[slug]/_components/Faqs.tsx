"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Tour, TourFaq } from "@/types/tour";

export default function Faqs({ section }: { section: Tour["faqs"] }) {
  return (
    <section className="mt-10 w-full md:mt-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>
      <ul className="mt-8 divide-y divide-light-grey border-t border-light-grey">
        {section.items.map((faq, i) => (
          <FaqRow key={i} faq={faq} />
        ))}
      </ul>
    </section>
  );
}

function FaqRow({ faq }: { faq: TourFaq }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="py-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-sans text-b2-mobile md:text-b2-desktop font-bold text-midnight">
          {faq.question}
        </span>
        <span
          aria-hidden
          className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-midnight text-midnight transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="size-4" strokeWidth={2} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <p className="mt-4 max-w-3xl font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
