"use client";

import * as React from "react";
import Link from "next/link";
import {
  Wallet,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
} from "lucide-react";
import { getAllProducts, mockOrders } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/lib/context/auth-context";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const products = getAllProducts();
  const totalRevenue = mockOrders.reduce((s, o) => s + o.total, 0);
  const totalOrders = mockOrders.length;

  const stats = [
    { label: "إجمالي الإيرادات", value: formatCurrency(totalRevenue), icon: Wallet, trend: "+12.5%", up: true },
    { label: "الطلبات", value: String(totalOrders), icon: ShoppingCart, trend: "+4.2%", up: true },
    { label: "المنتجات", value: String(products.length), icon: Package, trend: "+2", up: true },
    { label: "العملاء", value: "1,248", icon: Users, trend: "+8.1%", up: true },
  ];

  const recentOrders = [...mockOrders].slice(0, 5);

  const statusLabels: Record<string, string> = {
    new: "جديد",
    processing: "قيد المعالجة",
    shipped: "تم الشحن",
    delivered: "تم التوصيل",
    cancelled: "ملغي",
    refunded: "مسترجع",
  };

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    processing: "bg-amber-100 text-amber-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    refunded: "bg-neutral-100 text-neutral-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مرحباً، {user?.nameAr}</h1>
          <p className="mt-1 text-sm text-muted-foreground">إليك نظرة عامة على أداء متجرك اليوم.</p>
        </div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 transition-colors"
        >
          إضافة منتج
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={
                    stat.up
                      ? "inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
                      : "inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700"
                  }
                >
                  {stat.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.trend}
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-bold">أحدث الطلبات</h2>
            <Link href="/admin/orders" className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800">
              عرض الكل
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {recentOrders.map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-medium text-sm">{order.customerInfo.fullName}</p>
                  <p className="text-xs text-muted-foreground">{order.orderNumber}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                  <span className="text-sm font-bold">{formatCurrency(order.total)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-bold">المخزون المنخفض</h2>
          <ul className="mt-4 space-y-3">
            {products
              .filter((p) => p.stock < 100)
              .slice(0, 5)
              .map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium line-clamp-1">{p.nameAr}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${p.stock < 30 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                    {p.stock} متر
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}