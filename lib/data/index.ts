import type { Product, Category, Address, Order, User } from "@/types";
import {
  products,
  featuredProducts,
  bestSellerProducts,
  newArrivalProducts,
  getProductBySlug,
  getProductById,
  getProductsByCategory,
  getRelatedProducts,
  searchProducts,
} from "./products";
import { categories as categoryData } from "./categories";
import type { Review } from "@/types";

export {
  products,
  categoryData,
  featuredProducts,
  bestSellerProducts,
  newArrivalProducts,
  getProductBySlug,
  getProductById,
  getProductsByCategory,
  getRelatedProducts,
  searchProducts,
};

export interface PagedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProductFilters {
  category?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  search?: string;
  sort?: "price-asc" | "price-desc" | "newest" | "rating" | "popularity" | "name-asc" | "name-desc";
}

const sortProducts = (items: Product[], sort?: ProductFilters["sort"]): Product[] => {
  if (!sort) return items;
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "popularity":
      return sorted.sort((a, b) => b.reviewCount * b.rating - a.reviewCount * a.rating);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
};

export const getProducts = (
  filters: ProductFilters = {},
  page: number = 1,
  limit: number = 12,
): PagedResult<Product> => {
  const validPage = Math.max(1, page);
  const validLimit = Math.max(1, Math.min(limit, 100));

  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter((p) => {
      const cat = categoryData.find((c) => c.slug === filters.category);
      return cat && p.categoryId === cat.id;
    });
  }

  if (filters.categoryId) {
    filtered = filtered.filter((p) => p.categoryId === filters.categoryId);
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.minRating !== undefined) {
    filtered = filtered.filter((p) => p.rating >= filters.minRating!);
  }

  if (filters.inStock) {
    filtered = filtered.filter((p) => p.stock > 0);
  }

  if (filters.featured) {
    filtered = filtered.filter((p) => p.featured);
  }

  if (filters.bestSeller) {
    filtered = filtered.filter((p) => p.bestSeller);
  }

  if (filters.newArrival) {
    filtered = filtered.filter((p) => p.newArrival);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.nameAr.includes(searchTerm) ||
        p.shortDescription.toLowerCase().includes(searchTerm) ||
        p.shortDescriptionAr.includes(searchTerm) ||
        p.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    );
  }

  filtered = sortProducts(filtered, filters.sort);

  const total = filtered.length;
  const totalPages = Math.ceil(total / validLimit);
  const startIndex = (validPage - 1) * validLimit;
  const endIndex = startIndex + validLimit;
  const data = filtered.slice(startIndex, endIndex);

  return {
    data,
    total,
    page: validPage,
    limit: validLimit,
    totalPages,
    hasNext: validPage < totalPages,
    hasPrev: validPage > 1,
  };
};

export const getFeaturedProducts = (limit: number = 8): Product[] => {
  return products.filter((p) => p.featured).slice(0, limit);
};

export const getBestSellerProducts = (limit: number = 8): Product[] => {
  return products.filter((p) => p.bestSeller).slice(0, limit);
};

export const getNewArrivalProducts = (limit: number = 8): Product[] => {
  return products.filter((p) => p.newArrival).slice(0, limit);
};

export const getAllProducts = (): Product[] => products;

export const getPriceRange = (): { min: number; max: number } => {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};

export const mockUser: User = {
  id: "user-001",
  name: "محمد أحمد",
  nameAr: "محمد أحمد",
  email: "mohamed@example.com",
  phone: "+970 59 123 4567",
  image: undefined,
  role: "customer",
  addresses: [
    {
      id: "addr-001",
      fullName: "محمد أحمد",
      phone: "+970 59 123 4567",
      street: "حي السلام، شارع النور 15",
      streetAr: "حي السلام، شارع النور 15",
      building: "مبنى 3",
      apartment: "شقة 4",
      city: "رام الله",
      state: "منطقة الضفة الغربية",
      postalCode: "61000",
      country: "فلسطين",
    },
  ],
  wishlist: ["prod-spc-001", "prod-stone-001"],
  createdAt: "2024-01-20T10:00:00Z",
  updatedAt: "2024-06-20T10:00:00Z",
};

