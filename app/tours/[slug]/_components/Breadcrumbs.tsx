import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { TourCrumb } from "@/types/tour";

export default function Breadcrumbs({ items }: { items: TourCrumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto w-full max-w-7xl px-4 pt-6 md:px-8"
    >
      <ol className="flex flex-wrap items-center gap-2 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-crimson-red transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-midnight" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="size-3.5 text-grey" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
