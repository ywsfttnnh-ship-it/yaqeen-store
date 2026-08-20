import * as React from "react";
import Link from "next/link";
import { Facebook, Instagram, Phone } from "lucide-react";
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

const CONTACT = {
  phoneDisplay: "+972 59-742-6988",
  phoneTel: "+972597426988",
  facebook: "https://www.facebook.com/profile.php?id=61590887216809",
  instagram: "https://www.instagram.com/yaqeen_1_store/",
};

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
                <dd className="font-medium text-neutral-200">
                  <a
                    href={`tel:${CONTACT.phoneTel}`}
                    className="inline-flex items-center gap-2 hover:text-gold-300 transition-colors"
                    dir="ltr"
                  >
                    <Phone className="h-4 w-4 text-gold-400" />
                    {CONTACT.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-neutral-500">العنوان</dt>
                <dd className="font-medium text-neutral-200">الخليل، فلسطين</dd>
              </div>
              <div>
                <dt className="text-neutral-500">التوصيل</dt>
                <dd className="font-medium text-neutral-200">لجميع مناطق الضفة الغربية</dd>
              </div>
              <div>
                <dt className="text-neutral-500">تابعنا</dt>
                <dd className="flex items-center gap-3 pt-1">
                  <a
                    href={CONTACT.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="فيسبوك"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 hover:bg-[#1877F2] hover:text-white transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="انستغرام"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </dd>
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
