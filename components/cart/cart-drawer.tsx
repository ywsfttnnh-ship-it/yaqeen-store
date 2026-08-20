"use client";

import { useEffect } from "react";
import { X, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { config } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export const CartDrawer = () => {
  const { cart, removeItem, updateQuantity, clearCart, isOpen, closeCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-start sm:justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "relative z-[101] flex h-full w-full max-w-md flex-col",
          "bg-background shadow-luxury-xl animate-slide-in-right",
          "border-s border-border",
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 id="cart-title" className="text-xl font-bold text-foreground">
            سلة التسوق
          </h2>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-muted-foreground hover:bg-accent transition-all duration-200"
            aria-label="إغلاق السلة"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12">
              <ShoppingCart className="h-16 w-16 text-neutral-300 mb-4" />
              <p className="text-lg text-muted-foreground">السلة فارغة</p>
              <Link
                href="/store"
                onClick={closeCart}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                استكشف المنتجات
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="group flex gap-3 pb-4 last:pb-0 last:border-0 border-b border-border"
                >
                  {/* Product Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-border">
                    <Image
                      src={item.product.images[0]?.url || "/placeholder.png"}
                      alt={item.product.images[0]?.altAr || item.product.nameAr}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{item.product.nameAr}</h3>
                    {!config.app.hidePrices && (
                      <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
                    )}

                    {/* Quantity Selector */}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded border border-border text-sm font-medium",
                          "hover:bg-accent hover:text-foreground focus:outline-none focus:ring-1 focus:ring-primary-500",
                          item.quantity <= 1 && "cursor-not-allowed opacity-50",
                        )}
                        aria-label="نقص الكمية"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded border border-border text-sm font-medium",
                          "hover:bg-accent hover:text-foreground focus:outline-none focus:ring-1 focus:ring-primary-500",
                          item.quantity >= item.product.stock && "cursor-not-allowed opacity-50",
                        )}
                        aria-label="زيادة الكمية"
                      >
                        +
                      </button>
                    </div>

                    {/* Stock warning */}
                    {item.quantity >= item.product.stock && item.product.stock > 0 && (
                      <p className="mt-1 text-xs text-amber-500">
                        فقط {item.product.stock} قطعة متبقية في المخزون
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="rounded p-1 text-neutral-400 hover:bg-accent hover:text-accent-foreground transition-all"
                      aria-label="إزالة من السلة"
                      title="إزالة"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-border p-4">
            {/* Summary */}
            {!config.app.hidePrices && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">المجموع الفرعي:</span>
                  <span>{formatCurrency(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">الضرائب:</span>
                  <span>{formatCurrency(cart.tax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">الشحن:</span>
                  <span>
                    {cart.shipping === 0 ? "مجاني" : formatCurrency(cart.shipping)}
                  </span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-sm text-accent-500">
                    <span>الخصم:</span>
                    <span>-{formatCurrency(cart.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-2 text-lg font-bold">
                  <span>الإجمالي:</span>
                  <span className="text-primary-700">{formatCurrency(cart.total)}</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className={cn("space-y-2", !config.app.hidePrices && "mt-4")}>
              <Link href="/checkout" onClick={closeCart}>
                <Button variant="primary" className="w-full" size="lg">
                  إتمام الشراء
                </Button>
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                مسح السلة
              </button>
            </div>

            {/* Free shipping note */}
            {!config.app.hidePrices && cart.subtotal > 0 && cart.subtotal < 500 && (
              <div className="mt-3 rounded-lg bg-primary-50 p-2 text-center text-xs text-primary-800">
                أنهِ {formatCurrency(500 - cart.subtotal)} للحصول على شحن مجاني
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
