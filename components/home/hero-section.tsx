"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck, Droplet, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    title: "أرضيات SPC الفاخرة",
    subtitle: "دفء الخشب الطبيعي مع صلابة الحجر ومقاومة للماء 100%",
    tag: "ضمان 25 سنة",
    image: "/assets/products/SPC/img-001.png",
    link: "/categories/باركيه-spc",
  },
  {
    title: "بديل الحجر والرخام",
    subtitle: "جمال الأسطح الطبيعية بتكلفة مناسبة وتركيب خفيف وسريع",
    tag: "فخامة عصرية",
    image: "/assets/products/بديل حجر/img-011.png",
    link: "/categories/بديل-حجر",
  },
  {
    title: "مجموعات سوفت ستون",
    subtitle: "تكسية جدارية راقية تمنح المساحات عمقاً وهدوءاً استثنائياً",
    tag: "تصاميم 2026",
    image: "/assets/products/سوفت ستون/img-016.png",
    link: "/categories/سوفت-ستون",
  },
];

export const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <section className="relative min-h-[80vh] lg:min-h-[85vh] w-full overflow-hidden bg-[#120F0D] text-white flex items-center justify-center">
      {/* Background Slides with Radial Glows */}
      <div className="absolute inset-0">
        {heroSlides.map((item, idx) => (
          <div
            key={item.title}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              idx === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none",
            )}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={idx === 0}
              className="object-cover object-center brightness-[0.35] scale-105 transition-transform duration-10000"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#120F0D] via-[#120F0D]/60 to-[#120F0D]/40" />
        <div className="absolute inset-0 z-10 bg-radial-[at_top_right] from-gold-500/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Body Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right" dir="rtl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold text-gold-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-gold-400 animate-pulse" />
              <span>يقين ستور | Yaqeen Store 2.0</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              فخامة التصميم. <br />
              <span className="gold-gradient-text">متانة تدوم لأجيال.</span>
            </h1>

            <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {slide.subtitle}
            </p>

            {/* Quick Benefits Pills */}
            <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-neutral-300">
              <span className="flex items-center gap-1.5 bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-gold-400" />
                ضمان 25 سنة
              </span>
              <span className="flex items-center gap-1.5 bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-lg">
                <Droplet className="h-4 w-4 text-gold-400" />
                مقاوم للماء 100%
              </span>
              <span className="flex items-center gap-1.5 bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-lg">
                📍 الخليل، فلسطين
              </span>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/store" className="w-full sm:w-auto">
                <Button variant="gold" size="lg" className="w-full sm:w-auto rounded-full px-8 font-semibold shadow-gold">
                  <span>تصفح كافة المنتجات</span>
                  <ArrowLeft className="h-4 w-4 ms-2" />
                </Button>
              </Link>

              <a href="tel:+972597426988" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-neutral-700 bg-neutral-900/60 text-neutral-200 hover:bg-neutral-800 hover:text-white">
                  <Phone className="h-4 w-4 me-2 text-gold-400" />
                  <span>تواصل للاستفسارات</span>
                </Button>
              </a>
            </div>
          </div>

          {/* 3D Visual Layer Showcase (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 relative perspective-1000">
            <div className="relative w-full aspect-[4/4.5] rounded-3xl overflow-hidden border border-gold-500/30 shadow-3d transform rotate-y-[-6deg] rotate-x-[4deg] transition-all duration-700 hover:rotate-0 hover:scale-102">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 right-6 left-6 p-5 rounded-2xl glass-panel text-right" dir="rtl">
                <span className="text-xs font-semibold text-gold-400 tracking-wider uppercase">تشكيلة ممتازة</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{slide.title}</h3>
                <Link href={slide.link} className="inline-flex items-center gap-1 text-xs text-gold-300 hover:text-white mt-2 font-medium">
                  <span>اكتشف التفاصيل</span>
                  <ArrowLeft className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Slide Controls */}
        <div className="mt-12 flex items-center justify-between border-t border-neutral-800/80 pt-6">
          <div className="flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === activeSlide ? "w-8 bg-gold-400" : "w-2 bg-neutral-700 hover:bg-neutral-500",
                )}
                aria-label={`شريحة ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2" dir="ltr">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-gold-500 hover:text-white transition-colors"
              aria-label="السابق"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-gold-500 hover:text-white transition-colors"
              aria-label="التالي"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};