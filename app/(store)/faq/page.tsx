"use client";

import * as React from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const faqs = [
  {
    question: "ما هو الباركيه SPC؟",
    answer:
      "الباركيه SPC (Stone Plastic Composite) هو نوع من أرضيات الفينيل الفاخرة المصنوعة من مزيج الحجر الطبيعي والبلاستيك، ويتميز بمقاومته العالية للماء والخدوش، وثباته الحراري، وسهولة تركيبه دون الحاجة لإزالة الأرضية القديمة.",
  },
  {
    question: "كم تكلفة التركيب؟",
    answer:
      "يتم احتساب تكلفة التركيب بناءً على المساحة ونوع المنتج المختار. تواصل معنا عبر صفحة اتصل بنا للحصول على عرض سعر مجاني، أو اطلب استشارة مهندسنا للوصول لمساحة موقعك.",
  },
  {
    question: "هل يمكن تركيب الباركيه فوق السيراميك القديم؟",
    answer:
      "نعم، من أبرز مزايا الباركيه SPC أنه يُركب فوق أي أرضية مستوية تقريباً مثل السيراميك والرخام والخرسانة دون الحاجة إلى إزالتها، مما يوفر عليك الوقت وتكاليف الهدم.",
  },
  {
    question: "هل المنتجات مقاومة للماء؟",
    answer:
      "نعم، جميع منتجات الباركيه SPC مقاومة للماء 100%، كما أن منتجات بديل الحجر وسوفت ستون تتمتع بخصائص مقاومة ممتازة للرطوبة والحرارة، مما يجعلها مثالية للمطابخ والحمامات.",
  },
  {
    question: "ما هو الضمان المتوفر؟",
    answer:
      "توفر يقين ستور ضماناً حقيقياً على جميع منتجاتها يمتد لعدة سنوات حسب المنتج. راجع صفحة الضمان لمعرفة تفاصيل الضمان الخاص بكل منتج.",
  },
  {
    question: "كم يستغرق توصيل الطلب؟",
    answer:
      "نقوم بالتوصيل خلال 2-5 أيام عمل داخل الضفة الغربية، مع إمكانية التوصيل السريع خلال 24 ساعة للطلبات المستعجلة. الشحن مجاني للطلبات التي تتجاوز 500 شيكل.",
  },
  {
    question: "هل يمكنني طلب عينة قبل الشراء؟",
    answer:
      "نعم، يمكنك طلب عينات من المنتجات قبل اتخاذ قرار الشراء لترى الألوان والخامات الحقيقية عن قرب. تواصل معنا لترتيب موعد معاينة العينات.",
  },
  {
    question: "كيف أختار المنتج المناسب لمساحتي؟",
    answer:
      "فريقنا الاستشاري يساعدك مجاناً في اختيار الأرضية الأنسب بناءً على نوع المساحة (غرف، مطابخ، حمامات، مكاتب) وميزانيتك وذوقك. اطلب استشارة مجانية عبر صفحة اتصل بنا.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
          <MessageCircleQuestion className="h-4 w-4" />
          الأسئلة الشائعة
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">كيف يمكننا مساعدتك؟</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          إجابات لأكثر الأسئلة شيوعاً حول منتجاتنا وخدماتنا
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className={cn(
                "rounded-2xl border bg-card overflow-hidden transition-all",
                isOpen ? "border-primary-600 shadow-luxury" : "border-border",
              )}
            >
              <button
                className="flex w-full items-center justify-between gap-4 p-5 text-start"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="font-medium text-foreground">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180 text-primary-600",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200 ease-in-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}