"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import type { WishlistItem, Product } from "@/types";
import { getProductById } from "@/lib/data";

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  toggleItem: (productId: string) => void;
  itemCount: number;
  products: Product[];
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("yaqeen-wishlist");
      if (stored) {
        try {
          setItems(JSON.parse(stored) as WishlistItem[]);
        } catch {
          setItems([]);
        }
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("yaqeen-wishlist", JSON.stringify(items));
    }
  }, [items]);

  const addItem = useCallback((productId: string) => {
    setItems((prev) => {
      if (prev.some((item) => item.productId === productId)) return prev;
      const newItem: WishlistItem = {
        id: `wishlist_${productId}_${Date.now()}`,
        productId,
        addedAt: new Date().toISOString(),
      };
      return [...prev, newItem];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const hasItem = useCallback(
    (productId: string) => items.some((item) => item.productId === productId),
    [items],
  );

  const toggleItem = useCallback(
    (productId: string) => {
      if (hasItem(productId)) {
        removeItem(productId);
      } else {
        addItem(productId);
      }
    },
    [hasItem, addItem, removeItem],
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, []);

  const products = items
    .map((item) => getProductById(item.productId))
    .filter((p): p is Product => p !== undefined);

  const value = {
    items,
    addItem,
    removeItem,
    hasItem,
    toggleItem,
    itemCount: items.length,
    products,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
