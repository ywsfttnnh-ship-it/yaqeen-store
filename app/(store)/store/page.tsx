"use client";

import * as React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Grid, List, Filter, Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ProductCard } from "@/components/product/product-card";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Modal } from "@/components/ui/modal";
import { categories } from "@/lib/data/categories";
import { getProducts } from "@/lib/data";
import type { PagedResult, ProductFilters } from "@/lib/data";
import type { Product } from "@/types";
import { config } from "@/lib/config";

const sortOptions = [
  { value: "newest", label: "Newest", labelAr: "الأحدث" },
  { value: "rating", label: "Top Rated", labelAr: "الأعلى تقييماً" },
  { value: "popularity", label: "Most Popular", labelAr: "الأكثر شعبية" },
  { value: "name-asc", label: "Name A-Z", labelAr: "الاسم أ-ي" },
  { value: "name-desc", label: "Name Z-A", labelAr: "الاسم ي-أ" },
];

const ratingOptions = [5, 4, 3, 2, 1];

export default function StorePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const [filters, setFilters] = React.useState<ProductFilters>(() => ({
    category: searchParams.get("category") || undefined,
    search: searchParams.get("q") || undefined,
    sort: (searchParams.get("sort") as ProductFilters["sort"]) || "newest",
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined,
    inStock: searchParams.get("inStock") === "true",
    featured: searchParams.get("featured") === "true",
    bestSeller: searchParams.get("best") === "best-seller",
    newArrival: searchParams.get("new") === "true",
  }));

  const [result, setResult] = React.useState<PagedResult<Product>>({
    data: [],
    total: 0,
    page: 1,
    limit: config.pagination.productsPerPage,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const [loading, setLoading] = React.useState(false);
  const [loadedItems, setLoadedItems] = React.useState<Product[]>([]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    setLoading(true);
    const res = getProducts(filters, 1, config.pagination.productsPerPage);
    setResult(res);
    setLoadedItems(res.data);
    setLoading(false);
  }, [filters]);

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    const params = new URLSearchParams();
    Object.entries(updated).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== false) {
        params.set(key, String(value));
      }
    });
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const loadMore = React.useCallback(() => {
    if (loading || !result.hasNext) return;
    setLoading(true);
    const nextPage = result.page + 1;
    const newRes = getProducts(filters, nextPage, config.pagination.productsPerPage);
    setLoadedItems((prev) => [...prev, ...newRes.data]);
    setResult(newRes);
    setLoading(false);
  }, [filters, loading, result]);

  const resetFilters = () => {
    setFilters({ sort: "newest" });
    router.push(pathname);
  };

  if (!mounted) return null;

  const activeFilterCount = Object.values(filters).filter((v) => v !== undefined && v !== null && v !== false).length;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">المتجر</h1>
        <p className="mt-2 text-muted-foreground">اكتشف مجموعتنا الواسعة من المنتجات المتميزة</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <Filter className="h-4 w-4" />
            <span>تصفية</span>
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
          <span className="text-sm text-muted-foreground">{result.total} منتج</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">عرض:</span>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded p-1.5 transition-all",
                viewMode === "grid" ? "bg-primary-100 text-primary-700" : "text-muted-foreground hover:bg-accent",
              )}
              aria-label="عرض شبكة"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "rounded p-1.5 transition-all",
                viewMode === "list" ? "bg-primary-100 text-primary-700" : "text-muted-foreground hover:bg-accent",
              )}
              aria-label="عرض قائمة"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <Select
            value={filters.sort || "newest"}
            onValueChange={(val) => updateFilters({ sort: val as ProductFilters["sort"] })}
            placeholder="ترتيب حسب"
            options={sortOptions}
          />
        </div>
      </div>

      <div className="mb-12">
        {loading && loadedItems.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-neutral-200" />
            ))}
          </div>
        ) : loadedItems.length > 0 ? (
          <div
            className={cn(
              "grid gap-8",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1",
            )}
          >
            {loadedItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">لم يتم العثور على منتجات</p>
            <button
              onClick={resetFilters}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </div>

      {result.hasNext && !loading && loadedItems.length > 0 && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border border-border bg-background",
              "px-8 py-3 text-sm font-medium text-foreground hover:bg-accent focus:outline-none",
              "focus:ring-1 focus:ring-primary-500 transition-all",
            )}
          >
            {loading ? "جاري التحميل..." : "تحميل المزيد"}
          </button>
        </div>
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={(newFilters) => {
          updateFilters(newFilters);
          setIsFilterOpen(false);
        }}
        onReset={() => {
          resetFilters();
          setIsFilterOpen(false);
        }}
      />
    </div>
  );
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductFilters;
  onApply: (filters: ProductFilters) => void;
  onReset: () => void;
}

function FilterModal({ isOpen, onClose, filters, onApply, onReset }: FilterModalProps) {
  const [localFilters, setLocalFilters] = React.useState<ProductFilters>(filters);

  React.useEffect(() => {
    if (isOpen) setLocalFilters(filters);
  }, [isOpen, filters]);

  const updateFilter = (key: keyof ProductFilters, value: unknown) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titleAr="تصفية المنتجات"
      size="md"
      footer={
        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            إعادة الضبط
          </button>
          <button
            onClick={() => onApply(localFilters)}
            className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            تطبيق
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-medium">القسم</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <Checkbox
                key={cat.id}
                id={`cat-${cat.id}`}
                labelAr={cat.nameAr}
                checked={localFilters.category === cat.slug}
                onChange={() => {
                  updateFilter(
                    "category",
                    localFilters.category === cat.slug ? undefined : cat.slug,
                  );
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium">التقييم</h3>
          <div className="space-y-2">
            {ratingOptions.map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-2 border-primary-600 text-primary-600 accent-primary-600"
                  checked={localFilters.minRating === rating}
                  onChange={() => {
                    updateFilter("minRating", localFilters.minRating === rating ? undefined : rating);
                  }}
                />
                <span className="flex items-center text-sm">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                  ))}
                  <span className="ms-1 text-xs text-muted-foreground">& Up</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium">التوفر</h3>
          <Checkbox
            id="in-stock"
            labelAr="متوفر فقط"
            checked={!!localFilters.inStock}
            onChange={() => updateFilter("inStock", !localFilters.inStock)}
          />
        </div>
      </div>
    </Modal>
  );
}