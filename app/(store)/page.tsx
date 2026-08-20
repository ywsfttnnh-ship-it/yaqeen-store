import type { Metadata } from "next";
import { categories } from "@/lib/data/categories";
import {
  featuredProducts,
  bestSellerProducts,
  newArrivalProducts,
  getProductsByCategory,
} from "@/lib/data";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { ProductSection } from "@/components/home/product-section";
import { CategoryBanner } from "@/components/home/category-banner";

export const metadata: Metadata = {
  title: "يقين ستور | Yaqeen Store - أرضيات SPC وبدائل الحجر وسوفت ستون",
  description:
    "متجر يقين ستور - اكتشف أرضيات SPC وبدائل الحجر وسوفت ستون عالية الجودة. ضمان 25 سنة. مقاومة ماء 100%. التوصيل لجميع مناطق الضفة الغربية.",
};

export default function HomePage() {
  const spcProducts = getProductsByCategory("cat-spc").slice(0, 4);
  const stoneProducts = getProductsByCategory("cat-stone-alt").slice(0, 4);
  const softStoneProducts = getProductsByCategory("cat-soft-stone").slice(0, 4);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <CategoriesSection categories={categories} />

      {/* Featured Products */}
      <FeaturedProductsSection
        products={featuredProducts}
        titleAr="منتجات مختارة لك"
        subtitleAr="اقتناصات متميزة مختارة بعناية من أفضل منتجاتنا"
        viewAllHref="/store?featured=true"
        variant="dark"
      />

      {/* SPC Flooring Section */}
      <CategoryBanner
        category={categories[0]}
        className="mb-12"
      />
      <ProductSection
        products={spcProducts}
        sectionTitle="باركيه SPC"
        sectionDescription="أرضيات SPC عالية الجودة مقاومة للماء مع ضمان 25 سنة"
        viewAllHref="/categories/باركيه-spc"
        badge="الأكثر طلباً"
        badgeVariant="primary"
      />

      {/* Best Sellers */}
      <FeaturedProductsSection
        products={bestSellerProducts}
        titleAr="الأكثر مبيعاً"
        subtitleAr="المنتجات الأكثر شعبية بين عملائنا"
        viewAllHref="/store?best=best-seller"
        variant="dark"
      />

      {/* Stone Alternative Section */}
      <CategoryBanner
        category={categories[1]}
        className="my-12"
      />
      <ProductSection
        products={stoneProducts}
        sectionTitle="بديل الحجر"
        sectionDescription="سطوح بديل الحجر ذات اللمعة الطبيعية وجودة متميزة"
        viewAllHref="/categories/بديل-حجر"
        badge="أفضل جودة"
        badgeVariant="secondary"
      />

      {/* New Arrivals */}
      <FeaturedProductsSection
        products={newArrivalProducts}
        titleAr="وصل حديثاً"
        subtitleAr="أحدث المنتجات المضافة حديثاً إلى متجرنا"
        viewAllHref="/store?new=true"
        variant="dark"
      />

      {/* Soft Stones Section */}
      <CategoryBanner
        category={categories[2]}
        className="my-12"
      />
      <ProductSection
        products={softStoneProducts}
        sectionTitle="سوفت ستون"
        sectionDescription="مجموعة سوفت ستون فاخرة للجدران والأسطح"
        viewAllHref="/categories/سوفت-ستون"
        badge="تصميم مميز"
        badgeVariant="gold"
      />
    </>
  );
}
