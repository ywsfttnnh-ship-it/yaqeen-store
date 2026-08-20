"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  className?: string;
}

const heroImages = [
  "/assets/products/SPC/img-001.png",
  "/assets/products/سوفت ستون/img-016.png",
  "/assets/products/بديل حجر/img-011.png",
];

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const [currentImage, setCurrentImage] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className={cn(
        "relative flex items-center justify-center min-h-[75vh] w-full overflow-hidden",
        "section-dark",
        "border-b border-gold-500/30",
        className,
      )}
    >
      {/* Background Hero Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImages[currentImage]}
          alt="يقين ستور - متجر متميز"
          fill
          className="object-cover object-center opacity-20"
          style={{ objectPosition: "center" }}
          priority={currentImage === 0}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_460px_at_50%_0%,rgba(212,175,55,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-l from-primary-900/30 via-transparent to-primary-900/30" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-neutral-50 py-6">
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gold-500/20 px-4 py-1.5 text-sm text-gold-300">
            <Sparkles className="h-4 w-4" />
            <span>جودة متميزة | ضمان 25 سنة | مقاومة ماء 100%</span>
          </div>
        </div>

        <h1
          className="animate-fade-in-up font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
          style={{ animationDelay: "200ms" }}
        >
          <span className="block">اكتشف أناقة منزلك</span>
          <span className="block text-gold-300">بتفاصيل استثنائية</span>
        </h1>

        <p
          className="animate-fade-in-up mx-auto mb-10 max-w-2xl text-lg text-neutral-300"
          style={{ animationDelay: "300ms" }}
        >
          نقدم لك أرضيات SPC وبدائل الحجر وسوفت ستون ذات جودة عالمية،
          نضمن لك الراحة، المتانة، وجمال المنزل.
        </p>

        <div
          className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animationDelay: "400ms" }}
        >
          <Link href="/store">
            <Button variant="primary" size="lg" className="px-8">
              تسوق الآن
              <ArrowLeft className="h-5 w-5 ms-2" />
            </Button>
          </Link>
          <Link href="/categories">
            <Button variant="outline" size="lg" className="border-2 border-gold-400 bg-transparent px-8 text-gold-300 hover:bg-gold-400/10">
              استكشف المنتجات
            </Button>
          </Link>
        </div>
      </div>

      {/* Image Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={cn(
              "h-2 w-8 rounded-full transition-all duration-300",
              i === currentImage
                ? "bg-gold-400 w-12"
                : "bg-neutral-600 hover:bg-neutral-500",
            )}
            aria-label={`انتقل إلى الصورة ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
};
