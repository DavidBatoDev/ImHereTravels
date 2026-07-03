import Link from "next/link";
import type { CSSProperties } from "react";
import ImageWithSkeleton from "@/app/components/global/ImageWithSkeleton";
import type { Tour } from "@/types/tour";
import Icon from "./Icon";

function getBalancedColumns(count: number) {
  const safeCount = Math.max(1, count);
  const candidates = [5, 4, 3, 2, 1].filter((cols) => cols <= safeCount);
  let bestCols = candidates[0];
  let bestRows = Infinity;
  let bestEmpty = Infinity;

  candidates.forEach((cols) => {
    const rows = Math.ceil(safeCount / cols);
    const emptySlots = rows * cols - safeCount;
    if (
      rows < bestRows ||
      (rows === bestRows &&
        (emptySlots < bestEmpty || (emptySlots === bestEmpty && cols > bestCols)))
    ) {
      bestCols = cols;
      bestRows = rows;
      bestEmpty = emptySlots;
    }
  });

  return bestCols;
}

export default function CommunityGrid({
  section,
}: {
  section: NonNullable<Tour["community"]>;
}) {
  const balancedColumns = getBalancedColumns(section.images.length);
  const gridStyle = { "--gallery-columns": balancedColumns } as CSSProperties;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <h2 className="text-center font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {section.heading}
      </h2>
      <ul
        className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:[grid-template-columns:repeat(var(--gallery-columns),minmax(0,1fr))]"
        style={gridStyle}
      >
        {section.images.map((img, i) => (
          <li
            key={i}
            className="relative aspect-square overflow-hidden rounded-md bg-light-grey"
          >
            <Link
              href={img.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={img.alt}
              className="group relative block h-full w-full"
            >
              <ImageWithSkeleton
                src={img.src}
                alt={img.alt}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-2 top-2 flex size-7 items-center justify-center rounded-full bg-white/90 text-crimson-red">
                <Icon name="instagram" className="size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
