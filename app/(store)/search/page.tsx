"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { searchProducts } from "@/lib/data";
import { ProductCard } from "@/components/product/product-card";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = React.useState(initialQuery);
  const [submitted, setSubmitted] = React.useState(initialQuery);

  const results = submitted ? searchProducts(submitted) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(query.trim());
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <h1 className="text-3xl font-bold text-foreground mb-6">البحث في المتجر</h1>

      <form onSubmit={handleSubmit} className="mb-8 max-w-2xl">
        <div className="relative">
          <div className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن أرضيات SPC، بديل حجر، سوفت ستون..."
            className="w-full rounded-xl border border-border bg-background py-3.5 ps-11 pe-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button type="submit" className="mt-3 rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
          بحث
        </button>
      </form>

      {submitted ? (
        <div>
          <div className="mb-6">
            <h2 className="text-lg font-medium text-foreground">
              نتائج البحث عن «{submitted}»
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{results.length} نتيجة</p>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">لا توجد نتائج مطابقة لبحثك</p>
              <p className="mt-2 text-sm text-muted-foreground/80">جرّب كلمات مختلفة أو تصفح جميع المنتجات</p>
              <Link href="/store" className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium">
                <ArrowLeft className="h-4 w-4" />
                تصفح المتجر
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="py-16 text-center text-muted-foreground">
          اكتب كلمة بحث للعثور على منتجاتك المفضلة
        </div>
      )}
    </div>
  );
}