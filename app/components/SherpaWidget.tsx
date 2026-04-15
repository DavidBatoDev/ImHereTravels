"use client";

import { useState, useRef, useEffect } from "react";
import { travelReqLegend, passportCountries } from "@/data/travelRequirements";

/* ---------- Icons ---------- */

function PassportIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="1" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4.5 13c0-1.933 1.567-3.5 3.5-3.5s3.5 1.567 3.5 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5z" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open?: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
    >
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5z" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8" cy="6" r="1.5" fill="currentColor" />
    </svg>
  );
}

/* ---------- Custom Select ---------- */

function CustomSelect({
  icon,
  value,
  onChange,
  options,
  placeholder,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative min-w-0 flex-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-sm border border-grey/40 bg-white px-3 py-2.5 text-left transition-colors hover:border-grey"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="shrink-0 text-midnight/50">{icon}</span>
        <span className="flex-1 truncate font-body text-b4-mobile text-midnight md:text-b4-desktop">
          {selected ? selected.label : <span className="text-midnight/40">{placeholder}</span>}
        </span>
        <span className="shrink-0 text-midnight/40">
          <ChevronDownIcon open={open} />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-sm border border-grey/20 bg-white shadow-medium"
        >
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={value === o.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left font-body text-b4-mobile transition-colors hover:bg-light-grey hover:text-crimson-red md:text-b4-desktop ${
                  value === o.value
                    ? "bg-light-grey font-medium text-crimson-red"
                    : "text-midnight"
                }`}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- World Map ---------- */

function WorldMap() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-sm border border-grey/20 bg-[#a8d5e8]"
      style={{ aspectRatio: "16/7" }}
    >
      <svg
        viewBox="0 0 1000 440"
        className="absolute inset-0 size-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Greenland ── */}
        <path
          d="M310,20 L340,18 L360,28 L355,45 L340,52 L320,50 L308,38 Z"
          fill="#22a06b" opacity="0.8"
        />

        {/* ── North America ── */}
        <path
          d="M42,75 L65,60 L95,48 L130,42 L165,44 L200,50 L230,58
             L265,68 L295,80 L318,92 L330,108 L322,128 L308,142
             L295,155 L283,168 L280,182 L268,195 L260,208
             L265,222 L258,236 L245,242 L228,238 L215,246
             L208,260 L196,266 L185,258 L175,252 L168,244
             L155,248 L143,238 L135,224 L125,210 L115,196
             L106,180 L98,165 L88,150 L76,133 L65,116
             L56,98 L48,82 Z"
          fill="#22a06b" opacity="0.85"
        />
        {/* Baja California + Mexico */}
        <path
          d="M150,200 L168,205 L185,218 L190,232 L182,242
             L168,248 L155,250 L148,238 L148,222 Z"
          fill="#22a06b" opacity="0.85"
        />

        {/* ── Central America ── */}
        <path
          d="M220,258 L240,255 L258,262 L260,274 L248,282
             L232,278 L218,272 Z"
          fill="#b3d44f" opacity="0.85"
        />

        {/* ── South America ── */}
        <path
          d="M258,275 L278,268 L302,264 L325,262 L348,268
             L370,278 L388,292 L402,308 L410,326 L408,345
             L395,362 L378,375 L360,380 L342,375 L328,362
             L315,345 L305,325 L298,305 L294,288 L288,272 Z"
          fill="#22a06b" opacity="0.85"
        />
        {/* Argentina/Patagonia tip */}
        <path
          d="M328,362 L342,375 L340,395 L330,408 L318,402
             L310,385 L315,368 Z"
          fill="#22a06b" opacity="0.85"
        />

        {/* ── Iceland ── */}
        <path
          d="M452,62 L468,58 L478,66 L472,76 L455,76 Z"
          fill="#22a06b" opacity="0.8"
        />

        {/* ── UK & Ireland ── */}
        <path
          d="M482,90 L492,86 L498,92 L496,104 L488,110 L480,106 Z"
          fill="#22a06b" opacity="0.85"
        />
        <path
          d="M474,98 L480,94 L482,102 L476,106 Z"
          fill="#22a06b" opacity="0.85"
        />

        {/* ── Europe (mainland) ── */}
        <path
          d="M488,108 L496,104 L505,100 L516,96 L528,94
             L540,92 L555,90 L568,88 L580,88 L590,92
             L595,100 L600,112 L596,124 L588,134
             L578,140 L568,148 L555,152 L542,150
             L530,144 L520,136 L512,126 L505,118
             L496,116 L488,120 L482,126 L478,132
             L476,142 L474,150 L472,142 L470,128
             L472,116 L478,108 Z"
          fill="#b3d44f" opacity="0.85"
        />
        {/* Iberian Peninsula */}
        <path
          d="M472,128 L478,132 L490,135 L496,142 L492,152
             L480,156 L468,150 L464,140 L466,130 Z"
          fill="#b3d44f" opacity="0.85"
        />
        {/* Scandinavia */}
        <path
          d="M516,96 L522,80 L530,68 L540,60 L548,55
             L555,60 L558,72 L554,84 L548,90 L540,92 Z"
          fill="#b3d44f" opacity="0.85"
        />
        <path
          d="M555,60 L565,52 L572,54 L574,64 L568,72
             L560,74 L555,68 Z"
          fill="#b3d44f" opacity="0.85"
        />
        {/* Greece / Balkans peninsula */}
        <path
          d="M555,148 L562,152 L565,162 L558,168 L550,164
             L548,154 Z"
          fill="#b3d44f" opacity="0.85"
        />

        {/* ── Africa ── */}
        <path
          d="M478,152 L492,152 L510,150 L530,148 L550,148
             L568,148 L582,152 L592,162 L598,178 L600,196
             L598,216 L592,236 L582,254 L570,270 L558,285
             L545,298 L532,308 L520,312 L508,308 L496,298
             L484,282 L474,262 L466,240 L462,218 L460,196
             L462,176 L466,162 Z"
          fill="#f5a623" opacity="0.85"
        />
        {/* Horn of Africa */}
        <path
          d="M582,252 L596,248 L612,252 L618,264 L608,272
             L592,270 L582,260 Z"
          fill="#f5a623" opacity="0.85"
        />
        {/* Madagascar */}
        <path
          d="M582,290 L590,285 L596,296 L594,312 L585,316
             L580,305 Z"
          fill="#22a06b" opacity="0.8"
        />

        {/* ── Arabian Peninsula ── */}
        <path
          d="M596,152 L618,150 L638,158 L648,172 L645,192
             L635,205 L620,210 L608,205 L600,194 L598,178 Z"
          fill="#4a90d9" opacity="0.85"
        />

        {/* ── Russia / Central Asia ── */}
        <path
          d="M570,88 L600,80 L640,68 L685,58 L730,52
             L770,50 L810,52 L840,58 L855,68 L850,80
             L835,88 L810,92 L780,94 L750,95 L720,96
             L695,100 L670,105 L645,108 L620,108
             L600,112 L590,108 L580,100 Z"
          fill="#b3d44f" opacity="0.85"
        />

        {/* ── Middle East / Iran ── */}
        <path
          d="M600,112 L620,108 L645,108 L665,115 L675,128
             L672,145 L658,154 L638,158 L618,150 L605,138 Z"
          fill="#4a90d9" opacity="0.85"
        />

        {/* ── South Asia (India) ── */}
        <path
          d="M665,115 L695,108 L720,112 L735,125 L738,140
             L730,155 L720,168 L710,180 L700,192 L692,205
             L685,218 L680,230 L672,220 L665,205 L660,188
             L658,172 L658,155 L662,138 Z"
          fill="#f5a623" opacity="0.85"
        />
        {/* Sri Lanka */}
        <path
          d="M695,238 L702,235 L706,242 L700,248 L694,244 Z"
          fill="#22a06b" opacity="0.8"
        />

        {/* ── Southeast Asia ── */}
        <path
          d="M735,125 L758,118 L780,120 L795,130 L800,145
             L792,160 L778,168 L762,165 L748,155 L738,140 Z"
          fill="#22a06b" opacity="0.85"
        />
        {/* Indochina peninsula */}
        <path
          d="M762,165 L778,168 L785,180 L782,196 L770,208
             L755,215 L744,205 L740,190 L745,175 Z"
          fill="#22a06b" opacity="0.85"
        />
        {/* Malaysia/Indonesia main */}
        <path
          d="M760,215 L780,210 L800,215 L815,225 L815,238
             L800,245 L780,242 L762,235 Z"
          fill="#22a06b" opacity="0.85"
        />
        {/* Philippines */}
        <path
          d="M820,190 L830,185 L838,192 L835,205 L824,208
             L817,200 Z"
          fill="#22a06b" opacity="0.8"
        />

        {/* ── China / East Asia ── */}
        <path
          d="M730,95 L770,94 L800,94 L825,98 L840,108
             L845,122 L838,138 L822,148 L802,155 L780,158
             L760,155 L740,148 L730,138 L728,122 Z"
          fill="#b3d44f" opacity="0.85"
        />
        {/* Korean Peninsula */}
        <path
          d="M822,120 L835,115 L842,122 L838,134 L826,136
             L820,128 Z"
          fill="#b3d44f" opacity="0.85"
        />

        {/* ── Japan ── */}
        <path
          d="M848,108 L860,100 L868,106 L865,118 L854,122
             L848,115 Z"
          fill="#22a06b" opacity="0.85"
        />
        <path
          d="M858,122 L868,118 L874,126 L870,136 L860,135 Z"
          fill="#22a06b" opacity="0.85"
        />

        {/* ── Australia ── */}
        <path
          d="M752,298 L790,290 L830,288 L865,292 L890,302
             L905,320 L908,342 L900,362 L882,378 L858,388
             L830,390 L802,385 L778,372 L760,355 L748,335
             L744,315 Z"
          fill="#22a06b" opacity="0.85"
        />
        {/* Tasmania */}
        <path
          d="M858,395 L868,390 L874,398 L868,408 L856,406 Z"
          fill="#22a06b" opacity="0.8"
        />
        {/* New Zealand North */}
        <path
          d="M925,360 L936,352 L942,360 L938,375 L926,376 Z"
          fill="#22a06b" opacity="0.85"
        />
        {/* New Zealand South */}
        <path
          d="M928,380 L940,376 L945,386 L940,400 L928,398 Z"
          fill="#22a06b" opacity="0.85"
        />

        {/* ── Antarctica (hint) ── */}
        <path
          d="M100,432 L300,428 L500,425 L700,428 L900,432
             L920,440 L80,440 Z"
          fill="#d0e8f0" opacity="0.6"
        />
      </svg>

      {/* Sherpa attribution */}
      <div className="absolute bottom-2 right-3 flex items-center gap-1">
        <span className="font-body text-[10px] text-midnight/50">powered by</span>
        <span className="font-sans font-bold text-[11px] text-midnight/70">sherpa°</span>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-8 right-3 flex flex-col overflow-hidden rounded border border-grey/30 bg-white shadow-xsmall">
        <button
          className="flex size-6 items-center justify-center font-body text-sm text-midnight/70 hover:bg-light-grey"
          aria-label="Zoom in"
        >
          +
        </button>
        <div className="h-px w-full bg-grey/20" />
        <button
          className="flex size-6 items-center justify-center font-body text-sm text-midnight/70 hover:bg-light-grey"
          aria-label="Zoom out"
        >
          −
        </button>
      </div>
    </div>
  );
}

/* ---------- Main widget ---------- */

export default function SherpaWidget() {
  const [passport, setPassport] = useState("US");
  const [location, setLocation] = useState("US");
  const [destination, setDestination] = useState("");
  const [vaccinated, setVaccinated] = useState(true);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-6 md:px-8 md:pb-16">
      <div className="overflow-hidden rounded-lg border border-grey/20 bg-white shadow-xsmall">

        {/* Filter bar */}
        <div className="flex flex-col gap-3 border-b border-grey/20 p-4 md:flex-row md:items-center md:gap-4 md:p-5">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:gap-3">
            <CustomSelect
              icon={<PassportIcon />}
              value={passport}
              onChange={setPassport}
              options={passportCountries}
              placeholder="Passport country"
            />
            <CustomSelect
              icon={<LocationIcon />}
              value={location}
              onChange={setLocation}
              options={passportCountries}
              placeholder="Current location"
            />
            <div className="relative flex min-w-0 flex-1 items-center gap-2 rounded-sm border border-grey/40 bg-white px-3 py-2.5 transition-colors focus-within:border-grey">
              <span className="shrink-0 text-midnight/50">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
                className="w-full bg-transparent font-body text-b4-mobile text-midnight outline-none placeholder:text-midnight/40 md:text-b4-desktop"
              />
            </div>
          </div>

          {/* Covid toggle */}
          <div className="flex shrink-0 flex-col gap-1">
            <span className="font-body text-[11px] text-midnight/60">Covid-19 Vaccinated?</span>
            <div className="flex items-center gap-2">
              <span className="font-body text-b4-mobile text-midnight/60">No</span>
              <button
                role="switch"
                aria-checked={vaccinated}
                onClick={() => setVaccinated(!vaccinated)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
                  vaccinated ? "bg-crimson-red" : "bg-grey/40"
                }`}
              >
                <span
                  className={`inline-block size-4 translate-x-0.5 rounded-full bg-white shadow transition-transform duration-200 ${
                    vaccinated ? "translate-x-4" : ""
                  }`}
                />
              </button>
              <span className="font-body text-b4-mobile text-midnight/60">Yes</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="p-4 md:p-5">
          <WorldMap />
        </div>

        {/* Legend */}
        <div className="border-t border-grey/20 px-4 pb-6 pt-4 md:px-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-sans font-bold text-b4-mobile text-midnight md:text-b4-desktop">
              Map legend
            </span>
            <span className="flex items-center gap-1 font-body text-b4-mobile text-midnight md:text-b4-desktop">
              <PinIcon />
              Current location
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {travelReqLegend.map((item) => (
              <div key={item.id} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="flex size-6 shrink-0 items-center justify-center rounded font-body text-[11px] font-bold text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.count ?? ""}
                  </span>
                  <span className="font-body text-b4-mobile font-bold text-midnight underline md:text-b4-desktop">
                    {item.label}
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0 text-midnight/50">
                    <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-body text-[12px] leading-relaxed text-dark-gray">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
