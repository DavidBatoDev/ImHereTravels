"use client";

import { motion } from "framer-motion";
import BookingCard from "./BookingCard";
import type { Tour } from "@/types/tour";

export default function BookingCardReveal({
  booking,
}: {
  booking: Tour["booking"];
}) {
  return (
    <motion.div
      className="hidden lg:block lg:pt-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <BookingCard booking={booking} sticky />
    </motion.div>
  );
}
