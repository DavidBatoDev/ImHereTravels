"use client";

import Link from "next/link";
import { useState } from "react";
import {
  personalizedToursForm,
  personalizedToursCountries,
} from "@/data/personalizedTours";
import { trackEvent } from "@/lib/analytics/track";
import DatePicker from "./_components/DatePicker";
import CountrySelect from "./_components/CountrySelect";

type Status = "idle" | "submitting" | "success" | "error";

const initialForm = {
  destination: "",
  travelDate: "",
  tripLength: "",
  travellers: "",
  budgetPerPerson: "",
  tourVision: "",
  firstName: "",
  lastName: "",
  country: "",
  email: "",
  acceptedPrivacy: false,
  subscribe: false,
};

export default function PersonalizedToursForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [form, setForm] = useState(initialForm);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    const requiredFilled =
      form.destination.trim() &&
      form.travelDate.trim() &&
      form.tripLength.trim() &&
      form.travellers.trim() &&
      form.tourVision.trim() &&
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.country.trim() &&
      form.email.trim();

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
      const res = await fetch("/api/personalized-tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send inquiry");
      }
      setStatus("success");
      trackEvent("form_submission", { form_name: "personalized_tours" });
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const inputClass =
    "w-full rounded-sm border-[1.5px] border-grey/60 px-4 py-3 font-body text-b2-mobile text-midnight outline-none placeholder:text-grey focus:border-midnight md:text-b2-desktop";

  const labelClass =
    "block font-body font-bold text-b2-mobile text-midnight md:text-b2-desktop";

  const fields = personalizedToursForm.fields;

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
      {/* Destination */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>{fields.destination.label}</label>
        <input
          type="text"
          required
          value={form.destination}
          onChange={(e) => update("destination", e.target.value)}
          placeholder={fields.destination.placeholder}
          className={inputClass}
        />
      </div>

      {/* Travel date */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>{fields.travelDate.label}</label>
        <DatePicker
          value={form.travelDate}
          onChange={(value) => update("travelDate", value)}
          placeholder={fields.travelDate.placeholder}
        />
      </div>

      {/* Trip length */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>{fields.tripLength.label}</label>
        <input
          type="text"
          required
          value={form.tripLength}
          onChange={(e) => update("tripLength", e.target.value)}
          placeholder={fields.tripLength.placeholder}
          className={inputClass}
        />
      </div>

      {/* Travellers */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>{fields.travellers.label}</label>
        <input
          type="number"
          required
          min={4}
          value={form.travellers}
          onChange={(e) => update("travellers", e.target.value)}
          placeholder={fields.travellers.placeholder}
          className={inputClass}
        />
      </div>

      {/* Budget */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>{fields.budgetPerPerson.label}</label>
        <div className="flex items-center rounded-sm border-[1.5px] border-grey/60 focus-within:border-midnight">
          <span className="pl-4 font-body text-b2-mobile text-midnight md:text-b2-desktop">
            £
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={form.budgetPerPerson}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              update("budgetPerPerson", digits ? Number(digits).toLocaleString("en-GB") : "");
            }}
            placeholder={fields.budgetPerPerson.placeholder}
            className="w-full rounded-sm bg-transparent px-2 py-3 font-body text-b2-mobile text-midnight outline-none placeholder:text-grey md:text-b2-desktop"
          />
        </div>
      </div>

      {/* Tour vision */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>{fields.tourVision.label}</label>
        <textarea
          required
          rows={5}
          value={form.tourVision}
          onChange={(e) => update("tourVision", e.target.value)}
          placeholder={fields.tourVision.placeholder}
          className={`${inputClass} resize-y`}
        />
        <p className="font-body text-b2-mobile text-dark-gray md:text-b2-desktop">
          {fields.tourVision.helper}
        </p>
      </div>

      {/* Contact Details */}
      <div className="mt-2 flex flex-col gap-5">
        <h3 className="font-sans font-bold text-h5-mobile text-midnight md:text-h5-desktop">
          {personalizedToursForm.contactDetailsHeading}
        </h3>

        <div className="flex flex-col gap-2">
          <p className={labelClass}>{personalizedToursForm.nameHeading}</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              required
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              placeholder={fields.firstName.placeholder}
              className={inputClass}
            />
            <input
              type="text"
              required
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              placeholder={fields.lastName.placeholder}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>{fields.country.label}</label>
          <div className="relative">
            <select
              required
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              className={`${inputClass} appearance-none bg-white ${form.country === "" ? "text-grey" : ""}`}
            >
              <option value="" disabled>
                {fields.country.placeholder}
              </option>
              {personalizedToursCountries.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
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
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>{fields.email.label}</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={fields.email.placeholder}
            className={inputClass}
          />
        </div>
      </div>

      {/* Checkboxes */}
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          required
          checked={form.acceptedPrivacy}
          onChange={(e) => update("acceptedPrivacy", e.target.checked)}
          className="mt-1 size-4 shrink-0 cursor-pointer accent-crimson-red"
        />
        <span className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
          By checking this, you agree with our{" "}
          <Link
            href="/privacy-policy"
            className="text-crimson-red underline transition-colors hover:text-light-red"
          >
            privacy policy
          </Link>{" "}
          *
        </span>
      </label>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={form.subscribe}
          onChange={(e) => update("subscribe", e.target.checked)}
          className="mt-1 size-4 shrink-0 cursor-pointer accent-crimson-red"
        />
        <span className="font-body text-b2-mobile text-midnight md:text-b2-desktop">
          {personalizedToursForm.subscribeCheckbox}
        </span>
      </label>

      {status === "success" && (
        <p className="font-body text-b2-mobile text-spring-green md:text-b2-desktop">
          Thanks! Your personalized tour inquiry has been sent. Our team will be in touch shortly.
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
          {status === "submitting" ? "Sending..." : personalizedToursForm.submitLabel}
        </button>
      </div>
    </form>
  );
}
