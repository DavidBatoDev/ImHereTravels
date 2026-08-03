"use client";

import { useState } from "react";
import Link from "next/link";
import { joinForm } from "@/data/joinOurCommunity";
import { trackEvent } from "@/lib/analytics/track";

type Status = "idle" | "submitting" | "success" | "error";

const initialForm = {
  email: "",
  firstName: "",
  lastName: "",
  country: "",
  acceptedPrivacy: false,
};

export default function JoinCommunityForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState(initialForm);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    const requiredFilled =
      form.email.trim() && form.firstName.trim() && form.lastName.trim() && form.country.trim();

    if (!requiredFilled) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!form.acceptedPrivacy) {
      setStatus("error");
      setErrorMessage("Please accept our privacy policy to continue.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to subscribe");
      }
      setStatus("success");
      trackEvent("form_submission", { form_name: "newsletter" });
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const inputClass =
    "w-full rounded-sm border-[1.5px] border-grey/60 px-4 py-3 font-body text-b2-mobile text-midnight outline-none placeholder:text-grey focus:border-midnight md:text-b2-desktop";

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
      {/* Email */}
      <input
        type="email"
        required
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        placeholder={joinForm.fields.email}
        className={inputClass}
      />

      {/* First + Last name */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          required
          value={form.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          placeholder={joinForm.fields.firstName}
          className={inputClass}
        />
        <input
          type="text"
          required
          value={form.lastName}
          onChange={(e) => update("lastName", e.target.value)}
          placeholder={joinForm.fields.lastName}
          className={inputClass}
        />
      </div>

      {/* Country select */}
      <div className="relative">
        <select
          required
          value={form.country}
          onChange={(e) => update("country", e.target.value)}
          className={`w-full appearance-none rounded-sm border-[1.5px] border-grey/60 bg-white px-4 py-3 font-body text-b2-mobile outline-none focus:border-midnight md:text-b2-desktop ${form.country === "" ? "text-grey" : "text-midnight"}`}
        >
          <option value="" disabled>
            {joinForm.fields.country}
          </option>
          <option value="AU">Australia</option>
          <option value="CA">Canada</option>
          <option value="PH">Philippines</option>
          <option value="SG">Singapore</option>
          <option value="GB">United Kingdom</option>
          <option value="US">United States</option>
          <option value="NZ">New Zealand</option>
          <option value="other">Other</option>
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-grey">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {/* Privacy checkbox */}
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          required
          checked={form.acceptedPrivacy}
          onChange={(e) => update("acceptedPrivacy", e.target.checked)}
          className="mt-1 size-4 shrink-0 cursor-pointer accent-crimson-red"
        />
        <span className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
          {joinForm.privacyCheckbox}
        </span>
      </label>

      {/* Disclaimer */}
      <p className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
        {joinForm.disclaimer}{" "}
        <Link href={joinForm.disclaimerLinkHref} className="underline hover:text-crimson-red">
          {joinForm.disclaimerLinkLabel}
        </Link>
        .
      </p>

      {status === "success" && (
        <p className="font-body text-b2-mobile text-spring-green md:text-b2-desktop">
          Thanks for subscribing! Welcome to the community.
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className="font-body text-b2-mobile text-crimson-red md:text-b2-desktop">
          {errorMessage}
        </p>
      )}

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-crimson-red px-10 py-3 font-body font-bold text-b2-mobile text-white transition-colors hover:bg-light-red disabled:cursor-not-allowed disabled:opacity-60 md:text-b2-desktop"
        >
          {status === "submitting" ? "Submitting..." : joinForm.submitLabel}
        </button>
      </div>
    </form>
  );
}
