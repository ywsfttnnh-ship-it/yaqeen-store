"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/types";

interface CategoriesSectionProps {
  categories: Category[];
  className?: string;
  variant?: "light" | "dark";
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  className,
  variant = "light",
}) => {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "relative py-20 overflow-hidden",
        isDark ? "section-dark text-neutral-50" : "section-light",
        className,
      )}
      dir="rtl"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant={isDark ? "gold" : "primary"} className="mb-3">
            تسوق حسب القسم
          </Badge>
          <h2 className={cn("text-3xl font-bold mb-1", isDark ? "text-white" : "text-foreground")}>
            تصفح منتجاتنا حسب الفئة
          </h2>
          <div className="gold-divider" />
          <p className={cn("mx-auto max-w-2xl", isDark ? "text-slate-300" : "text-muted-foreground")}>
            نقدم مجموعة واسعة من الحلول المنزلية المتميزة لكل مساحة في منزلك
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl bg-card",
                  "border-2 border-border shadow-xl shadow-black/5",
                  "transform transition-all duration-500",
                  "hover:border-gold-500/70 hover:shadow-2xl hover:shadow-black/10",
                  "group-hover:scale-[1.02]",
                )}
              >
                {/* Category Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.imageAltAr || category.nameAr}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700",
                      "group-hover:scale-110 group-hover:brightness-105",
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-white/10" />
                </div>

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3
                      className="text-2xl font-bold text-[#1A1A1A] mb-2 [text-shadow:0_1px_2px_rgba(255,255,255,0.9)]"
                    >
                      {category.nameAr}
                    </h3>
                    <p className="text-sm text-neutral-700 mb-4 line-clamp-2 [text-shadow:0_1px_1px_rgba(255,255,255,0.9)]">
                      {category.descriptionAr}
                    </p>
                    <div className="flex items-center gap-1 text-gold-700">
                      <span className="font-medium">{category.productCount} منتجات</span>
                      <ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
