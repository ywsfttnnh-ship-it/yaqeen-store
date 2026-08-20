"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/context/cart-context";
import { useWishlist } from "@/lib/context/wishlist-context";
import type { Product } from "@/types";
import { config } from "@/lib/config";

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showQuickView = true, className }) => {
  const { addItem } = useCart();
  const { hasItem, toggleItem } = useWishlist();
  const [isAdding, setIsAdding] = React.useState(false);

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const secondaryImage = product.images.length > 1 ? product.images[1] : primaryImage;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, 1);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleWishlist = () => {
    toggleItem(product.id);
  };

  const inWishlist = hasItem(product.id);

  return (
    <div
      className={cn(
        "group relative flex flex-col bg-card border border-border rounded-xl",
        "shadow-xl shadow-black/5",
        "transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 hover:border-gold-500/60",
        "hover:-translate-y-1",
        className,
      )}
      data-product-id={product.id}
    >
      {/* Badges & Actions */}
      <div className="absolute inset-x-3 top-3 z-10 flex items-start justify-between" dir="ltr">
        <div className="flex max-w-[60%] flex-wrap gap-1.5">
          {product.newArrival && (
            <Badge variant="accent" className="text-xs">
              جديد
            </Badge>
          )}
          {product.bestSeller && (
            <Badge variant="gold" className="text-xs">
              الأكثر مبيعاً
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="default" className="text-xs">
              نفد المخزون
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleWishlist}
            className={cn(
              "rounded-full p-2 transition-all duration-200",
              "bg-[#F6F1E5]/90 text-neutral-700 hover:bg-[#F6F1E5] hover:text-accent-500 shadow-luxury",
              inWishlist && "bg-accent-500 text-white hover:bg-accent-600",
            )}
            aria-label={inWishlist ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            title={inWishlist ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <Heart
              className={cn("h-4 w-4", inWishlist && "fill-current")}
            />
          </button>

          {showQuickView && (
            <Link
              href={`/product/${product.slug}`}
              className="rounded-full p-2 bg-[#F6F1E5]/90 text-neutral-700 hover:bg-[#F6F1E5] hover:text-primary-600 shadow-luxury transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="عرض سريع"
              title="عرض سريع"
            >
              <Eye className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-xl bg-[#EAE1CD]">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <Image
            src={primaryImage?.url || "/placeholder.png"}
            alt={primaryImage?.altAr || product.nameAr}
            fill
            className={cn(
              "object-cover transition-opacity duration-500",
              "group-hover:opacity-0",
            )}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <Image
            src={secondaryImage?.url || "/placeholder.png"}
            alt={secondaryImage?.altAr || product.nameAr}
            fill
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="font-semibold text-neutral-900 text-sm line-clamp-1 mb-1 group-hover:text-primary-700 transition-colors">
            {product.nameAr}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
          {product.shortDescriptionAr}
        </p>

        {/* Price */}
        {!config.app.hidePrices && (
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-bold text-lg text-primary-700">{formatCurrency(product.price)}</span>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating)
                    ? "fill-gold-400 text-gold-400"
                    : i < product.rating
                      ? "fill-gold-400/50 text-gold-400/50"
                      : "text-neutral-300",
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Category */}
        <p className="text-xs text-muted-foreground mb-3">
          {product.categoryId === "cat-spc" && "باركيه SPC"}
          {product.categoryId === "cat-stone-alt" && "بديل حجر"}
          {product.categoryId === "cat-soft-stone" && "سوفت ستون"}
        </p>

        {/* Add to Cart */}
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={handleAddToCart}
          isLoading={isAdding}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4 me-1" />
          {product.stock === 0 ? "نفد المخزون" : "أضف إلى السلة"}
        </Button>
      </div>
    </div>
  );
};
