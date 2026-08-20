import type { AIConfig, AIProvider } from "@/types";

export const config = {
  app: {
    name: {
      en: "Yaqeen Store",
      ar: "يقين ستور",
    },
    description: {
      en: "Premium e-commerce for SPC flooring, stone alternatives & soft stones",
      ar: "متجر متميز لأرضيات SPC وبدائل الحجر وسوفت ستون",
    },
    tagline: {
      en: "Discover the elegance of your home with exceptional details",
      ar: "اكتشف أناقة منزلك بتفاصيل استثنائية",
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://yaqeen-store.com",
  },
  currency: {
    code: process.env.NEXT_PUBLIC_CURRENCY_CODE || "ILS",
    symbol: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₪",
    name: {
      en: "Israeli Shekel",
      ar: "الشيكل الإسرائيلي",
    },
    position: "left" as const,
    locale: "he-IL",
  },
  locale: {
    defaultLocale: "ar",
    locales: ["ar", "en"],
    direction: {
      ar: "rtl",
      en: "ltr",
    },
  },
  ai: {
    provider: (process.env.AI_PROVIDER as AIProvider) || "mock",
    model: process.env.AI_MODEL || "gpt-4o-mini",
    apiKey: process.env.AI_API_KEY || "",
    baseUrl: process.env.AI_BASE_URL || "",
    enabled: process.env.AI_ENABLED === "true",
    maxTokens: 2048,
    temperature: 0.7,
  } as AIConfig,
  delivery: {
    freeThreshold: 500, // free shipping above ₪500
    standardFee: 49,
    expressFee: 99,
    estimatedDays: {
      standard: "3-5 أيام عمل",
      express: "1-2 أيام عمل",
    },
  },
  pagination: {
    productsPerPage: 12,
    productsPerLoad: 8,
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
} as const;

export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";
