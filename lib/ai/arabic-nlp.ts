/**
 * Arabic NLP helpers — normalization, tokenization, dialect handling
 */

export function normalizeArabic(input: string): string {
  if (!input) return "";
  let s = input.toLowerCase().trim();
  // Remove tatweel
  s = s.replace(/\u0640/g, "");
  // Remove diacritics
  s = s.replace(/[\u0610-\u061A\u064B-\u065F\u06D6-\u06ED]/g, "");
  // Normalize hamza variants
  s = s.replace(/[أإآٱ]/g, "ا");
  s = s.replace(/ؤ/g, "و");
  s = s.replace(/ئ/g, "ي");
  s = s.replace(/ة/g, "ه");
  s = s.replace(/ى/g, "ي");
  // Normalize alef with hamza already handled
  // Remove punctuation except arabic letters/numbers
  s = s.replace(/[؟?!.،,;:()\[\]{}"'`]/g, " ");
  // Collapse spaces
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

export function containsAny(normalized: string, keywords: string[]): boolean {
  return keywords.some((k) => normalized.includes(normalizeArabic(k)));
}

export function extractQuantity(input: string): number | null {
  // Match patterns like: 30 متر, 30ممتر, 20 م, 15 meter, 40متر
  const normalized = input;
  const patterns = [
    /(\d+(?:\.\d+)?)\s*متر/g,
    /(\d+(?:\.\d+)?)\s*م\s*(?![ا-يa-z])/g, // standalone م
    /(\d+(?:\.\d+)?)\s*meter/gi,
    /(\d+(?:\.\d+)?)\s*م2/g,
    /كم\s*سعر\s*(\d+)/g, // edge but not qty
  ];
  for (const re of patterns) {
    const m = re.exec(normalized);
    if (m) {
      const n = parseFloat(m[1]);
      if (!isNaN(n) && n > 0 && n < 10000) return n;
    }
  }
  // Fallback: any number 1..9999 if query contains متر word somewhere
  if (normalizeArabic(input).includes(normalizeArabic("متر"))) {
    const m = input.match(/(\d+(?:\.\d+)?)/);
    if (m) {
      const n = parseFloat(m[1]);
      if (!isNaN(n) && n > 0 && n < 10000) return n;
    }
  }
  return null;
}

export function extractCityMention(normalizedQuery: string): string | null {
  // West Bank cities normalized
  const cities = [
    "نابلس",
    "رام الله",
    "الخليل",
    "بيت لحم",
    "جنين",
    "طولكرم",
    "قلقيليه",
    "قلقيلية",
    "سلفيت",
    "طوباس",
    "اريحا",
    "اريحا",
    "القدس",
    "البيره",
    "البيرة",
    "الخضر",
    "دورا",
    "يطا",
    "حلحول",
  ];
  for (const c of cities) {
    if (normalizedQuery.includes(normalizeArabic(c))) return c;
  }
  return null;
}

export function detectEnglishCategory(query: string): string | null {
  const n = normalizeArabic(query);
  if (n.includes("spc") || n.includes(normalizeArabic("باركيه"))) return "cat-spc";
  if (n.includes(normalizeArabic("بديل حجر")) || (n.includes(normalizeArabic("بديل")) && n.includes(normalizeArabic("حجر")))) return "cat-stone-alt";
  if (n.includes(normalizeArabic("سوفت ستون")) || n.includes(normalizeArabic("سوفت"))) return "cat-soft-stone";
  return null;
}

export function isPriceQuery(normalized: string): boolean {
  const keywords = [
    "كم السعر",
    "كم سعر",
    "بكم",
    "ب كم",
    "سعر المتر",
    "سعر متر",
    "بدي سعر",
    "كم بطلع",
    "كم يطلع",
    "شو السعر",
    "شو سعر",
    "كم سعره",
    "قديش السعر",
    "قديش سعر",
    "المتر بكم",
  ];
  return containsAny(normalized, keywords) || (normalized.includes(normalizeArabic("سعر")) && (normalized.includes(normalizeArabic("كم")) || /\d/.test(normalized)));
}

export function isDeliveryCostQuery(normalized: string): boolean {
  return (
    (normalized.includes(normalizeArabic("توصيل")) || normalized.includes(normalizeArabic("دليفري")) || normalized.includes(normalizeArabic("شحن"))) &&
    (normalized.includes(normalizeArabic("كم")) || normalized.includes(normalizeArabic("سعر")) || normalized.includes(normalizeArabic("تكلفه")) || normalized.includes(normalizeArabic("كلفة")))
  );
}

export function isDeliveryAvailabilityQuery(normalized: string): boolean {
  const deliveryWords = ["توصيل", "بتوصلو", "بتوصل", "دليفري", "شحن", "توصيله"];
  const hasDelivery = containsAny(normalized, deliveryWords);
  // If any delivery word present without cost keywords, treat as availability
  return hasDelivery && !isDeliveryCostQuery(normalized);
}

export function isLocationQuery(normalized: string): boolean {
  const keywords = ["وين موقعكم", "وين موقع", "وين المحل", "وينكم", "موقعكم وين", "من وين انتو", "من وين انتم", "عنوانكم", "عنوان المحل", "مكانكم"];
  return containsAny(normalized, keywords);
}

export function isGreeting(normalized: string): boolean {
  const keywords = ["مرحبا", "مرحباا", "اهلا", "اهلين", "السلام عليكم", "صباح الخير", "مساء الخير", "هلا", "يا هلا", "سلام"];
  // greeting is dominant if query is short and contains greeting
  return containsAny(normalized, keywords) && normalized.split(" ").length <= 6;
}
