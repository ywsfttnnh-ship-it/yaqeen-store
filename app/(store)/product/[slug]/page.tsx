import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, getProductReviews, getProductRating } from "@/lib/data";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductCard } from "@/components/product/product-card";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "المنتج غير موجود" };
  const image = product.images.find((i) => i.isPrimary) || product.images[0];
  return {
    title: product.nameAr,
    description: product.descriptionAr,
    openGraph: {
      title: product.nameAr,
      description: product.shortDescriptionAr,
      images: image ? [{ url: image.url, alt: image.altAr }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const reviews = getProductReviews(product.id);
  const ratingInfo = getProductRating(product.id);
  const related = getRelatedProducts(product.id, product.categoryId, 4);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <nav className="mb-6 text-sm text-muted-foreground" aria-label="مسار التنقل">
        <ol className="flex items-center gap-2 flex-wrap">
          <li><Link href="/" className="hover:text-primary-600 transition-colors">الرئيسية</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/store" className="hover:text-primary-600 transition-colors">المتجر</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">{product.nameAr}</li>
        </ol>
      </nav>

      <ProductDetail product={product} reviews={reviews} ratingInfo={ratingInfo} />

      {related.length > 0 && (
        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">منتجات مشابهة</h2>
            <Link href={`/store?category=${product.categoryId}`} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              عرض الكل
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}