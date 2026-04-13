"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Send,
  X,
  Link as LinkIcon,
  Check,
  Mail,
  MessageCircle,
  Share as ShareIcon,
} from "lucide-react";

export default function ShareButton({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  async function copyLink() {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const channels = [
    {
      label: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: "Facebook",
      icon: ShareIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 font-body text-b4-desktop text-midnight transition-colors hover:text-crimson-red"
        aria-label="Share this tour"
      >
        <Send className="size-4" strokeWidth={2.25} />
        Share
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Share this tour"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute inset-0 cursor-default bg-midnight/40"
            />
            <motion.div
              className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xlarge md:p-8"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-sans text-h5-mobile md:text-h5-desktop text-midnight">
                    Share this tour
                  </h2>
                  <p className="mt-1 font-body text-b4-mobile md:text-b4-desktop text-dark-gray">
                    {title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="-mr-2 -mt-2 flex size-9 shrink-0 items-center justify-center rounded-full text-midnight transition-colors hover:bg-light-grey"
                >
                  <X className="size-5" strokeWidth={2.25} />
                </button>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-md border border-light-grey p-2">
                <input
                  readOnly
                  value={url}
                  className="min-w-0 flex-1 truncate bg-transparent px-2 font-body text-b4-mobile md:text-b4-desktop text-dark-gray focus:outline-none"
                  aria-label="Tour URL"
                />
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-crimson-red px-4 py-2 font-body text-b4-desktop font-medium text-white transition-colors hover:bg-light-red"
                >
                  {copied ? (
                    <>
                      <Check className="size-4" strokeWidth={2.5} />
                      Copied
                    </>
                  ) : (
                    <>
                      <LinkIcon className="size-4" strokeWidth={2.5} />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <ul className="mt-6 grid grid-cols-3 gap-3">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 rounded-md border border-light-grey p-4 transition-colors hover:border-midnight"
                    >
                      <span className="flex size-10 items-center justify-center rounded-full bg-light-grey text-midnight">
                        <c.icon className="size-5" strokeWidth={2.25} />
                      </span>
                      <span className="font-body text-b4-mobile md:text-b4-desktop text-midnight">
                        {c.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
