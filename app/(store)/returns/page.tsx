import * as React from "react";
import type { Metadata } from "next";
import { RotateCcw, ShieldCheck, CreditCard, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "سياسة الاستبدال والاسترجاع | يقين ستور",
  description: "تعرف على سياسة الاستبدال والاسترجاع في يقين ستور وشروط إرجاع المنتجات.",
};

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">سياسة الاستبدال والاسترجاع</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          رضاك هو أولويتنا. نوفر سياسة مرنة للاستبدال والاسترجاع لضمان تجربة شراء آمنة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
            <RotateCcw className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-bold">14 يوماً للاسترجاع</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            يمكنك إرجاع المنتجات غير المستخدمة خلال 14 يوماً من تاريخ الاستلام واسترداد أموالك كاملة.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-bold">استبدال مجاني</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            استبدال مجاني لأي منتج به عيب مصنعي أو تلف أثناء الشحن خلال 14 يوماً.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
            <CreditCard className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-bold">استرداد سريع</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            يتم استرداد المبلغ خلال 3-7 أيام عمل من تاريخ استلام المنتج المرتجع.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-8">
        <div className="flex items-center gap-3">
          <BadgeCheck className="h-6 w-6 text-primary-700" />
          <h2 className="text-xl font-bold">شروط الاسترجاع</h2>
        </div>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground list-disc list-inside">
          <li>يجب أن يكون المنتج في حالته الأصلية وغير مستخدم وغير تالف.</li>
          <li>يرجى إحضار فاتورة الشراء أو رقم الطلب عند الاسترجاع.</li>
          <li>المنتجات المقطوعة أو المقصوصة حسب المقاس لا تشملها سياسة الاسترجاع.</li>
          <li>رسوم الشحن للاسترجاع يتحملها العميل ما لم يكن السبب عيباً مصنعياً.</li>
          <li>يتم فحص المنتج المرتجع قبل إتمام الاسترداد أو الاستبدال.</li>
        </ul>
      </div>
    </div>
  );
}