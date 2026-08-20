"use client";

import * as React from "react";
import { Wallet, ShoppingCart, Users, MousePointerClick } from "lucide-react";
import { getAllProducts, mockOrders } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const monthlyData = [
  { month: "يناير", revenue: 12400, orders: 86 },
  { month: "فبراير", revenue: 15800, orders: 104 },
  { month: "مارس", revenue: 18200, orders: 121 },
  { month: "أبريل", revenue: 16500, orders: 112 },
  { month: "مايو", revenue: 23800, orders: 156 },
  { month: "يونيو", revenue: 20400, orders: 143 },
];

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

export default function AdminAnalyticsPage() {
  const products = getAllProducts();

  const stats = [
    { label: "الإيرادات الشهرية", value: formatCurrency(20400, { forceShow: true }), icon: Wallet, change: "-14.3%" },
    { label: "الطلبات الشهرية", value: "143", icon: ShoppingCart, change: "-8.3%" },
    { label: "زوار الموقع", value: "18,420", icon: MousePointerClick, change: "+22.1%" },
    { label: "عملاء جدد", value: "96", icon: Users, change: "+11.4%" },
  ];

  const topProducts = [...products]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, 5);

  const totalSales = mockOrders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">التحليلات</h1>
        <p className="mt-1 text-sm text-muted-foreground">مؤشرات الأداء الرئيسية لمتجرك.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          const up = s.change.startsWith("+");
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-2xl font-bold text-foreground">{s.value}</p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <span className={`text-xs font-medium ${up ? "text-green-600" : "text-red-600"}`}>{s.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-bold mb-6">الإيرادات الشهرية</h2>
          <div className="flex h-64 items-end gap-3">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {formatCurrency(d.revenue, { maximumFractionDigits: 0, forceShow: true }).replace(/[٠-٩]/g, "")}
                </span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary-700 to-primary-500 transition-all hover:from-primary-800"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  title={`${d.month}: ${formatCurrency(d.revenue, { forceShow: true })}`}
                />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-bold mb-4">الأكثر مبيعاً</h2>
          <ul className="space-y-4">
            {topProducts.map((p, i) => (
              <li key={p.id} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">{p.nameAr}</p>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-primary-600"
                      style={{ width: `${Math.min(100, ((p.rating * p.reviewCount) / 200) * 100)}%` }}
                    />
                  </div>
                </div>
                <span className="shrink-0 text-sm font-bold">{p.reviewCount} تقييم</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            إجمالي مبيعات الشهر: <span className="font-bold text-foreground">{formatCurrency(totalSales, { forceShow: true })}</span>
          </p>
        </div>
      </div>
    </div>
  );
}