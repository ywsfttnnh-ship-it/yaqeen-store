"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { mockOrders } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";

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

export default function AdminOrdersPage() {
  const [orders, setOrders] = React.useState(mockOrders);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
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
    setOrders([...local, ...mockOrders]);
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(query.toLowerCase()) ||
      (o.customerInfo?.fullName || "").includes(query),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">الطلبات</h1>
        <p className="mt-1 text-sm text-muted-foreground">{filtered.length} طلب</p>
      </div>

      <div className="max-w-sm">
        <Input placeholder="ابحث برقم الطلب أو اسم العميل..." value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search className="h-4 w-4" />} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-neutral-50 text-muted-foreground">
                <th className="px-5 py-3 text-start font-medium">رقم الطلب</th>
                <th className="px-5 py-3 text-start font-medium">العميل</th>
                <th className="px-5 py-3 text-start font-medium">التاريخ</th>
                <th className="px-5 py-3 text-start font-medium">الإجمالي</th>
                <th className="px-5 py-3 text-start font-medium">طريقة الدفع</th>
                <th className="px-5 py-3 text-start font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((o) => (
                <tr key={o.orderNumber || o.id} className="hover:bg-neutral-50/60">
                  <td className="px-5 py-3 font-medium text-primary-700">{o.orderNumber || o.id}</td>
                  <td className="px-5 py-3">{(o.customerInfo && o.customerInfo.fullName) || "—"}</td>
                  <td className="px-5 py-3 text-muted-foreground">{formatDate(o.createdAt)}</td>
                  <td className="px-5 py-3 font-medium">{formatCurrency(o.total)}</td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {o.paymentMethod === "cash_on_delivery"
                      ? "عند الاستلام"
                      : o.paymentMethod === "bank_transfer"
                        ? "تحويل بنكي"
                        : o.paymentMethod === "credit_card"
                          ? "بطاقة ائتمانية"
                          : o.paymentMethod || "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[o.status] || statusColors.new}`}>
                      {statusLabels[o.status] || "جديد"}
                    </span>
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