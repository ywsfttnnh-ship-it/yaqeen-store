"use client";

import * as React from "react";
import { ShoppingCart, Heart, User, Menu, Sun, Moon, Phone, MapPin, Truck } from "lucide-react";
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
      <div className="bg-[#171412] text-neutral-300 border-b border-gold-500/20 text-xs">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Truck className="h-3.5 w-3.5 text-gold-400" />
              🚚 توصيل لجميع مناطق الضفة الغربية
            </span>
            <span className="hidden sm:inline text-neutral-700">|</span>
            <span className="hidden sm:flex items-center gap-1 text-neutral-400">
              <MapPin className="h-3.5 w-3.5 text-gold-400" />
              الخليل، فلسطين
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+972597426988"
              className="flex items-center gap-1.5 font-medium text-gold-400 hover:text-gold-300 transition-colors"
              dir="ltr"
            >
              <Phone className="h-3.5 w-3.5" />
              +972 59-742-6988
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-border/80 transition-all duration-300">
        <div className="container mx-auto">
          <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Logo size="md" priority />

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1 bg-neutral-200/50 dark:bg-neutral-900/50 p-1.5 rounded-full border border-border/50"
              aria-label="التنقل الرئيسي"
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-300",
                      isActive
                        ? "text-neutral-900 dark:text-white bg-card shadow-sm border border-gold-500/30"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-foreground hover:bg-neutral-300/40 dark:hover:bg-neutral-800/50",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.labelAr}
                  </Link>
                );
              })}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search - Desktop */}
              <div className="hidden md:block">
                <SearchBar compact className="w-48 lg:w-56" />
              </div>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-full p-2.5 text-muted-foreground hover:text-foreground hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-all duration-200"
                aria-label="تبديل المظهر"
              >
                {theme === "dark" ? <Sun className="h-4.5 w-4.5 text-gold-400" /> : <Moon className="h-4.5 w-4.5" />}
              </button>

              {/* AI Assistant */}
              <div className="hidden sm:block">
                <AIChatButton />
              </div>

              {/* Wishlist */}
              <Link href="/wishlist" aria-label="المفضلة">
                <Button variant="ghost" size="sm" className="relative rounded-full p-2.5">
                  <Heart className="h-5 w-5 text-foreground" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -end-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent-500 text-[10px] font-bold text-white shadow-sm">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <button
                type="button"
                onClick={openCart}
                className="relative rounded-full p-2.5 text-foreground hover:text-gold-500 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-all duration-200"
                aria-label="السلة"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -end-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-neutral-950 shadow-gold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User Account */}
              <div className="hidden sm:block">
                {isAuthenticated && user ? (
                  <Link href="/account/profile" aria-label={user.name}>
                    <Button variant="ghost" size="sm" className="rounded-full p-2.5">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/account/login" aria-label="تسجيل الدخول">
                    <Button variant="outline" size="sm" className="rounded-full px-4 text-xs font-semibold border-gold-500/40 hover:border-gold-500">
                      <User className="h-3.5 w-3.5 me-1.5 text-gold-500" />
                      <span>تسجيل الدخول</span>
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-full p-2.5 text-foreground hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-all duration-200 lg:hidden"
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
