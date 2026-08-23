"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingCart, Search } from "lucide-react";
import type { Category, Product } from "@/types";
import { config } from "@/lib/config";
import { useCart } from "@/lib/context/cart-context";

interface CinematicMobileHomeProps {
  categories: Category[];
  products: Product[];
}

export const CinematicMobileHome: React.FC<CinematicMobileHomeProps> = ({ products }) => {
  const { totalItems, openCart } = useCart();

  const featuredList = products.slice(0, 4);
  const spcProducts = products.filter(p => p.categoryId === "cat-spc");
  const stoneProducts = products.filter(p => p.categoryId === "cat-stone-alt");

  return (
    <div className="bg-[#161311] text-[#e9e1dd] font-sans antialiased overflow-x-hidden min-h-screen selection:bg-[#C5A059] selection:text-[#432b14] pb-32" dir="rtl">
      {/* Ambient Background Lighting Effect */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-[#C5A059]/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-[#383432]/30 blur-[120px]" />
      </div>

      {/* Mobile Top Header */}
      <header className="fixed top-0 w-full z-50 px-5 py-4 flex justify-between items-center glass-panel shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="font-display text-lg font-bold text-[#C5A059] uppercase tracking-tighter">
          Yaqeen Store
        </div>
        <div className="flex items-center gap-4">
          <Link href="/search" aria-label="بحث" className="text-[#e9e1dd] hover:text-[#C5A059]">
            <Search className="h-5 w-5" />
          </Link>
          <button onClick={openCart} aria-label="السلة" className="text-[#e9e1dd] hover:text-[#C5A059] relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C5A059] text-[#432b14] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Canvas (Vertical Feed matching design-ref-3) */}
      <main className="pt-24 px-5 flex flex-col gap-12 max-w-lg mx-auto">
        
        {/* Hero Section - Parquet */}
        <section className="relative h-[700px] flex flex-col justify-end pb-12 rounded-[2rem] overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 z-0">
            <Image
              src={spcProducts[0]?.images[0]?.url || "/assets/products/SPC/img-001.png"}
              alt="أرضيات فاخرة"
              fill
              priority
              className="object-cover scale-105 transition-transform duration-1000 group-hover:scale-110"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161311] via-[#161311]/50 to-transparent" />
          </div>

          <div className="relative z-10 space-y-4 px-6">
            <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-[#C5A059] text-xs font-medium border border-[#C5A059]/35">
              جديد 2026
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#e9e1dd] leading-tight font-display">
              تميز <br />
              <span className="text-[#d3c4b9]">بلا تكلف</span>
            </h1>
            <p className="text-sm sm:text-base text-[#d3c4b9] max-w-sm leading-relaxed">
              ليس مجرد غطاء للأرضيات. إنه أساس الأناقة في مساحتك. مصمم ليرتقي بأبسط التصاميم، هذا الباركيه يغمرك بالدفء والفخامة.
            </p>

            <div className="pt-4 flex items-center justify-between">
              <Link
                href={`/product/${spcProducts[0]?.slug || "spc-oak-naturel-1220"}`}
                className="bg-[#C5A059] text-[#432b14] px-7 py-3.5 rounded-full text-xs font-semibold hover:bg-[#e5bf9f] transition-colors flex items-center gap-2 shadow-lg"
              >
                <span>استكشف المجموعة</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="text-left" dir="ltr">
                {!config.app.hidePrices && (
                  <>
                    <div className="text-2xl font-bold text-white">{spcProducts[0]?.price || 149} ₪</div>
                    <div className="text-sm text-[#d3c4b9] line-through decoration-[#ffb4ab]/60">199 ₪</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Category Showcase - Stone */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-bold text-[#e9e1dd] font-display">تشطيبات حجرية فاخرة</h2>
            <Link href="/categories" className="text-xs text-[#C5A059] flex items-center gap-1 font-medium">
              الكل <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {stoneProducts.slice(0, 2).map((stone) => (
              <Link
                key={stone.id}
                href={`/product/${stone.slug}`}
                className="relative h-64 rounded-3xl overflow-hidden glass-panel group block shadow-xl"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={stone.images[0]?.url || "/placeholder.png"}
                    alt={stone.nameAr}
                    fill
                    className="object-cover opacity-60 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-80"
                    sizes="100vw"
                  />
                </div>
                <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-1 font-display">{stone.nameAr}</h3>
                  <p className="text-xs text-[#d3c4b9]">{stone.shortDescriptionAr}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Product Grid Feed */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-bold text-[#e9e1dd] font-display">منتجات مميزة</h2>
            <Link href="/store" className="text-xs text-[#C5A059] flex items-center gap-1 font-medium">
              المتجر الكامل <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredList.map((product) => {
              const img = product.images[0];
              return (
                <div key={product.id} className="bg-[#221f1d] rounded-2xl overflow-hidden border border-[#4f453d]/30 shadow-xl relative group">
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-[#C5A059] text-[#432b14] text-[10px] font-bold px-2.5 py-1 rounded-full">
                      متميز
                    </span>
                  </div>
                  <Link href={`/product/${product.slug}`} className="block aspect-[4/4] relative overflow-hidden bg-[#100e0c]">
                    <Image
                      src={img?.url || "/placeholder.png"}
                      alt={product.nameAr}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>
                  <div className="p-5">
                    <h3 className="font-bold text-white text-sm line-clamp-1 mb-1">{product.nameAr}</h3>
                    <p className="text-xs text-[#d3c4b9] line-clamp-1 mb-3">{product.shortDescriptionAr}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-[#4f453d]/30">
                      {!config.app.hidePrices && (
                        <span className="font-bold text-white text-base">{product.price} ₪</span>
                      )}
                      <Link
                        href={`/product/${product.slug}`}
                        className="bg-[#C5A059]/20 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#432b14] p-2 rounded-full transition-colors"
                        aria-label="عرض المنتج"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Store Info Banner */}
        <section className="glass-panel p-6 rounded-3xl text-center space-y-3">
          <span className="text-[11px] font-semibold tracking-wider text-[#C5A059] uppercase">مقر المتجر</span>
          <h3 className="text-lg font-bold text-white">الخليل، فلسطين • توصيل لجميع مناطق الضفة</h3>
          <p className="text-xs text-[#d3c4b9]">للاستفسار السريع والطلب المباشر:</p>
          <a
            href="tel:+972597426988"
            className="inline-block text-sm font-bold text-[#C5A059] hover:underline"
            dir="ltr"
          >
            +972 59-742-6988
          </a>
        </section>

      </main>

      {/* Mobile Bottom Navigation (Floating Shell matching design-ref-3) */}
      <nav className="fixed bottom-6 left-4 right-4 z-50 glass-panel rounded-full px-6 py-3.5 flex justify-around items-center shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/10 max-w-md mx-auto">
        <Link href="/" className="flex flex-col items-center gap-0.5 text-[#C5A059]">
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-medium">الرئيسية</span>
        </Link>
        <Link href="/store" className="flex flex-col items-center gap-0.5 text-[#d3c4b9] hover:text-[#e9e1dd] transition-colors">
          <span className="material-symbols-outlined text-xl">grid_view</span>
          <span className="text-[10px] font-medium">المتجر</span>
        </Link>
        <Link href="/categories" className="flex flex-col items-center gap-0.5 text-[#d3c4b9] hover:text-[#e9e1dd] transition-colors">
          <span className="material-symbols-outlined text-xl">menu_book</span>
          <span className="text-[10px] font-medium">التصنيفات</span>
        </Link>
        <Link href="/account/profile" className="flex flex-col items-center gap-0.5 text-[#d3c4b9] hover:text-[#e9e1dd] transition-colors">
          <span className="material-symbols-outlined text-xl">person</span>
          <span className="text-[10px] font-medium">حسابي</span>
        </Link>
      </nav>
    </div>
  );
};