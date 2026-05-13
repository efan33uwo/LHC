import {
  Accessibility,
  Activity,
  Bandage,
  Bone,
  CalendarCheck,
  CarFront,
  ClipboardCheck,
  Dumbbell,
  Footprints,
  HandHeart,
  Syringe,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

export type ServiceVisual = {
  icon: LucideIcon;
  eyebrow: string;
  highlights: string[];
  surfaceClass: string;
  iconClass: string;
};

const serviceVisuals: ServiceVisual[] = [
  {
    icon: CarFront,
    eyebrow: "MVA claims",
    highlights: ["Accident care", "Claims help"],
    surfaceClass: "bg-[#fffaf2]",
    iconClass: "bg-[#f5e6d2] text-[#875d2f]",
  },
  {
    icon: Accessibility,
    eyebrow: "Spinal injury",
    highlights: ["Mobility", "Rehab plan"],
    surfaceClass: "bg-[#f4f8f1]",
    iconClass: "bg-[#dcebd5] text-[#3d6f48]",
  },
  {
    icon: Dumbbell,
    eyebrow: "Sports injury",
    highlights: ["Performance", "Recovery"],
    surfaceClass: "bg-[#f8f5ef]",
    iconClass: "bg-[#e8dfcf] text-[#6f5b3a]",
  },
  {
    icon: Footprints,
    eyebrow: "Slip and fall",
    highlights: ["Fall recovery", "Pain care"],
    surfaceClass: "bg-[#f3f7f8]",
    iconClass: "bg-[#d9e8ea] text-[#2f6870]",
  },
  {
    icon: Activity,
    eyebrow: "Physiotherapy",
    highlights: ["Strength", "Mobility"],
    surfaceClass: "bg-[#fbf6f6]",
    iconClass: "bg-[#efdada] text-[#8a4343]",
  },
  {
    icon: Bone,
    eyebrow: "Chiropractic",
    highlights: ["Spine care", "Joints"],
    surfaceClass: "bg-[#f8f4fa]",
    iconClass: "bg-[#eadcf0] text-[#714a7d]",
  },
  {
    icon: HandHeart,
    eyebrow: "RMT",
    highlights: ["Soft tissue", "Relax"],
    surfaceClass: "bg-[#f4f8f1]",
    iconClass: "bg-[#dcebd5] text-[#3d6f48]",
  },
  {
    icon: Syringe,
    eyebrow: "Acupuncture",
    highlights: ["Pain support", "Tension"],
    surfaceClass: "bg-[#fffaf2]",
    iconClass: "bg-[#f5e6d2] text-[#875d2f]",
  },
  {
    icon: WalletCards,
    eyebrow: "Extended health",
    highlights: ["Coverage", "Receipts"],
    surfaceClass: "bg-[#f3f7f8]",
    iconClass: "bg-[#d9e8ea] text-[#2f6870]",
  },
  {
    icon: Bandage,
    eyebrow: "Injury care",
    highlights: ["Assessment", "Treatment plan"],
    surfaceClass: "bg-[#fbf6f6]",
    iconClass: "bg-[#efdada] text-[#8a4343]",
  },
  {
    icon: ClipboardCheck,
    eyebrow: "Care planning",
    highlights: ["Next steps", "Follow-through"],
    surfaceClass: "bg-[#fffaf2]",
    iconClass: "bg-[#f5e6d2] text-[#875d2f]",
  },
  {
    icon: CalendarCheck,
    eyebrow: "Appointments",
    highlights: ["Booking help", "Clinic follow-up"],
    surfaceClass: "bg-[#f3f7f8]",
    iconClass: "bg-[#d9e8ea] text-[#2f6870]",
  },
];

export function getServiceVisual(index: number) {
  return serviceVisuals[index % serviceVisuals.length];
}
