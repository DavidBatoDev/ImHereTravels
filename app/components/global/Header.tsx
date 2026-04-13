"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const navItems = [
  {
    label: "Tours",
    href: "/tours",
    dropdown: [
      { label: "All Tours", href: "/tours" },
      { label: "Argentina's Wonders", href: "/tours/argentinas-wonders" },
      { label: "Bhutan Quest", href: "/tours/bhutan-quest" },
      { label: "Brazil's Treasures", href: "/tours/brazils-treasures" },
      { label: "China Discovery", href: "/tours/china-discovery" },
      { label: "India Discovery", href: "/tours/india-discovery-tour" },
      { label: "India Holi Festival", href: "/tours/india-holi-festival-tour" },
      { label: "Japan Adventure", href: "/tours/japan-adventure" },
      { label: "Maldives Bucketlist", href: "/tours/maldives-bucketlist" },
      { label: "Nepal Horizons", href: "/tours/nepal-horizons" },
      { label: "New Zealand Expedition", href: "/tours/new-zealand-expedition" },
      { label: "Philippines Sunrise", href: "/tours/philippine-sunrise" },
      { label: "Philippines Sunset", href: "/tours/philippine-sunset" },
      { label: "Sri Lanka Wander", href: "/tours/sri-langka-wander-tour" },
      { label: "Tanzania Exploration", href: "/tours/tanzania-exploration" },
      { label: "Vietnam Expedition", href: "/tours/vietnam-expedition" },
    ],
  },
  {
    label: "Travel Information",
    href: "/travel-information",
    dropdown: [
      { label: "Travel Information", href: "/travel-information" },
      { label: "Travel/Visa Requirements", href: "/travel-requirements" },
      { label: "Pre-departure Info", href: "/pre-departure" },
      { label: "Travel Safety", href: "/travel-safety" },
    ],
  },
  { label: "About Us", href: "/about-us" },
];

function ChevronDown() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 4L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    if (y > prev && y > 80) setHidden(true);
    else if (y < prev) setHidden(false);
  });

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur ${
        scrolled ? "shadow-small" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 md:px-8 md:py-6">
        <Link href="/" aria-label="I'm Here Travels home">
          <Image
            src="/Logos/Horizontal/Digital/SVG/Red/Digital_Horizontal_Red.svg"
            alt="I'm Here Travels"
            width={120}
            height={36}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 font-body text-b4-desktop text-midnight transition-colors hover:text-crimson-red group-hover:text-crimson-red"
                >
                  {item.label}
                  <ChevronDown />
                </Link>

                {/* Dropdown */}
                <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <ul className="min-w-48 overflow-hidden rounded-md bg-white py-1 shadow-medium">
                    {item.dropdown.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2.5 font-body text-b4-desktop text-midnight transition-colors hover:bg-light-grey hover:text-crimson-red"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="font-body text-b4-desktop text-midnight transition-colors hover:text-crimson-red"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <Link
          href="#inquire"
          className="inline-flex items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-b4-mobile text-white transition-colors hover:bg-light-red md:text-b4-desktop"
        >
          Inquire Now
        </Link>
      </div>
    </motion.header>
  );
}
