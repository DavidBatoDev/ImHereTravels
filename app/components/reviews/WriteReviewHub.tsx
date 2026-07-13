"use client";

import { useEffect, useState } from "react";
import { X, Loader2, Clock } from "lucide-react";

type ReviewableTour = {
  slug: string;
  name: string;
  started: boolean;
  reservationDate?: string;
  tourDate?: string;
  tourDuration?: string;
  status?: string;
};

const REVIEW_INTENT_KEY = "imh_review_intent";

/**
 * "Write a review" entry point for the reviews hub, where there's no specific
 * tour in context. The traveler enters the email they booked with; we look up
 * every tour they can review (or have booked) and let them pick one. Picking a
 * started tour stashes the intent and sends them to that tour's page, where the
 * review modal auto-opens and verifies.
 */
export default function WriteReviewHub() {
  const [open, setOpen] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // null = haven't looked up yet; array = lookup completed (possibly empty).
  const [tours, setTours] = useState<ReviewableTour[] | null>(null);

  function reset() {
    setIdentifier("");
    setLoading(false);
    setError(null);
    setTours(null);
  }

  function close() {
    setOpen(false);
    setTimeout(reset, 200);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTours(null);
    try {
      const res = await fetch("/api/reviews/my-tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "We couldn't look that up. Please try again.");
        return;
      }
      setTours(Array.isArray(data.tours) ? data.tours : []);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function goToTour(slug: string) {
    try {
      sessionStorage.setItem(
        REVIEW_INTENT_KEY,
        JSON.stringify({ slug, email: identifier }),
      );
    } catch {
      // sessionStorage may be unavailable (private mode) — navigate anyway.
    }
    window.location.href = `/tours/${slug}#reviews`;
  }

  const inputCls =
    "w-full rounded-md border border-light-grey bg-white px-4 py-3 font-body text-b2-desktop text-midnight outline-none focus:border-crimson-red placeholder:text-grey";
  const labelCls = "mb-1.5 block font-sans text-h6-desktop font-bold text-midnight";
  const pillButtonCls =
    "inline-flex items-center justify-center gap-2 rounded-full bg-crimson-red px-6 py-3 font-body text-b2-desktop font-medium text-white shadow-small transition-all hover:bg-light-red hover:shadow-medium disabled:opacity-50";

  const reviewable = tours?.filter((t) => t.started).length ?? 0;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={pillButtonCls}>
        Write a review
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-midnight/50 p-0 md:items-center md:p-6"
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Write a review"
            className="no-scrollbar relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-lg bg-white p-6 shadow-xlarge md:rounded-lg md:p-8"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-sans text-h4-mobile md:text-h4-desktop text-midnight">
                  Write a review
                </h3>
                <p className="mt-1 font-body text-b4-desktop text-grey">
                  Reviews are from verified travelers only.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="shrink-0 rounded-full p-1.5 text-dark-gray hover:bg-light-grey"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleLookup} className="space-y-4">
              <p className="font-body text-b2-desktop text-midnight">
                Enter the email address you booked with and we&apos;ll show you the tours
                you can review.
              </p>
              <div>
                <label htmlFor="hub-identifier" className={labelCls}>
                  Email address
                </label>
                <input
                  id="hub-identifier"
                  type="email"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (tours) setTours(null);
                    if (error) setError(null);
                  }}
                  placeholder="you@email.com"
                  className={inputCls}
                  autoFocus
                  required
                />
              </div>

              {error && (
                <p className="font-body text-b4-desktop text-crimson-red">{error}</p>
              )}

              {/* Lookup completed but nothing to review. */}
              {tours && tours.length === 0 && !error && (
                <p className="rounded-md border border-light-grey bg-light-grey/40 p-3 font-body text-b4-desktop text-dark-gray">
                  We couldn&apos;t find any tours to review under that email. Make sure to
                  use the email address on your booking — reviews are open once your trip
                  has started.
                </p>
              )}

              {/* The traveler's tours. Started → reviewable now; upcoming → shown but
                  not yet actionable. */}
              {tours && tours.length > 0 && (
                <div className="space-y-2 rounded-md border border-light-grey bg-light-grey/40 p-3">
                  <p className="font-body text-b4-desktop font-medium text-midnight">
                    {reviewable > 0
                      ? "Pick a tour to review:"
                      : "You've booked these tours with us:"}
                  </p>
                  <div className="flex flex-col gap-2">
                    {tours.map((t) => {
                      const details = (
                        <>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-body text-b2-desktop font-medium text-midnight">
                              {t.name}
                            </span>
                            {t.status && (
                              <span
                                className={`rounded-full px-2 py-0.5 font-body text-b4-desktop font-medium ${
                                  t.status === "Completed"
                                    ? "bg-spring-green/15 text-spring-green"
                                    : t.status === "Ongoing"
                                      ? "bg-vivid-orange/15 text-vivid-orange"
                                      : "bg-grey/15 text-grey"
                                }`}
                              >
                                {t.status}
                              </span>
                            )}
                          </div>
                          {(t.tourDate || t.tourDuration || t.reservationDate) && (
                            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 font-body text-b4-desktop text-grey">
                              {t.tourDate && (
                                <span>
                                  <span className="text-dark-gray">Tour date:</span> {t.tourDate}
                                </span>
                              )}
                              {t.tourDuration && (
                                <span>
                                  <span className="text-dark-gray">Duration:</span>{" "}
                                  {t.tourDuration}
                                </span>
                              )}
                              {t.reservationDate && (
                                <span>
                                  <span className="text-dark-gray">Reserved:</span>{" "}
                                  {t.reservationDate}
                                </span>
                              )}
                            </div>
                          )}
                        </>
                      );
                      return t.started ? (
                        <button
                          key={t.slug}
                          type="button"
                          onClick={() => goToTour(t.slug)}
                          className="flex items-start justify-between gap-3 rounded-md border border-light-grey bg-white px-4 py-3 text-left transition-colors hover:border-crimson-red"
                        >
                          <div className="min-w-0">{details}</div>
                          <span className="shrink-0 self-center font-body font-medium text-crimson-red">
                            Review →
                          </span>
                        </button>
                      ) : (
                        <div
                          key={t.slug}
                          className="flex items-start justify-between gap-3 rounded-md border border-dashed border-light-grey bg-white/60 px-4 py-3"
                        >
                          <div className="min-w-0">{details}</div>
                          <span className="flex shrink-0 items-center gap-1 self-center font-body text-b4-desktop font-medium text-grey">
                            <Clock className="size-3.5" />
                            After your tour
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !identifier.trim()}
                className={`w-full ${pillButtonCls}`}
              >
                {loading && <Loader2 className="size-4 animate-spin" />}
                {loading ? "Looking up…" : tours ? "Search again" : "Find my tours"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
