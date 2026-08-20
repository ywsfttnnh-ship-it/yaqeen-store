"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, MapPin, CreditCard } from "lucide-react";
import { getOrderById } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { config } from "@/lib/config";
import type { OrderStatus } from "@/types";

const statusLabels: Record<string, string> = {
  new: "جديد",
  processing: "قيد المعالجة",
  shipped: "تم الشحن",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
  refunded: "مسترجع",
};

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = React.useState<ReturnType<typeof getOrderById> | null>(null);

  React.useEffect(() => {
    const mock = getOrderById(params.id);
    let local: Record<string, unknown> | null = null;
    try {
      const raw = localStorage.getItem(`yaqeen-order-${params.id}`);
      if (raw) local = JSON.parse(raw);
    } catch {
      local = null;
    }
    if (local) {
      setOrder({
        id: params.id,
        orderNumber: (local.orderNumber as string) || params.id,
        userId: "",
        items: ((local.items as Array<{ image: string; nameAr: string; quantity: number; price: number }>) || []).map((i, idx) => ({
          id: `item-${idx}`,
          productId: "",
          productName: i.nameAr,
          productNameAr: i.nameAr,
          quantity: i.quantity,
          price: i.price,
          total: i.price * i.quantity,
          image: i.image,
        })),
        subtotal: local.subtotal as number,
        tax: local.tax as number,
        shipping: local.shipping as number,
        discount: 0,
        total: local.total as number,
        status: (local.status as OrderStatus) || "new",
        paymentStatus: "pending",
        paymentMethod: (local.paymentMethod as "cash_on_delivery") || "cash_on_delivery",
        shippingMethod: "standard",
        customerInfo: { fullName: "", email: "", phone: "" },
        shippingAddress: { id: "", fullName: "", phone: "", street: "", city: "", state: "", postalCode: "", country: "فلسطين" },
        billingAddress: { id: "", fullName: "", phone: "", street: "", city: "", state: "", postalCode: "", country: "فلسطين" },
        createdAt: (local.createdAt as string) || new Date().toISOString(),
        updatedAt: (local.createdAt as string) || new Date().toISOString(),
      });
    } else {
      setOrder(mock || null);
    }
  }, [params.id]);

  if (!order) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
        لم يتم العثور على الطلب
      </div>
    );
  }

  const customer = (order.customerInfo || order.shippingAddress);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">تفاصيل الطلب</h2>
          <p className="text-sm text-muted-foreground">{order.orderNumber}</p>
        </div>
        <span className="rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
          {statusLabels[order.status] || order.status}
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 font-bold">المنتجات</h3>
        <ul className="divide-y divide-border">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-neutral-100">
                {item.image && <Image src={item.image} alt={item.productNameAr} fill className="object-cover" sizes="64px" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium line-clamp-1">{item.productNameAr}</p>
                <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
              </div>
              {!config.app.hidePrices && <span className="font-medium">{formatCurrency(item.total)}</span>}
            </li>
          ))}
        </ul>
        {!config.app.hidePrices && (
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">المجموع الفرعي</dt><dd>{formatCurrency(order.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">الشحن</dt><dd>{order.shipping === 0 ? <span className="text-green-600">مجاني</span> : formatCurrency(order.shipping)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">الضريبة</dt><dd>{formatCurrency(order.tax)}</dd></div>
            <div className="flex justify-between text-base font-bold"><dt>الإجمالي</dt><dd className="text-primary-700">{formatCurrency(order.total)}</dd></div>
          </dl>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-3 flex items-center gap-2 font-bold">
            <MapPin className="h-5 w-5 text-primary-600" />
            عنوان التوصيل
          </div>
          <p className="text-sm">{customer.fullName}</p>
          <p className="text-sm text-muted-foreground">{order.shippingAddress.street}</p>
          <p className="text-sm text-muted-foreground">{order.shippingAddress.city}، {order.shippingAddress.state}</p>
          <p className="text-sm text-muted-foreground">{customer.phone}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-3 flex items-center gap-2 font-bold">
            <CreditCard className="h-5 w-5 text-primary-600" />
            الدفع والشحن
          </div>
          <p className="text-sm text-muted-foreground">طريقة الدفع: {order.paymentMethod === "cash_on_delivery" ? "الدفع عند الاستلام" : order.paymentMethod === "bank_transfer" ? "تحويل بنكي" : "بطاقة ائتمانية"}</p>
          <p className="mt-1 text-sm text-muted-foreground">تاريخ الطلب: {formatDate(order.createdAt)}</p>
        </div>
      </div>

      <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium">
        <ChevronRight className="h-4 w-4" />
        العودة إلى طلباتي
      </Link>
    </div>
  );
}