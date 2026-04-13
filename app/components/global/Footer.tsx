import Image from "next/image";
import Link from "next/link";

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.21a8.19 8.19 0 004.78 1.52V7.27a4.85 4.85 0 01-1.01-.58z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const footerColumns = [
  {
    heading: "About",
    links: [
      { label: "Destinations", href: "#destinations" },
      { label: "Why Us?", href: "/why-us" },
      { label: "Tours", href: "#tours" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "FAQs", href: "/faqs" },
      { label: "Personalized Tours", href: "#personalized" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Travel Info", href: "#travel-info" },
      { label: "Newsletter", href: "#newsletter" },
      { label: "Reviews", href: "#reviews" },
    ],
  },
];

const socialLinks = [
  { label: "TikTok", href: "#tiktok", Icon: TikTokIcon },
  { label: "Facebook", href: "#facebook", Icon: FacebookIcon },
  { label: "Instagram", href: "#instagram", Icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer className="bg-light-grey">
      {/* Links section */}
      <div className="bg-white border-t border-light-grey">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {/* Logo */}
            <div className="col-span-2 flex items-start md:col-span-1">
              <Link href="/" aria-label="I'm Here Travels home">
                <Image
                  src="/Logos/Horizontal/Digital/SVG/Red/Digital_Horizontal_Red.svg"
                  alt="I'm Here Travels"
                  width={112}
                  height={42}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Nav columns */}
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <p className="font-sans font-bold text-h6-mobile md:text-h6-desktop text-crimson-red">
                  {col.heading}
                </p>
                <ul className="mt-3 space-y-1">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-b2-mobile md:text-b2-desktop text-midnight py-1 block hover:text-crimson-red transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Connect */}
            <div>
              <p className="font-sans font-bold text-h6-mobile md:text-h6-desktop text-crimson-red">
                Connect
              </p>
              <div className="mt-3 flex gap-2">
                {socialLinks.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex items-center justify-center size-10 rounded-full border-2 border-crimson-red text-crimson-red hover:bg-crimson-red hover:text-white transition-colors"
                  >
                    <Icon />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credits bar */}
      <div className="bg-midnight">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="font-body text-b2-mobile text-white/80 text-center md:text-left">
              © 2024 I&apos;m Here Travels. All rights reserved.
            </p>
            <Image
              src="/Logos/Clover/Digital/SVG/White/Digital_Clover_White.svg"
              alt=""
              width={42}
              height={42}
              className="size-10 shrink-0"
            />
            <div className="flex gap-4 items-center">
              <Link
                href="/terms-and-conditions"
                className="font-body text-b2-mobile text-white/80 hover:text-white transition-colors whitespace-nowrap"
              >
                Terms and Conditions
              </Link>
              <span className="text-white/40" aria-hidden>·</span>
              <Link
                href="/privacy-policy"
                className="font-body text-b2-mobile text-white/80 hover:text-white transition-colors whitespace-nowrap"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
