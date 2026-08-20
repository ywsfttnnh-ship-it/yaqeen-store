"use client";

import { createContext, useContext, useState, useMemo, ReactNode, useCallback } from "react";
import type { Cart, CartItem, Product } from "@/types";
import { calculateSubtotal, calculateTax } from "@/lib/utils";
import { config } from "@/lib/config";

interface CartContextType {
  cart: Cart;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculateCartTotals = (items: CartItem[]): Cart => {
  const subtotal = calculateSubtotal(items.map((i) => ({ price: i.price, quantity: i.quantity })));
  const taxRate = 0.17;
  const tax = calculateTax(subtotal, taxRate);
  const shipping = subtotal >= config.delivery.freeThreshold ? 0 : config.delivery.standardFee;
  const discount = 0;
  const total = Math.round(subtotal + tax + shipping - discount);
  return { items, subtotal, tax, shipping, discount, total };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.productId === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item,
        );
      }
      const newItem: CartItem = {
        id: `cart_${product.id}_${Date.now()}`,
        productId: product.id,
        product,
        quantity: Math.min(quantity, product.stock),
        price: product.price,
      };
      return [...prev, newItem];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stock)) } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleCart = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const cart = useMemo(() => calculateCartTotals(items), [items]);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo<CartContextType>(
    () => ({
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal: cart.subtotal,
      tax: cart.tax,
      shipping: cart.shipping,
      discount: cart.discount,
      total: cart.total,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
    }),
    [cart, addItem, removeItem, updateQuantity, clearCart, totalItems, isOpen, openCart, closeCart, toggleCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
