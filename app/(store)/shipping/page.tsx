import * as React from "react";
import type { Metadata } from "next";
import { Truck, Package, Clock, MapPin, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "سياسة الشحن والتوصيل | يقين ستور",
  description: "تعرف على سياسة الشحن والتوصيل في يقين ستور: مناطق التوصيل، المدة، التكلفة والمزايا.",
};

const shippingMethods = [
  {
    icon: Truck,
    name: "شحن قياسي",
    time: "2-5 أيام عمل",
    cost: "49₪ - مجاني للطلبات فوق 500₪",
    description: "توصيل موثوق لجميع محافظات الضفة الغربية.",
  },
  {
    icon: Clock,
    name: "شحن سريع",
    time: "خلال 24-48 ساعة",
    cost: "99₪",
    description: "للطلبات المستعجلة داخل رام الله والبيرة والمجاورة.",
  },
  {
    icon: Package,
    name: "استلام من المعرض",
    time: "فوري",
    cost: "مجاني",
    description: "استلم طلبك مباشرة من معرضنا في رام الله.",
  },
];

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">سياسة الشحن والتوصيل</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          نحرص على توصيل طلبك بأمان وفي الوقت المحدد. إليك كل ما تحتاج معرفته عن الشحن.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shippingMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div key={method.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-bold">{method.name}</h2>
              <p className="mt-1 text-sm font-medium text-primary-700">{method.time}</p>
              <p className="mt-1 text-sm font-bold">{method.cost}</p>
              <p className="mt-3 text-sm text-muted-foreground">{method.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6 text-primary-700" />
            <h2 className="text-xl font-bold">مناطق التوصيل</h2>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>رام الله والبيرة: توصيل خلال 24-48 ساعة</li>
            <li>نابلس، الخليل، جنين، طولكرم، قلقيلية، سلفيت: خلال 2-4 أيام عمل</li>
            <li>بيت لحم، أريحا، طوباس: خلال 2-5 أيام عمل</li>
            <li>مدينة القدس: خلال 3-5 أيام عمل</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-primary-700" />
            <h2 className="text-xl font-bold">معلومات مهمة</h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
            <li>يتم تأكيد الطلب هاتفياً قبل الشحن للتأكد من التفاصيل وتحديد موعد التوصيل.</li>
            <li>التوصيل متاح حتى باب المنزل، مع إمكانية الرفع للطوابق مقابل رسوم بسيطة.</li>
            <li>يتم إرسال رقم تتبع الطلب عبر الرسائل النصية.</li>
            <li>في حال عدم التواجد في موعد التوصيل، سيتم التواصل معك لإعادة تحديد الموعد.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}