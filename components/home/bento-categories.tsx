"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import type { Category } from "@/types";

interface BentoCategoriesProps {
  categories: Category[];
}

export const BentoCategories: React.FC<BentoCategoriesProps> = ({ categories }) => {
  const spcCat = categories.find((c) => c.id === "cat-spc") || categories[0];
  const stoneCat = categories.find((c) => c.id === "cat-stone-alt") || categories[1];
  const softCat = categories.find((c) => c.id === "cat-soft-stone") || categories[2];

  return (
    <section className="py-16 sm:py-24 bg-background text-foreground" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-gold-600 dark:text-gold-400 uppercase">
            مجموعات يقين ستور
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1 text-foreground">
            تصفح التشكيلات حسب القسم
          </h2>
          <div className="gold-divider" />
          <p className="text-sm sm:text-base text-muted-foreground">
            حلول أرضيات وجدران فاخرة مصممة بعناية لتلائم أجود المعايير العصرية
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Hero Tile: SPC Flooring (Takes 7 cols) */}
          <Link
            href={`/categories/${spcCat.slug}`}
            className="md:col-span-7 group relative min-h-[380px] lg:min-h-[440px] rounded-3xl overflow-hidden border border-border/80 shadow-luxury transition-all duration-500 hover:shadow-2xl hover:border-gold-500/50"
          >
            <Image
              src={spcCat.image}
              alt={spcCat.nameAr}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white">
              <div className="inline-flex items-center gap-1.5 bg-gold-500 text-neutral-950 font-bold text-xs px-3 py-1 rounded-full mb-3">
                <Shield className="h-3.5 w-3.5" />
                <span>ضمان 25 سنة • مقاوم للماء 100%</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display">{spcCat.nameAr}</h3>
              <p className="text-neutral-300 text-sm mt-1 max-w-md line-clamp-2">
                أرضيات SPC الحديثة بنقشات الخشب الطبيعي، متانة قصوى وسهولة تركيب بنظام القفل.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-gold-300 group-hover:text-white transition-colors">
                <span>استكشف منتجات باركيه SPC</span>
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Right Column Stack (Takes 5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Tile 2: Stone Alternative */}
            <Link
              href={`/categories/${stoneCat.slug}`}
              className="group relative flex-1 min-h-[190px] rounded-3xl overflow-hidden border border-border/80 shadow-luxury transition-all duration-500 hover:shadow-2xl hover:border-gold-500/50"
            >
              <Image
                src={stoneCat.image}
                alt={stoneCat.nameAr}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <span className="text-[11px] font-semibold text-gold-400 tracking-wider uppercase">سطوح فاخرة</span>
                <h3 className="text-xl font-bold font-display">{stoneCat.nameAr}</h3>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-gold-300 group-hover:text-white transition-colors">
                  <span>تصفح البدائل الرخامية</span>
                  <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Tile 3: Soft Stone */}
            <Link
              href={`/categories/${softCat.slug}`}
              className="group relative flex-1 min-h-[190px] rounded-3xl overflow-hidden border border-border/80 shadow-luxury transition-all duration-500 hover:shadow-2xl hover:border-gold-500/50"
            >
              <Image
                src={softCat.image}
                alt={softCat.nameAr}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <span className="text-[11px] font-semibold text-gold-400 tracking-wider uppercase">تكسية جدارية</span>
                <h3 className="text-xl font-bold font-display">{softCat.nameAr}</h3>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-gold-300 group-hover:text-white transition-colors">
                  <span>استكشف تصاميم سوفت ستون</span>
                  <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};