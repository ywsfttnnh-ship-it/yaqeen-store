import type { AIConfig, AIProvider, AIChatMessage, Product } from "@/types";
import { config } from "@/lib/config";
import { products, categoryData } from "@/lib/data";

// AI service that encapsulates the provider logic
// This file runs ONLY on the server side

class AIService {
  private config: AIConfig;

  constructor() {
    this.config = {
      provider: config.ai.provider,
      model: config.ai.model,
      apiKey: config.ai.apiKey,
      baseUrl: config.ai.baseUrl,
      enabled: config.ai.enabled,
      maxTokens: config.ai.maxTokens,
      temperature: config.ai.temperature,
    };
  }

  isEnabled(): boolean {
    return this.config.enabled && !!this.config.apiKey;
  }

  getProvider(): AIProvider {
    return this.config.provider;
  }

  // Build the system prompt with store knowledge
  private buildSystemPrompt(): string {
    const categoryInfo = categoryData
      .map((c) => `${c.nameAr} (${c.slug}): ${c.descriptionAr}`)
      .join("\n");

    const productInfo = products
      .map(
        (p) =>
          `${p.nameAr} - ${p.shortDescriptionAr} - التقييم: ${p.rating} - المنتج: ${p.id}`,
      )
      .join("\n");

    return `أنت مساعد ذكي لمتجر يقين ستور، متخصص في بيع أرضيات SPC وبدائل الحجر وسوفت ستون.

هديتك لتساعد العملاء في:
- البحث عن المنتجات
- اقتراح المنتجات
- مقارنة المنتجات
- الإجابة على أسئلة المنتجات
- توجيه العملاء للأقساط المناسبة
- مساعدة في اختيار المنتج

الأقساط المتاحة:
${categoryInfo}

المنتجات المتاحة:
${productInfo}

أنت تتحدث العربية فصحى وودية. كن مفيداً، ذكياً، ومهذباً.`;
  }

  // Get product context for AI
  private getProductContext(): string {
    const productContext = products
      .map((p) => {
        return `المنتج: ${p.nameAr} (ID: ${p.id})
القسم: ${categoryData.find((c) => c.id === p.categoryId)?.nameAr || "غير محدد"}
الوصف: ${p.shortDescriptionAr}
التقييم: ${p.rating}/5 من ${p.reviewCount} تقييم
المخزون: ${p.stock > 0 ? "متوفر" : "نفد المخزون"}
الكلمات: ${p.tags.join("، ")}
المواصفات: ${p.specifications.map((s) => `${s.nameAr}: ${s.valueAr}`).join("، ")}`;
      })
      .join("\n\n");

    return `بيانات المنتجات:\n${productContext}`;
  }

  // Generate a mock AI response when no API key is available
  private generateMockResponse(query: string, _messages: AIChatMessage[]): string {
    const lowerQuery = query.toLowerCase();

    // Recommendation queries
    if (lowerQuery.includes("أقترح") || lowerQuery.includes("مناسب") || lowerQuery.includes("كم") || lowerQuery.includes("أنصح")) {
      const featured = products.filter((p) => p.featured).slice(0, 3);
      let response = "منتجات مقترحة لك:\n";
      featured.forEach((p, i) => {
        response += `${i + 1}. ${p.nameAr} - ${p.shortDescriptionAr}\n`;
      });
      return response;
    }

    // Comparison queries
    if (lowerQuery.includes("فرق") || lowerQuery.includes("مقارنة") || lowerQuery.includes("بين")) {
      return "يمكنني مقارنة بين منتجات مختلفة. يرجى تحديد المنتجات التي تريد مقارنتها بالتفصيل.";
    }

    // Category queries
    if (lowerQuery.includes("قسم") || lowerQuery.includes("فئة") || lowerQuery.includes("بحث")) {
      return `الأقساط المتاحة في المتجر:\n${categoryData.map((c) => `- ${c.nameAr}`).join("\n")}`;
    }

    // Default response
    const greeting = ["مرحباً", "أهلاً", "مرحبا", "صباح الخير", "مساء الخير"];
    const isGreeting = greeting.some((g) => lowerQuery.includes(g));

    if (isGreeting) {
      return "مرحباً بك في يقين ستور! كيف يمكنني مساعدتك اليوم؟ يمكنني اقتراح منتجات، مقارنة الأسعار، أو إجابة أسئلتك حول المنتجات.";
    }

    return "شكراً لسؤالك! كخبير في المتجر، يمكنني مساعدتك في العثور على الأرضيات والديكور المناسب. ما نوع المنتج الذي تبحث عنه؟";
  }

