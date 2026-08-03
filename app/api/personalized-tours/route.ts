import { NextResponse } from "next/server";
import { subscribeToMailchimp } from "@/lib/mailchimp";

export const runtime = "nodejs";

const RECIPIENT = "bella@imheretravels.com";

type PersonalizedToursPayload = {
  destination?: string;
  travelDate?: string;
  tripLength?: string;
  travellers?: string;
  budgetPerPerson?: string;
  tourVision?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  email?: string;
  acceptedPrivacy?: boolean;
  subscribe?: boolean;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function encodeSubject(subject: string): string {
  return `=?UTF-8?B?${Buffer.from(subject, "utf-8").toString("base64")}?=`;
}

function toBase64Url(value: string): string {
  return Buffer.from(value, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Gmail OAuth credentials are not configured.");
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to refresh Gmail token: ${text}`);
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Gmail token response missing access_token.");
  return data.access_token;
}

function buildRawMessage(params: {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}): string {
  const boundary = `bnd_${Date.now().toString(16)}`;
  const headers = [
    `From: ${params.from}`,
    `To: ${params.to}`,
    params.replyTo ? `Reply-To: ${params.replyTo}` : null,
    `Subject: ${encodeSubject(params.subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ]
    .filter(Boolean)
    .join("\r\n");

  const body = [
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    params.text,
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    params.html,
    `--${boundary}--`,
    "",
  ].join("\r\n");

  return `${headers}\r\n\r\n${body}`;
}

export async function POST(request: Request) {
  let payload: PersonalizedToursPayload;
  try {
    payload = (await request.json()) as PersonalizedToursPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const destination = payload.destination?.trim() ?? "";
  const travelDate = payload.travelDate?.trim() ?? "";
  const tripLength = payload.tripLength?.trim() ?? "";
  const travellers = payload.travellers?.toString().trim() ?? "";
  const budgetPerPerson = payload.budgetPerPerson?.trim() ?? "";
  const tourVision = payload.tourVision?.trim() ?? "";
  const firstName = payload.firstName?.trim() ?? "";
  const lastName = payload.lastName?.trim() ?? "";
  const country = payload.country?.trim() ?? "";
  const email = payload.email?.trim() ?? "";

  const missing =
    !destination ||
    !travelDate ||
    !tripLength ||
    !travellers ||
    !tourVision ||
    !firstName ||
    !lastName ||
    !country ||
    !email;

  if (missing) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!payload.acceptedPrivacy) {
    return NextResponse.json(
      { error: "You must accept the privacy policy." },
      { status: 400 },
    );
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const subject = "New Personalized Tour Inquiry";

  const text = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Country of residence: ${country}`,
    "",
    `Dream destination: ${destination}`,
    `Preferred travel date: ${travelDate}`,
    `Trip length: ${tripLength}`,
    `Number of travellers: ${travellers}`,
    `Budget per person: ${budgetPerPerson || "Not specified"}`,
    "",
    "Tour vision:",
    tourVision,
    "",
    payload.subscribe
      ? "Subscribed to updates: Yes"
      : "Subscribed to updates: No",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1C1F2A;">
      <h2 style="margin:0 0 16px 0;">New Personalized Tour Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p><strong>Country of residence:</strong> ${escapeHtml(country)}</p>
      <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />
      <p><strong>Dream destination:</strong> ${escapeHtml(destination)}</p>
      <p><strong>Preferred travel date:</strong> ${escapeHtml(travelDate)}</p>
      <p><strong>Trip length:</strong> ${escapeHtml(tripLength)}</p>
      <p><strong>Number of travellers:</strong> ${escapeHtml(travellers)}</p>
      <p><strong>Budget per person:</strong> ${escapeHtml(budgetPerPerson) || "Not specified"}</p>
      <p><strong>Tour vision:</strong><br/>${escapeHtml(tourVision).replace(/\n/g, "<br/>")}</p>
      <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />
      <p><strong>Subscribed to updates:</strong> ${payload.subscribe ? "Yes" : "No"}</p>
    </div>
  `.trim();

  try {
    const accessToken = await getAccessToken();

    const raw = toBase64Url(
      buildRawMessage({
        to: RECIPIENT,
        from: `ImHereTravels <${RECIPIENT}>`,
        replyTo: `${fullName} <${email}>`,
        subject,
        html,
        text,
      }),
    );

    const sendRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw }),
        cache: "no-store",
      },
    );

    if (!sendRes.ok) {
      const errorText = await sendRes.text();
      console.error("Gmail send failed:", errorText);
      return NextResponse.json(
        { error: "Failed to send inquiry. Please try again later." },
        { status: 502 },
      );
    }

    if (payload.subscribe) {
      try {
        await subscribeToMailchimp({
          email,
          firstName,
          lastName,
          tag: "Website Personalized Tours Form",
        });
      } catch (err) {
        console.error("Mailchimp subscribe (personalized tours form) failed:", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Personalized tours API error:", err);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again later." },
      { status: 500 },
    );
  }
}
