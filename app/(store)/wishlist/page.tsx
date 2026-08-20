"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { useWishlist } from "@/lib/context/wishlist-context";
import { useCart } from "@/lib/context/cart-context";
import { formatCurrency, calculateDiscountPercentage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WishlistPage() {
  const { products, removeItem, clearWishlist, itemCount } = useWishlist();
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = React.useState<Set<string>>(new Set());

  const handleAddAll = () => {
    const next = new Set(addedIds);
    products.forEach((p) => {
      addItem(p, 1);
      next.add(p.id);
    });
    setAddedIds(next);
  };

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16" dir="rtl">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 text-accent-500">
            <Heart className="h-10 w-10" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-foreground">قائمة المفضلة فارغة</h1>
          <p className="mt-2 text-muted-foreground">
            احفظ المنتجات التي تعجبك في المفضلة للوصول إليها بسهولة في أي وقت.
          </p>
          <Link href="/store" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            تصفح المتجر
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">قائمة المفضلة</h1>
          <p className="mt-2 text-muted-foreground">{itemCount} منتجات محفوظة</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleAddAll} disabled={addedIds.size === products.length}>
            <ShoppingCart className="h-4 w-4 me-1" />
            أضف الكل إلى السلة
          </Button>
          <Button variant="outline" onClick={clearWishlist}>
            <Trash2 className="h-4 w-4 me-1" />
            مسح الكل
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => {
          const image = product.images.find((i) => i.isPrimary) || product.images[0];
          const discount = product.comparePrice ? calculateDiscountPercentage(product.comparePrice, product.price) : 0;
          const isAdded = addedIds.has(product.id);
          return (
            <div key={product.id} className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-luxury-lg">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <Link href={`/product/${product.slug}`} className="block h-full w-full">
                  <Image
                    src={image?.url || "/placeholder.png"}
                    alt={image?.altAr || product.nameAr}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </Link>
                {discount > 0 && (
                  <div className="absolute top-3 start-3 z-10">
                    <Badge variant="danger">-{discount}%</Badge>
                  </div>
                )}
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-3 end-3 z-10 rounded-full bg-[#F6F1E5]/90 p-2 text-accent-600 hover:bg-accent-500 hover:text-white shadow-luxury transition-all"
                  aria-label="إزالة من المفضلة"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 p-4">
                <Link href={`/product/${product.slug}`} className="block">
                  <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-primary-700 transition-colors">
                    {product.nameAr}
                  </h3>
                </Link>
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-bold text-primary-700">{formatCurrency(product.price)}</span>
                  {product.comparePrice && (
                    <span className="text-sm text-muted-foreground line-through">{formatCurrency(product.comparePrice)}</span>
                  )}
                </div>
                <Button
                  variant={isAdded ? "gold" : "secondary"}
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => {
                    addItem(product, 1);
                    setAddedIds((prev) => new Set(prev).add(product.id));
                  }}
                  disabled={isAdded}
                >
                  {isAdded ? "أُضيف إلى السلة ✓" : "أضف إلى السلة"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}