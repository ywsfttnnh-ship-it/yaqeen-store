"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/types";

interface CategoryBannerProps {
  category: Category;
  className?: string;
}

export const CategoryBanner: React.FC<CategoryBannerProps> = ({ category, className }) => {
  return (
    <section className={cn("relative py-20 overflow-hidden border-y border-gold-500/30", className)} dir="rtl">
      <div className="absolute inset-0">
        <Image
          src={category.image}
          alt={category.imageAltAr || category.nameAr}
          fill
          className="object-cover object-center brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_80%_20%,rgba(212,175,55,0.18),transparent_70%)]" />
      </div>

      <div className="container mx-auto relative px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-3xl">
          <Badge variant="gold" className="mb-4">
            {category.nameAr}
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {category.nameAr}
          </h2>
          <p className="text-lg text-neutral-200 mb-8 line-clamp-3 md:line-clamp-none">
            {category.descriptionAr}
          </p>
          <Link href={`/categories/${category.slug}`}>
            <Button variant="gold" size="lg">
              استكشف المنتجات
              <ArrowLeft className="h-5 w-5 ms-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
