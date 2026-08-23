"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, ShoppingCart, Star, Phone, Sparkles } from "lucide-react";
import type { Category, Product } from "@/types";
import { config } from "@/lib/config";

interface CinematicHomePageProps {
  categories: Category[];
  products: Product[];
}

export const CinematicHomePage: React.FC<CinematicHomePageProps> = ({ categories, products }) => {
  const spcCat = categories.find((c) => c.id === "cat-spc") || categories[0];
  const stoneCat = categories.find((c) => c.id === "cat-stone-alt") || categories[1];
  const softCat = categories.find((c) => c.id === "cat-soft-stone") || categories[2];

  const featuredList = products.slice(0, 4);

  return (
    <div className="bg-[#131313] text-[#e4e2e1] font-sans antialiased overflow-x-hidden min-h-screen selection:bg-[#8d6e52] selection:text-[#fffbfa]" dir="rtl">
      {/* Cinematic Hero Section */}
      <section className="relative w-full h-[92vh] min-h-[650px] mt-[72px] bg-[#0D0B0A] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-50 mix-blend-overlay scale-105 transition-transform duration-10000"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGddxLZjy4J4Ftiu8Mdpv1hQxo596-zPPyE8ZIkvJKr83n2Q20d-ZdpnMWc_j5BS9fO6Kza9wqCvDgW4fQrmPxKS65EZuO2IPnDwUzVH0lmZlZlyaHX7Qem_p6qrbrdgyZ1jPT1W6KuBxn1SXGwpZzNIEtq1RcZbZox4eUXPaIBMxWArBOsTDcPpYNUuOWiuIuxftkpIMh0Pj68RWzlHmZ89ckeQloKJm6U6SCxVBIugmVSIsWsblN')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#0D0B0A]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B0A]/90 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 w-full">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5bf9f]/30 bg-[#8d6e52]/20 px-4 py-1.5 text-xs font-semibold text-[#e5bf9f] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#e9c176]" />
              <span>يقين ستور | Cinematic Architectural E-commerce</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              فخامة المعمار. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5bf9f] to-[#e9c176]">
                لمسة تدوم للأبد.
              </span>
            </h1>

            <p className="text-[#ccc5c1] text-lg sm:text-xl max-w-xl leading-relaxed font-normal">
              أرضيات SPC فاخرة وبدائل حجر وسوفت ستون مصممة خصيصاً للمساحات التي تبحث عن الأصالة والجودة العالية.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/store"
                className="bg-[#e5bf9f] text-[#432b14] px-8 py-4 rounded text-xs font-semibold tracking-widest hover:bg-[#d9bd89] transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                تنسيق واستكشاف المنتجات
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                href="/categories"
                className="border border-[#e5bf9f]/40 text-[#e4e2e1] px-8 py-4 rounded text-xs font-semibold tracking-widest hover:bg-white/10 transition-all duration-300 inline-flex items-center"
              >
                التصنيفات الفاخرة
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Collections Showcases */}
      <section className="py-[120px] max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#e5bf9f]">المجموعات المتميزة</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 font-display">
            مجموعات معمارية مختارة بعناية
          </h2>
          <div className="w-16 h-1 bg-[#8d6e52] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Link
            href={`/categories/${spcCat.slug}`}
            className="group block relative h-[450px] overflow-hidden rounded-lg bg-[#1b1c1c] border border-[#4f453d]/40 hover:-translate-y-2 transition-all duration-500 hover:border-[#8d6e52] shadow-xl ambient-glow"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
              style={{ backgroundImage: `url('${spcCat.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-[#0D0B0A]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 glass-panel m-4 rounded-lg">
              <span className="text-[10px] font-semibold text-[#e9c176] uppercase tracking-wider">ضمان 25 سنة</span>
              <h3 className="text-2xl font-bold text-white mt-1 font-display">{spcCat.nameAr}</h3>
              <p className="text-[#d3c4b9] text-xs mt-1">أرضيات حجرية بلاستيكية مقاومة للماء 100%</p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            href={`/categories/${stoneCat.slug}`}
            className="group block relative h-[450px] overflow-hidden rounded-lg bg-[#1b1c1c] border border-[#4f453d]/40 hover:-translate-y-2 transition-all duration-500 hover:border-[#8d6e52] shadow-xl ambient-glow"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
              style={{ backgroundImage: `url('${stoneCat.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-[#0D0B0A]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 glass-panel m-4 rounded-lg">
              <span className="text-[10px] font-semibold text-[#e9c176] uppercase tracking-wider">بديل رخام فخم</span>
              <h3 className="text-2xl font-bold text-white mt-1 font-display">{stoneCat.nameAr}</h3>
              <p className="text-[#d3c4b9] text-xs mt-1">ألواح عصرية للجدران والعدادات والمطابخ</p>
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            href={`/categories/${softCat.slug}`}
            className="group block relative h-[450px] overflow-hidden rounded-lg bg-[#1b1c1c] border border-[#4f453d]/40 hover:-translate-y-2 transition-all duration-500 hover:border-[#8d6e52] shadow-xl ambient-glow"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
              style={{ backgroundImage: `url('${softCat.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-[#0D0B0A]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 glass-panel m-4 rounded-lg">
              <span className="text-[10px] font-semibold text-[#e9c176] uppercase tracking-wider">حجر مرن ناعم</span>
              <h3 className="text-2xl font-bold text-white mt-1 font-display">{softCat.nameAr}</h3>
              <p className="text-[#d3c4b9] text-xs mt-1">تكسيات جدارية طبيعية تضفي عمقاً وملمساً دافئاً</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-[120px] bg-[#1b1c1c]/60 border-t border-b border-[#4f453d]/30">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#e5bf9f]">المعرض الانتقائي</span>
              <h2 className="text-3xl font-bold text-white mt-2 font-display">منتجات مختارة بعناية فائقة</h2>
              <div className="w-16 h-1 bg-[#8d6e52] mt-3 rounded-full" />
            </div>
            <Link href="/store" className="text-xs font-semibold text-[#e5bf9f] hover:text-white transition-colors flex items-center gap-1">
              عرض كافة المنتجات
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredList.map((product) => {
              const primaryImg = product.images.find(i => i.isPrimary) || product.images[0];
              return (
                <div key={product.id} className="group bg-[#2a2a2a] rounded-lg border border-[#4f453d]/50 overflow-hidden transition-all duration-300 hover:border-[#e5bf9f] hover:-translate-y-1.5 shadow-xl relative">
                  {product.newArrival && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-[#8d6e52] text-white text-[10px] font-semibold px-2 py-1 rounded">جديد</span>
                    </div>
                  )}
                  {product.bestSeller && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-[#e9c176] text-[#261900] text-[10px] font-bold px-2 py-1 rounded">الأكثر مبيعاً</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-10">
                    <Link href="/wishlist" className="w-8 h-8 rounded-full bg-[#131313]/80 backdrop-blur flex items-center justify-center text-[#e4e2e1] hover:text-[#e5bf9f] transition-all shadow-md">
                      <Heart className="h-4 w-4" />
                    </Link>
                  </div>
                  <Link href={`/product/${product.slug}`} className="block aspect-[4/5] bg-[#1f2020] overflow-hidden relative">
                    <Image
                      src={primaryImg?.url || "/placeholder.png"}
                      alt={primaryImg?.altAr || product.nameAr}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="text-[11px] font-semibold text-[#d3c4b9] mb-2 uppercase tracking-wide">
                      {product.categoryId === "cat-spc" ? "باركيه SPC" : product.categoryId === "cat-stone-alt" ? "بديل حجر" : "سوفت ستون"}
                    </div>
                    <Link href={`/product/${product.slug}`} className="block">
                      <h3 className="text-sm font-semibold text-white mb-2 line-clamp-1 hover:text-[#e5bf9f] transition-colors">
                        {product.nameAr}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-4">
                      <div className="flex items-center text-[#e9c176]">
                        <Star className="h-3 w-3 fill-current" />
                      </div>
                      <span className="text-xs text-[#d3c4b9] mr-1">({product.rating})</span>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#4f453d]/40">
                      {!config.app.hidePrices && (
                        <span className="text-lg font-bold text-white">{product.price} ₪</span>
                      )}
                      <Link href={`/product/${product.slug}`} className="text-[#e4e2e1] hover:text-[#e5bf9f] transition-colors p-1.5 rounded bg-[#131313]/60">
                        <ShoppingCart className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architectural Value & Store Info */}
      <section className="py-[120px] bg-[#0D0B0A] relative text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#e5bf9f]">مقرنا الرئيسي وخدماتنا</span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white">الخليل، فلسطين • توصيل لجميع مناطق الضفة الغربية</h2>
          <p className="text-[#ccc5c1] text-base leading-relaxed max-w-2xl mx-auto">
            نحن نقدم أعلى معايير الجودة والتصاميم العصرية مع ضمان حقيقي يصل إلى 25 سنة على أرضيات SPC وبدائل الحجر. تواصل معنا للاستفسار والطلب الفوري.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+972597426988"
              className="inline-flex items-center gap-2 bg-[#e5bf9f] text-[#432b14] px-8 py-4 rounded text-xs font-semibold tracking-wider hover:bg-[#d9bd89] transition-colors shadow-lg"
            >
              <Phone className="h-4 w-4" />
              <span>تواصل مباشر: +972 59-742-6988</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};