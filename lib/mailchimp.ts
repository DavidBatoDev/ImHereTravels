import crypto from "crypto";

/**
 * Restored 2026-08-03 — the site had a working Mailchimp integration under
 * WordPress (API key "ImHereTravels Form (WP)", audience "I'm Here Travels"),
 * lost in the Next.js migration since nothing in the new codebase called
 * Mailchimp at all. This is the one place that talks to it now.
 */
const AUDIENCE_ID = "1af816aefc";

function datacenterFromApiKey(apiKey: string): string {
  const dc = apiKey.split("-").pop();
  if (!dc) throw new Error("MAILCHIMP_API_KEY is missing its datacenter suffix.");
  return dc;
}

function subscriberHash(email: string): string {
  return crypto.createHash("md5").update(email.trim().toLowerCase()).digest("hex");
}

type SubscribeParams = {
  email: string;
  firstName?: string;
  lastName?: string;
  /** e.g. "Website Newsletter Form" — mirrors the WP-era tagging convention. */
  tag: string;
};

/**
 * Upserts a contact into the Mailchimp audience and tags it by source.
 * Throws on failure — callers for whom this is a secondary side effect
 * (contact/personalized-tours forms) should catch and log rather than let
 * it block the primary action; the dedicated newsletter route should let
 * it propagate since subscribing IS the primary action there.
 */
export async function subscribeToMailchimp({
  email,
  firstName,
  lastName,
  tag,
}: SubscribeParams): Promise<void> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  if (!apiKey) throw new Error("MAILCHIMP_API_KEY is not configured.");

  const dc = datacenterFromApiKey(apiKey);
  const hash = subscriberHash(email);
  const auth = `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`;

  const memberRes = await fetch(
    `https://${dc}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${hash}`,
    {
      method: "PUT",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: {
          ...(firstName ? { FNAME: firstName } : {}),
          ...(lastName ? { LNAME: lastName } : {}),
        },
      }),
      cache: "no-store",
    },
  );

  if (!memberRes.ok) {
    throw new Error(`Mailchimp member upsert failed: ${await memberRes.text()}`);
  }

  const tagRes = await fetch(
    `https://${dc}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${hash}/tags`,
    {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({ tags: [{ name: tag, status: "active" }] }),
      cache: "no-store",
    },
  );

  if (!tagRes.ok) {
    throw new Error(`Mailchimp tag failed: ${await tagRes.text()}`);
  }
}
