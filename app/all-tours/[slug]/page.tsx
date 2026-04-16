import { notFound, permanentRedirect } from "next/navigation";
import { getTourBySlug } from "@/data/tours";

type Params = Promise<{ slug: string }>;

const LEGACY_TOUR_SLUG_ALIASES: Record<string, string> = {
  "brazils-treasure": "brazils-treasures",
};

export default async function AllToursPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const normalizedSlug = LEGACY_TOUR_SLUG_ALIASES[slug] ?? slug;

  if (!getTourBySlug(normalizedSlug)) {
    notFound();
  }

  permanentRedirect(`/tours/${normalizedSlug}`);
}
