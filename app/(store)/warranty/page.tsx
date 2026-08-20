import * as React from "react";
import type { Metadata } from "next";
import { ShieldCheck, Award, FileCheck, BadgePercent } from "lucide-react";

export const metadata: Metadata = {
  title: "الضمان | يقين ستور",
  description: "ضمان حقيقي على جميع منتجات يقين ستور من الباركيه SPC وبديل الحجر وسوفت ستون.",
};

const warranties = [
  {
    icon: ShieldCheck,
    title: "ضمان SPC وود",
    duration: "15 سنة",
    description: "ضمان ضد التشوه والاعوجاج والتقشير على الباركيه SPC.",
  },
  {
    icon: ShieldCheck,
    title: "ضمان بديل الحجر",
    duration: "10 سنوات",
    description: "ضمان ضد الكسر والتشقق على منتجات بديل الحجر.",
  },
  {
    icon: ShieldCheck,
    title: "ضمان سوفت ستون",
    duration: "8 سنوات",
    description: "ضمان ضد تغير اللون والتآكل على منتجات سوفت ستون.",
  },
  {
    icon: ShieldCheck,
    title: "ضمان التركيب",
    duration: "سنتان",
    description: "ضمان على جودة التركيب من فريقنا المعتمد.",
  },
];

export default function WarrantyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
          <Award className="h-4 w-4" />
          ضمان حقيقي
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">الضمان على منتجاتنا</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          جميع منتجات يقين ستور مشمولة بضمان حقيقي يمنحك راحة البال لسنوات طويلة.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {warranties.map((w) => {
          const Icon = w.icon;
          return (
            <div key={w.title} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                <Icon className="h-7 w-7" />
              </div>
              <h2 className="mt-4 font-bold">{w.title}</h2>
              <p className="mt-1 text-2xl font-bold text-primary-700">{w.duration}</p>
              <p className="mt-2 text-sm text-muted-foreground">{w.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-8">
        <div className="flex items-center gap-3">
          <FileCheck className="h-6 w-6 text-primary-700" />
          <h2 className="text-xl font-bold">شروط الضمان</h2>
        </div>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground list-disc list-inside">
          <li>الضمان ساري من تاريخ استلام الطلب ولا يشمل سوء الاستخدام أو الإهمال.</li>
          <li>يجب الحفاظ على فاتورة الشراء لإثبات الضمان.</li>
          <li>التركيب من قبل فرق غير معتمدة قد يبطل الضمان على التركيب.</li>
          <li>يُستثنى الضمان من الأضرار الناتجة عن الكوارث الطبيعية أو الماء المتسرب من الداخل.</li>
          <li>في حال وجود عيب مصنعي، نقوم بالاستبدال أو الإصلاح مجاناً خلال مدة الضمان.</li>
        </ul>
      </div>

      <div className="mt-8 rounded-2xl bg-primary-700 p-8 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BadgePercent className="h-8 w-8" />
            <div>
              <h2 className="text-lg font-bold">تفعيل الضمان الممتد</h2>
              <p className="text-sm opacity-90">سجّل منتجك خلال 30 يوماً من الشراء لتفعيل الضمان الممتد مجاناً.</p>
            </div>
          </div>
          <a
            href="/contact"
            className="rounded-lg bg-[#F6F1E5] px-6 py-3 text-sm font-bold text-primary-700 hover:bg-white transition-colors"
          >
            فعّل ضمانك
          </a>
        </div>
      </div>
    </div>
  );
}