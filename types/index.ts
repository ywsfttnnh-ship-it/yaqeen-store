// ============================================================================
// Core Types
// ============================================================================

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  imageAlt: string;
  imageAltAr?: string;
  color: string;
  productCount: number;
  featured: boolean;
  order: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  price: number; // in ILS (₪)
  categoryId: string;
  images: ProductImage[];
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  material: string;
  materialAr: string;
  finish: string;
  finishAr: string;
  warranty: string;
  warrantyAr: string;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  tags: string[];
  specifications: Specification[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  altAr: string;
  isPrimary: boolean;
}

export interface Specification {
  name: string;
  nameAr: string;
  value: string;
  valueAr: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userNameAr: string;
  rating: number;
  title: string;
  titleAr: string;
  comment: string;
  commentAr: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number; // server-validated price
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

export type OrderStatus =
  | "new"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  customerInfo: CustomerInfo;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
  cancelledAt?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productNameAr: string;
  quantity: number;
  price: number;
  total: number;
  image: string;
}

export type PaymentMethod = "cash_on_delivery" | "bank_transfer" | "credit_card" | "apple_pay" | "google_pay";
export type ShippingMethod = "standard" | "express" | "next_day";

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  streetAr?: string;
  building?: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  phone?: string;
  image?: string;
  role: "customer" | "admin";
  addresses: Address[];
  wishlist: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  addedAt: string;
}

// AI Types
export type AIProvider = "openai" | "anthropic" | "google" | "mock" | "none";

export interface AIConfig {
  provider: AIProvider;
  model: string;
  apiKey: string;
  baseUrl?: string;
  enabled: boolean;
  maxTokens: number;
  temperature: number;
}

export interface AIChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface AIChatSession {
  id: string;
  messages: AIChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// UI Types
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "outline"
  | "gold"
  | "dark";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export type InputVariant = "default" | "filled" | "outline" | "ghost";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "gold";

export type Rating = 0 | 1 | 2 | 3 | 4 | 5;
