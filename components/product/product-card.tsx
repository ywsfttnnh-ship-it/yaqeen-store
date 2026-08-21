"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowLeft, Star, Phone } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/lib/context/wishlist-context";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { hasItem, toggleItem } = useWishlist();

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const secondaryImage = product.images.length > 1 ? product.images[1] : primaryImage;

  const inWishlist = hasItem(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
  };

  const getCategoryLabel = (catId: string) => {
    if (catId === "cat-spc") return "باركيه SPC";
    if (catId === "cat-stone-alt") return "بديل حجر";
    if (catId === "cat-soft-stone") return "سوفت ستون";
    return "يقين ستور";
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col bg-card dark:bg-[#181412] border border-border/80 rounded-2xl overflow-hidden",
        "shadow-luxury transition-all duration-500 ease-out",
        "hover:-translate-y-1.5 hover:shadow-2xl hover:border-gold-500/50 hover:shadow-gold/10",
        className,
      )}
      data-product-id={product.id}
    >
      {/* Badges & Wishlist Overlay */}
      <div className="absolute inset-x-3 top-3 z-20 flex items-start justify-between" dir="ltr">
        <div className="flex max-w-[70%] flex-wrap gap-1.5">
          {product.newArrival && (
            <Badge variant="accent" className="text-[10px] font-semibold tracking-wide py-0.5 px-2 bg-accent-600 text-white shadow-sm">
              جديد
            </Badge>
          )}
          {product.bestSeller && (
            <Badge variant="gold" className="text-[10px] font-semibold tracking-wide py-0.5 px-2 bg-gold-500 text-neutral-950 shadow-sm">
              الأكثر مبيعاً
            </Badge>
          )}
        </div>

        <button
          type="button"
          onClick={handleWishlist}
          className={cn(
            "rounded-full p-2 transition-all duration-300 backdrop-blur-md",
            "bg-white/80 dark:bg-black/60 text-neutral-700 dark:text-neutral-200 hover:scale-110 shadow-md",
            inWishlist && "bg-accent-500 text-white dark:bg-accent-500 hover:bg-accent-600",
          )}
          aria-label={inWishlist ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
        >
          <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
        </button>
      </div>

      {/* Image Showcase Container with Smooth Depth Hover */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/4.5] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-900 group">
        <Image
          src={primaryImage?.url || "/placeholder.png"}
          alt={primaryImage?.altAr || product.nameAr}
          fill
          className={cn(
            "object-cover transition-transform duration-700 ease-out",
            "group-hover:scale-108 group-hover:brightness-105",
            secondaryImage && "group-hover:opacity-0",
          )}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {secondaryImage && secondaryImage !== primaryImage && (
          <Image
            src={secondaryImage.url}
            alt={secondaryImage.altAr || product.nameAr}
            fill
            className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-108 group-hover:opacity-100"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5" dir="rtl">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-semibold tracking-wider text-gold-600 dark:text-gold-400 uppercase">
            {getCategoryLabel(product.categoryId)}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
            <span className="font-medium text-foreground">{product.rating}</span>
          </div>
        </div>

        <Link href={`/product/${product.slug}`} className="block group/title">
          <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-1 group-hover/title:text-gold-500 transition-colors">
            {product.nameAr}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed flex-1">
          {product.shortDescriptionAr}
        </p>

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground group-hover:text-gold-500 transition-colors"
          >
            <span>التفاصيل</span>
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <a
            href="tel:+972597426988"
            className="inline-flex items-center gap-1 text-[11px] font-medium bg-gold-500/15 text-gold-600 dark:text-gold-300 hover:bg-gold-500 hover:text-neutral-950 px-3 py-1.5 rounded-full transition-all duration-200"
            title="تواصل معنا للاستفسار"
          >
            <Phone className="h-3 w-3" />
            <span>اطلب الآن</span>
          </a>
        </div>
      </div>
    </div>
  );
};
