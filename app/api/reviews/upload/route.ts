import { NextResponse } from "next/server";
import {
  MAX_PHOTO_BYTES,
  uploadReviewImage,
  validateImage,
  type UploadKind,
} from "@/lib/review-upload";

export const runtime = "nodejs";

// Cap the raw request body defensively (single largest allowed image + slack).
export const maxDuration = 30;

/**
 * POST /api/reviews/upload — upload one review image (avatar or trip photo) to
 * Firebase Storage and return its permanent public URL.
 *
 * multipart/form-data: { file: File, kind: "avatar" | "photo", tourId?: string }
 * Returns: { ok: true, url } | { ok: false, error }
 *
 * Public but low-risk: images are validated (type + size) and namespaced. The
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
  const kind = (form.get("kind") as string) === "avatar" ? "avatar" : "photo";
  const tourId = (form.get("tourId") as string) || undefined;

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file provided." }, { status: 400 });
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Image is too large." },
      { status: 413 },
    );
  }

  const contentType = file.type || "application/octet-stream";
  const validationError = validateImage(kind as UploadKind, contentType, file.size);
  if (validationError) {
    return NextResponse.json(validationError, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadReviewImage({
      kind: kind as UploadKind,
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
