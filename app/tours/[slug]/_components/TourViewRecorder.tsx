"use client";

import { useEffect } from "react";
import { recordTourView } from "@/app/tours/_components/RecentlyViewedTours";

export default function TourViewRecorder({ slug }: { slug: string }) {
  useEffect(() => {
    recordTourView(slug);
  }, [slug]);

  return null;
}