export const mockOrders: Order[] = [
  {
    id: "order-001",
    orderNumber: "ORD-YQ-2024-001245",
    userId: "user-001",
    items: [
      {
        id: "item-001",
        productId: "prod-spc-001",
        productName: "SPC Wood - Ash Gray 1220x180",
        productNameAr: "SPC وود - رمادي أشق - 1220×180",
        quantity: 5,
        price: 149,
        total: 745,
        image: "/assets/products/SPC/img-001.png",
      },
    ],
    subtotal: 745,
    tax: 127,
    shipping: 0,
    discount: 0,
    total: 872,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "cash_on_delivery",
    shippingMethod: "standard",
    customerInfo: {
      fullName: "محمد أحمد",
      email: "mohamed@example.com",
      phone: "+970 59 123 4567",
    },
    shippingAddress: {
      id: "addr-001",
      fullName: "محمد أحمد",
      phone: "+970 59 123 4567",
      street: "حي السلام، شارع النور 15",
      building: "مبنى 3",
      apartment: "شقة 4",
      city: "رام الله",
      state: "منطقة الضفة الغربية",
      postalCode: "61000",
      country: "فلسطين",
    },
    billingAddress: {
      id: "addr-001",
      fullName: "محمد أحمد",
      phone: "+970 59 123 4567",
      street: "حي السلام، شارع النور 15",
      building: "مبنى 3",
      apartment: "شقة 4",
      city: "رام الله",
      state: "منطقة الضفة الغربية",
      postalCode: "61000",
      country: "فلسطين",
    },
    notes: "يرجى تسليم البضائع في الموقع.",
    createdAt: "2024-06-10T09:30:00Z",
    updatedAt: "2024-06-15T10:00:00Z",
    deliveredAt: "2024-06-15T10:00:00Z",
  },
  {
    id: "order-002",
    orderNumber: "ORD-YQ-2024-002378",
    userId: "user-001",
    items: [
      {
        id: "item-001",
        productId: "prod-stone-001",
        productName: "Stone Alternative - White Marble 600x600",
        productNameAr: "بديل حجر - مرمر أبيض - 600×600",
        quantity: 3,
        price: 299,
        total: 897,
        image: "/assets/products/بديل حجر/img-011.png",
      },
    ],
    subtotal: 897,
    tax: 152,
    shipping: 0,
    discount: 0,
    total: 1049,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "bank_transfer",
    shippingMethod: "express",
    customerInfo: {
      fullName: "محمد أحمد",
      email: "mohamed@example.com",
      phone: "+970 59 123 4567",
    },
    shippingAddress: {
      id: "addr-001",
      fullName: "محمد أحمد",
      phone: "+970 59 123 4567",
      street: "حي السلام، شارع النور 15",
      building: "مبنى 3",
      apartment: "شقة 4",
      city: "رام الله",
      state: "منطقة الضفة الغربية",
      postalCode: "61000",
      country: "فلسطين",
    },
    billingAddress: {
      id: "addr-001",
      fullName: "محمد أحمد",
      phone: "+970 59 123 4567",
      street: "حي السلام، شارع النور 15",
      building: "مبنى 3",
      apartment: "شقة 4",
      city: "رام الله",
      state: "منطقة الضفة الغربية",
      postalCode: "61000",
      country: "فلسطين",
    },
    createdAt: "2024-06-25T14:00:00Z",
    updatedAt: "2024-06-27T08:00:00Z",
    deliveredAt: undefined,
  },
];

export const getOrderById = (orderId: string): Order | undefined => {
  return mockOrders.find((o) => o.id === orderId || o.orderNumber === orderId);
};

export const getUserOrders = (userId: string): Order[] => {
  return mockOrders.filter((o) => o.userId === userId);
};

export const reExportCategories = categoryData;

export const mockReviews: Review[] = [
  {
    id: "review-001",
    productId: "prod-spc-001",
    userId: "user-001",
    userName: "محمد أحمد",
    userNameAr: "محمد أحمد",
    rating: 5,
    title: "جودة ممتازة",
    titleAr: "جودة ممتازة",
    comment: "الأرضية ممتازة وسهلة التركيب، مقاومة للماء فعلاً.",
    commentAr: "الأرضية ممتازة وسهلة التركيب، مقاومة للماء فعلاً.",
    createdAt: "2024-06-10T09:30:00Z",
  },
  {
    id: "review-002",
    productId: "prod-spc-001",
    userId: "user-002",
    userName: "Sara Khalid",
    userNameAr: "سارة خالد",
    rating: 4,
    title: "جيد جداً",
    titleAr: "جيد جداً",
    comment: "اللون جميل والسعر مناسب، أوصي به.",
    commentAr: "اللون جميل والسعر مناسب، أوصي به.",
    createdAt: "2024-06-20T14:00:00Z",
  },
  {
    id: "review-003",
    productId: "prod-stone-001",
    userId: "user-003",
    userName: "Ahmad Yaseen",
    userNameAr: "أحمد ياسين",
    rating: 5,
    title: "بديل حجر رائع",
    titleAr: "بديل حجر رائع",
    comment: "شكل الحجر الطبيعي بامتياز، متانة ممتازة.",
    commentAr: "شكل الحجر الطبيعي بامتياز، متانة ممتازة.",
    createdAt: "2024-06-25T10:00:00Z",
  },
];

export const getProductReviews = (productId: string): Review[] => {
  return mockReviews.filter((r) => r.productId === productId);
};

export const getProductRating = (productId: string): { rating: number; reviewCount: number } => {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) {
    const product = products.find((p) => p.id === productId);
    return { rating: product?.rating || 0, reviewCount: product?.reviewCount || 0 };
  }
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return { rating: Math.round(average * 10) / 10, reviewCount: reviews.length };
};

export type { Product, Category, Address, Order, User, Review };
