"use client";

import { Fragment, useState } from "react";
import type { KeywordChip } from "@/app/components/reviews/review-keywords";

/**
 * The interactive body of a tour's reviews section.
 *
 * Shows interest-keyword chips mined from the tour's own reviews. Clicking a chip
 * filters the grid IN PLACE (no navigation to /reviews) to the reviews that
 * mention that theme, so a potential customer can jump straight to what they care
 * about without leaving the tour page. A "Show more" control expands the list
 * within the section rather than linking away.
 *
 * Cards are server-rendered `ReviewCard` nodes passed down as `items[].node`
 * (each tagged with the theme keys it matches), so review rendering stays on the
 * server and this component only handles selection + visibility.
 */
export default function TourReviewsSection({
  chips,
  items,
  totalCount,
  initialVisible = 6,
}: {
  chips: KeywordChip[];
  items: { id: string; themeKeys: string[]; node: React.ReactNode }[];
  totalCount: number;
  initialVisible?: number;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const filtered = active
    ? items.filter((it) => it.themeKeys.includes(active))
    : items;
  const visible = expanded ? filtered : filtered.slice(0, initialVisible);
  const hiddenCount = filtered.length - visible.length;

  const select = (key: string | null) => {
    setActive(key);
    setExpanded(false); // collapse back to the standard height when refiltering
  };

  return (
    <div className="mt-6">
      {chips.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-body text-b4-desktop text-grey">
            What travelers mention — tap to filter
          </p>
          <div className="flex flex-wrap gap-2">
            <Chip active={active === null} onClick={() => select(null)}>
              All {totalCount}
            </Chip>
            {chips.map((c) => (
              <Chip
                key={c.key}
                active={active === c.key}
                onClick={() => select(active === c.key ? null : c.key)}
              >
                {c.label} <span className="opacity-70">{c.count}</span>
              </Chip>
            ))}
          </div>
        </div>
      )}

      {/* Each `node` is a server-rendered ReviewCard whose grid variant already
          renders its own <li>, so we only supply the key via a Fragment. */}
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((it) => (
          <Fragment key={it.id}>{it.node}</Fragment>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="rounded-full border border-light-grey bg-white px-6 py-3 font-body text-b3-desktop font-medium text-midnight shadow-small transition-all duration-200 hover:bg-light-grey hover:shadow-medium active:scale-95"
          >
            Show {hiddenCount} more review{hiddenCount === 1 ? "" : "s"}
          </button>
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 font-body text-b4-desktop transition-all duration-200 active:scale-95 ${
        active
          ? "bg-crimson-red text-white"
          : "bg-light-grey text-midnight hover:bg-light-grey/70"
      }`}
    >
      {children}
    </button>
  );
}
