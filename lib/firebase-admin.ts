/**
 * Firebase Admin SDK singleton for server-side Firestore access.
 *
 * Credentials are read from the FIREBASE_SERVICE_ACCOUNT env var, which must
 * hold the full service-account JSON as a base-64–encoded string.  In
 * development, set it in `www/web/.env.local`:
 *
 *   FIREBASE_SERVICE_ACCOUNT=<base64-of-service-account.json>
 *
 * In CI / production, inject it as an environment variable.
 *
 * This module is server-only (no "use client" export) and must never be
 * imported by client components.
 */

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

function getServiceAccount() {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!b64) {
    throw new Error(
      "Missing FIREBASE_SERVICE_ACCOUNT env var. " +
        "Set it to the base-64-encoded service-account JSON.",
    );
  }
  return JSON.parse(Buffer.from(b64, "base64").toString("utf-8"));
}

/**
 * Storage bucket name. Prefer the explicit FIREBASE_STORAGE_BUCKET env var; fall
 * back to `<project-id>.firebasestorage.app` (this project's bucket — see the
 * `firebasestorage.googleapis.com` remotePattern in next.config.ts). Override via
 * env if the project ever moves to the legacy `<project-id>.appspot.com` naming.
 */
function getBucketName(serviceAccount: { project_id?: string }): string {
  return (
    process.env.FIREBASE_STORAGE_BUCKET ||
    `${serviceAccount.project_id}.firebasestorage.app`
  );
}

function getApp() {
  if (getApps().length > 0) return getApps()[0]!;

  const serviceAccount = getServiceAccount();
  return initializeApp({
    credential: cert(serviceAccount),
    storageBucket: getBucketName(serviceAccount),
  });
}

export const adminDb = getFirestore(getApp());

/** Default Storage bucket for server-side uploads (review photos/avatars). */
export const adminBucket = getStorage(getApp()).bucket();
