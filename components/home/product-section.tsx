"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types";

interface ProductSectionProps {
  products: Product[];
  sectionTitle: string;
  sectionDescription: string;
  viewAllHref: string;
  badge?: string;
  className?: string;
  badgeVariant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "gold";
  variant?: "light" | "dark";
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  sectionTitle,
  sectionDescription,
  viewAllHref,
  badge = "",
  className,
  badgeVariant = "gold",
  variant = "light",
}) => {
  if (!products || products.length === 0) return null;

  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "relative py-20",
        isDark ? "section-dark text-neutral-50" : "section-light",
        className,
      )}
      dir="rtl"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center justify-between gap-4">
          <div className="text-center">
            <Badge
              variant={isDark && badgeVariant === "gold" ? "gold" : badgeVariant}
              className="mb-3"
            >
              {badge}
            </Badge>
            <h2 className={cn("text-3xl font-bold mb-1", isDark ? "text-white" : "text-foreground")}>
              {sectionTitle}
            </h2>
            <div className="gold-divider" />
            <p className={cn("mx-auto max-w-2xl", isDark ? "text-slate-300" : "text-muted-foreground")}>
              {sectionDescription}
            </p>
          </div>
          <Link
            href={viewAllHref}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium transition-colors",
              isDark ? "text-gold-400 hover:text-gold-300" : "text-primary-600 hover:text-primary-700",
            )}
          >
            <span>عرض الكل</span>
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
