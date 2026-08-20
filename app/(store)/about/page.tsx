import * as React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Gem, Shield, Truck, HeartHandshake, Target, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "من نحن | يقين ستور",
  description: "تعرف على يقين ستور، وجهتك الأولى لأفضل أرضيات الباركيه SPC وبديل الحجر وسوفت ستون في فلسطين.",
};

const values = [
  {
    icon: Gem,
    title: "جودة استثنائية",
    description: "نختار منتجاتنا بعناية من أفضل المصانع العالمية لضمان أعلى معايير الجودة والمتانة.",
  },
  {
    icon: Shield,
    title: "موثوقية",
    description: "اسم يقين يعني الثقة. نلتزم بتسليم منتجات أصلية 100% مع ضمان حقيقي.",
  },
  {
    icon: Truck,
    title: "توصيل سريع",
    description: "خدمة توصيل سريعة وآمنة لجميع محافظات الضفة الغربية.",
  },
  {
    icon: HeartHandshake,
    title: "خدمة عملاء",
    description: "فريق دعم متخصص يرافقك من الاستشارة حتى التركيب وما بعد البيع.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">يقين ستور</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            يقين ستور علامة تجارية فلسطينية متخصصة في توفير أرقى حلول الأرضيات العصرية، من
            الباركيه SPC المقاوم للماء إلى بديل الحجر الطبيعي وسوفت ستون، نقدم منتجات تجمع بين
            الجمال الفاخر والمتانة العالية وبأسعار تنافسية.
          </p>
          <p className="mt-4 leading-8 text-muted-foreground">
            نؤمن أن بيتك يستحق الأفضل، لذلك نحرص على انتقاء كل منتج بعناية فائقة ليمنح مساحتك
            لمسة فاخرة تدوم سنوات طويلة، مع ضمان شامل وخدمة ما بعد البيع.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <p className="text-4xl font-bold text-primary-700">+500</p>
              <p className="mt-1 text-sm text-muted-foreground">عميل سعيد</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-700">+50</p>
              <p className="mt-1 text-sm text-muted-foreground">تصميم متنوع</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-700">+5</p>
              <p className="mt-1 text-sm text-muted-foreground">سنوات خبرة</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-700">100%</p>
              <p className="mt-1 text-sm text-muted-foreground">ضمان الجودة</p>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-luxury-xl">
          <Image
            src="/assets/products/SPC/img-001.png"
            alt="منتجات يقين ستور"
            width={800}
            height={600}
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">قيمنا</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          مبادئ تحدد هويتنا وطريقة عملنا كل يوم
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="rounded-2xl border border-border bg-card p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-bold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold">رسالتنا</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                تقديم أفضل منتجات الأرضيات بأعلى جودة وأسعار عادلة، مع خدمة استشارية ترافق العميل
                خطوة بخطوة حتى يرى مساحته بالشكل الذي يحلم به.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold">رؤيتنا</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                أن نكون الوجهة الأولى لمواد التشطيب العصرية في فلسطين والمنطقة، ورمزاً للجودة
                والثقة في عالم الأرضيات.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}