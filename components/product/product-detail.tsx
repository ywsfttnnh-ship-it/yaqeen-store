"use client";

import * as React from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingCart, Heart, Truck, ShieldCheck, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatCurrency, calculateDiscountPercentage, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { useCart } from "@/lib/context/cart-context";
import { useWishlist } from "@/lib/context/wishlist-context";
import type { Product, Review } from "@/types";
import { config } from "@/lib/config";

interface ProductDetailProps {
  product: Product;
  reviews: Review[];
  ratingInfo: { rating: number; reviewCount: number };
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, reviews, ratingInfo }) => {
  const { addItem, openCart } = useCart();
  const { hasItem, toggleItem } = useWishlist();
  const [quantity, setQuantity] = React.useState(1);
  const [activeImage, setActiveImage] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState<"description" | "specs" | "reviews">("description");

  const images = product.images;
  const primaryImage = images.find((i) => i.isPrimary) || images[0];
  const discount = product.comparePrice ? calculateDiscountPercentage(product.comparePrice, product.price) : 0;
  const inWishlist = hasItem(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-neutral-100">
            <Image
              src={images[activeImage]?.url || primaryImage?.url || "/placeholder.png"}
              alt={images[activeImage]?.altAr || primaryImage?.altAr || product.nameAr}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 z-10 flex gap-2" dir="ltr">
              {product.newArrival && <Badge variant="accent">جديد</Badge>}
              {product.bestSeller && <Badge variant="gold">الأكثر مبيعاً</Badge>}
              {discount > 0 && <Badge variant="danger">خصم {discount}%</Badge>}
            </div>
          </div>
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-xl border-2 transition-all",
                    activeImage === idx ? "border-primary-600" : "border-transparent hover:border-border",
                  )}
                  aria-label={`صورة ${idx + 1}`}
                >
                  <Image
                    src={img.url}
                    alt={img.altAr}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Rating rating={ratingInfo.rating} />
            <span className="text-sm text-muted-foreground">
              {ratingInfo.rating} ({ratingInfo.reviewCount} تقييم)
            </span>
          </div>

          <h1 className="text-3xl font-bold text-foreground">{product.nameAr}</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">{product.shortDescriptionAr}</p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-primary-700">{formatCurrency(product.price)}</span>
            {product.comparePrice && (
              <span className="text-lg text-muted-foreground line-through">{formatCurrency(product.comparePrice)}</span>
            )}
            {discount > 0 && <Badge variant="success">وفّر {discount}%</Badge>}
          </div>

          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <span>الكمية: 1 متر مربع</span>
            <span>الضمان: {product.warrantyAr}</span>
          </div>

          <div className="mt-6 space-y-3 border-t border-border pt-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Truck className="h-5 w-5 text-primary-600" />
              <span>
                شحن مجاني للطلبات فوق {formatCurrency(config.delivery.freeThreshold)} — التوصيل خلال{" "}
                {config.delivery.estimatedDays.standard}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-primary-600" />
              <span>ضمان {product.warrantyAr} على الجودة</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <RefreshCcw className="h-5 w-5 text-primary-600" />
              <span>إرجاع سهل خلال 14 يوم</span>
            </div>
          </div>

          {/* Quantity + Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-lg border border-border">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 text-muted-foreground hover:text-foreground"
                aria-label="تقليل الكمية"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="p-3 text-muted-foreground hover:text-foreground"
                aria-label="زيادة الكمية"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 min-w-[200px]"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 me-1" />
              {product.stock === 0 ? "نفد المخزون" : "أضف إلى السلة"}
            </Button>

            <Button
              variant={inWishlist ? "accent" : "outline"}
              size="lg"
              onClick={() => toggleItem(product.id)}
              aria-label="المفضلة"
            >
              <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
            </Button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            {product.stock > 0 ? `${product.stock} قطعة متوفرة في المخزون` : "المنتج غير متوفر حالياً"}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14">
        <div className="flex gap-2 border-b border-border" role="tablist">
          {[
            { id: "description" as const, label: "الوصف" },
            { id: "specs" as const, label: "المواصفات" },
            { id: "reviews" as const, label: `التقييمات (${reviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                activeTab === tab.id
                  ? "border-primary-600 text-primary-700"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === "description" && (
            <div className="prose prose-neutral max-w-none" dir="rtl">
              <p className="text-muted-foreground leading-relaxed">{product.descriptionAr}</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-border p-4 text-center">
                  <p className="text-sm text-muted-foreground">الخامة</p>
                  <p className="mt-1 font-medium">{product.materialAr}</p>
                </div>
                <div className="rounded-xl border border-border p-4 text-center">
                  <p className="text-sm text-muted-foreground">اللمسة النهائية</p>
                  <p className="mt-1 font-medium">{product.finishAr}</p>
                </div>
                <div className="rounded-xl border border-border p-4 text-center">
                  <p className="text-sm text-muted-foreground">الضمان</p>
                  <p className="mt-1 font-medium">{product.warrantyAr}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { name: "الخامة", value: product.materialAr },
                    { name: "اللمسة النهائية", value: product.finishAr },
                    { name: "الضمان", value: product.warrantyAr },
                    { name: "الأبعاد", value: `${product.dimensions.length} × ${product.dimensions.width} × ${product.dimensions.height} مم` },
                    { name: "الوزن", value: `${product.weight} كجم` },
                    { name: "رمز المنتج (SKU)", value: product.sku },
                    ...product.specifications.map((spec) => ({ name: spec.nameAr, value: spec.valueAr })),
                  ].map((row, idx) => (
                    <tr key={row.name} className={cn(idx % 2 === 0 ? "bg-[#EDE5D2]" : "bg-card")}>
                      <td className="px-4 py-3 font-medium w-1/3">{row.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="mb-6 flex items-center gap-6 rounded-xl bg-neutral-50 border border-border p-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-700">{ratingInfo.rating}</p>
                  <Rating rating={ratingInfo.rating} className="mt-1" />
                  <p className="mt-1 text-xs text-muted-foreground">{ratingInfo.reviewCount} تقييم</p>
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.filter((r) => Math.round(r.rating) === star).length;
                      const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
                      return (
                        <div key={star} className="flex items-center gap-3 text-sm">
                          <span className="w-8 text-muted-foreground">{star} ★</span>
                          <div className="h-2 flex-1 rounded-full bg-neutral-200 overflow-hidden">
                            <div className="h-full rounded-full bg-gold-400" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-8 text-xs text-muted-foreground">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-xl border border-border p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-700">
                            {review.userNameAr.charAt(0)}
                          </span>
                          <div>
                            <p className="font-medium">{review.userNameAr}</p>
                            <Rating rating={review.rating} className="mt-0.5" />
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
                      </div>
                      <p className="mt-4 text-sm font-medium">{review.titleAr}</p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{review.commentAr}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center text-muted-foreground">
                  لا توجد تقييمات لهذا المنتج بعد
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
