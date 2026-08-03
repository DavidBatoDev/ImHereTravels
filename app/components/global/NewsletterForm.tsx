"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics/track";

type Status = "idle" | "submitting" | "success" | "error";

type NewsletterFormProps = {
  /** Matches each page's existing spacing — some wrap in a parent with its own gap. */
  formClassName?: string;
  buttonClassName?: string;
};

/**
 * The "Join our community" teaser form — repeated across 6 pages, previously
 * all `action="#"` with no submit handler (non-functional since the WP
 * migration). This is the one shared implementation; each page only supplies
 * its own layout classes to match pre-existing spacing.
 */
export default function NewsletterForm({
  formClassName = "mt-2 flex flex-col gap-3",
  buttonClassName = "mt-1 inline-flex items-center justify-center self-start rounded-full bg-crimson-red px-6 py-3 font-body font-medium text-white hover:bg-light-red",
}: NewsletterFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your email address.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to subscribe");
      }
      setStatus("success");
      trackEvent("form_submission", { form_name: "newsletter" });
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form
      className={formClassName}
      onSubmit={onSubmit}
      noValidate
      aria-label="Newsletter signup"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full rounded-full border border-grey bg-white px-5 py-3 font-body text-b4-desktop text-midnight placeholder:text-grey focus:border-crimson-red focus:outline-none"
      />
      <p className="font-body text-b4-desktop text-grey">
        By submitting you agree with our{" "}
        <Link href="/privacy-policy" className="underline hover:text-crimson-red">
          Privacy Policy
        </Link>
        .
      </p>
      {status === "success" && (
        <p className="font-body text-b4-desktop text-spring-green">
          Thanks for subscribing!
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className="font-body text-b4-desktop text-crimson-red">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className={`${buttonClassName} disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {status === "submitting" ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
