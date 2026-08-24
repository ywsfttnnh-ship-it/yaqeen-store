"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingCart, Sparkles, Phone, ShieldCheck, Truck, Layers, Eye } from "lucide-react";
import type { Category, Product } from "@/types";
import { config } from "@/lib/config";
import { useCart } from "@/lib/context/cart-context";

interface OryzoCinematicHomeProps {
  categories: Category[];
  products: Product[];
}

export const OryzoCinematicHome: React.FC<OryzoCinematicHomeProps> = ({ products }) => {
  const { totalItems, openCart } = useCart();
  const [scrollY, setScrollY] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState<"parquet" | "stone" | "soft">("parquet");

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const spcProducts = products.filter((p) => p.categoryId === "cat-spc");
  const stoneProducts = products.filter((p) => p.categoryId === "cat-stone-alt");
  const softProducts = products.filter((p) => p.categoryId === "cat-soft-stone");

  const currentList =
    activeTab === "parquet" ? spcProducts : activeTab === "stone" ? stoneProducts : softProducts;

  // Parallax calculations inspired by oryzo.ai 3D smooth scroll experience
  const heroTranslate = scrollY * 0.35;
  const heroOpacity = Math.max(0, 1 - scrollY / 700);
  const scale3d = Math.min(1.2, 1 + scrollY * 0.0004);

  return (
    <div className="bg-[#0D0B0A] text-[#e9e1dd] font-sans antialiased overflow-x-hidden min-h-screen selection:bg-[#C5A059] selection:text-[#432b14]" dir="rtl">
      
      {/* Ambient 3D Interactive Lighting Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-1/4 w-[60vw] h-[60vw] rounded-full bg-[#8D6E52]/15 blur-[120px] transition-transform duration-700 ease-out"
          style={{ transform: `translateY(${scrollY * 0.15}px) scale(${scale3d})` }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-[70vw] h-[70vw] rounded-full bg-[#C5A059]/10 blur-[150px] transition-transform duration-700 ease-out"
          style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
        />
      </div>

      {/* Glassmorphic Sticky Header */}
      <header className="fixed top-0 w-full z-50 px-6 sm:px-12 py-5 flex justify-between items-center bg-[#0D0B0A]/80 backdrop-blur-2xl border-b border-[#e5bf9f]/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#e5bf9f]/30 shadow-md">
            <Image
              src="/assets/products/لوقو المتجر/img-025.png"
              alt="يقين ستور"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-[#e5bf9f] transition-colors">
            Yaqeen Store | يقين ستور
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-label-caps text-xs tracking-widest text-[#d3c4b9]">
          <Link href="#hero" className="hover:text-white transition-colors">الرئيسية</Link>
          <Link href="#parquet" className="hover:text-white transition-colors">باركيه SPC</Link>
          <Link href="#stone" className="hover:text-white transition-colors">بديل الحجر</Link>
          <Link href="#softstone" className="hover:text-white transition-colors">سوفت ستون</Link>
          <Link href="/store" className="hover:text-white transition-colors">المتجر</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={openCart}
            aria-label="السلة"
            className="relative p-2.5 rounded-full bg-[#221f1d] border border-[#4f453d]/40 text-[#e9e1dd] hover:text-[#e5bf9f] hover:border-[#e5bf9f]/50 transition-all shadow-md"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C5A059] text-[#131313] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
          
          <a
            href="tel:+972597426988"
            className="hidden sm:inline-flex items-center gap-2 bg-[#8D6E52] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#6e4b28] transition-all shadow-lg"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>اتصل بنا</span>
          </a>
        </div>
      </header>

      {/* Hero Section with 3D Parallax Depth */}
      <section
        id="hero"
        className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-28 pb-20 px-6 sm:px-12"
        style={{ opacity: heroOpacity, transform: `translateY(${heroTranslate}px)` }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/products/SPC/img-001.png"
            alt="يقين ستور - أرضيات فاخرة"
            fill
            priority
            className="object-cover object-center brightness-[0.35] scale-105 transition-transform duration-1000"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-[#0D0B0A]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5bf9f]/30 bg-[#8D6E52]/20 px-5 py-2 text-xs font-semibold text-[#e5bf9f] backdrop-blur-xl animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-[#e9c176]" />
            <span>Cinematic Architectural 3D Experience</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15]">
            فخامة التصميم المعماري <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5bf9f] via-[#C5A059] to-[#d3c4b9]">
              وتفاصيل استثنائية لا تُضاهى
            </span>
          </h1>

          <p className="text-[#ccc5c1] text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            اكتشف أحدث تشكيلات أرضيات SPC الباركيه الفاخرة، بدائل الحجر الإيطالية، وتكسيات السوفت ستون المعمارية مع تجربة تصفح ثلاثية الأبعاد سلسة.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="#showcase"
              className="bg-[#C5A059] text-[#131313] px-9 py-4 rounded-full text-sm font-bold tracking-wide hover:bg-[#e5bf9f] transition-all duration-300 shadow-[0_10px_30px_rgba(197,160,89,0.3)] flex items-center gap-2"
            >
              <span>استكشف المعرض التفاعلي</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href="/store"
              className="border border-[#e5bf9f]/40 text-white px-9 py-4 rounded-full text-sm font-bold tracking-wide hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
            >
              تصفح كافة المنتجات
            </Link>
          </div>

          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-[#4f453d]/40 mt-12">
            <div className="text-center p-4 rounded-2xl glass-panel">
              <ShieldCheck className="h-6 w-6 text-[#C5A059] mx-auto mb-2" />
              <div className="font-bold text-white text-base">ضمان 25 سنة</div>
              <div className="text-xs text-[#d3c4b9]">ثقة مطلقة بالمتانة</div>
            </div>
            <div className="text-center p-4 rounded-2xl glass-panel">
              <Truck className="h-6 w-6 text-[#C5A059] mx-auto mb-2" />
              <div className="font-bold text-white text-base">توصيل للضفة</div>
              <div className="text-xs text-[#d3c4b9]">لكافة مدن وقرى الضفة</div>
            </div>
            <div className="text-center p-4 rounded-2xl glass-panel">
              <Layers className="h-6 w-6 text-[#C5A059] mx-auto mb-2" />
              <div className="font-bold text-white text-base">مقاومة 100%</div>
              <div className="text-xs text-[#d3c4b9]">ضد الماء والرطوبة</div>
            </div>
            <div className="text-center p-4 rounded-2xl glass-panel">
              <Sparkles className="h-6 w-6 text-[#C5A059] mx-auto mb-2" />
              <div className="font-bold text-white text-base">الخليل، فلسطين</div>
              <div className="text-xs text-[#d3c4b9]">المعرض الرئيسي</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - Parquet (`باركيه`) */}
      <section id="parquet" className="py-28 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#e5bf9f]">المجموعة الأولى</span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white">
              باركيه SPC الفاخر <br />
              <span className="text-[#C5A059]">بلمسة خشب طبيعي أصيل</span>
            </h2>
            <p className="text-[#ccc5c1] text-base leading-relaxed">
              تجمع أرضيات SPC بين صلابة الحجر الطبيعي ودفء الخشب الكلاسيكي. مصممة بتقنية القفل والنقر (Click-Lock) لسهولة فائقة في التركيب مع مقاومة تامة للماء والخدوش.
            </p>
            <div className="pt-2 flex gap-4">
              <Link
                href="/categories/باركيه-spc"
                className="inline-flex items-center gap-2 bg-[#8D6E52] text-white px-7 py-3.5 rounded-full text-xs font-semibold hover:bg-[#6e4b28] transition-all shadow-md"
              >
                <span>استعرض تشكيلة الباركيه</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {spcProducts.slice(0, 2).map((prod) => {
              const img = prod.images[0];
              return (
                <div key={prod.id} className="group glass-panel rounded-2xl overflow-hidden border border-[#4f453d]/40 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#e5bf9f]">
                  <Link href={`/product/${prod.slug}`} className="block aspect-[4/4] relative bg-[#100e0c]">
                    <Image
                      src={img?.url || "/placeholder.png"}
                      alt={prod.nameAr}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  </Link>
                  <div className="p-5">
                    <h3 className="font-bold text-white text-base mb-1">{prod.nameAr}</h3>
                    <p className="text-xs text-[#d3c4b9] line-clamp-1 mb-3">{prod.shortDescriptionAr}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-[#4f453d]/40">
                      {!config.app.hidePrices && (
                        <span className="font-bold text-white text-lg">{prod.price} ₪</span>
                      )}
                      <Link href={`/product/${prod.slug}`} className="p-2 rounded-full bg-[#131313] text-[#e5bf9f] hover:bg-[#e5bf9f] hover:text-[#131313] transition-colors">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2 - Stone Alternative (`بديل حجر`) */}
      <section id="stone" className="py-28 bg-[#161311]/80 border-t border-b border-[#4f453d]/40 relative">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stoneProducts.slice(0, 2).map((prod) => {
                const img = prod.images[0];
                return (
                  <div key={prod.id} className="group glass-panel rounded-2xl overflow-hidden border border-[#4f453d]/40 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#e5bf9f]">
                    <Link href={`/product/${prod.slug}`} className="block aspect-[4/4] relative bg-[#100e0c]">
                      <Image
                        src={img?.url || "/placeholder.png"}
                        alt={prod.nameAr}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    </Link>
                    <div className="p-5">
                      <h3 className="font-bold text-white text-base mb-1">{prod.nameAr}</h3>
                      <p className="text-xs text-[#d3c4b9] line-clamp-1 mb-3">{prod.shortDescriptionAr}</p>
                      <div className="flex justify-between items-center pt-3 border-t border-[#4f453d]/40">
                        {!config.app.hidePrices && (
                          <span className="font-bold text-white text-lg">{prod.price} ₪</span>
                        )}
                        <Link href={`/product/${prod.slug}`} className="p-2 rounded-full bg-[#131313] text-[#e5bf9f] hover:bg-[#e5bf9f] hover:text-[#131313] transition-colors">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#e5bf9f]">المجموعة الثانية</span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display text-white">
                بديل الحجر والرخام <br />
                <span className="text-[#C5A059]">فخامة إيطالية بتكلفة ذكية</span>
              </h2>
              <p className="text-[#ccc5c1] text-base leading-relaxed">
                ألواح بديل الرخام والحجر الفاخرة التي تمنح جدرانك، مطابخك، وصالوناتك مظهراً سينمائياً راقياً. خفيفة الوزن، سهلة التنظيف، ومقاومة تامة للحرارة والرطوبة.
              </p>
              <div className="pt-2 flex gap-4">
                <Link
                  href="/categories/بديل-حجر"
                  className="inline-flex items-center gap-2 bg-[#8D6E52] text-white px-7 py-3.5 rounded-full text-xs font-semibold hover:bg-[#6e4b28] transition-all shadow-md"
                >
                  <span>استعرض ألواح بديل الحجر</span>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Soft Stone (`سوفت ستون`) */}
      <section id="softstone" className="py-28 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#e5bf9f]">المجموعة الثالثة</span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white">
              مجموعات سوفت ستون <br />
              <span className="text-[#C5A059]">نعومة الحجر المرن لجدرانك</span>
            </h2>
            <p className="text-[#ccc5c1] text-base leading-relaxed">
              الحجر الطبيعي المرن والمبتكر الذي يضفي ملمساً ترابياً دافئاً وإحساساً بالفخامة المستدامة على أي جدار داخلي أو خارجي.
            </p>
            <div className="pt-2 flex gap-4">
              <Link
                href="/categories/سوفت-ستون"
                className="inline-flex items-center gap-2 bg-[#8D6E52] text-white px-7 py-3.5 rounded-full text-xs font-semibold hover:bg-[#6e4b28] transition-all shadow-md"
              >
                <span>استعرض سوفت ستون</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {softProducts.slice(0, 2).map((prod) => {
              const img = prod.images[0];
              return (
                <div key={prod.id} className="group glass-panel rounded-2xl overflow-hidden border border-[#4f453d]/40 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#e5bf9f]">
                  <Link href={`/product/${prod.slug}`} className="block aspect-[4/4] relative bg-[#100e0c]">
                    <Image
                      src={img?.url || "/placeholder.png"}
                      alt={prod.nameAr}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  </Link>
                  <div className="p-5">
                    <h3 className="font-bold text-white text-base mb-1">{prod.nameAr}</h3>
                    <p className="text-xs text-[#d3c4b9] line-clamp-1 mb-3">{prod.shortDescriptionAr}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-[#4f453d]/40">
                      {!config.app.hidePrices && (
                        <span className="font-bold text-white text-lg">{prod.price} ₪</span>
                      )}
                      <Link href={`/product/${prod.slug}`} className="p-2 rounded-full bg-[#131313] text-[#e5bf9f] hover:bg-[#e5bf9f] hover:text-[#131313] transition-colors">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Showcase Tabs / Category Switcher */}
      <section id="showcase" className="py-24 bg-[#1b1c1c]/70 border-t border-[#4f453d]/40">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#e5bf9f]">المعرض التفاعلي</span>
            <h2 className="text-3xl font-bold text-white mt-2 font-display">تصفح أقسام المتجر بسلاسة</h2>
            
            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={() => setActiveTab("parquet")}
                className={`px-6 py-3 rounded-full text-xs font-bold transition-all ${
                  activeTab === "parquet"
                    ? "bg-[#C5A059] text-[#131313] shadow-lg"
                    : "glass-panel text-[#d3c4b9] hover:text-white"
                }`}
              >
                باركيه SPC
              </button>
              <button
                onClick={() => setActiveTab("stone")}
                className={`px-6 py-3 rounded-full text-xs font-bold transition-all ${
                  activeTab === "stone"
                    ? "bg-[#C5A059] text-[#131313] shadow-lg"
                    : "glass-panel text-[#d3c4b9] hover:text-white"
                }`}
              >
                بديل حجر
              </button>
              <button
                onClick={() => setActiveTab("soft")}
                className={`px-6 py-3 rounded-full text-xs font-bold transition-all ${
                  activeTab === "soft"
                    ? "bg-[#C5A059] text-[#131313] shadow-lg"
                    : "glass-panel text-[#d3c4b9] hover:text-white"
                }`}
              >
                سوفت ستون
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentList.map((prod) => {
              const img = prod.images[0];
              return (
                <div key={prod.id} className="group glass-panel rounded-2xl overflow-hidden border border-[#4f453d]/40 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#e5bf9f]">
                  <Link href={`/product/${prod.slug}`} className="block aspect-[4/4] relative bg-[#100e0c]">
                    <Image
                      src={img?.url || "/placeholder.png"}
                      alt={prod.nameAr}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </Link>
                  <div className="p-5">
                    <h3 className="font-bold text-white text-base mb-1">{prod.nameAr}</h3>
                    <p className="text-xs text-[#d3c4b9] line-clamp-1 mb-3">{prod.shortDescriptionAr}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-[#4f453d]/40">
                      {!config.app.hidePrices && (
                        <span className="font-bold text-white text-lg">{prod.price} ₪</span>
                      )}
                      <Link href={`/product/${prod.slug}`} className="p-2 rounded-full bg-[#131313] text-[#e5bf9f] hover:bg-[#e5bf9f] hover:text-[#131313] transition-colors">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer className="py-24 bg-[#0D0B0A] border-t border-[#4f453d]/40 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#e5bf9f]/40 mx-auto shadow-xl relative">
            <Image
              src="/assets/products/لوقو المتجر/img-025.png"
              alt="يقين ستور"
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white">
            جاهز لتحديث مساحتك بأناقة معمارية فريدة؟
          </h2>

          <p className="text-[#ccc5c1] text-base max-w-xl mx-auto leading-relaxed">
            معرضنا الرئيسي في الخليل، فلسطين. نوفر التوصيل السريع لكافة مناطق ومدن الضفة الغربية. تواصل معنا الآن للاستفسار والطلب.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+972597426988"
              className="inline-flex items-center gap-2 bg-[#C5A059] text-[#131313] px-9 py-4 rounded-full text-sm font-bold tracking-wider hover:bg-[#e5bf9f] transition-all shadow-[0_10px_30px_rgba(197,160,89,0.3)]"
            >
              <Phone className="h-4 w-4" />
              <span>اطلب الآن / تواصل معنا: +972 59-742-6988</span>
            </a>
          </div>

          <div className="pt-12 text-xs text-[#9b8e85] border-t border-[#4f453d]/30">
            © {new Date().getFullYear()} Yaqeen Store | يقين ستور. جميع الحقوق محفوظة. Cinematic 3D Experience.
          </div>
        </div>
      </footer>

    </div>
  );
};