"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ProductCard } from "@/components/product/product-card";
import type { Product, Category } from "@/types";

interface TabbedProductRailProps {
  products: Product[];
  categories: Category[];
}

export const TabbedProductRail: React.FC<TabbedProductRailProps> = ({ products, categories }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const filteredProducts = React.useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter((p) => p.categoryId === selectedCategory);
  }, [products, selectedCategory]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-card/50 dark:bg-[#161210] border-y border-border/60" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold-500" />
              <span className="text-xs font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-wider">
                منتجاتنا المختارة
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1 text-foreground">
              تصفح التشكيلات الممتازة
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full pb-2 md:pb-0 bg-neutral-200/60 dark:bg-neutral-900 p-1.5 rounded-full border border-border/60">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300",
                selectedCategory === "all"
                  ? "bg-gold-500 text-neutral-950 shadow-gold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              كافة المنتجات
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300",
                  selectedCategory === cat.id
                    ? "bg-gold-500 text-neutral-950 shadow-gold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {cat.nameAr}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Rail Container */}
        <div className="relative group/rail">
          {/* Scroll Buttons for Desktop */}
          <button
            onClick={() => scroll("right")}
            className="hidden lg:flex absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 h-10 w-10 items-center justify-center rounded-full bg-card border border-border shadow-2xl text-foreground hover:bg-gold-500 hover:text-neutral-950 transition-all opacity-0 group-hover/rail:opacity-100"
            aria-label="التالي"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => scroll("left")}
            className="hidden lg:flex absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 h-10 w-10 items-center justify-center rounded-full bg-card border border-border shadow-2xl text-foreground hover:bg-gold-500 hover:text-neutral-950 transition-all opacity-0 group-hover/rail:opacity-100"
            aria-label="السابق"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Swipe Rail */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-1"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="w-[260px] sm:w-[290px] shrink-0 snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-xs font-bold text-gold-600 dark:text-gold-400 hover:underline"
          >
            <span>شاهد المعرض الكامل للمتجر ({products.length} منتج)</span>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};