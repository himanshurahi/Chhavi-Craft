import {
  RiBook2Line,
  RiPenNibLine,
  RiComputerLine,
  RiGiftLine,
  RiCalendarLine,
  RiCupLine,
  RiBankCardLine,
  RiHeartLine,
  RiSearchLine,
  RiBuildingLine,
  RiEditLine,
  RiLightbulbLine,
  RiVipDiamondLine,
  RiQrCodeLine,
  RiImageLine,
} from "react-icons/ri";
import { SiAmazon } from "react-icons/si";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  RiBook2Line,
  RiPenNibLine,
  RiComputerLine,
  RiGiftLine,
  RiCalendarLine,
  RiCupLine,
  RiBankCardLine,
  RiHeartLine,
  RiSearchLine,
  RiBuildingLine,
  RiEditLine,
  RiLightbulbLine,
  RiVipDiamondLine,
  RiGemLine: RiVipDiamondLine, // API may send RiGemLine
  RiQrCodeLine,
  RiImageLine,
  SiAmazon,
  SiAmzon: SiAmazon, // typo alias
};

const colorClasses = [
  "text-red-500",
  "text-teal-500",
  "text-amber-600",
  "text-sky-400",
  "text-gray-600",
  "text-blue-500",
  "text-pink-500",
  "text-emerald-500",
];

export function getCategoryIcon(iconName: string | null) {
  if (!iconName || !iconMap[iconName]) return RiGiftLine;
  return iconMap[iconName];
}

export function getCategoryColor(index: number) {
  return colorClasses[index % colorClasses.length];
}
