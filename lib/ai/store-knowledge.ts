/**
 * Yaqeen Store — Store Knowledge Base
 * Single source of truth for AI. All store facts come from here.
 * Never hallucinate values not present here.
 */
export const storeKnowledge = {
  name: "Yaqeen Store | يقين ستور",
  shortName: "يقين ستور",
  location: {
    cityAr: "الخليل",
    cityEn: "Hebron",
    countryAr: "فلسطين",
    countryEn: "Palestine",
    fullAr: "الخليل - فلسطين",
    fullEn: "Hebron - Palestine",
  },
  phone: "+972 59-742-6988",
  phoneDisplay: "+972 59-742-6988",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61590887216809",
    instagram: "https://www.instagram.com/yaqeen_1_store/",
  },
  delivery: {
    coverageAr: "جميع مناطق الضفة الغربية",
    coverageEn: "All West Bank areas",
    costNoteAr:
      "تكلفة التوصيل تختلف حسب المنطقة والمسافة وحجم وكمية الطلب، ولا يوجد سعر توصيل ثابت.",
    citiesAr: [
      "الخليل",
      "نابلس",
      "رام الله",
      "البيرة",
      "بيت لحم",
      "جنين",
      "طولكرم",
      "قلقيلية",
      "سلفيت",
      "طوباس",
      "أريحا",
      "القدس",
      "الخضر",
      "دورا",
      "يطا",
      "حلحول",
      "بيت جالا",
      "بيت ساحور",
      "عصيرة",
      "عنبتا",
      "الظاهرية",
      "دير دبوان",
      "بديا",
      "عزون",
      // ASCII-friendly variants for matching
      "الضفة",
      "الضفة الغربية",
    ],
  },
  categories: [
    { id: "cat-spc", nameAr: "باركيه SPC", nameEn: "SPC Flooring", keywords: ["spc", "باركيه", "ارضية", "أرضية", "باركيه spc"] },
    { id: "cat-stone-alt", nameAr: "بديل الحجر", nameEn: "Stone Alternative", keywords: ["بديل حجر", "بديل الحجر", "حجر", "stone"] },
    { id: "cat-soft-stone", nameAr: "سوفت ستون", nameEn: "Soft Stone", keywords: ["سوفت ستون", "سوفت", "soft stone"] },
  ],
  // Contact fallback message
  contactMessageAr: "للتواصل المباشر مع المتجر على الرقم +972 59-742-6988 أو عبر صفحة اتصل بنا.",
} as const;
