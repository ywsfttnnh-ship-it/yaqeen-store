"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import type { Category, Product } from "@/types";
import { config } from "@/lib/config";

interface HomePageDesignRefProps {
  categories: Category[];
  products: Product[];
}

export const HomePageDesignRef: React.FC<HomePageDesignRefProps> = ({ categories, products }) => {
  const spcCat = categories.find((c) => c.id === "cat-spc") || categories[0];
  const stoneCat = categories.find((c) => c.id === "cat-stone-alt") || categories[1];
  const softCat = categories.find((c) => c.id === "cat-soft-stone") || categories[2];

  const featuredList = products.slice(0, 4);

  return (
    <div className="bg-[#fdf8f7] text-[#1c1b1b] font-sans antialiased overflow-x-hidden min-h-screen" dir="rtl">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] mt-[80px] bg-[#2D2D2D] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-60 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGddxLZjy4J4Ftiu8Mdpv1hQxo596-zPPyE8ZIkvJKr83n2Q20d-ZdpnMWc_j5BS9fO6Kza9wqCvDgW4fQrmPxKS65EZuO2IPnDwUzVH0lmZlZlyaHX7Qem_p6qrbrdgyZ1jPT1W6KuBxn1SXGwpZzNIEtq1RcZbZox4eUXPaIBMxWArBOsTDcPpYNUuOWiuIuxftkpIMh0Pj68RWzlHmZ89ckeQloKJm6U6SCxVBIugmVSIsWsblN')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D2D2D]/90 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full text-white">
          <div className="max-w-2xl">
            <h1 className="font-display text-[48px] md:text-[64px] font-bold leading-tight mb-6">
              اكتشف أناقة منزلك بتفاصيل استثنائية
            </h1>
            <p className="font-sans text-[18px] text-[#c6c6c6] mb-10 max-w-lg leading-relaxed">
              أرضيات SPC وبدائل الحجر وسوفت ستون بتصاميم تجمع بين الفخامة والجودة والمتانة.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/store"
                className="bg-black text-white px-8 py-4 rounded text-xs font-semibold tracking-widest hover:bg-[#2D2D2D] transition-colors duration-300 flex items-center gap-2"
              >
                تسوق الآن
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                href="/categories"
                className="border border-white text-white px-8 py-4 rounded text-xs font-semibold tracking-widest hover:bg-white/10 transition-colors duration-300 inline-flex items-center"
              >
                استكشف التصنيفات
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-[120px] max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-[24px] font-bold tracking-wider text-[#2D2D2D] mb-4">اكتشف مجموعاتنا</h2>
          <div className="w-16 h-1 bg-[#8D6E52] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Collection Card 1 */}
          <Link
            href={`/categories/${spcCat.slug}`}
            className="group block relative h-[400px] overflow-hidden rounded bg-[#ece7e6] border border-[#d0c4be]/30 hover:-translate-y-2 transition-all duration-500 hover:border-[#8D6E52] hover:shadow-lg shadow-black/5"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${spcCat.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">{spcCat.nameAr}</h3>
              <p className="text-[#c6c6c6] group-hover:text-white transition-colors">أرضيات فاخرة مقاومة للماء</p>
            </div>
          </Link>

          {/* Collection Card 2 */}
          <Link
            href={`/categories/${stoneCat.slug}`}
            className="group block relative h-[400px] overflow-hidden rounded bg-[#ece7e6] border border-[#d0c4be]/30 hover:-translate-y-2 transition-all duration-500 hover:border-[#8D6E52] hover:shadow-lg shadow-black/5"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${stoneCat.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">{stoneCat.nameAr}</h3>
              <p className="text-[#c6c6c6] group-hover:text-white transition-colors">تصاميم جدارية عصرية</p>
            </div>
          </Link>

          {/* Collection Card 3 */}
          <Link
            href={`/categories/${softCat.slug}`}
            className="group block relative h-[400px] overflow-hidden rounded bg-[#ece7e6] border border-[#d0c4be]/30 hover:-translate-y-2 transition-all duration-500 hover:border-[#8D6E52] hover:shadow-lg shadow-black/5"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${softCat.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">{softCat.nameAr}</h3>
              <p className="text-[#c6c6c6] group-hover:text-white transition-colors">لمسة من الطبيعة في مساحتك</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-[120px] bg-[#f7f3f1]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-[24px] font-bold text-[#2D2D2D] mb-2">منتجات مختارة بعناية</h2>
              <div className="w-16 h-1 bg-[#8D6E52] rounded-full" />
            </div>
            <Link href="/store" className="text-xs font-semibold text-[#8D6E52] hover:text-[#2D2D2D] transition-colors flex items-center gap-1">
              عرض الكل
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredList.map((product) => {
              const primaryImg = product.images.find(i => i.isPrimary) || product.images[0];
              return (
                <div key={product.id} className="group bg-white rounded border border-[#E8E4DE] overflow-hidden transition-all duration-300 hover:border-[#8D6E52] hover:-translate-y-1 hover:shadow-lg relative">
                  {product.newArrival && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-[#2D2D2D] text-white text-[10px] font-semibold px-2 py-1 rounded">جديد</span>
                    </div>
                  )}
                  {product.bestSeller && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-[#8D6E52] text-white text-[10px] font-semibold px-2 py-1 rounded">الأكثر مبيعاً</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-10">
                    <Link href="/wishlist" className="w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-[#2D2D2D] hover:text-[#8D6E52] transition-all shadow-sm">
                      <Heart className="h-4 w-4" />
                    </Link>
                  </div>
                  <Link href={`/product/${product.slug}`} className="block aspect-[4/5] bg-[#ece7e6] overflow-hidden relative">
                    <Image
                      src={primaryImg?.url || "/placeholder.png"}
                      alt={primaryImg?.altAr || product.nameAr}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="text-[11px] font-semibold text-[#786F66] mb-2 uppercase">
                      {product.categoryId === "cat-spc" ? "باركيه SPC" : product.categoryId === "cat-stone-alt" ? "بديل حجر" : "سوفت ستون"}
                    </div>
                    <Link href={`/product/${product.slug}`} className="block">
                      <h3 className="text-sm font-semibold text-[#2D2D2D] mb-2 line-clamp-1 hover:text-[#8D6E52] transition-colors">
                        {product.nameAr}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-4">
                      <div className="flex items-center text-amber-500">
                        <Star className="h-3 w-3 fill-current" />
                      </div>
                      <span className="text-xs text-[#786F66] mr-1">({product.rating})</span>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#E8E4DE]">
                      {!config.app.hidePrices && (
                        <span className="text-lg font-bold text-[#2D2D2D]">{product.price} ₪</span>
                      )}
                      <Link href={`/product/${product.slug}`} className="text-[#2D2D2D] hover:text-[#8D6E52] transition-colors p-1">
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

      {/* Info / Store Details Section */}
      <section className="py-[100px] bg-[#f7f3f1] border-t border-b border-[#d0c4be]/30">
        <div className="max-w-[1280px] mx-auto px-8 text-center">
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4">التوصيل لجميع مناطق الضفة الغربية</h2>
          <p className="text-[#786F66] max-w-xl mx-auto mb-6 text-sm">
            المعرض الرئيسي في الخليل، فلسطين. ضمان حتى 25 سنة على أرضيات SPC وبدائل الحجر. تواصل معنا للاستفسار والطلب الفوري.
          </p>
          <a
            href="tel:+972597426988"
            className="inline-flex items-center gap-2 bg-[#8D6E52] text-white px-8 py-3.5 rounded text-xs font-semibold tracking-wider hover:bg-[#6e4b28] transition-colors"
          >
            تواصل معنا الآن (+972 59-742-6988)
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
};