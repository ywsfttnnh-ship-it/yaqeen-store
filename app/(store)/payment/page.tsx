import * as React from "react";
import type { Metadata } from "next";
import { Banknote, Landmark, CreditCard, Wallet, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "طرق الدفع | يقين ستور",
  description: "طرق دفع آمنة ومتنوعة في يقين ستور: الدفع عند الاستلام، التحويل البنكي، والبطاقات الائتمانية.",
};

const methods = [
  {
    icon: Banknote,
    title: "الدفع عند الاستلام",
    description: "ادفع نقداً عند استلام طلبك. الطريقة الأكثر أماناً وانتشاراً في فلسطين.",
  },
  {
    icon: Landmark,
    title: "التحويل البنكي",
    description: "حوّل المبلغ لحسابنا البنكي وسنبدأ تجهيز طلبك فور تأكيد التحويل.",
  },
  {
    icon: CreditCard,
    title: "بطاقة ائتمانية",
    description: "ادفع ببطاقتك الائتمانية عبر قنوات الدفع الآمنة المشفرة بالكامل.",
  },
  {
    icon: Wallet,
    title: "المحافظ الرقمية",
    description: "ادفع عبر محافظ الدفع الإلكترونية المتوفرة في فلسطين.",
  },
];

export default function PaymentPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">طرق الدفع</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          نقدم لك خيارات دفع مرنة وآمنة تناسب احتياجاتك.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {methods.map((method) => {
          const Icon = method.icon;
          return (
            <div key={method.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-bold">{method.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{method.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-primary-200 bg-primary-50 p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-700 text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary-900">دفع آمن ومشفّر</h2>
            <p className="mt-2 text-sm leading-7 text-primary-800/80">
              جميع معاملات الدفع الإلكتروني تتم عبر بوابات دفع آمنة ومشفرة بمعايير PCI-DSS،
              ولا نقوم بتخزين أي بيانات بطاقة على خوادمنا. عند الدفع عند الاستلام، يتم
              فحص المنتج قبل دفع المبلغ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}