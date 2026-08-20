import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-spc",
    slug: "باركيه-spc",
    name: "SPC Flooring",
    nameAr: "باركيه SPC",
    description:
      "SPC (Stone Plastic Composite) flooring offers superior durability, water resistance, and comfort underfoot. Perfect for modern homes and commercial spaces.",
    descriptionAr:
      "أرضيات SPC (سون كابل بلاستيك) توفر متانة عالية ومقاومة للماء والراحة تحت القدم. مثالية للمنازل الحديثة والمساحات التجارية.",
    image: "/assets/products/SPC/img-001.png",
    imageAlt: "SPC flooring in modern living room",
    imageAltAr: "أرضية SPC في غرفة معيشة حديثة",
    color: "#8b6b1c",
    productCount: 4,
    featured: true,
    order: 1,
  },
  {
    id: "cat-stone-alt",
    slug: "بديل-حجر",
    name: "Stone Alternative",
    nameAr: "بديل حجر",
    description:
      "High-quality stone-alternative surfaces that mimic natural stone at a fraction of the cost and maintenance. Ideal for countertops, walls, and decor.",
    descriptionAr:
      "سطوح بديل الحجر عالية الجودة التي تحاكي الحجر الطبيعي بتكلفة وصيانة منخفضة. مثالية للعدادات والجدران والزينة.",
    image: "/assets/products/بديل حجر/img-011.png",
    imageAlt: "Stone alternative decorative panels",
    imageAltAr: "ألواح زخرفية بديل الحجر",
    color: "#63914f",
    productCount: 3,
    featured: true,
    order: 2,
  },
  {
    id: "cat-soft-stone",
    slug: "سوفت-ستون",
    name: "Soft Stones",
    nameAr: "سوفت ستون",
    description:
      "Premium soft stone collections including limestone, travertine, and marble alternatives for elegant interior and exterior applications.",
    descriptionAr:
      "مجموعات سوفت ستون متميزة تشمل الحجر الجيري والترافيرتين وبدائل المرمر لتطبيقات داخلية وخارجية أنيقة.",
    image: "/assets/products/سوفت ستون/img-016.png",
    imageAlt: "Soft stone interior wall cladding",
    imageAltAr: "تغطية جدران سوفت ستون داخلية",
    color: "#cbd5e1",
    productCount: 4,
    featured: true,
    order: 3,
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((c) => c.slug === slug);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((c) => c.id === id);
};

export const featuredCategories = categories.filter((c) => c.featured).sort((a, b) => a.order - b.order);