  // Main method to get AI response
  async getResponse(
    query: string,
    chatHistory: AIChatMessage[] = [],
    _context: { products?: Product[]; userLocation?: string; userPreferences?: string } = {},
  ): Promise<{
    response: string;
    suggestions: string[];
    relatedProducts: string[];
  }> {
    // If AI is not enabled or no API key, return mock response
    if (!this.isEnabled()) {
      const response = this.generateMockResponse(query, chatHistory);
      return {
        response,
        suggestions: this.generateSuggestions(query),
        relatedProducts: this.generateRelatedProducts(query),
      };
    }

    // Build the full prompt with context
    const systemPrompt = this.buildSystemPrompt();
    const productContext = this.getProductContext();

    const messages: AIChatMessage[] = [
      { id: "system-1", role: "system", content: `${systemPrompt}\n\n${productContext}`, timestamp: new Date().toISOString() },
      ...chatHistory,
      { id: "user-msg", role: "user", content: query, timestamp: new Date().toISOString() },
    ];

    try {
      const apiResponse = await this.callAIProvider(messages);
      return {
        response: apiResponse,
        suggestions: this.generateSuggestions(query),
        relatedProducts: this.generateRelatedProducts(query),
      };
    } catch (error) {
      console.error("AI service error:", error);
      const fallbackResponse = this.generateMockResponse(query, chatHistory);
      return {
        response: fallbackResponse,
        suggestions: this.generateSuggestions(query),
        relatedProducts: this.generateRelatedProducts(query),
      };
    }
  }

  // Call the actual AI provider (OpenAI, Anthropic, etc.)
  private async callAIProvider(messages: AIChatMessage[]): Promise<string> {
    const provider = this.config.provider;
    const apiKey = this.config.apiKey;
    const baseUrl = this.config.baseUrl;
    const model = this.config.model;

    const formattedMessages = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      }));

    const systemMessage = messages.find((m) => m.role === "system");

    switch (provider) {
      case "openai": {
        const payload: Record<string, unknown> = {
          model,
          messages: [...(systemMessage ? [{ role: "system", content: systemMessage.content }] : []), ...formattedMessages],
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature,
        };

        const url = (baseUrl || "https://api.openai.com/v1") + "/chat/completions";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        return (data as { choices: { message: { content: string } }[] }).choices[0].message.content;
      }

      case "anthropic": {
        const url = (baseUrl || "https://api.anthropic.com/v1") + "/messages";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model,
            max_tokens: this.config.maxTokens,
            temperature: this.config.temperature,
            system: systemMessage?.content || "",
            messages: formattedMessages,
          }),
        });

        if (!response.ok) {
          throw new Error(`Anthropic API error: ${response.status}`);
        }

        const data = await response.json();
        return (data as { content: { text: string }[] }).content[0].text;
      }

      case "google": {
        const url =
          (baseUrl || "https://generativelanguage.googleapis.com/v1beta") +
          `/models/${model || "gemini-1.5-flash"}:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: formattedMessages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
            systemInstruction: systemMessage?.content || "",
            generationConfig: {
              maxOutputTokens: this.config.maxTokens,
              temperature: this.config.temperature,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Google API error: ${response.status}`);
        }

        const data = await response.json();
        return (data as { candidates: { content: { parts: { text: string }[] } }[] }).candidates[0].content.parts[0].text;
      }

      default:
        throw new Error("Unknown AI provider");
    }
  }

  // Generate search suggestions
  private generateSuggestions(query: string): string[] {
    const lowerQuery = query.toLowerCase();
    const suggestions: string[] = [];

    const categoryMatches = categoryData.filter(
      (c) => c.nameAr.includes(query) || c.name.toLowerCase().includes(lowerQuery),
    );
    categoryMatches.forEach((c) => suggestions.push(`البحث في قسم ${c.nameAr}`));

    const productMatches = products.filter(
      (p) => p.nameAr.includes(query) || p.name.toLowerCase().includes(lowerQuery),
    );
    productMatches.slice(0, 3).forEach((p) => suggestions.push(`عرض ${p.nameAr}`));

    const common = ["أريد شيء لغرفة معيشة", "ما الفرق بين SPC وبديل الحجر؟", "كيف أختار الأرضية المناسبة؟", "كيف أطلب منتجاً؟"];
    common.forEach((s) => {
      if (!suggestions.some((sug) => sug === s)) suggestions.push(s);
    });

    return suggestions.slice(0, 5);
  }

  // Generate related product suggestions based on query
  private generateRelatedProducts(query: string): string[] {
    const lowerQuery = query.toLowerCase();
    let matches: Product[] = [];

    if (lowerQuery.includes("معيشة") || lowerQuery.includes("غرفة") || lowerQuery.includes("salon") || lowerQuery.includes("living")) {
      matches = products.filter((p) => p.tags.includes("أرضية") && p.categoryId === "cat-spc");
    } else if (lowerQuery.includes("مطبخ") || lowerQuery.includes("kitchen")) {
      matches = products.filter((p) => p.categoryId === "cat-stone-alt");
    } else if (lowerQuery.includes("حمام") || lowerQuery.includes("bathroom")) {
      matches = products.filter((p) => p.categoryId === "cat-soft-stone" || p.categoryId === "cat-stone-alt");
    } else if (lowerQuery.includes("أرضية") || lowerQuery.includes("floor")) {
      matches = products.filter((p) => p.categoryId === "cat-spc");
    } else if (lowerQuery.includes("جدار") || lowerQuery.includes("wall")) {
      matches = products.filter((p) => p.categoryId === "cat-soft-stone" || p.categoryId === "cat-stone-alt");
    } else {
      matches = products.filter((p) => p.featured).slice(0, 4);
    }

    if (matches.length === 0) {
      matches = products.filter((p) => p.featured).slice(0, 4);
    }

    return matches.map((p) => p.id);
  }
}

// Export a singleton instance
export const aiService = new AIService();