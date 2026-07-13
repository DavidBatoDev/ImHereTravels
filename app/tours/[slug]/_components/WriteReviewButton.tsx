"use client";

import { useEffect, useRef, useState } from "react";
import {
  Star,
  X,
  ImagePlus,
  Video as VideoIcon,
  Loader2,
  CheckCircle2,
  Camera,
  Sparkles,
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

type Step = "verify" | "select" | "form" | "done";
type UploadKind = "avatar" | "photo" | "video";

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

const RATING_WORDS = ["Poor", "Fair", "Good", "Great", "Excellent"] as const;

function StarInput({
  value,
  onChange,
  size = "md",
  showWord = false,
}: {
  value: number;
  onChange: (n: number) => void;
  /** "sm" per-category rows · "md" default · "lg" the headline rating. */
  size?: "sm" | "md" | "lg";
  /** Show the rating word (Poor…Excellent) under the stars. */
  showWord?: boolean;
}) {
  const [hover, setHover] = useState(0);
  const current = hover || value;
  const starSize =
    size === "sm" ? "size-5" : size === "lg" ? "size-9 sm:size-10" : "size-7";
  return (
    <div className={showWord ? "flex flex-col items-center gap-2.5" : ""}>
      <div
        className={`flex ${size === "lg" ? "gap-1.5" : "gap-0.5"}`}
        role="radiogroup"
        aria-label="Rating"
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const active = current >= n;
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
              className="p-0.5 transition-transform hover:scale-110"
            >
              <Star
                className={`${starSize} transition-colors ${
                  active ? "fill-crimson-red text-crimson-red" : "fill-transparent text-grey"
                }`}
              />
            </button>
          );
        })}
      </div>
      {showWord && (
        <p className="font-body text-b2-desktop font-medium text-midnight">
          {current ? (
            RATING_WORDS[current - 1]
          ) : (
            <span className="font-normal text-grey">Tap a star to rate</span>
          )}
        </p>
      )}
    </div>
  );
}

