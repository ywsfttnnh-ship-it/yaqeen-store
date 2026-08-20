"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, ChevronLeft } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { getUserOrders } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { config } from "@/lib/config";

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

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = React.useState<ReturnType<typeof getUserOrders>>([]);

  React.useEffect(() => {
    if (user) {
      const mock = getUserOrders(user.id);
      const local = Object.keys(localStorage)
        .filter((k) => k.startsWith("yaqeen-order-"))
        .map((k) => {
          try {
            return JSON.parse(localStorage.getItem(k) || "");
          } catch {
            return null;
          }
        })
        .filter(Boolean);
      setOrders([...local, ...mock]);
    }
  }, [user]);

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-muted-foreground">
          <Package className="h-8 w-8" />
        </div>
        <h2 className="mt-4 text-lg font-bold">لا توجد طلبات بعد</h2>
        <p className="mt-2 text-sm text-muted-foreground">عند إتمام أول طلب لك، ستظهر تفاصيله هنا.</p>
        <Link href="/store" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
          تصفح المتجر
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <ul className="divide-y divide-border">
          {orders.map((order) => (
            <li key={order.orderNumber || order.id} className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">رقم الطلب</p>
                  <p className="font-bold text-primary-700">{order.orderNumber || order.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status] || statusColors.new}`}>
                    {statusLabels[order.status] || "جديد"}
                  </span>
                  {!config.app.hidePrices && <p className="font-bold">{formatCurrency(order.total)}</p>}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  {(order.items || []).slice(0, 4).map((item) => (
                    <div key={item.id || item.productId} className="relative h-14 w-14 overflow-hidden rounded-lg border border-border bg-neutral-100">
                      {item.image && (
                        <Image src={item.image} alt={item.productNameAr || ""} fill className="object-cover" sizes="56px" />
                      )}
                    </div>
                  ))}
                  {(order.items || []).length === 0 && <span className="text-sm text-muted-foreground">{order.items?.length || 0} منتجات</span>}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {(order.items || []).reduce((s, i) => s + (i.quantity || 1), 0)} منتجات
                  </span>
                  <Link href={`/account/orders/${order.orderNumber || order.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
                    عرض التفاصيل
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}