import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Flame, Sparkles, Truck, BadgePercent, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "العروض والتخفيضات | يقين ستور",
  description: "اكتشف أحدث عروض وتخفيضات يقين ستور على الباركيه SPC وبديل الحجر وسوفت ستون.",
};

const offers = [
  {
    icon: Truck,
    title: "شحن مجاني للطلبات فوق 500₪",
    description: "استمتع بشحن مجاني لجميع طلباتك التي تتجاوز قيمتها 500 شيكل داخل فلسطين.",
    highlight: false,
  },
  {
    icon: BadgePercent,
    title: "خصم 10% على الطلبات الكبيرة",
    description: "احصل على خصم إضافي 10% عند طلب كميات كبيرة من أي منتج (أكثر من 20 متر مربع).",
    highlight: true,
  },
  {
    icon: Sparkles,
    title: "خصم 15% على المجموعة الجديدة",
    description: "على جميع منتجات سوفت ستون الجديدة لفترة محدودة، اكتشف أحدث التصاميم.",
    highlight: false,
  },
  {
    icon: Phone,
    title: "استشارة مجانية عبر الهاتف",
    description: "استشر مهندسينا مجاناً لاختيار الأرضية المثالية لمساحتك وميزانيتك.",
    highlight: false,
  },
];

export default function OffersPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
          <Flame className="h-4 w-4" />
          عروض حصرية
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">العروض والتخفيضات</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          عروض حصرية على أجود أنواع الباركيه وأرضيات الحجر والتصاميم العصرية. وفر أكثر مع يقين ستور.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => {
          const Icon = offer.icon;
          return (
            <div
              key={offer.title}
              className={
                offer.highlight
                  ? "rounded-2xl border-2 border-primary-600 bg-primary-50 p-8 shadow-luxury-xl"
                  : "rounded-2xl border border-border bg-card p-8"
              }
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-bold">{offer.title}</h2>
              <p className="mt-2 text-muted-foreground">{offer.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl bg-gradient-to-l from-primary-700 to-primary-600 p-8 sm:p-12 text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-bold">لا تفوّت فرصة التوفير</h2>
        <p className="mt-3 max-w-xl mx-auto opacity-90">
          تواصل معنا الآن للحصول على استشارة مجانية وأفضل العروض على مشروعك القادم.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button asChild variant="gold" size="lg">
            <Link href="/contact">تواصل معنا</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/60 text-white hover:bg-white/10">
            <Link href="/store">
              <ArrowLeft className="h-5 w-5" />
              تصفح المتجر
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}