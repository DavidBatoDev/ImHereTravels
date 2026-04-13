import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Tours", href: "#tours" },
  { label: "Why us?", href: "#why-us" },
  { label: "Travel Info", href: "#travel-info" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-light-grey/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Link href="/" aria-label="I'm Here Travels home">
          <Image
            src="/Logos/Horizontal/Digital/SVG/Red/Digital_Horizontal_Red.svg"
            alt="I'm Here Travels"
            width={120}
            height={36}
            priority
            className="h-8 w-auto md:h-9"
          />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-b4-desktop text-midnight hover:text-crimson-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="#inquire"
          className="inline-flex items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-b4-mobile text-white transition-colors hover:bg-light-red md:text-b4-desktop"
        >
          Inquire Now
        </Link>
      </div>
    </header>
  );
}
