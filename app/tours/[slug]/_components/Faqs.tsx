"use client";

import { useEffect, useState } from "react";
import FaqAccordion from "@/app/faqs/_components/FaqAccordion";
import type { Tour } from "@/types/tour";

export default function Faqs({
  section,
}: {
  section: NonNullable<Tour["faqs"]>;
}) {
  const [allOpen, setAllOpen] = useState<boolean | null>(null);
  const items = section.items.map((f) => ({ q: f.question, a: f.answer }));

  // After collapsing all, hand control back to scroll-active on first scroll.
  useEffect(() => {
    if (allOpen !== false) return;
    function onScroll() {
      if (document.documentElement.dataset.reviewsScrollLock === "true") return;
      setAllOpen(null);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [allOpen]);

  return (
    <section className="mt-10 w-full md:mt-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
          FAQs
        </h2>
        <button
          type="button"
          onClick={() => setAllOpen((prev) => (prev === true ? false : true))}
          className="font-body text-b4-desktop text-crimson-red underline-offset-2 hover:underline"
        >
          {allOpen === true ? "Collapse All" : "Expand All"}
        </button>
      </div>
      <div className="mt-4">
        <FaqAccordion items={items} scrollActive={allOpen !== true} expandAll={allOpen} />
      </div>
    </section>
  );
}
