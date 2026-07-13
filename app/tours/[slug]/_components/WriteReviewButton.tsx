"use client";

import { useEffect, useRef, useState } from "react";
import {
  Star,
  X,
  ImagePlus,
  Video as VideoIcon,
  Loader2,
  CheckCircle2,
  Clock,
} from "lucide-react";
import MarkdownEditor from "@/app/components/global/MarkdownEditor";
import NationalitySelect from "@/app/components/reviews/NationalitySelect";
import { REVIEW_CATEGORIES } from "@/types/review";
import type { CategoryRatings } from "@/types/review";

const MAX_PHOTOS = 6;

const HEADLINE_SUGGESTIONS = [
  "An unforgettable adventure",
  "Perfectly organized, zero stress",
  "Made lifelong friends on this trip",
  "Worth every penny",
];

type Step = "verify" | "form" | "done";
type UploadKind = "avatar" | "photo" | "video";
type ReviewableTour = {
  slug: string;
  name: string;
  started: boolean;
  reservationDate?: string;
  tourDate?: string;
  tourDuration?: string;
  status?: string;
};

async function uploadImage(
  file: File,
  kind: UploadKind,
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
  const [confirmClose, setConfirmClose] = useState(false);

  // Verify
  const [identifier, setIdentifier] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  // Tours this email booked, when they land on a tour they didn't book.
  const [otherTours, setOtherTours] = useState<ReviewableTour[] | null>(null);

  // Form
  const [rating, setRating] = useState(0);
  const [categoryRatings, setCategoryRatings] = useState<CategoryRatings>({});
  const [firstName, setFirstName] = useState("");
  const [nationality, setNationality] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null); // upload-in-progress label
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const honeypot = useRef("");

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const isDirty =
    step === "form" &&
    (rating > 0 ||
      title.trim() !== "" ||
      body.trim() !== "" ||
      photos.length > 0 ||
      !!videoUrl);

  function reset() {
    setStep("verify");
    setIdentifier("");
    setVerifyError(null);
    setOtherTours(null);
    setConfirmClose(false);
    setRating(0);
    setCategoryRatings({});
    setFirstName("");
    setNationality("");
    setTitle("");
    setBody("");
    setAvatar(null);
    setPhotos([]);
    setVideoUrl(null);
    setFormError(null);
    honeypot.current = "";
  }

  function close() {
    setOpen(false);
    // Let the closing animation finish conceptually before resetting.
    setTimeout(reset, 200);
  }

  function requestClose() {
    if (isDirty) {
      setConfirmClose(true);
      return;
    }
    close();
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && requestClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isDirty]);

  async function runVerify(id: string) {
    setVerifying(true);
    setVerifyError(null);
    setOtherTours(null);
    try {
      const res = await fetch("/api/reviews/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: id, tourSlug }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setVerifyError(data.error || "We couldn't verify that booking.");
        if (Array.isArray(data.otherTours) && data.otherTours.length > 0) {
          setOtherTours(data.otherTours);
        }
        return;
      }
      if (data.firstName) setFirstName(data.firstName);
      if (data.nationality) setNationality(data.nationality);
      setStep("form");
    } catch {
      setVerifyError("Something went wrong. Please try again.");
    } finally {
      setVerifying(false);
    }
  }

  function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    runVerify(identifier);
  }

  // Send the traveler to another tour they booked and continue the review there.
  // The intent is stashed so that page auto-opens this modal and re-verifies.
  const REVIEW_INTENT_KEY = "imh_review_intent";
  function goToTour(slug: string) {
    try {
      sessionStorage.setItem(REVIEW_INTENT_KEY, JSON.stringify({ slug, email: identifier }));
    } catch {
      // sessionStorage may be unavailable (private mode) — navigate anyway.
    }
    window.location.href = `/tours/${slug}#reviews`;
  }

  // Arriving from another tour's "pick a tour to review" step: open the modal,
  // prefill the email, and re-verify automatically for this (correct) tour.
  useEffect(() => {
    let intent: { slug?: string; email?: string } | null = null;
    try {
      const raw = sessionStorage.getItem(REVIEW_INTENT_KEY);
      if (raw) intent = JSON.parse(raw);
    } catch {
      intent = null;
    }
    if (!intent || intent.slug !== tourSlug) return;
    try {
      sessionStorage.removeItem(REVIEW_INTENT_KEY);
    } catch {
      // ignore
    }
    setOpen(true);
    if (intent.email) {
      setIdentifier(intent.email);
      runVerify(intent.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  async function handleVideo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy("video");
    setFormError(null);
    try {
      const url = await uploadImage(file, "video", tourSlug);
      setVideoUrl(url);
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
          categoryRatings,
          title: title.trim() || undefined,
          bodyMarkdown: body.trim(),
          reviewerFirstName: firstName.trim(),
          reviewerLocation: nationality.trim() || undefined,
          reviewerAvatar: avatar || undefined,
          photos,
          video: videoUrl || undefined,
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
  const pillButtonCls =
    "inline-flex items-center justify-center gap-2 rounded-full bg-crimson-red px-6 py-3 font-body text-b2-desktop font-medium text-white shadow-small transition-all hover:bg-light-red hover:shadow-medium disabled:opacity-50";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={pillButtonCls}
      >
        Write a review
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-midnight/50 p-0 md:items-center md:p-6"
          onMouseDown={(e) => e.target === e.currentTarget && requestClose()}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Write a review for ${tourName}`}
            className="no-scrollbar relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-lg bg-white p-6 shadow-xlarge md:rounded-lg md:p-8"
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
                onClick={requestClose}
                aria-label="Close"
                className="shrink-0 rounded-full p-1.5 text-dark-gray hover:bg-light-grey"
              >
                <X className="size-5" />
              </button>
            </div>

            {step === "verify" && (
              <form onSubmit={handleVerify} className="space-y-4">
                <p className="font-body text-b2-desktop text-midnight">
                  Enter the email address you booked with so we can confirm you travelled
                  with us.
                </p>
                <div>
                  <label htmlFor="identifier" className={labelCls}>
                    Email address
                  </label>
                  <input
                    id="identifier"
                    type="email"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      if (otherTours) setOtherTours(null);
                      if (verifyError) setVerifyError(null);
                    }}
                    placeholder="you@email.com"
                    className={inputCls}
                    autoFocus
                    required
                  />
                </div>
                {verifyError && (
                  <p className="font-body text-b4-desktop text-crimson-red">{verifyError}</p>
                )}
                {otherTours && otherTours.length > 0 && (
                  <div className="space-y-2 rounded-md border border-light-grey bg-light-grey/40 p-3">
                    <p className="font-body text-b4-desktop font-medium text-midnight">
                      But you&apos;ve booked{" "}
                      {otherTours.length === 1 ? "this tour" : "these tours"} with us:
                    </p>
                    <div className="flex flex-col gap-2">
                      {otherTours.map((t) => {
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
                        // Started trips are reviewable now; upcoming ones are shown
                        // but not actionable until the traveler is actually travelling.
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
                  disabled={verifying || !identifier.trim()}
                  className={`w-full ${pillButtonCls}`}
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

                <div>
                  <span className={labelCls}>
                    Rate by category{" "}
                    <span className="font-body text-b4-desktop font-normal text-grey">
                      (optional)
                    </span>
                  </span>
                  <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {REVIEW_CATEGORIES.map((cat) => (
                      <div
                        key={cat.key}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="font-body text-b2-desktop text-midnight">
                          {cat.label}
                        </span>
                        <StarInput
                          value={categoryRatings[cat.key] ?? 0}
                          onChange={(n) =>
                            setCategoryRatings((prev) => ({ ...prev, [cat.key]: n }))
                          }
                        />
                      </div>
                    ))}
                  </div>
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
                    <label htmlFor="nationality" className={labelCls}>
                      Nationality <span className="font-normal text-grey">(optional)</span>
                    </label>
                    <NationalitySelect
                      id="nationality"
                      value={nationality}
                      onChange={setNationality}
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
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="font-body text-b4-desktop text-grey">
                      Need inspiration?
                    </span>
                    {HEADLINE_SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setTitle((t) => (t.trim() ? t : s))}
                        className="rounded-full bg-light-grey px-3 py-1 font-body text-b4-desktop text-midnight transition-colors hover:bg-light-grey/70"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="body" className={`${labelCls} after:ml-0.5 after:text-crimson-red after:content-['*']`}>
                    Your review
                  </label>
                  <MarkdownEditor
                    id="body"
                    value={body}
                    onChange={setBody}
                    placeholder="Tell fellow travelers about your experience…"
                    highlighted
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
                        {busy === "avatar" ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <ImagePlus className="size-4" />
                        )}
                        {busy === "avatar" ? "Uploading…" : avatar ? "Change" : "Upload"}
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
                      </label>
                    </div>
                  </div>

                  {/* Video */}
                  <div>
                    <span className={labelCls}>
                      Tour video <span className="font-normal text-grey">(optional)</span>
                    </span>
                    <div className="w-24">
                      {videoUrl ? (
                        <div className="group relative aspect-square overflow-hidden rounded-md bg-midnight">
                          <video
                            src={videoUrl}
                            muted
                            loop
                            autoPlay
                            playsInline
                            className="size-full object-cover"
                          />
                          <button
                            type="button"
                            aria-label="Remove video"
                            onClick={() => setVideoUrl(null)}
                            className="absolute right-1 top-1 rounded-full bg-midnight/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <X className="size-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          disabled={busy === "video"}
                          onClick={() => videoInputRef.current?.click()}
                          className="flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-grey/40 text-grey transition-colors hover:border-crimson-red hover:text-crimson-red"
                        >
                          {busy === "video" ? (
                            <Loader2 className="size-5 animate-spin" />
                          ) : (
                            <>
                              <VideoIcon className="size-5" />
                              <span className="font-body text-b4-desktop">Add video</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleVideo}
                    />
                  </div>
                </div>

                {/* Photos */}
                <div>
                  <span className={labelCls}>
                    Tour photos <span className="font-normal text-grey">(up to {MAX_PHOTOS})</span>
                  </span>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {Array.from({ length: MAX_PHOTOS }).map((_, i) => {
                      const src = photos[i];
                      if (src) {
                        return (
                          <div
                            key={src}
                            className="group relative aspect-square overflow-hidden rounded-md bg-light-grey"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt="" className="size-full object-cover" />
                            <button
                              type="button"
                              aria-label="Remove photo"
                              onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}
                              className="absolute right-1 top-1 rounded-full bg-midnight/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        );
                      }
                      const isNextSlot = i === photos.length;
                      return (
                        <button
                          key={`empty-${i}`}
                          type="button"
                          disabled={!isNextSlot || busy === "photos"}
                          onClick={() => photoInputRef.current?.click()}
                          className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed transition-colors ${
                            isNextSlot
                              ? "border-grey/40 text-grey hover:border-crimson-red hover:text-crimson-red"
                              : "cursor-default border-light-grey text-light-grey"
                          }`}
                        >
                          {busy === "photos" && isNextSlot ? (
                            <Loader2 className="size-5 animate-spin" />
                          ) : (
                            <>
                              <ImagePlus className="size-5" />
                              {isNextSlot && (
                                <span className="font-body text-b4-desktop">Add photo</span>
                              )}
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotos}
                  />
                </div>

                {formError && (
                  <p className="font-body text-b4-desktop text-crimson-red">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting || !!busy}
                  className={`w-full ${pillButtonCls}`}
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
                <button type="button" onClick={close} className={pillButtonCls}>
                  Done
                </button>
              </div>
            )}

            {confirmClose && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-t-lg bg-midnight/40 p-6 md:rounded-lg">
                <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xlarge">
                  <h4 className="font-sans text-h5-mobile md:text-h5-desktop text-midnight">
                    Discard your review?
                  </h4>
                  <p className="mt-2 font-body text-b4-desktop text-grey">
                    You have unsaved changes. If you leave now, your progress will be lost.
                  </p>
                  <div className="mt-5 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setConfirmClose(false)}
                      className="rounded-full px-4 py-2 font-body text-b4-desktop font-medium text-midnight transition-colors hover:bg-light-grey"
                    >
                      Keep editing
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmClose(false);
                        close();
                      }}
                      className="rounded-full bg-crimson-red px-4 py-2 font-body text-b4-desktop font-medium text-white transition-colors hover:bg-light-red"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
