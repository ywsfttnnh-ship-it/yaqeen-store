"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { useCart } from "@/lib/context/cart-context";
import { useWishlist } from "@/lib/context/wishlist-context";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils/cn";

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clearCart, subtotal, shipping, tax, total, totalItems } = useCart();
  const { hasItem, toggleItem } = useWishlist();

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16" dir="rtl">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 text-muted-foreground">
            <ShoppingCart className="h-10 w-10" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-foreground">سلتك فارغة</h1>
          <p className="mt-2 text-muted-foreground">
            لم تقم بإضافة أي منتجات إلى السلة بعد. تصفح المتجر واكتشف تشكيلتنا المتميزة.
          </p>
          <Link href="/store" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            تصفح المتجر
          </Link>
        </div>
      </div>
    );
  }

  const freeShippingRemaining = Math.max(0, config.delivery.freeThreshold - subtotal);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">سلة التسوق</h1>
        <p className="mt-2 text-muted-foreground">{totalItems} منتجات في سلتك</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="hidden sm:grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border bg-neutral-50 px-6 py-3 text-xs font-medium text-muted-foreground">
              <span>المنتج</span>
              <div className="flex items-center gap-8">
                <span className="w-24 text-center">الكمية</span>
                <span className="w-24 text-center">السعر</span>
                <span className="w-8" />
              </div>
            </div>
            <ul className="divide-y divide-border">
              {cart.items.map((item) => {
                const image = item.product.images.find((i) => i.isPrimary) || item.product.images[0];
                const inWishlist = hasItem(item.product.id);
                return (
                  <li key={item.id} className="flex items-center gap-4 p-4 sm:p-6">
                    <Link href={`/product/${item.product.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-neutral-100">
                      <Image
                        src={image?.url || "/placeholder.png"}
                        alt={image?.altAr || item.product.nameAr}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.product.slug}`} className="block">
                        <h3 className="font-medium text-foreground line-clamp-1 hover:text-primary-700 transition-colors">
                          {item.product.nameAr}
                        </h3>
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.product.sku} | {item.product.finishAr}
                      </p>
                      <div className="mt-2 flex items-center gap-4">
                        <button
                          onClick={() => toggleItem(item.product.id)}
                          className={cn(
                            "text-xs font-medium",
                            inWishlist ? "text-accent-600" : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {inWishlist ? "في المفضلة ✓" : "أضف إلى المفضلة"}
                        </button>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-xs font-medium text-accent-600 hover:text-accent-700"
                        >
                          إزالة
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-8">
                      <div className="flex items-center rounded-lg border border-border">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-2 text-muted-foreground hover:text-foreground"
                          aria-label="تقليل الكمية"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-2 text-muted-foreground hover:text-foreground"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="w-20 text-start sm:text-center">
                        <p className="font-bold text-primary-700">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-1.5 text-muted-foreground hover:text-accent-600 transition-colors"
                        aria-label="حذف المنتج"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Link href="/store" className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium">
              <ArrowLeft className="h-4 w-4" />
              مواصلة التسوق
            </Link>
            <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-accent-600 transition-colors">
              إفراغ السلة
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            {freeShippingRemaining > 0 && (
              <div className="rounded-xl border border-primary-100 bg-primary-50 p-4">
                <p className="text-sm text-primary-800">
                  أضف منتجات بقيمة <strong>{formatCurrency(freeShippingRemaining)}</strong> للحصول على شحن مجاني!
                </p>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold text-foreground">ملخص الطلب</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">المجموع الفرعي</dt>
                  <dd className="font-medium">{formatCurrency(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">الشحن</dt>
                  <dd className="font-medium">
                    {shipping === 0 ? <span className="text-green-600">مجاني</span> : formatCurrency(shipping)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">الضريبة (17%)</dt>
                  <dd className="font-medium">{formatCurrency(tax)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3 text-base">
                  <dt className="font-bold text-foreground">الإجمالي</dt>
                  <dd className="font-bold text-primary-700">{formatCurrency(total)}</dd>
                </div>
              </dl>
              <Link href="/checkout" className="mt-6 block">
                <Button className="w-full" size="lg">
                  إتمام الشراء
                </Button>
              </Link>
              <Link href="/store" className="mt-3 block">
                <Button variant="outline" className="w-full">
                  متابعة التسوق
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Truck className="h-5 w-5 text-primary-600" />
                <span>شحن سريع خلال {config.delivery.estimatedDays.standard}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-primary-600" />
                <span>دفع آمن ومضمون 100%</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <CreditCard className="h-5 w-5 text-primary-600" />
                <span>خيارات دفع متعددة (نقداً، تحويل، بطاقة)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}