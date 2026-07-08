/**
 * Server-side image/video upload for review avatars, trip photos, and the
 * (single) trip video.
 *
 * `web/` has no client Firebase SDK, so uploads go through a route handler that
 * calls this helper (firebase-admin/storage). Files land in the same bucket as
 * tour images, under `review-avatars/`, `review-photos/{tourId}/`, and
 * `review-videos/{tourId}/`.
 *
 * We attach a Firebase download token so the returned URL is permanent and
 * public without toggling bucket ACLs — the same `firebasestorage.googleapis.com`
 * URL shape the rest of the site already serves.
 */

import { randomUUID } from "crypto";
import { adminBucket } from "@/lib/firebase-admin";

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/quicktime"];

export const MAX_AVATAR_BYTES = 5 * 1024 * 1024; // 5MB
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024; // 8MB
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50MB
export const MAX_PHOTOS_PER_REVIEW = 6;
export const MAX_VIDEOS_PER_REVIEW = 1;

export type UploadKind = "avatar" | "photo" | "video";

export interface UploadValidationError {
  ok: false;
  error: string;
}
export interface UploadSuccess {
  ok: true;
  url: string;
  path: string;
}

function sanitize(name: string): string {
  const ext = name.includes(".") ? name.split(".").pop() : "jpg";
  const base = name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "_");
  return `${base}_${Date.now()}_${randomUUID().slice(0, 8)}.${ext}`;
}

export function validateImage(
  kind: UploadKind,
  contentType: string,
  size: number,
): UploadValidationError | null {
  if (kind === "video") {
    if (!ALLOWED_VIDEO_TYPES.includes(contentType)) {
      return {
        ok: false,
        error: `Unsupported video type "${contentType}". Use MP4 or MOV.`,
      };
    }
    if (size > MAX_VIDEO_BYTES) {
      return {
        ok: false,
        error: `Video is ${(size / 1024 / 1024).toFixed(1)}MB — max is ${(MAX_VIDEO_BYTES / 1024 / 1024).toFixed(0)}MB.`,
      };
    }
    return null;
  }

  if (!ALLOWED_IMAGE_TYPES.includes(contentType)) {
    return {
      ok: false,
      error: `Unsupported image type "${contentType}". Use JPEG, PNG, or WebP.`,
    };
  }
  const max = kind === "avatar" ? MAX_AVATAR_BYTES : MAX_PHOTO_BYTES;
  if (size > max) {
    return {
      ok: false,
      error: `Image is ${(size / 1024 / 1024).toFixed(1)}MB — max is ${(max / 1024 / 1024).toFixed(0)}MB.`,
    };
  }
  return null;
}

export async function uploadReviewImage(params: {
  kind: UploadKind;
  tourId?: string;
  fileName: string;
  contentType: string;
  buffer: Buffer;
}): Promise<UploadSuccess> {
  const folder =
    params.kind === "avatar"
      ? "review-avatars"
      : params.kind === "video"
        ? `review-videos/${params.tourId || "misc"}`
        : `review-photos/${params.tourId || "misc"}`;
  const objectPath = `${folder}/${sanitize(params.fileName)}`;
  const token = randomUUID();

  const file = adminBucket.file(objectPath);
  await file.save(params.buffer, {
    contentType: params.contentType,
    resumable: false,
    metadata: {
      cacheControl: "public, max-age=31536000, immutable",
      metadata: { firebaseStorageDownloadTokens: token },
    },
  });

  const url = `https://firebasestorage.googleapis.com/v0/b/${adminBucket.name}/o/${encodeURIComponent(
    objectPath,
  )}?alt=media&token=${token}`;

  return { ok: true, url, path: objectPath };
}
