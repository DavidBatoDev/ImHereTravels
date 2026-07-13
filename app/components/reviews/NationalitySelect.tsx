"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Search } from "lucide-react";
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

  const flagStyle = {
    width: "1.25rem",
    height: "0.9rem",
    borderRadius: "2px",
    objectFit: "cover" as const,
    flexShrink: 0,
  };

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
        className={`flex w-full items-center justify-between gap-2 rounded-md border bg-white px-3.5 py-2.5 font-body text-b4-desktop text-midnight outline-none transition-colors focus:border-crimson-red focus:ring-4 focus:ring-crimson-red/10 ${
          open ? "border-crimson-red ring-4 ring-crimson-red/10" : "border-light-grey"
        }`}
      >
        {selected ? (
          <span className="inline-flex items-center gap-2.5 truncate">
            <ReactCountryFlag
              countryCode={selected.countryCode}
              svg
              aria-label={selected.countryName}
              style={flagStyle}
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
            className="absolute left-0 top-full z-30 mt-1.5 w-full overflow-hidden rounded-md border border-light-grey bg-white shadow-medium"
          >
            <div className="flex items-center gap-2 border-b border-light-grey px-3 py-2">
              <Search className="size-4 shrink-0 text-grey" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country…"
                aria-label="Search country"
                className="w-full bg-transparent font-body text-b4-desktop text-midnight outline-none placeholder:text-grey"
              />
            </div>
            <ul className="no-scrollbar max-h-60 overflow-y-auto p-1.5">
              {filtered.length === 0 && (
                <li className="px-2.5 py-2 font-body text-b4-desktop text-grey">No matches.</li>
              )}
              {filtered.map((option) => {
                const isSelected = option.countryName === value;
                return (
                  <li key={option.countryCode + option.countryName}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onChange(option.countryName);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-2 rounded-sm px-2.5 py-2 text-left font-body text-b4-desktop transition-colors hover:bg-light-grey ${
                        isSelected ? "bg-light-grey/70 font-medium text-midnight" : "text-dark-gray"
                      }`}
                    >
                      <span className="inline-flex min-w-0 items-center gap-2.5">
                        <ReactCountryFlag
                          countryCode={option.countryCode}
                          svg
                          aria-label={option.countryName}
                          style={flagStyle}
                        />
                        <span className="truncate">{option.countryName}</span>
                      </span>
                      {isSelected && <Check className="size-4 shrink-0 text-crimson-red" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
