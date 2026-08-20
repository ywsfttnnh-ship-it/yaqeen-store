import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/common/logo";

const footerLinks = [
  {
    titleAr: "الأقساط",
    links: [
      { labelAr: "باركيه SPC", href: "/categories/باركيه-spc" },
      { labelAr: "بديل حجر", href: "/categories/بديل-حجر" },
      { labelAr: "سوفت ستون", href: "/categories/سوفت-ستون" },
    ],
  },
  {
    titleAr: "شركة",
    links: [
      { labelAr: "من نحن", href: "/about" },
      { labelAr: "تواصل معنا", href: "/contact" },
      { labelAr: "العروض", href: "/offers" },
      { labelAr: "الأسئلة الشائعة", href: "/faq" },
    ],
  },
  {
    titleAr: "الخدمات",
    links: [
      { labelAr: "الشحن والتوصيل", href: "/shipping" },
      { labelAr: "سياسة الإرجاع", href: "/returns" },
      { labelAr: "الضمان", href: "/warranty" },
      { labelAr: "الدفع الآمن", href: "/payment" },
    ],
  },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-gold-500/40 bg-[#241A12] text-neutral-200" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo
              size="md"
              showText={true}
              className="h-16 w-16 rounded-xl bg-[#F6F1E5] p-1 shadow-luxury"
              textClassName="from-gold-300 to-gold-500"
            />
            <p className="mt-4 text-sm text-neutral-400">
              يقين ستور - متخصص في أرضيات SPC وبدائل الحجر وسوفت ستون عالية الجودة.
            </p>
            <p className="mt-2 text-xs text-neutral-500">© {year} يقين ستور. جميع الحقوق محفوظة.</p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.titleAr}>
              <h3 className="text-lg font-bold text-neutral-100 mb-4">{section.titleAr}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200"
                    >
                      {link.labelAr}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-neutral-100 mb-4">تواصل معنا</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-neutral-500">الهاتف</dt>
                <dd className="font-medium text-neutral-200">+970 59 123 4567</dd>
              </div>
              <div>
                <dt className="text-neutral-500">البريد الإلكتروني</dt>
                <dd className="font-medium text-neutral-200">info@yaqeenstore.com</dd>
              </div>
              <div>
                <dt className="text-neutral-500">العنوان</dt>
                <dd className="font-medium text-neutral-200">رام الله، فلسطين</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <span>خيارات الدفع:</span>
            <div className="flex gap-2 text-xs">
              <span className="border border-neutral-700 rounded px-1.5 py-0.5">Visa</span>
              <span className="border border-neutral-700 rounded px-1.5 py-0.5">Mastercard</span>
              <span className="border border-neutral-700 rounded px-1.5 py-0.5">نقداً عند الاستلام</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
