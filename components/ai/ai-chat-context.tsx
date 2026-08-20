"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AIChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

export const AIChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenAIChat = () => setIsOpen(true);
    window.addEventListener("openAIChat", handleOpenAIChat);
    return () => window.removeEventListener("openAIChat", handleOpenAIChat);
  }, []);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen((prev) => !prev);

  return (
    <AIChatContext.Provider value={{ isOpen, openChat, closeChat, toggleChat }}>
      {children}
    </AIChatContext.Provider>
  );
};

export const useAIChat = (): AIChatContextType => {
  const context = useContext(AIChatContext);
  if (!context) {
    throw new Error("useAIChat must be used within an AIChatProvider");
  }
  return context;
};
