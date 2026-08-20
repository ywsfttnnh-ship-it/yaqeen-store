"use client";

import * as React from "react";
import Image from "next/image";
import { Search, Plus, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { getAllProducts } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  const [query, setQuery] = React.useState("");
  const products = getAllProducts().filter(
    (p) =>
      p.nameAr.includes(query) ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">المنتجات</h1>
          <p className="mt-1 text-sm text-muted-foreground">{products.length} منتج</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          إضافة منتج
        </Button>
      </div>

      <div className="max-w-sm">
        <Input placeholder="ابحث عن منتج..." value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search className="h-4 w-4" />} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-neutral-50 text-start text-muted-foreground">
                <th className="px-5 py-3 text-start font-medium">المنتج</th>
                <th className="px-5 py-3 text-start font-medium">الفئة</th>
                <th className="px-5 py-3 text-start font-medium">السعر</th>
                <th className="px-5 py-3 text-start font-medium">المخزون</th>
                <th className="px-5 py-3 text-start font-medium">التقييم</th>
                <th className="px-5 py-3 text-start font-medium">الحالة</th>
                <th className="px-5 py-3 text-start font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50/60">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-border bg-neutral-100">
                        {p.images[0]?.url && (
                          <Image src={p.images[0].url} alt={p.images[0].altAr} fill className="object-cover" sizes="44px" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">{p.nameAr}</p>
                        <p className="text-xs text-muted-foreground">{p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{p.tags[0] || "—"}</td>
                  <td className="px-5 py-3 font-medium">{formatCurrency(p.price)}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${p.stock < 30 ? "bg-red-100 text-red-700" : p.stock < 100 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{p.rating} ({p.reviewCount})</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                      {p.stock > 0 ? "متوفر" : "نفذ"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <button className="rounded-lg p-2 hover:bg-neutral-100 hover:text-primary-700" aria-label="تعديل">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-neutral-100 hover:text-accent-600" aria-label="حذف">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-neutral-100" aria-label="خيارات">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}