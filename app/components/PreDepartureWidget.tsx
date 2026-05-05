"use client";

import { useState, useRef, useEffect } from "react";

/* ---------- Icons ---------- */

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2.5 14c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function SyringeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M11 2l3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M9.5 3.5l3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M10 5L6 9l-2 4 4-2 4-4-2-2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M3 13l1.5-1.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M14 8.5L9 5V2.5a1 1 0 0 0-2 0V5L2 8.5v1.5l5-1.5V11l-1.5 1V13L8 12l2.5 1v-1l-1.5-1v-2.5l5 1.5V8.5z" fill="currentColor" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-dark-gray/60">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M2 7h12" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Compact select pill ---------- */

function PillSelect({
  icon,
  value,
  onChange,
  options,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded border border-grey/30 bg-white px-3 py-2 text-midnight transition-colors hover:border-grey/60"
      >
        <span className="shrink-0">{icon}</span>
        <span className="font-body text-b4-mobile font-medium text-midnight md:text-b4-desktop">
          {selected?.label ?? value}
        </span>
        <span className={`shrink-0 text-midnight/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <ChevronDown />
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 min-w-full overflow-hidden rounded-md border border-grey/20 bg-white shadow-medium">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => { onChange(o.value); setOpen(false); }}
              className={[
                "flex w-full items-center px-4 py-2.5 text-left font-body text-b4-mobile transition-colors md:text-b4-desktop",
                o.value === value
                  ? "bg-crimson-red/8 font-semibold text-crimson-red"
                  : "text-midnight hover:bg-light-grey",
              ].join(" ")}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Calendar picker ---------- */

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function formatDisplay(v: string) {
  if (!v) return "";
  const d = new Date(v + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function CalendarPicker({
  value,
  onChange,
  label,
  min,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  min?: string;
}) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"day" | "month" | "year">("day");
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [yearPage, setYearPage] = useState(Math.floor(today.getFullYear() / 12) * 12);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setMode("day");
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  function openPicker() {
    if (!open) {
      if (value) {
        const d = new Date(value + "T00:00:00");
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
        setYearPage(Math.floor(d.getFullYear() / 12) * 12);
      }
      setMode("day");
    }
    setOpen((o) => !o);
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  }

  function selectDay(d: number) {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    onChange(`${viewYear}-${mm}-${dd}`);
    setOpen(false);
    setMode("day");
  }

  function selectMonth(m: number) {
    setViewMonth(m);
    setMode("day");
  }

  function selectYear(y: number) {
    setViewYear(y);
    setYearPage(Math.floor(y / 12) * 12);
    setMode("month");
  }

  function isDisabled(d: number) {
    if (!min) return false;
    const cell = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return cell < min;
  }

  function isSelected(d: number) {
    if (!value) return false;
    const sel = new Date(value + "T00:00:00");
    return sel.getFullYear() === viewYear && sel.getMonth() === viewMonth && sel.getDate() === d;
  }

  function isToday(d: number) {
    return today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === d;
  }

  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstWeekday).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const years = Array.from({ length: 12 }, (_, i) => yearPage + i);

  return (
    <div className="relative flex-1" ref={ref}>
      <button
        type="button"
        onClick={openPicker}
        aria-label={label}
        className="flex w-full items-center gap-2 text-left"
      >
        <CalendarIcon />
        <span
          className={`font-body text-b4-mobile md:text-b4-desktop ${
            value ? "font-medium text-midnight" : "text-dark-gray/50"
          }`}
        >
          {value ? formatDisplay(value) : "Select date"}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-md border border-grey/20 bg-white shadow-medium">

          {/* ── Day view ── */}
          {mode === "day" && (
            <>
              <div className="flex items-center justify-between border-b border-grey/10 px-3 py-2.5">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="flex size-7 items-center justify-center rounded text-midnight/60 transition-colors hover:bg-light-grey hover:text-midnight"
                  aria-label="Previous month"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  onClick={() => setMode("month")}
                  className="flex items-center gap-1 rounded px-2 py-0.5 font-body text-b4-mobile font-semibold text-midnight transition-colors hover:bg-light-grey md:text-b4-desktop"
                >
                  {MONTH_NAMES[viewMonth]}
                  <span className="text-crimson-red">{viewYear}</span>
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="flex size-7 items-center justify-center rounded text-midnight/60 transition-colors hover:bg-light-grey hover:text-midnight"
                  aria-label="Next month"
                >
                  <ChevronRightIcon />
                </button>
              </div>
              <div className="grid grid-cols-7 px-3 pt-2.5">
                {DAY_NAMES.map((n) => (
                  <div key={n} className="pb-1 text-center font-body text-[11px] font-semibold uppercase tracking-wide text-dark-gray/40">
                    {n}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-0.5 px-3 pb-3">
                {cells.map((d, i) => {
                  if (d === null) return <div key={`e${i}`} />;
                  const sel = isSelected(d);
                  const dis = isDisabled(d);
                  const tod = isToday(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      disabled={dis}
                      onClick={() => selectDay(d)}
                      className={[
                        "flex size-8 items-center justify-center rounded-full font-body text-[13px] transition-colors",
                        sel ? "bg-crimson-red font-semibold text-white"
                          : dis ? "cursor-default text-dark-gray/25"
                          : tod ? "font-semibold text-crimson-red hover:bg-light-grey"
                          : "text-midnight hover:bg-light-grey",
                      ].join(" ")}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ── Month view ── */}
          {mode === "month" && (
            <>
              <div className="flex items-center justify-between border-b border-grey/10 px-3 py-2.5">
                <button
                  type="button"
                  onClick={() => setViewYear((y) => y - 1)}
                  className="flex size-7 items-center justify-center rounded text-midnight/60 transition-colors hover:bg-light-grey hover:text-midnight"
                  aria-label="Previous year"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  onClick={() => { setYearPage(Math.floor(viewYear / 12) * 12); setMode("year"); }}
                  className="rounded px-2 py-0.5 font-body text-b4-mobile font-semibold text-crimson-red transition-colors hover:bg-light-grey md:text-b4-desktop"
                >
                  {viewYear}
                </button>
                <button
                  type="button"
                  onClick={() => setViewYear((y) => y + 1)}
                  className="flex size-7 items-center justify-center rounded text-midnight/60 transition-colors hover:bg-light-grey hover:text-midnight"
                  aria-label="Next year"
                >
                  <ChevronRightIcon />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 p-3">
                {MONTH_SHORT.map((m, i) => {
                  const isCurrent = value
                    ? new Date(value + "T00:00:00").getFullYear() === viewYear && new Date(value + "T00:00:00").getMonth() === i
                    : false;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => selectMonth(i)}
                      className={[
                        "rounded-md py-2 font-body text-[13px] font-medium transition-colors",
                        isCurrent
                          ? "bg-crimson-red text-white"
                          : "text-midnight hover:bg-light-grey",
                      ].join(" ")}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ── Year view ── */}
          {mode === "year" && (
            <>
              <div className="flex items-center justify-between border-b border-grey/10 px-3 py-2.5">
                <button
                  type="button"
                  onClick={() => setYearPage((p) => p - 12)}
                  className="flex size-7 items-center justify-center rounded text-midnight/60 transition-colors hover:bg-light-grey hover:text-midnight"
                  aria-label="Previous years"
                >
                  <ChevronLeftIcon />
                </button>
                <span className="font-body text-b4-mobile font-semibold text-midnight md:text-b4-desktop">
                  {yearPage} – {yearPage + 11}
                </span>
                <button
                  type="button"
                  onClick={() => setYearPage((p) => p + 12)}
                  className="flex size-7 items-center justify-center rounded text-midnight/60 transition-colors hover:bg-light-grey hover:text-midnight"
                  aria-label="Next years"
                >
                  <ChevronRightIcon />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 p-3">
                {years.map((y) => {
                  const isCurrentYear = value
                    ? new Date(value + "T00:00:00").getFullYear() === y
                    : false;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => selectYear(y)}
                      className={[
                        "rounded-md py-2 font-body text-[13px] font-medium transition-colors",
                        isCurrentYear
                          ? "bg-crimson-red text-white"
                          : y === today.getFullYear()
                          ? "font-semibold text-crimson-red hover:bg-light-grey"
                          : "text-midnight hover:bg-light-grey",
                      ].join(" ")}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
}

/* ---------- Constants ---------- */

const passportOptions = [
  { value: "AUS", label: "AUS" },
  { value: "CAN", label: "CAN" },
  { value: "GBR", label: "GBR" },
  { value: "NZL", label: "NZL" },
  { value: "PHL", label: "PHL" },
  { value: "SGP", label: "SGP" },
  { value: "USA", label: "USA" },
];

const covidOptions = [
  { value: "vaccinated", label: "COVID-19 Vaccinated" },
  { value: "not-vaccinated", label: "Not Vaccinated" },
];

const tripTypeOptions = [
  { value: "round", label: "Round Trip" },
  { value: "one-way", label: "One Way" },
];

/* ---------- Widget ---------- */

export default function PreDepartureWidget() {
  const [passport, setPassport] = useState("CAN");
  const [covid, setCovid] = useState("vaccinated");
  const [tripType, setTripType] = useState("round");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [returnDate, setReturnDate] = useState("");

  return (
    <div className="rounded-md border border-grey/20 bg-white">
      {/* Inner container */}
      <div className="p-5 md:p-6">
        <p className="mb-4 font-body text-b2-mobile font-semibold text-midnight md:text-b2-desktop">
          Travel and visa requirements
        </p>

        {/* Row 1: passport + covid */}
        <div className="mb-3 flex flex-wrap gap-2">
          <PillSelect
            icon={<PersonIcon />}
            value={passport}
            onChange={setPassport}
            options={passportOptions}
            label="Passport country"
          />
          <PillSelect
            icon={<SyringeIcon />}
            value={covid}
            onChange={setCovid}
            options={covidOptions}
            label="COVID-19 vaccination status"
          />
        </div>

        {/* Row 2: trip type */}
        <div className="mb-5">
          <PillSelect
            icon={<PlaneIcon />}
            value={tripType}
            onChange={setTripType}
            options={tripTypeOptions}
            label="Trip type"
          />
        </div>

        {/* Where from */}
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="Where from?"
          className="mb-3 w-full rounded border border-grey/30 px-4 py-3 font-body text-b4-mobile text-midnight placeholder:text-dark-gray/50 outline-none transition-colors focus:border-midnight md:text-b4-desktop"
        />

        {/* Where to */}
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Where to?"
          className="mb-3 w-full rounded border border-grey/30 px-4 py-3 font-body text-b4-mobile text-midnight placeholder:text-dark-gray/50 outline-none transition-colors focus:border-midnight md:text-b4-desktop"
        />

        {/* Dates */}
        <div className="mb-4 flex gap-3">
          <div className="flex flex-1 items-center gap-3 rounded border border-grey/30 px-4 py-3">
            <span className="shrink-0 font-body text-b4-mobile text-dark-gray/70 md:text-b4-desktop">
              Depart
            </span>
            <CalendarPicker
              value={depart}
              onChange={(v) => {
                setDepart(v);
                if (returnDate && v > returnDate) setReturnDate("");
              }}
              label="Departure date"
            />
          </div>
          {tripType === "round" && (
            <div className="flex flex-1 items-center gap-3 rounded border border-grey/30 px-4 py-3">
              <span className="shrink-0 font-body text-b4-mobile text-dark-gray/70 md:text-b4-desktop">
                Return
              </span>
              <CalendarPicker
                value={returnDate}
                onChange={setReturnDate}
                label="Return date"
                min={depart || undefined}
              />
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          type="button"
          className="w-full rounded bg-midnight py-4 font-body text-b4-mobile font-semibold text-white transition-colors hover:bg-midnight/80 md:text-b4-desktop"
        >
          See requirements
        </button>
      </div>

      {/* Attribution */}
      <div className="flex justify-end border-t border-grey/10 px-5 py-2">
        <span className="font-body text-[11px] text-dark-gray/50">
          by{" "}
          <span className="font-sans font-bold text-dark-gray/70">sherpa°</span>
        </span>
      </div>
    </div>
  );
}
