"use client";

import * as React from "react";
import { ShoppingCart, Heart, User, Menu, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Logo } from "@/components/common/logo";
import { SearchBar } from "@/components/common/search-bar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/context/cart-context";
import { useWishlist } from "@/lib/context/wishlist-context";
import { useAuth } from "@/lib/context/auth-context";
import { useTheme } from "next-themes";
import { MobileNav } from "./mobile-nav";
import { AIChatButton } from "@/components/ai/ai-chat-button";

interface NavItem {
  label: string;
  labelAr: string;
  href: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Home", labelAr: "الرئيسية", href: "/" },
  { label: "Store", labelAr: "المتجر", href: "/store" },
  { label: "Categories", labelAr: "التصنيفات", href: "/categories" },
  { label: "About", labelAr: "من نحن", href: "/about" },
  { label: "Contact", labelAr: "تواصل معنا", href: "/contact" },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-primary-800 text-neutral-50">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-1.5 text-center">
          <span className="text-xs sm:text-sm">التوصيل لجميع مناطق الضفة الغربية</span>
          <span className="hidden sm:inline text-neutral-500">|</span>
          <a
            href="tel:+972597426988"
            className="text-xs sm:text-sm font-medium text-gold-300 hover:text-gold-200 transition-colors"
            dir="ltr"
          >
            +972 59-742-6988
          </a>
          <span className="hidden sm:inline text-neutral-500">|</span>
          <span className="hidden sm:inline text-xs sm:text-sm">ضمان 25 سنة على أرضيات SPC</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto">
          <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Logo size="md" priority />

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-2"
              aria-label="التنقل الرئيسي"
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-primary-700 bg-primary-50"
                        : "text-foreground hover:text-primary-700 hover:bg-primary-50/50",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.labelAr}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary-600" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search - Desktop */}
              <div className="hidden md:block">
                <SearchBar compact className="w-56 lg:w-64" />
              </div>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                aria-label="تبديل المظهر"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* AI Assistant */}
              <div className="hidden sm:block">
                <AIChatButton />
              </div>

              {/* Wishlist */}
              <Link href="/wishlist" aria-label="المفضلة">
                <Button variant="ghost" size="sm" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -end-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-xs text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <button
                type="button"
                onClick={openCart}
                className="relative rounded-full p-2 text-foreground hover:text-primary-700 hover:bg-primary-50 transition-all duration-200"
                aria-label="السلة"
                aria-describedby="cart-count"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span
                    id="cart-count"
                    className="absolute -top-1 -end-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white"
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User Account */}
              <div className="hidden sm:block">
                {isAuthenticated && user ? (
                  <div className="relative">
                    <button
                      type="button"
                      className="rounded-full p-2 text-foreground hover:text-primary-700 hover:bg-primary-50 transition-all duration-200"
                      aria-label={user.name}
                    >
                      <User className="h-6 w-6" />
                    </button>
                  </div>
                ) : (
                  <Link href="/account/login" aria-label="تسجيل الدخول">
                    <Button variant="outline" size="sm">
                      <User className="h-5 w-5 me-1" />
                      <span className="hidden sm:inline">تسجيل الدخول</span>
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-full p-2 text-foreground hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 lg:hidden"
                aria-label="فتح القائمة"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
