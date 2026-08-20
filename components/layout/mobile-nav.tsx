"use client";

import * as React from "react";
import { X, ShoppingCart, Heart, User, Home, Store, Grid, Gift, Info, Phone, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Logo } from "@/components/common/logo";
import { useCart } from "@/lib/context/cart-context";
import { useWishlist } from "@/lib/context/wishlist-context";
import { useAuth } from "@/lib/context/auth-context";
import { AIChatButton } from "@/components/ai/ai-chat-button";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const mobileNavItems = [
  { labelAr: "الرئيسية", href: "/", icon: Home },
  { labelAr: "المتجر", href: "/store", icon: Store },
  { labelAr: "التصنيفات", href: "/categories", icon: Grid },
  { labelAr: "العروض", href: "/offers", icon: Gift },
  { labelAr: "من نحن", href: "/about", icon: Info },
  { labelAr: "تواصل معنا", href: "/contact", icon: Phone },
];

export const MobileNav: React.FC<MobileNavProps> = ({ open, onClose }) => {
  const { totalItems } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] bg-background/95 backdrop-blur-md transition-all duration-300",
        open ? "opacity-100 visible" : "opacity-0 invisible",
      )}
      dir="rtl"
    >
      <div className="h-full overflow-y-auto pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur-md">
          <Logo size="sm" />
          <button
            onClick={onClose}
            className="rounded-full p-2 text-foreground hover:bg-accent transition-all duration-200"
            aria-label="إغلاق القائمة"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <form onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="relative">
              <input
                type="search"
                placeholder="ابحث عن منتجات..."
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-right text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                dir="rtl"
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L17.64 17.64M5 11C5 7.69 7.69 5 11 5C14.31 5 17 7.69 17 11C17 14.31 14.31 17 11 17C7.69 17 5 14.31 5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Navigation Links */}
        <nav className="py-2" aria-label="التنقل الرئيسي">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 text-lg font-medium text-foreground transition-all duration-200",
                  "hover:bg-primary-50 hover:text-primary-700",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.labelAr}</span>
              </Link>
            );
          })}
        </nav>

        {/* Account Section */}
        <div className="border-t border-border py-2">
          {isAuthenticated && user ? (
            <>
              <Link
                href="/account/profile"
                onClick={onClose}
                className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-foreground transition-all duration-200 hover:bg-primary-50 hover:text-primary-700"
              >
                <User className="h-5 w-5" />
                <span>حسابي</span>
              </Link>
              <Link
                href="/account/orders"
                onClick={onClose}
                className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-foreground transition-all duration-200 hover:bg-primary-50 hover:text-primary-700"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7H21V9H3V7ZM3 14H21V16H3V14ZM3 7L5 3H19L21 7V9H3V7ZM3 14L5 19H19L21 17V14H3Z" fill="currentColor" />
                </svg>
                <span>طلبي</span>
              </Link>
              <button
                onClick={() => { logout(); onClose(); }}
                className="flex w-full items-center gap-4 px-4 py-3 text-lg font-medium text-foreground transition-all duration-200 hover:bg-primary-50 hover:text-primary-700"
              >
                <LogOut className="h-5 w-5" />
                <span>تسجيل الخروج</span>
              </button>
            </>
          ) : (
            <Link
              href="/account/login"
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-foreground transition-all duration-200 hover:bg-primary-50 hover:text-primary-700"
            >
              <LogIn className="h-5 w-5" />
              <span>تسجيل الدخول / إنشاء حساب</span>
            </Link>
          )}
        </div>

        {/* Quick Actions */}
        <div className="border-t border-border py-2">
          <Link
            href="/wishlist"
            onClick={onClose}
            className={cn(
              "flex items-center justify-between px-4 py-3 text-lg font-medium text-foreground transition-all duration-200",
              "hover:bg-primary-50 hover:text-primary-700",
            )}
          >
            <div className="flex items-center gap-4">
              <Heart className="h-5 w-5" />
              <span>المفضلة</span>
            </div>
            {wishlistCount > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            onClick={onClose}
            className={cn(
              "flex items-center justify-between px-4 py-3 text-lg font-medium text-foreground transition-all duration-200",
              "hover:bg-primary-50 hover:text-primary-700",
            )}
          >
            <div className="flex items-center gap-4">
              <ShoppingCart className="h-5 w-5" />
              <span>السلة</span>
            </div>
            {totalItems > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* AI Assistant */}
        <div className="border-t border-border p-4">
          <AIChatButton />
        </div>
      </div>
    </div>
  );
};