export default function WriteReviewButton({
  tourSlug,
  tourName,
  hub = false,
  triggerClassName,
}: {
  /** Tour mode: fixed tour to review (per-tour page). */
  tourSlug?: string;
  tourName?: string;
  /** Hub mode: no fixed tour — the traveler's email resolves which tours they can review. */
  hub?: boolean;
  /** Override the trigger button's styling (e.g. to match the hub card CTA). */
  triggerClassName?: string;
}) {
  const hubMode = hub;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("verify");
  const [confirmClose, setConfirmClose] = useState(false);

  // Verify
  const [identifier, setIdentifier] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  // The tour being reviewed. Fixed from props on a tour page; chosen after the
  // email lookup on the hub.
  const [selected, setSelected] = useState<{ slug: string; name: string } | null>(
    tourSlug && tourName ? { slug: tourSlug, name: tourName } : null,
  );
  // Hub mode: the tours the traveler's email is eligible to review.
  const [hubTours, setHubTours] = useState<{ slug: string; name: string }[]>([]);

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
    setConfirmClose(false);
    setHubTours([]);
    setSelected(tourSlug && tourName ? { slug: tourSlug, name: tourName } : null);
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

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setVerifying(true);
    setVerifyError(null);
    try {
      if (hubMode) {
        // Look the traveler up by email and surface the tours they can review.
        const res = await fetch("/api/reviews/my-bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          setVerifyError(data.error || "We couldn't find your bookings.");
          return;
        }
        if (data.firstName) setFirstName(data.firstName);
        if (data.nationality) setNationality(data.nationality);
        const tours = (data.tours ?? []) as { slug: string; name: string }[];
        if (tours.length === 0) {
          setVerifyError("We couldn't match your booking to a reviewable tour.");
          return;
        }
        setHubTours(tours);
        if (tours.length === 1) {
          setSelected(tours[0]);
          setStep("form");
        } else {
          setStep("select");
        }
      } else {
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
        if (data.nationality) setNationality(data.nationality);
        setStep("form");
      }
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
      const url = await uploadImage(file, "avatar", selected?.slug ?? "");
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
        const url = await uploadImage(file, "photo", selected?.slug ?? "");
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
      const url = await uploadImage(file, "video", selected?.slug ?? "");
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
    if (!selected) return setFormError("Please pick which tour you travelled with.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          tourSlug: selected.slug,
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
    "w-full rounded-md border border-light-grey bg-white px-3.5 py-2.5 font-body text-b4-desktop text-midnight outline-none transition-colors placeholder:text-grey focus:border-crimson-red focus:ring-4 focus:ring-crimson-red/10";
  const labelCls = "mb-1.5 block font-body text-b4-desktop font-semibold text-midnight";
  const pillButtonCls =
    "inline-flex items-center justify-center gap-2 rounded-full bg-crimson-red px-6 py-2.5 font-body text-b4-desktop font-medium text-white shadow-small transition-all hover:bg-light-red hover:shadow-medium disabled:opacity-50";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName ?? pillButtonCls}
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
            aria-label={selected ? `Write a review for ${selected.name}` : "Write a review"}
            className="no-scrollbar relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-lg bg-white p-5 shadow-xlarge md:rounded-lg md:p-6"
          >
            <div className="-mx-5 mb-6 border-b border-light-grey px-5 pb-4 md:-mx-6 md:px-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="min-w-0 font-sans text-h5-mobile md:text-h5-desktop text-midnight">
                  {selected ? `Review ${selected.name}` : "Write a review"}
                </h3>
                <button
                  type="button"
                  onClick={requestClose}
                  aria-label="Close"
                  className="-mr-1.5 -mt-1.5 shrink-0 rounded-full p-1.5 text-dark-gray transition-colors hover:bg-light-grey"
                >
                  <X className="size-5" />
                </button>
              </div>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-spring-green/10 px-3 py-1 font-body text-b4-desktop font-medium text-spring-green">
                <CheckCircle2 className="size-3.5" />
                Verified travelers only
              </span>
            </div>

            {step === "verify" && (
              <form onSubmit={handleVerify} className="space-y-4">
                <p className="font-body text-b2-desktop text-midnight">
                  {hubMode
                    ? "Enter the email you booked with and we'll pull up the tours you can review."
                    : "Enter the email address you booked with so we can confirm you travelled with us."}
                </p>
                <div>
                  <label htmlFor="identifier" className={labelCls}>
                    Email address
                  </label>
                  <input
                    id="identifier"
                    type="email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="you@email.com"
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
                  className={`w-full ${pillButtonCls}`}
                >
                  {verifying && <Loader2 className="size-4 animate-spin" />}
                  {verifying ? "Checking…" : hubMode ? "Find my tours" : "Verify booking"}
                </button>
              </form>
            )}

            {step === "select" && (
              <div className="space-y-4">
                <p className="font-body text-b2-desktop text-midnight">
                  Which tour did you travel with?
                </p>
                <div className="max-h-80 space-y-2 overflow-auto">
                  {hubTours.map((t) => (
                    <button
                      key={t.slug}
                      type="button"
                      onClick={() => {
                        setSelected(t);
                        setStep("form");
                      }}
                      className="flex w-full items-center justify-between gap-3 rounded-md border border-light-grey px-4 py-2.5 text-left font-body text-b4-desktop text-midnight transition-colors hover:border-crimson-red hover:bg-light-grey"
                    >
                      <span>{t.name}</span>
                      <span aria-hidden className="text-grey">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "form" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot — hidden from users, catches bots. */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  onChange={(e) => (honeypot.current = e.target.value)}
                  className="hidden"
                />

                {/* Overall experience — the headline rating, elevated. */}
                <div className="rounded-lg bg-light-grey/50 p-6 text-center">
                  <p className="font-body text-b2-mobile md:text-b2-desktop text-grey">
                    How was your overall experience?
                  </p>
                  <div className="mt-4 flex justify-center">
                    <StarInput size="lg" showWord value={rating} onChange={setRating} />
                  </div>
                </div>

                {/* Profile photo + first name + nationality */}
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                  <div className="flex shrink-0 flex-col items-center gap-1.5">
                    <div className="relative">
                      <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-light-grey">
                        {avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={avatar} alt="" className="size-full object-cover" />
                        ) : (
                          <span className="font-sans text-h5-desktop font-bold text-grey">
                            {firstName.charAt(0).toUpperCase() || "?"}
                          </span>
                        )}
                      </div>
                      {avatar ? (
                        <button
                          type="button"
                          aria-label="Remove profile photo"
                          onClick={() => setAvatar(null)}
                          className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-crimson-red text-white shadow-small transition-colors hover:bg-light-red"
                        >
                          <X className="size-4" />
                        </button>
                      ) : (
                        <label
                          aria-label="Add profile photo"
                          className="absolute -bottom-1 -right-1 flex size-7 cursor-pointer items-center justify-center rounded-full bg-crimson-red text-white shadow-small transition-colors hover:bg-light-red"
                        >
                          {busy === "avatar" ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Camera className="size-4" />
                          )}
                          <input type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
                        </label>
                      )}
                    </div>
                    <span className="font-body text-b4-desktop text-grey">Photo</span>
                  </div>

                  <div className="grid w-full flex-1 gap-4 sm:grid-cols-2">
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
                </div>

                <hr className="border-light-grey" />

                {/* Rate by category */}
                <div>
                  <div className="mb-3">
                    <span className="font-body text-b4-desktop font-semibold text-midnight">
                      Rate by category{" "}
                      <span className="font-normal text-grey">(optional)</span>
                    </span>
                    <p className="mt-0.5 font-body text-b4-desktop text-grey">
                      Help others know what stood out
                    </p>
                  </div>
                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {REVIEW_CATEGORIES.map((cat) => (
                      <div
                        key={cat.key}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="font-body text-b4-desktop text-midnight">
                          {cat.label}
                        </span>
                        <StarInput
                          size="sm"
                          value={categoryRatings[cat.key] ?? 0}
                          onChange={(n) =>
                            setCategoryRatings((prev) => ({ ...prev, [cat.key]: n }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-light-grey" />

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
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-body text-b4-desktop text-grey">
                      <Sparkles className="size-3.5" />
                      Need inspiration?
                    </span>
                    {HEADLINE_SUGGESTIONS.map((s) => {
                      const active = title.trim() === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setTitle(active ? "" : s)}
                          className={`rounded-full px-3 py-1 font-body text-b4-desktop transition-colors ${
                            active
                              ? "bg-midnight text-white"
                              : "bg-light-grey text-midnight hover:bg-light-grey/70"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
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
                    placeholder="Tell fellow travelers about your experience — the highlights, the guide, the food, and what you'd tell a friend."
                    highlighted
                  />
                </div>

                <hr className="border-light-grey" />

                {/* Tour photos + video */}
                <div>
                  <div className="mb-1 flex items-baseline justify-between gap-2">
                    <span className="font-body text-b4-desktop font-semibold text-midnight">
                      Tour photos <span className="font-normal text-grey">(optional)</span>
                    </span>
                    <span className="font-body text-b4-desktop text-grey">
                      {photos.length}/{MAX_PHOTOS}
                    </span>
                  </div>
                  <p className="mb-2.5 font-body text-b4-desktop text-grey">
                    Add up to {MAX_PHOTOS}. Your first photo becomes the cover.
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {photos.map((src, i) => (
                      <div
                        key={src}
                        className="group relative aspect-square overflow-hidden rounded-md bg-light-grey"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" className="size-full object-cover" />
                        {i === 0 && (
                          <span className="absolute left-1 top-1 rounded-full bg-midnight/70 px-2 py-0.5 font-body text-b4-desktop text-white">
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          aria-label="Remove photo"
                          onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}
                          className="absolute right-1 top-1 rounded-full bg-midnight/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ))}
                    {photos.length < MAX_PHOTOS && (
                      <button
                        type="button"
                        disabled={busy === "photos"}
                        onClick={() => photoInputRef.current?.click()}
                        className="flex aspect-square flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-grey/40 text-grey transition-colors hover:border-crimson-red hover:text-crimson-red disabled:opacity-50"
                      >
                        {busy === "photos" ? (
                          <Loader2 className="size-5 animate-spin" />
                        ) : (
                          <>
                            <ImagePlus className="size-5" />
                            <span className="font-body text-b4-desktop">Add</span>
                          </>
                        )}
                      </button>
                    )}
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

                {/* Tour video */}
                <div>
                  <span className={labelCls}>
                    Tour video <span className="font-normal text-grey">(optional)</span>
                  </span>
                  {videoUrl ? (
                    <div className="group relative aspect-video w-full max-w-xs overflow-hidden rounded-md bg-midnight">
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
                        className="absolute right-1.5 top-1.5 rounded-full bg-midnight/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={busy === "video"}
                      onClick={() => videoInputRef.current?.click()}
                      className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed border-grey/40 py-4 font-body text-b4-desktop text-grey transition-colors hover:border-crimson-red hover:text-crimson-red disabled:opacity-50"
                    >
                      {busy === "video" ? (
                        <Loader2 className="size-5 animate-spin" />
                      ) : (
                        <>
                          <VideoIcon className="size-5" />
                          Add a video
                        </>
                      )}
                    </button>
                  )}
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideo}
                  />
                </div>

                {formError && (
                  <p className="font-body text-b4-desktop text-crimson-red">{formError}</p>
                )}

                {/* Footer — helper text + submit. */}
                <div className="-mx-5 flex items-center justify-between gap-3 border-t border-light-grey px-5 pt-5 md:-mx-6 md:px-6">
                  <p className="font-body text-b4-desktop text-grey">
                    {rating < 1 || body.trim().length < 4
                      ? "Add a star rating and a review to post."
                      : "Looks good — ready to post."}
                  </p>
                  <button
                    type="submit"
                    disabled={submitting || !!busy}
                    className={`shrink-0 ${pillButtonCls}`}
                  >
                    {submitting && <Loader2 className="size-4 animate-spin" />}
                    {submitting ? "Posting…" : "Post review"}
                  </button>
                </div>
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
