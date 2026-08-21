import * as React from "react";
import Link from "next/link";
import { Facebook, Instagram, Phone, MapPin, Truck, ShieldCheck, ArrowUpLeft } from "lucide-react";
import { Logo } from "@/components/common/logo";

const footerLinks = [
  {
    titleAr: "الأقسام الفاخرة",
    links: [
      { labelAr: "باركيه SPC", href: "/categories/باركيه-spc" },
      { labelAr: "بديل حجر", href: "/categories/بديل-حجر" },
      { labelAr: "سوفت ستون", href: "/categories/سوفت-ستون" },
    ],
  },
  {
    titleAr: "عن المتجر",
    links: [
      { labelAr: "من نحن", href: "/about" },
      { labelAr: "تواصل معنا", href: "/contact" },
      { labelAr: "الأسئلة الشائعة", href: "/faq" },
    ],
  },
  {
    titleAr: "الخدمات والضمان",
    links: [
      { labelAr: "الشحن والتوصيل", href: "/shipping" },
      { labelAr: "سياسة الإرجاع", href: "/returns" },
      { labelAr: "الضمان المعتمد", href: "/warranty" },
      { labelAr: "طرق الطلب والاستفسار", href: "/payment" },
    ],
  },
];

const CONTACT = {
  phoneDisplay: "+972 59-742-6988",
  phoneTel: "+972597426988",
  facebook: "https://www.facebook.com/profile.php?id=61590887216809",
  instagram: "https://www.instagram.com/yaqeen_1_store/",
  location: "الخليل، فلسطين",
  delivery: "🚚 توصيل لجميع مناطق الضفة الغربية",
};

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gold-500/30 bg-[#14110F] text-neutral-300 overflow-hidden" dir="rtl">
      {/* Ambient background lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 border-b border-neutral-800 pb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Logo
              size="md"
              showText={true}
              textClassName="text-gold-400 font-display text-2xl font-bold"
            />
            <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
              يقين ستور — العلامة المتميزة والأولى في فلسطين لأرضيات الـ SPC الفاخرة، ألواح بديل الحجر، وتصاميم السوفت ستون العصرية. جودة استثنائية مع ضمان يمتد حتى 25 سنة.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="فيسبوك"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-gold-500/50 hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="انستغرام"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-gold-500/50 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all duration-300 shadow-sm"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                aria-label="اتصل بنا"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-gold-400 hover:bg-gold-500 hover:text-neutral-950 transition-all duration-300 shadow-sm"
              >
                <Phone className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.titleAr} className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase border-s-2 border-gold-500 ps-3">
                {section.titleAr}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-gold-300 transition-colors duration-200"
                    >
                      <span>{link.labelAr}</span>
                      <ArrowUpLeft className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase border-s-2 border-gold-500 ps-3">
              المقر والتواصل
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-neutral-300">
                <MapPin className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{CONTACT.location}</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-neutral-300">
                <Truck className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{CONTACT.delivery}</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-neutral-300">
                <Phone className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${CONTACT.phoneTel}`}
                    className="font-medium text-gold-400 hover:text-gold-300 transition-colors"
                    dir="ltr"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                  <p className="text-xs text-neutral-500 mt-0.5">تواصل مباشر للاستفسارات والطلب</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {year} يقين ستور | Yaqeen Store. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-gold-500" />
            <span>منتجات أصلية بمواصفات عالمية وضمان حقيقي</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
