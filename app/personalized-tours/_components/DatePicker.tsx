"use client";

import { useEffect, useRef, useState } from "react";

type DatePickerProps = {
  /** ISO "YYYY-MM-DD", or "" when nothing is selected. */
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Local-date construction throughout — `new Date(isoString)` parses as UTC
 * and can land on the wrong day depending on the visitor's timezone. */
function parseIso(iso: string): Date | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatLabel(iso: string): string {
  const date = parseIso(iso);
  if (!date) return "";
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export default function DatePicker({ value, onChange, placeholder = "DD MMMM YYYY" }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => parseIso(value) ?? startOfToday());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const today = startOfToday();
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday-first grid
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<Date | null> = [
    ...Array<null>(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full rounded-sm border-[1.5px] border-grey/60 px-4 py-3 text-left font-body text-b2-mobile text-midnight outline-none focus:border-midnight md:text-b2-desktop"
      >
        {value ? formatLabel(value) : <span className="text-grey">{placeholder}</span>}
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-72 rounded-sm border border-grey/60 bg-white p-4 shadow-medium">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="rounded-sm px-2 py-1 font-body text-b2-mobile text-midnight hover:bg-light-grey"
              aria-label="Previous month"
            >
              ‹
            </button>
            <span className="font-body font-bold text-b2-mobile text-midnight">
              {MONTH_NAMES[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="rounded-sm px-2 py-1 font-body text-b2-mobile text-midnight hover:bg-light-grey"
              aria-label="Next month"
            >
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((d) => (
              <span key={d} className="font-body text-b4-desktop text-grey">
                {d}
              </span>
            ))}
            {cells.map((date, i) => {
              if (!date) return <span key={`empty-${i}`} />;
              const iso = toIso(date);
              const isPast = date < today;
              const isSelected = value === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={isPast}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`rounded-sm py-1.5 font-body text-b4-desktop transition-colors ${
                    isSelected
                      ? "bg-crimson-red text-white"
                      : isPast
                        ? "cursor-not-allowed text-grey/50"
                        : "text-midnight hover:bg-light-grey"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
