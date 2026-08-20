export const validateProductData = <T>(data: unknown): T | null => {
  if (data === null || data === undefined) return null;
  try {
    JSON.parse(JSON.stringify(data));
    return data as T;
  } catch {
    return null;
  }
};

export const validatePrice = (price: number): number => {
  if (typeof price !== "number" || isNaN(price) || price < 0) return 0;
  return Math.round(price * 100) / 100;
};

export const validateQuantity = (quantity: number, min: number = 1, max: number = 99): number => {
  const q = Math.max(min, Math.min(max, Math.floor(quantity)));
  return isNaN(q) ? min : q;
};

export const validateString = (value: unknown, maxLength: number = 500): string => {
  if (typeof value !== "string") return "";
  return value.slice(0, maxLength).trim();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
  return phoneRegex.test(phone);
};
