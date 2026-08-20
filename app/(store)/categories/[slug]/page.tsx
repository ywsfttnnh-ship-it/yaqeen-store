import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data";
import { ProductCard } from "@/components/product/product-card";
import { Badge } from "@/components/ui/badge";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(decodeURIComponent(slug));
  if (!category) return { title: "القسم غير موجود" };
  return {
    title: category.nameAr,
    description: category.descriptionAr,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const category = getCategoryBySlug(decodedSlug);
  if (!category) notFound();

  const products = getProductsByCategory(category.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <nav className="mb-6 text-sm text-muted-foreground" aria-label="مسار التنقل">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-primary-600 transition-colors">الرئيسية</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/categories" className="hover:text-primary-600 transition-colors">التصنيفات</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">{category.nameAr}</li>
        </ol>
      </nav>

      <div className="relative mb-10 overflow-hidden rounded-2xl">
        <div className="relative aspect-[21/7] w-full">
          <Image
            src={category.image}
            alt={category.imageAltAr || category.nameAr}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 inset-x-0 p-8">
          <Badge variant="gold" className="mb-3">التصنيف</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{category.nameAr}</h1>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-white/85 leading-relaxed">
            {category.descriptionAr}
          </p>
          <p className="mt-3 text-sm text-white/70">{products.length} منتجات متوفرة</p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">جميع المنتجات</h2>
        <span className="text-sm text-muted-foreground">{products.length} منتج</span>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">لا توجد منتجات في هذا التصنيف حالياً</p>
          <Link
            href="/store"
            className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            تصفح جميع المنتجات
          </Link>
        </div>
      )}

      <div className="mt-16 rounded-2xl bg-[#241A12] border border-gold-500/40 p-8 text-center">
        <h3 className="text-xl font-bold text-white">هل تحتاج مساعدة في الاختيار؟</h3>
        <p className="mt-2 text-sm text-neutral-300">
          فريقنا جاهز لمساعدتك في اختيار المنتج الأنسب لمساحتك مع نصائح التثبيت والصيانة
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#F6F1E5] px-6 py-3 text-sm font-medium text-primary-800 hover:bg-white transition-colors"
        >
          تواصل معنا
        </Link>
      </div>
    </div>
  );
}