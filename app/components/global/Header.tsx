"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
      { label: "Japan Summer Adventure", href: "/tours/japan-adventure" },
      { label: "Japan Adventure (Winter)", href: "/tours/japan-adventure-winter" },
      { label: "Maldives Bucketlist", href: "/tours/maldives-bucketlist" },
      { label: "Nepal Horizons", href: "/tours/nepal-horizons" },
      {
        label: "New Zealand Expedition",
        href: "/tours/new-zealand-expedition",
      },
      { label: "Philippines Sunrise", href: "/tours/philippine-sunrise" },
      { label: "Philippines Sunset", href: "/tours/philippine-sunset" },
      { label: "Sri Lanka Wander", href: "/tours/sri-langka-wander-tour" },
      { label: "Tanzania Exploration", href: "/tours/tanzania-exploration" },
      {
        label: "Tanzania Exploration (Danielle & Erin)",
        href: "/tours/danielleerintanzania",
      },
      { label: "Vietnam Expedition", href: "/tours/vietnam-expedition" },
    ],
  },
  {
    label: "Destinations",
    href: "/all-destinations",
    dropdown: [
      { label: "All Destinations", href: "/all-destinations" },
      { label: "Philippines", href: "/all-destinations/philippines" },
      { label: "Maldives", href: "/all-destinations/maldives" },
      { label: "Japan", href: "/all-destinations/japan" },
      { label: "India", href: "/all-destinations/india" },
      { label: "Nepal", href: "/all-destinations/nepal" },
      { label: "Bhutan", href: "/all-destinations/bhutan" },
      { label: "Sri Lanka", href: "/all-destinations/sri-lanka" },
      { label: "Vietnam", href: "/all-destinations/vietnam" },
      { label: "China", href: "/all-destinations/china" },
      { label: "Tanzania", href: "/all-destinations/tanzania" },
      { label: "New Zealand", href: "/all-destinations/new-zealand" },
      { label: "Argentina", href: "/all-destinations/argentina" },
      { label: "Brazil", href: "/all-destinations/brazil" },
    ],
  },
  {
    label: "Resident Hosts",
    href: "/resident-hosts",
    noLink: true,
    dropdown: [
      { label: "Travel with Dev", href: "/resident-hosts/dev" },
      { label: "Travel with Jess", href: "/resident-hosts/jess" },
    ],
  },
  { label: "About Us", href: "/about-us" },
  {
    label: "Travel Info",
    href: "/travel-information",
    dropdown: [
      { label: "Pre departure info", href: "/pre-departure" },
      { label: "Travel Info", href: "/travel-information" },
      { label: "Travel Safety", href: "/travel-safety" },
    ],
  },
];

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <motion.path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        animate={open ? { d: "M6 6L18 18" } : { d: "M4 7H20" }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        animate={open ? { opacity: 0 } : { opacity: 1, d: "M4 12H20" }}
        initial={false}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        animate={open ? { d: "M6 18L18 6" } : { d: "M4 17H20" }}
        transition={{ duration: 0.2 }}
      />
    </svg>
  );
}

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const isParentActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");
  const isChildActive = (href: string) => pathname === href;

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    if (menuOpen) return;
    if (y > prev && y > 80) setHidden(true);
    else if (y < prev) setHidden(false);
  });

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur ${
        scrolled || menuOpen ? "shadow-small" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <Link
          href="/"
          aria-label="I'm Here Travels home"
          onClick={closeMenu}
          className="shrink-0"
        >
          <Image
            src="/logos/Wordmark/Digital/PNG/Red/Digital_Wordmark_Red.png"
            alt="I'm Here Travels"
            width={120}
            height={90}
            priority
            className="h-8 w-auto sm:h-9 lg:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.href} className="group relative">
                {item.noLink ? (
                  <span
                    className={`flex cursor-default items-center gap-1 font-body text-b4-desktop transition-colors group-hover:text-crimson-red ${isParentActive(item.href) ? "text-crimson-red underline underline-offset-4 decoration-2" : "text-midnight"}`}
                  >
                    {item.label}
                    <ChevronDown />
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 font-body text-b4-desktop transition-colors hover:text-crimson-red group-hover:text-crimson-red ${isParentActive(item.href) ? "text-crimson-red underline underline-offset-4 decoration-2" : "text-midnight"}`}
                  >
                    {item.label}
                    <ChevronDown />
                  </Link>
                )}

                <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <ul className="min-w-48 overflow-hidden rounded-md bg-white py-1 shadow-medium">
                    {item.dropdown.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className={`block px-4 py-2.5 font-body text-b4-desktop transition-colors hover:bg-light-grey hover:text-crimson-red ${isChildActive(child.href) ? "bg-crimson-red/10 text-crimson-red font-medium" : "text-midnight"}`}
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
                className={`font-body text-b4-desktop transition-colors hover:text-crimson-red ${isParentActive(item.href) ? "text-crimson-red underline underline-offset-4 decoration-2" : "text-midnight"}`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact-us"
            onClick={closeMenu}
            className="inline-flex items-center justify-center rounded-full bg-crimson-red px-4 py-2.5 font-body font-medium text-b4-mobile text-white transition-colors hover:bg-light-red sm:px-6 sm:py-3 lg:text-b4-desktop"
          >
            Inquire Now
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full text-midnight transition-colors hover:bg-light-grey lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-light-grey bg-white lg:hidden"
          >
            <nav className="mx-auto w-full max-w-7xl overflow-y-auto overscroll-contain px-4 pb-6 pt-2 sm:px-6 max-h-[calc(100dvh-72px)]">
              <ul className="flex flex-col divide-y divide-light-grey">
                {navItems.map((item) =>
                  item.dropdown ? (
                    <li key={item.href}>
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={`flex-1 py-4 font-body text-b2-mobile transition-colors hover:text-crimson-red ${isParentActive(item.href) ? "text-crimson-red underline underline-offset-4 decoration-2" : "text-midnight"}`}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-label={openDropdown === item.href ? `Collapse ${item.label}` : `Expand ${item.label}`}
                          aria-expanded={openDropdown === item.href}
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === item.href ? null : item.href,
                            )
                          }
                          className="flex size-10 items-center justify-center rounded-full text-midnight transition-colors hover:bg-light-grey"
                        >
                          <ChevronDown
                            className={`transition-transform duration-200 ${
                              openDropdown === item.href ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {openDropdown === item.href && (
                          <motion.ul
                            key={`${item.href}-sub`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pb-3 sm:grid sm:grid-cols-2 sm:gap-x-4"
                          >
                            {item.dropdown.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  onClick={closeMenu}
                                  className={`block rounded-sm px-3 py-2 font-body text-b4-mobile transition-colors hover:bg-light-grey hover:text-crimson-red ${isChildActive(child.href) ? "bg-crimson-red/10 text-crimson-red font-medium" : "text-dark-gray"}`}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`block py-4 font-body text-b2-mobile transition-colors hover:text-crimson-red ${isParentActive(item.href) ? "text-crimson-red underline underline-offset-4 decoration-2" : "text-midnight"}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
