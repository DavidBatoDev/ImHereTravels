import { NextResponse } from "next/server";
import { subscribeToMailchimp } from "@/lib/mailchimp";

export const runtime = "nodejs";

type NewsletterPayload = {
  email?: string;
  firstName?: string;
  lastName?: string;
};

export async function POST(request: Request) {
  let payload: NewsletterPayload;
  try {
    payload = (await request.json()) as NewsletterPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = payload.email?.trim() ?? "";
  const firstName = payload.firstName?.trim();
  const lastName = payload.lastName?.trim();

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  try {
    await subscribeToMailchimp({ email, firstName, lastName, tag: "Website Newsletter Form" });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
