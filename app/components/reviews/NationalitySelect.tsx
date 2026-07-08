"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { getAllNationalities } from "@/lib/nationalities";

/**
 * Searchable nationality picker with a flag per option. Same UX idea as the
 * reservation booking form's country select, reimplemented for `www`'s own
 * styling system (brand tokens, framer-motion already in use here) rather than
 * shared code — the two apps don't share a package.
 */
export default function NationalitySelect({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (countryName: string) => void;
  id?: string;
}) {
  const options = useMemo(() => getAllNationalities(), []);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.countryName.toLowerCase().includes(q));
  }, [options, query]);

  const selected = options.find((o) => o.countryName === value);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    function onOutside(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        id={id}
        type="button"
        onClick={() => {
          setQuery("");
          setOpen((o) => !o);
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-light-grey bg-white px-4 py-3 font-body text-b2-desktop text-midnight outline-none transition-colors focus:border-crimson-red"
      >
        {selected ? (
          <span className="inline-flex items-center gap-2 truncate">
            <ReactCountryFlag
              countryCode={selected.countryCode}
              svg
              aria-label={selected.countryName}
              style={{ width: "1.1rem", height: "0.75rem", flexShrink: 0 }}
            />
            <span className="truncate">{selected.countryName}</span>
          </span>
        ) : (
          <span className="text-grey">Select nationality</span>
        )}
        <ChevronDown
          className={`size-4 shrink-0 text-grey transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-md border border-light-grey bg-white shadow-medium"
          >
            <div className="border-b border-light-grey p-2">
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country…"
                className="w-full rounded-sm border border-light-grey px-3 py-2 font-body text-b4-desktop text-midnight outline-none focus:border-crimson-red"
              />
            </div>
            <ul className="max-h-56 overflow-y-auto no-scrollbar">
              {filtered.length === 0 && (
                <li className="px-4 py-3 font-body text-b4-desktop text-grey">No matches.</li>
              )}
              {filtered.map((option) => (
                <li key={option.countryCode + option.countryName}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={option.countryName === value}
                    onClick={() => {
                      onChange(option.countryName);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 px-4 py-2 text-left font-body text-b4-desktop transition-colors hover:bg-light-grey ${
                      option.countryName === value ? "bg-light-grey text-crimson-red" : "text-midnight"
                    }`}
                  >
                    <ReactCountryFlag
                      countryCode={option.countryCode}
                      svg
                      aria-label={option.countryName}
                      style={{ width: "1.1rem", height: "0.75rem", flexShrink: 0 }}
                    />
                    <span className="truncate">{option.countryName}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
