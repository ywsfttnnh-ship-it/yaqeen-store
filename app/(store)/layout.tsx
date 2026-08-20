"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { AIChatbot } from "@/components/ai/ai-chatbot";
import { useAIChat } from "@/components/ai/ai-chat-context";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen: isAIOpen, closeChat } = useAIChat();

  return (
    <>
      <Header />
      <main className="flex-1 pb-20 sm:pb-0">{children}</main>
      <Footer />
      <CartDrawer />
      <AIChatbot isOpen={isAIOpen} onClose={closeChat} />
    </>
  );
}