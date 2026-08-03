"use client";

import Link from "next/link";
import { useState } from "react";
import { contactForm } from "@/data/contactUs";
import { trackEvent } from "@/lib/analytics/track";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    subscribe: false,
    acceptedPrivacy: false,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!form.acceptedPrivacy) {
      setStatus("error");
      setErrorMessage("Please accept our privacy policy to continue.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send message");
      }
      setStatus("success");
      trackEvent("form_submission", { form_name: "contact_us" });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        subscribe: false,
        acceptedPrivacy: false,
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const inputClass =
    "w-full rounded-sm border-[1.5px] border-grey/60 px-4 py-3 font-body text-b2-mobile text-midnight outline-none placeholder:text-grey focus:border-midnight md:text-b2-desktop";

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          required
          value={form.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          placeholder={contactForm.fields.firstName}
          className={inputClass}
        />
        <input
          type="text"
          required
          value={form.lastName}
          onChange={(e) => update("lastName", e.target.value)}
          placeholder={contactForm.fields.lastName}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder={contactForm.fields.email}
          className={inputClass}
        />
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder={contactForm.fields.phone}
          className={inputClass}
        />
      </div>
      <textarea
        required
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
        placeholder={contactForm.fields.message}
        rows={4}
        className={`${inputClass} resize-y`}
      />
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={form.subscribe}
          onChange={(e) => update("subscribe", e.target.checked)}
          className="mt-1 size-4 shrink-0 cursor-pointer accent-crimson-red"
        />
        <span className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
          {contactForm.checkboxes[0]}
        </span>
      </label>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          required
          checked={form.acceptedPrivacy}
          onChange={(e) => update("acceptedPrivacy", e.target.checked)}
          className="mt-1 size-4 shrink-0 cursor-pointer accent-crimson-red"
        />
        <span className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
          By checking this, you accept our{" "}
          <Link
            href="/privacy-policy"
            className="text-crimson-red underline transition-colors hover:text-light-red"
          >
            privacy policy
          </Link>{" "}
          *
        </span>
      </label>

      {status === "success" && (
        <p className="font-body text-b2-mobile text-spring-green md:text-b2-desktop">
          Thanks! Your message has been sent. We&apos;ll be in touch shortly.
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className="font-body text-b2-mobile text-crimson-red md:text-b2-desktop">
          {errorMessage}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-crimson-red px-10 py-3 font-body font-bold text-b2-mobile text-white transition-colors hover:bg-light-red disabled:cursor-not-allowed disabled:opacity-60 md:text-b2-desktop"
        >
          {status === "submitting" ? "Sending..." : contactForm.submitLabel}
        </button>
      </div>
    </form>
  );
}
