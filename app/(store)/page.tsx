import type { Metadata } from "next";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data";
import { CinematicHomePage } from "@/components/home/cinematic-home-page";

export const metadata: Metadata = {
  title: "يقين ستور | Yaqeen Store - أرضيات SPC وبدائل الحجر وسوفت ستون",
  description:
    "متجر يقين ستور - اكتشف أرضيات SPC وبدائل الحجر وسوفت ستون عالية الجودة في الخليل وفلسطين. ضمان 25 سنة. مقاومة ماء 100%. التوصيل لجميع مناطق الضفة الغربية.",
};

export default function HomePage() {
  return <CinematicHomePage categories={categories} products={products} />;
}
