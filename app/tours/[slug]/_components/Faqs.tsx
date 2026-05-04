import FaqAccordion from "@/app/faqs/_components/FaqAccordion";
import type { Tour } from "@/types/tour";

export default function Faqs({
  section,
}: {
  section: NonNullable<Tour["faqs"]>;
}) {
  // Map TourFaq { question, answer } to the shared accordion's { q, a }.
  const items = section.items.map((f) => ({ q: f.question, a: f.answer }));

  return (
    <section className="mt-10 w-full md:mt-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>
      <div className="mt-4">
        <FaqAccordion items={items} scrollActive />
      </div>
    </section>
  );
}
