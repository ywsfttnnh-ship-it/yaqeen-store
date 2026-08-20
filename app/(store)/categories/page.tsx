import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { categories, featuredCategories } from "@/lib/data/categories";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: "التصنيفات",
  description: `تصفح تصنيفات ${config.app.name.ar}: باركيه SPC، بديل حجر، سوفت ستون ومنتجات أخرى متميزة.`,
};

export default function CategoriesPage() {
  const displayCategories = featuredCategories.length > 0 ? featuredCategories : categories;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-1">التصنيفات</h1>
        <div className="gold-divider" />
        <p className="mt-2 text-muted-foreground">
          اكتشف مجموعتنا المتنوعة من حلول الأرضيات والجدران والديكورات
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayCategories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card shadow-xl shadow-black/5 transition-all duration-300 hover:border-gold-500/70 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={category.image}
                alt={category.imageAltAr || category.nameAr}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-white/5" />
              <div className="absolute bottom-4 inset-x-4 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A] [text-shadow:0_1px_2px_rgba(255,255,255,0.9)]">
                    {category.nameAr}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-neutral-700 [text-shadow:0_1px_1px_rgba(255,255,255,0.9)]">
                    {category.productCount} منتج
                  </p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6F1E5]/90 border border-gold-400/60 text-primary-700 shadow-luxury transition-transform duration-300 group-hover:translate-x-[-4px]">
                  <ArrowLeft className="h-5 w-5" />
                </span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {category.descriptionAr}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-primary-50 border border-primary-100 p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
            <Package className="h-7 w-7" />
          </div>
          <div className="flex-1 text-center sm:text-start">
            <h3 className="text-lg font-bold text-foreground">هل تبحث عن منتج معين؟</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              يمكنك التواصل معنا مباشرة وسيساعدك فريقنا في اختيار الأنسب لمساحتك وميزانيتك
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
          >
            تواصل معنا
          </Link>
        </div>
      </div>
    </div>
  );
}