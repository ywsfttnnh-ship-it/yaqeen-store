import * as React from "react";
import { Send, X, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import type { Product } from "@/types";
import { getProductById } from "@/lib/data";

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AIMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface AIResponse {
  response: string;
  suggestions: string[];
  relatedProducts: string[];
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = React.useState<AIMessage[]>([
    {
      role: "assistant",
      content: "مرحباً بك في يقين ستور! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟\n\nيمكنني مساعدتك في:\n• العثور على منتجات مناسبة\n• مقارنة الأسعار\n• اقتراح منتجات حسب احتياجك\n• الإجابة على أسئلتك",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: AIMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputValue,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data: AIResponse = await response.json();

      const assistantMessage: AIMessage = {
        role: "assistant",
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setSuggestions(data.suggestions || []);
      setRelatedProducts(
        (data.relatedProducts || [])
          .map((id: string) => getProductById(id))
          .filter((p: Product | undefined): p is Product => p !== undefined),
      );
    } catch (error) {
      console.error("AI chat error:", error);
      const errorMessage: AIMessage = {
        role: "assistant",
        content: "عذراً، حدث خطأ في الاتصال بمساعدي الذكي. يرجى المحاولة مرة أخرى.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSend();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 end-6 z-[100] w-80 sm:w-96">
      <div className="flex h-[500px] flex-col rounded-2xl border border-border bg-card shadow-luxury-xl">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-b from-primary-600 to-primary-700 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold">مساعد يقين الذكي</h3>
              <p className="text-xs opacity-80">مساعد افتراضي للمتجر</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/80 hover:bg-white/10 transition-all duration-200"
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-3",
                msg.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                  <Bot className="h-5 w-5 text-primary-700" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                  msg.role === "user"
                    ? "bg-primary-600 text-white rounded-tr-none"
                    : "bg-neutral-100 text-foreground rounded-tl-none",
                )}
              >
                <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600">
                  <User className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Loading indicators */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                <Bot className="h-5 w-5 text-primary-700" />
              </div>
              <div className="rounded-2xl bg-neutral-100 px-4 py-2.5">
                <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
              </div>
            </div>
          )}

          {/* Related products */}
          {relatedProducts.length > 0 && !isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                <Bot className="h-5 w-5 text-primary-700" />
              </div>
              <div className="rounded-2xl bg-neutral-100 px-4 py-2.5">
                <span className="block text-xs font-medium text-muted-foreground mb-2">منتجات مقترحة:</span>
                <div className="flex flex-col gap-2">
                  {relatedProducts.map((p) => (
                    <a
                      key={p.id}
                      href={`/product/${p.slug}`}
                      className="flex items-center gap-2 text-sm text-primary-700 hover:underline"
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded">
                        <Image
                          src={p.images[0]?.url || "/placeholder.png"}
                          alt={p.images[0]?.altAr || p.nameAr}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="block font-medium">{p.nameAr}</span>
                        <span className="text-gold-600">{formatCurrency(p.price)}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && !isLoading && (
          <div className="border-t border-border px-4 py-2">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestionClick(s)}
                  className="rounded-full bg-accent/10 px-3 py-1.5 text-xs text-primary-700 transition-all hover:bg-primary-50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border p-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اسأل عن المنتجات..."
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary-500"
              dir="rtl"
              maxLength={500}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground",
                "hover:bg-accent hover:text-primary-600 transition-all duration-200",
                (!inputValue.trim() || isLoading) && "cursor-not-allowed opacity-50",
              )}
              aria-label="إرسال"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
