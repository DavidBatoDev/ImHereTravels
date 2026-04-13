import {
  Calendar,
  Route,
  Users,
  Bus,
  Plane,
  Hotel,
  Compass,
  Utensils,
  HandHeart,
  CheckCircle2,
  MapPin,
  Info,
  HelpCircle,
  Download,
  Camera,
  Luggage,
  ShieldCheck,
  Sun,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import type { TourIcon } from "@/types/tour";

const MAP: Record<TourIcon, LucideIcon> = {
  days: Calendar,
  route: Route,
  people: Users,
  transport: Bus,
  airport: Plane,
  accommodation: Hotel,
  activities: Compass,
  meals: Utensils,
  team: HandHeart,
  plus: CheckCircle2,
  location: MapPin,
  info: Info,
  faq: HelpCircle,
  download: Download,
  instagram: Camera,
  luggage: Luggage,
  shield: ShieldCheck,
  sun: Sun,
  handshake: HeartHandshake,
};

export default function Icon({
  name,
  className = "size-5",
}: {
  name: TourIcon;
  className?: string;
}) {
  const LucideCmp = MAP[name];
  return <LucideCmp aria-hidden className={className} strokeWidth={2.75} />;
}
