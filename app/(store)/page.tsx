import type { Metadata } from "next";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data";
import { HeroSection } from "@/components/home/hero-section";
import { BentoCategories } from "@/components/home/bento-categories";
import { TabbedProductRail } from "@/components/home/tabbed-product-rail";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Truck, Phone, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "يقين ستور | Yaqeen Store - أرضيات SPC وبدائل الحجر وسوفت ستون",
  description:
    "متجر يقين ستور - اكتشف أرضيات SPC وبدائل الحجر وسوفت ستون عالية الجودة في الخليل وفلسطين. ضمان 25 سنة. مقاومة ماء 100%. التوصيل لجميع مناطق الضفة الغربية.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Immersive Hero Section */}
      <HeroSection />

      {/* 2. Modern Bento Grid Categories */}
      <BentoCategories categories={categories} />

      {/* 3. Interactive Tabbed Product Rail (Prevents long vertical scrolling) */}
      <TabbedProductRail products={products} categories={categories} />

      {/* 4. Luxury Architectural Spotlight / Craftsmanship */}
      <section className="py-20 bg-[#14110F] text-white relative overflow-hidden" dir="rtl">
        <div className="absolute inset-0 bg-radial-[at_center] from-gold-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 border border-gold-500/30 px-4 py-1.5 text-xs font-semibold text-gold-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>معايير الجودة العالمية في فلسطين</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                لماذا يختار المهندسون وأصحاب المنازل <span className="gold-gradient-text">يقين ستور</span>؟
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                نحن لا نبيع منتجات أرضيات وجدران فحسب، بل نقدم حلولاً معمارية متكاملة تضفي الفخامة والدفء على مساحاتك الخاصة. منتجاتنا مختارة بعناية لتتحمل ظروف الاستخدام اليومي مع ضمان حقيقي يصل إلى 25 سنة.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                  <ShieldCheck className="h-6 w-6 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-white">ضمان 25 سنة</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">ثقة مطلقة بجودة مواد التصنيع والتحمل.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                  <Truck className="h-6 w-6 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-white">توصيل للضفة</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">خدمة توصيل سريعة وموثوقة لجميع المناطق.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <a href="tel:+972597426988">
                  <Button variant="gold" size="lg" className="rounded-full px-8 shadow-gold">
                    <Phone className="h-4 w-4 me-2" />
                    <span>تواصل معنا للاستفسار</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Visual Box */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gold-500/35 shadow-3d bg-neutral-900">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 via-transparent to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center z-20">
                <div className="max-w-md space-y-3">
                  <span className="text-xs font-semibold text-gold-400 tracking-widest uppercase">مقرنا الرئيسي</span>
                  <h3 className="text-2xl font-bold font-display">الخليل، فلسطين</h3>
                  <p className="text-xs text-neutral-300">
                    جاهزون لاستقبال استفساراتكم وتقديم الاستشارات الهندسية لاختيار الأنسب لمنزلكم أو مشروعكم التجاري.
                  </p>
                  <a
                    href="tel:+972597426988"
                    className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-white pt-2"
                    dir="ltr"
                  >
                    <span>+972 59-742-6988</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
