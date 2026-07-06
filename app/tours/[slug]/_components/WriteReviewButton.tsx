"use client";

import { useEffect, useRef, useState } from "react";
import { Star, X, Upload, ImagePlus, Loader2, CheckCircle2 } from "lucide-react";
import MarkdownEditor from "@/app/components/global/MarkdownEditor";

const MAX_PHOTOS = 6;

type Step = "verify" | "form" | "done";

async function uploadImage(
  file: File,
  kind: "avatar" | "photo",
  tourKey: string,
): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("kind", kind);
  fd.append("tourId", tourKey);
  const res = await fetch("/api/reviews/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok || !data.ok) throw new Error(data.error || "Upload failed.");
  return data.url as string;
}

function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = (hover || value) >= n;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(n)}
            className="p-0.5"
          >
            <Star
              className={`size-8 transition-colors ${
                active ? "fill-crimson-red text-crimson-red" : "fill-transparent text-grey"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function WriteReviewButton({
  tourSlug,
  tourName,
}: {
  tourSlug: string;
  tourName: string;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("verify");

  // Verify
  const [identifier, setIdentifier] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  // Form
  const [rating, setRating] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [busy, setBusy] = useState<string | null>(null); // upload-in-progress label
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const honeypot = useRef("");

  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function reset() {
    setStep("verify");
    setIdentifier("");
    setVerifyError(null);
    setRating(0);
    setFirstName("");
    setLocation("");
    setTitle("");
    setBody("");
    setAvatar(null);
    setPhotos([]);
    setFormError(null);
    honeypot.current = "";
  }

  function close() {
    setOpen(false);
    // Let the closing animation finish conceptually before resetting.
    setTimeout(reset, 200);
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setVerifying(true);
    setVerifyError(null);
    try {
      const res = await fetch("/api/reviews/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, tourSlug }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setVerifyError(data.error || "We couldn't verify that booking.");
        return;
      }
      if (data.firstName) setFirstName(data.firstName);
      setStep("form");
    } catch {
      setVerifyError("Something went wrong. Please try again.");
    } finally {
      setVerifying(false);
    }
  }

  async function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy("avatar");
    setFormError(null);
    try {
      const url = await uploadImage(file, "avatar", tourSlug);
      setAvatar(url);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(null);
    }
  }

  async function handlePhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    const room = MAX_PHOTOS - photos.length;
    if (room <= 0) return;
    setBusy("photos");
    setFormError(null);
    try {
      for (const file of files.slice(0, room)) {
        const url = await uploadImage(file, "photo", tourSlug);
        setPhotos((prev) => [...prev, url]);
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (rating < 1) return setFormError("Please choose a star rating.");
    if (body.trim().length < 4) return setFormError("Please write a short review.");
    if (!firstName.trim()) return setFormError("Please enter your first name.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          tourSlug,
          rating,
          title: title.trim() || undefined,
          bodyMarkdown: body.trim(),
          reviewerFirstName: firstName.trim(),
          reviewerLocation: location.trim() || undefined,
          reviewerAvatar: avatar || undefined,
          photos,
          website: honeypot.current,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setFormError(data.error || "Something went wrong.");
        return;
      }
      setStep("done");
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-md border border-light-grey bg-white px-4 py-3 font-body text-b2-desktop text-midnight outline-none focus:border-crimson-red placeholder:text-grey";
  const labelCls = "mb-1.5 block font-sans text-h6-desktop font-bold text-midnight";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md bg-crimson-red px-6 py-3 font-body text-b2-desktop font-medium text-white transition-colors hover:bg-light-red"
      >
        Write a review
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-midnight/50 p-0 md:items-center md:p-6"
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Write a review for ${tourName}`}
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-lg bg-white p-6 shadow-xlarge md:rounded-lg md:p-8"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-sans text-h4-mobile md:text-h4-desktop text-midnight">
                  Review {tourName}
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

            {step === "verify" && (
              <form onSubmit={handleVerify} className="space-y-4">
                <p className="font-body text-b2-desktop text-midnight">
                  Enter the email or booking ID from your booking so we can confirm you
                  travelled with us.
                </p>
                <div>
                  <label htmlFor="identifier" className={labelCls}>
                    Booking email or ID
                  </label>
                  <input
                    id="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="you@email.com or IHT-1234"
                    className={inputCls}
                    autoFocus
                    required
                  />
                </div>
                {verifyError && (
                  <p className="font-body text-b4-desktop text-crimson-red">{verifyError}</p>
                )}
                <button
                  type="submit"
                  disabled={verifying || !identifier.trim()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-crimson-red px-6 py-3 font-body text-b2-desktop font-medium text-white transition-colors hover:bg-light-red disabled:opacity-50"
                >
                  {verifying && <Loader2 className="size-4 animate-spin" />}
                  {verifying ? "Verifying…" : "Verify booking"}
                </button>
              </form>
            )}

            {step === "form" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot — hidden from users, catches bots. */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  onChange={(e) => (honeypot.current = e.target.value)}
                  className="hidden"
                />

                <div>
                  <span className={labelCls}>Your rating</span>
                  <StarInput value={rating} onChange={setRating} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={labelCls}>
                      First name
                    </label>
                    <input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputCls}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className={labelCls}>
                      Location <span className="font-normal text-grey">(optional)</span>
                    </label>
                    <input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="London, United Kingdom"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="title" className={labelCls}>
                    Headline <span className="font-normal text-grey">(optional)</span>
                  </label>
                  <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="An unforgettable trip"
                    maxLength={120}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label htmlFor="body" className={labelCls}>
                    Your review
                  </label>
                  <MarkdownEditor
                    id="body"
                    value={body}
                    onChange={setBody}
                    placeholder="Tell fellow travelers about your experience…"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Avatar */}
                  <div>
                    <span className={labelCls}>
                      Profile photo <span className="font-normal text-grey">(optional)</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-light-grey">
                        {avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={avatar} alt="" className="size-full object-cover" />
                        ) : (
                          <span className="flex size-full items-center justify-center font-sans font-bold text-midnight">
                            {firstName.charAt(0).toUpperCase() || "?"}
                          </span>
                        )}
                      </div>
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-light-grey px-3 py-2 font-body text-b4-desktop text-dark-gray hover:bg-light-grey">
                        <Upload className="size-4" />
                        {busy === "avatar" ? "Uploading…" : avatar ? "Change" : "Upload"}
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
                      </label>
                    </div>
                  </div>

                  {/* Photos */}
                  <div>
                    <span className={labelCls}>
                      Trip photos <span className="font-normal text-grey">(up to {MAX_PHOTOS})</span>
                    </span>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-light-grey px-3 py-2 font-body text-b4-desktop text-dark-gray hover:bg-light-grey">
                      <ImagePlus className="size-4" />
                      {busy === "photos" ? "Uploading…" : "Add photos"}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handlePhotos}
                        disabled={photos.length >= MAX_PHOTOS}
                      />
                    </label>
                    {photos.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {photos.map((src, i) => (
                          <div key={src} className="relative size-14 overflow-hidden rounded-sm bg-light-grey">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt="" className="size-full object-cover" />
                            <button
                              type="button"
                              aria-label="Remove photo"
                              onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}
                              className="absolute right-0.5 top-0.5 rounded-full bg-midnight/70 p-0.5 text-white"
                            >
                              <X className="size-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {formError && (
                  <p className="font-body text-b4-desktop text-crimson-red">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting || !!busy}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-crimson-red px-6 py-3 font-body text-b2-desktop font-medium text-white transition-colors hover:bg-light-red disabled:opacity-50"
                >
                  {submitting && <Loader2 className="size-4 animate-spin" />}
                  {submitting ? "Posting…" : "Post review"}
                </button>
              </form>
            )}

            {step === "done" && (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle2 className="size-14 text-spring-green" />
                <h3 className="font-sans text-h4-desktop text-midnight">Thank you!</h3>
                <p className="max-w-md font-body text-b2-desktop text-grey">
                  Your review has been posted. It may take a moment to appear on the page.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-md bg-crimson-red px-6 py-3 font-body text-b2-desktop font-medium text-white hover:bg-light-red"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
