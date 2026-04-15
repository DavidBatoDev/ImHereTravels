import Link from "next/link";

export default function CreateYourOwnCard() {
  return (
    <li className="overflow-hidden rounded-lg bg-midnight shadow-small">
      <div className="flex h-full flex-col p-5 md:p-6">
        {/* Badge */}
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-body text-b4-desktop text-white">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 22l-2.09-10.26L4 10l5.91-1.74z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          Personalized Tours
        </span>

        <h2 className="mt-6 font-sans text-h4-mobile md:text-h4-desktop text-white">
          Create your own tour
        </h2>
        <p className="mt-3 font-body text-b4-mobile md:text-b4-desktop text-white/70">
          Let&apos;s create an exclusive epic adventure for your group.
        </p>

        <div className="mt-auto pt-8">
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white transition-colors hover:bg-light-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Create Now
          </Link>
        </div>
      </div>
    </li>
  );
}
