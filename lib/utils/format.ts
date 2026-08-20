import { config } from "@/lib/config";

export const formatCurrency = (
  amount: number,
  options?: {
    showSymbol?: boolean;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  },
): string => {
  const {
    showSymbol = true,
    locale = config.currency.locale,
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  } = options ?? {};

  const formatted = new Intl.NumberFormat(locale, {
    style: showSymbol ? "currency" : "decimal",
    currency: config.currency.code,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);

  return formatted;
};

export const formatCurrencyWithSymbol = (amount: number): string => {
  return formatCurrency(amount, { showSymbol: true });
};

export const formatPriceRange = (min: number, max: number): string => {
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};

export const calculateDiscountPercentage = (
  originalPrice: number,
  discountedPrice: number,
): number => {
  if (originalPrice <= 0 || discountedPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

export const calculateTotalWithQuantity = (price: number, quantity: number): number => {
  return Math.round(price * quantity * 100) / 100;
};

export const calculateSubtotal = (items: { price: number; quantity: number }[]): number => {
  return Math.round(items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100) / 100;
};

export const calculateTax = (amount: number, rate: number = 0.17): number => {
  return Math.round(amount * rate * 100) / 100;
};

const RTL_NUMERALS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export const toArabicNumerals = (input: string | number): string => {
  return String(input).replace(/\d/g, (match) => RTL_NUMERALS[Number(match)]);
};

export const formatDate = (
  date: string | Date,
  locale: string = "ar-EG",
  options?: Intl.DateTimeFormatOptions,
): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(d);
};

export const formatDateRelative = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "منذ دقائق";
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  if (diffDays < 7) return `منذ ${diffDays} يوم`;
  return formatDate(dateStr, "ar-EG", { year: "numeric", month: "short", day: "numeric" });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
};

export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^-\u0600-\u06FF a-z0-9]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const throttle = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number,
): (...args: Parameters<T>) => void => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const generateId = (prefix: string = "id"): string => {
  return `${prefix}_${Math.random().toString(36).slice(2, 11)}_${Date.now().toString(36)}`;
};

export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};
