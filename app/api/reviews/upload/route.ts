import { NextResponse } from "next/server";
import {
  MAX_PHOTO_BYTES,
  MAX_VIDEO_BYTES,
  uploadReviewImage,
  validateImage,
  type UploadKind,
} from "@/lib/review-upload";

export const runtime = "nodejs";

// Cap the raw request body defensively (single largest allowed file + slack).
export const maxDuration = 30;

const KINDS: UploadKind[] = ["avatar", "photo", "video"];

/**
 * POST /api/reviews/upload — upload one review file (avatar, trip photo, or
 * trip video) to Firebase Storage and return its permanent public URL.
 *
 * multipart/form-data: { file: File, kind: "avatar" | "photo" | "video", tourId?: string }
 * Returns: { ok: true, url } | { ok: false, error }
 *
 * Public but low-risk: files are validated (type + size) and namespaced. The
 * URL is only usable in a review once the submission passes booking verification.
 */
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Expected multipart form data." },
      { status: 400 },
    );
  }

  const file = form.get("file");
  const rawKind = form.get("kind") as string;
  const kind: UploadKind = KINDS.includes(rawKind as UploadKind)
    ? (rawKind as UploadKind)
    : "photo";
  const tourId = (form.get("tourId") as string) || undefined;

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file provided." }, { status: 400 });
  }
  const maxBytes = kind === "video" ? MAX_VIDEO_BYTES : MAX_PHOTO_BYTES;
  if (file.size > maxBytes) {
    return NextResponse.json(
      { ok: false, error: kind === "video" ? "Video is too large." : "Image is too large." },
      { status: 413 },
    );
  }

  const contentType = file.type || "application/octet-stream";
  const validationError = validateImage(kind, contentType, file.size);
  if (validationError) {
    return NextResponse.json(validationError, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadReviewImage({
      kind,
      tourId,
      fileName: file.name || "image",
      contentType,
      buffer,
    });
    return NextResponse.json({ ok: true, url: result.url, path: result.path });
  } catch (err) {
    console.error("Review image upload failed:", err);
    return NextResponse.json(
      { ok: false, error: "Upload failed. Please try again." },
      { status: 500 },
    );
  }
}
