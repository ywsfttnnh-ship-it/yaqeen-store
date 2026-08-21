import type { AIConfig, AIProvider, AIChatMessage, Product } from "@/types";
import { config } from "@/lib/config";
import { products, categoryData, getProductById, getProductsByCategory } from "@/lib/data";
import { storeKnowledge } from "@/lib/ai/store-knowledge";
import { normalizeArabic, containsAny, extractQuantity, extractCityMention, detectEnglishCategory, isPriceQuery, isDeliveryCostQuery, isDeliveryAvailabilityQuery, isLocationQuery, isGreeting } from "@/lib/ai/arabic-nlp"; // eslint-disable-line @typescript-eslint/no-unused-vars

// ============================================================
// AI Service — Server-Side Only
// Encapsulates provider logic + local NLU + system prompt
// ============================================================

export class AIService {
  private config: AIConfig;
  private conversationContext: {
    lastProductAr?: string;
    lastProductId?: string;
    lastProductName?: string;
    lastQuantity?: number;
    lastCityMention?: string;
    lastIntent?: string;
    lastQuery?: string;
  };

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

    // Initialize conversation context
    this.conversationContext = {
      lastProductAr: undefined,
      lastProductId: undefined,
      lastProductName: undefined,
      lastQuantity: undefined,
      lastCityMention: undefined,
      lastIntent: undefined,
      lastQuery: undefined,
    };
  }

  isEnabled(): boolean {
    return this.config.enabled && !!this.config.apiKey;
  }

  getProvider(): AIProvider {
    return this.config.provider;
  }

  // -----------------------------------------------------------------
  // 1️⃣ CONTEXT MANAGEMENT — preserve state across messages
  // -----------------------------------------------------------------

  private updateContext(query: string, intent: string, productAr?: string | null, productId?: string | null, quantity?: number | null, city?: string | null): void {
    this.conversationContext.lastQuery = query;
    this.conversationContext.lastIntent = intent;
    if (productAr) {
      this.conversationContext.lastProductAr = productAr;
      this.conversationContext.lastProductId = productId || undefined;
      this.conversationContext.lastProductName = `${productAr} (${productId || "unknown"})`;
    }
    if (quantity != null) this.conversationContext.lastQuantity = quantity;
    if (city) this.conversationContext.lastCityMention = city;
  }

  getContext(): Readonly<{
    lastProductAr?: string;
    lastProductId?: string;
    lastProductName?: string;
    lastQuantity?: number;
    lastCityMention?: string;
    lastIntent?: string;
    lastQuery?: string;
  }> {
    return this.conversationContext;
  }

  // -----------------------------------------------------------------
  // 2️⃣ INTENT DETECTION — using our robust NLU helpers
  // -----------------------------------------------------------------

  private detectIntent(normalized: string): string {
    // Greeting
    if (isGreeting(normalized)) return "greeting";

    // Location query
    if (isLocationQuery(normalized)) return "location";

    // Price query (product price or general)
    if (isPriceQuery(normalized)) return "price";

    // Delivery availability (city mention without cost ask)
    if (isDeliveryAvailabilityQuery(normalized)) return "delivery-availability";

    // Delivery cost query
    if (isDeliveryCostQuery(normalized)) return "delivery-cost";

    // Product category query
    if (normalized.includes(normalizeArabic("أنواع")) || normalized.includes(normalizeArabic("نوع"))) {
      return "product-categories";
    }

    // Product suggestion/query
    if (normalized.includes(normalizeArabic("SPC")) || normalized.includes(normalizeArabic("باركيه")) || normalized.includes(normalizeArabic("أرضية"))) {
      return "product-spc";
    }
    if (normalized.includes(normalizeArabic("بديل حجر")) || normalized.includes(normalizeArabic("بديل"))) {
      return "product-stone";
    }
    if (normalized.includes(normalizeArabic("سوفت ستون")) || normalized.includes(normalizeArabic("سوفت"))) {
      return "product-soft-stone";
    }

    // General question fallback
    return "general";
  }

  // -----------------------------------------------------------------
  // 3️⃣ ENTITY EXTRACTION — product, quantity, city
  // -----------------------------------------------------------------

  private extractEntities(normalized: string, originalQuery: string) {
    // Extract quantity (may be null)
    const quantity = extractQuantity(originalQuery);

    // Extract city mention
    const city = extractCityMention(normalized);

    // Determine which product category/user mentioned
    let productAr: string | undefined;
    let productId: string | undefined;

    // First check: context carry-over (previous product)
    if (this.conversationContext.lastProductAr) {
      productAr = this.conversationContext.lastProductAr;
      productId = this.conversationContext.lastProductId;
    } else {
      // Check if query explicitly mentions a product from our known categories
      // SPC products
      const spcProducts = products.filter((p) => p.categoryId === "cat-spc");
      for (const p of spcProducts) {
        if (normalized.includes(normalizeArabic(p.nameAr)) || normalized.includes(normalizeArabic(p.shortDescriptionAr))) {
          productAr = p.nameAr;
          productId = p.id;
          break;
        }
      }
      // Stone alternative products
      if (!productAr) {
        const stoneProducts = products.filter((p) => p.categoryId === "cat-stone-alt");
        for (const p of stoneProducts) {
          if (normalized.includes(normalizeArabic(p.nameAr)) || normalized.includes(normalizeArabic(p.shortDescriptionAr))) {
            productAr = p.nameAr;
            productId = p.id;
            break;
          }
        }
      }
      // Soft stone products
      if (!productAr) {
        const softProducts = products.filter((p) => p.categoryId === "cat-soft-stone");
        for (const p of softProducts) {
          if (normalized.includes(normalizeArabic(p.nameAr)) || normalized.includes(normalizeArabic(p.shortDescriptionAr))) {
            productAr = p.nameAr;
            productId = p.id;
            break;
          }
        }
      }
    }

    return { quantity: quantity ?? undefined, city, productAr, productId };
  }

  // -----------------------------------------------------------------
  // 4️⃣ RESPONSE GENERATOR — dynamic based on intent + entities
  // -----------------------------------------------------------------

  generateResponse(query: string, chatHistory: AIChatMessage[] = []): {
    response: string;
    suggestions: string[];
    relatedProducts: string[];
  } {
    // Normalize user query for matching
    const normalized = normalizeArabic(query);

    // Detect intent
    const intent = this.detectIntent(normalized);

    // Extract entities (quantity, city, product)
    const { quantity, city, productAr, productId } = this.extractEntities(normalized, query);

    // Update conversation context
    this.updateContext(query, intent, productAr, productId, quantity, city);

    // -----------------------------------------------------------------
    // RESPONSE BRANCHES — each returns {response, suggestions, relatedProducts}
    // -----------------------------------------------------------------

    // ----- GREETING -----
    if (intent === "greeting") {
      const responses = [
        "مرحباً بك في يقين ستور! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟",
        "أهلاً وسهلاً في متجر يقين ستور. ما الذي تبحث عنه؟",
        "مرحبا! يسعدني أنا نيموترون مساعد المتجر الترحيب بك. كيف يمكنني مساعدتك؟",
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      return {
        response,
        suggestions: this.generateSuggestions(query),
        relatedProducts: this.generateRelatedProducts(query),
      };
    }

    // ----- LOCATION QUERY: "وين موقعكم؟" / "من وين أنتو؟" -----
    if (intent === "location") {
      const response = `موقعنا في ${storeKnowledge.location.fullAr}.`;
      return {
        response,
        suggestions: [
          "أين تقع مناطق التوصيل؟",
          "كيف التواصل مع المتجر؟",
          "أنواع الأرضيات لديكم",
        ],
        relatedProducts: this.generateRelatedProducts(query),
      };
    }

    // ----- DELIVERY AVAILABILITY: "بتوصلوا نابلس؟" / "في توصيل لنابلس؟" -----
    if (intent === "delivery-availability") {
      const cityName = city || "هذه المدينة";
      const response = `نعم، نوفر التوصيل إلى ${cityName} وجميع مناطق ${storeKnowledge.delivery.coverageAr}. سعر التوصيل يختلف حسب المنطقة وحجم الطلب.`;
      return {
        response,
        suggestions: [
          "كم سعر التوصيل لنابلس؟",
          "توصيل لبيت لحم؟",
          "شحن لمنطقة جنين",
        ],
        relatedProducts: this.generateRelatedProducts(query),
      };
    }

    // ----- DELIVERY COST: "كم التوصيل لنابلس؟" -----
    if (intent === "delivery-cost") {
      // If we have a city from context, use it; otherwise ask for clarification
      const cityName = city || "المدينة المطلوبة";
      const response = `تكلفة التوصيل إلى ${cityName} تختلف حسب المنطقة والمسافة وحجم الطلب. لا يوجد سعر ثابت موحد. للحصول على سعر دقيق، يرجى التواصل معنا على الرقم ${storeKnowledge.phone} أو زيارة صفحة التواصل.`;
      return {
        response,
        suggestions: [
          "توصيل لكمية 30 متر SPC",
          "توصيل للمنطقة الشرقية",
          "شحن للمنطقة الشمالية",
        ],
        relatedProducts: this.generateRelatedProducts(query),
      };
    }

    // ----- PRICE QUERY: "كم السعر؟" / "بكم المتر؟" / "بيدي سعر 20 متر" -----
    if (intent === "price") {
      // If we have a product from context + quantity, try to compute
      if (productId && quantity !== undefined) {
        const product = getProductById(productId);
        if (product && product.price !== undefined) {
          const total = product.price * quantity;
          const response = `سعر ${product.nameAr} الواحد: ${product.price} شيكل. لـ ${quantity} ${product.categoryId === "cat-spc" ? "متر" : "وحدة"}، الإجمالي: ${total} شيكل.`;
          return {
            response,
            suggestions: [
              "سعر منتج آخر",
              "توصيل لهذه الكمية",
              "منتجات مشابهة",
            ],
            relatedProducts: this.generateRelatedProducts(query),
          };
        }
      }

      // If we have a product but no quantity, ask for quantity
      if (productId && !quantity) {
        const product = getProductById(productId);
        if (product) {
          const response = `سعر ${product.nameAr} الواحد:${product.price !== undefined ? ` ${product.price} شيكل` : " غير محدد في بيانات المتجر حالياً"}`.substring(0, 80).concat(product.price !== undefined ? ` ( ${product.price} شيكل)` : "").concat("، الكمية المطلوبة؟");
          return {
            response,
            suggestions: [
              "كم سعر 30 متر",
              "منتجات أخرى",
              "تواصل معنا للسعر",
            ],
            relatedProducts: this.generateRelatedProducts(query),
          };
        }
      }

      // No product identified — ask for product/quantity
      // But first check if user mentioned a known product category
      const categoryHint = detectEnglishCategory(normalized);
      if (categoryHint) {
        const catProducts = getProductsByCategory(categoryHint);
        const names = catProducts.slice(0, 3).map((p) => p.nameAr);
        const response = `عندنا ${names.join("، ")}. السعر يعتمد على النوع والكمية. بتعطيني الكمية والنوع يناسبك؟`;
        return {
          response,
          suggestions: [
            "سعر SPC لغرفة نوم",
            "منتجات الجدران",
            "تواصل للسعر",
          ],
          relatedProducts: this.generateRelatedProducts(query),
        };
      }

      // Ultimate fallback — ask for clarification
      return {
        response: "أكيد، أي منتج تقصد؟ وإذا بتعطيني الكمية المطلوبة بقدر أساعدك أدق. المنتجات الشعبية приколنا: SPC وود، SPC بلوط طبيعي، سوفت ستون جير أبيض.",
        suggestions: [
          "سعر SPC 30 متر",
          "سعر سوفت ستون للجدران",
          "تواصل معنا للسعر",
        ],
        relatedProducts: this.generateRelatedProducts(query),
      };
    }

    // ----- PRODUCT CATEGORIES: "شو أنواع SPC عندكم؟" -----
    if (intent === "product-categories") {
      const categories = categoryData.map((c) => `${c.nameAr}: ${c.descriptionAr.split(" ").slice(0, 4).join(" ")}`).join(" | ");
      const response = `أنواع المنتجات المتوفرة لدينا: ${categories}.`;
      return {
        response,
        suggestions: [
          "SPC لغرفة نوم",
          "بديل حجر للجدران",
          "سوفت ستون للصالون",
        ],
        relatedProducts: this.generateRelatedProducts(query),
      };
    }

    // ----- SPC PRODUCTS LIST / SEARCH -----
    if (intent === "product-spc") {
      const spcProducts = products.filter((p) => p.categoryId === "cat-spc");
      if (spcProducts.length === 0) {
        return {
          response: "لا توجد منتجات SPC حالياً في البيانات.",
          suggestions: ["منتجات أخرى", "تواصل معنا"],
          relatedProducts: [],
        };
      }

      // If user mentioned "SPC لغرفة نوم" or similar usage
      if (normalized.includes(normalizeArabic("غرفة")) || normalized.includes(normalizeArabic("صالون")) || normalized.includes(normalizeArabic("معيشة"))) {
        const suitable = spcProducts.filter((p) => p.tags.some((t) => t.includes("أرضية") || t.includes("غرفة") || t.includes("صالون")));
        if (suitable.length > 0) {
          const names = suitable.slice(0, 3).map((p) => p.nameAr);
          const response = `لغرفة النوم والصالة، أنصح بهذه المنتجات: ${names.join("، ")}.`;
          return {
            response,
            suggestions: [
              "سعر 30 متر",
              "مقارنة مع بديل حجر",
              "تواصل للسعر",
            ],
            relatedProducts: suitable.map((p) => p.id),
          };
        }
      }

      // General SPC list
      const names = spcProducts.slice(0, 5).map((p) => p.nameAr);
      const response = `عندنا ${names.join("، ")}.`;
      return {
        response,
        suggestions: [
          "سعر SPC 30 متر",
          "مقارنة SPC وبديل حجر",
          "منتجات للجدران",
        ],
        relatedProducts: spcProducts.map((p) => p.id),
      };
    }

    // ----- STONE ALTERNATIVE PRODUCTS -----
    if (intent === "product-stone") {
      const stoneProducts = products.filter((p) => p.categoryId === "cat-stone-alt");
      if (stoneProducts.length === 0) {
        return {
          response: "لا توجد منتجات بديل حجر حالياً.",
          suggestions: ["منتجات أخرى", "تواصل معنا"],
          relatedProducts: [],
        };
      }
      const names = stoneProducts.slice(0, 3).map((p) => p.nameAr);
      const response = `عندنا ${names.join("، ")}.`;
      return {
        response,
        suggestions: [
          "سعر المتر",
          "مقارنة مع SPC",
          "مناسب للجدران",
        ],
        relatedProducts: stoneProducts.map((p) => p.id),
      };
    }

    // ----- SOFT STONE PRODUCTS -----
    if (intent === "product-soft-stone") {
      const softProducts = products.filter((p) => p.categoryId === "cat-soft-stone");
      if (softProducts.length === 0) {
        return {
          response: "لا توجد منتجات سوفت ستون حالياً.",
          suggestions: ["منتجات أخرى", "تواصل معنا"],
          relatedProducts: [],
        };
      }
      const names = softProducts.slice(0, 3).map((p) => p.nameAr);
      const response = `عندنا ${names.join("، ")}.`;
      return {
        response,
        suggestions: [
          "سعر المتر",
          "مقارنة مع الحجر",
          "مناسب للجدران",
        ],
        relatedProducts: softProducts.map((p) => p.id),
      };
    }

    // ----- GENERAL QUESTION FALLBACK -----
    return {
      response: `شكراً لسؤالك! كمساعد لمتجر يقين ستور، يمكنني مساعدتك في:\n• معرفة أنواع الأرضيات المتوفرة (SPC، بديل حجر، سوفت ستون)\n• الإجابة على أسئلة التوصيل لمنطقتك\n• الاقتراح المناسب لمساحتك\n• تفاصيل المنتجات والأسعار\n\nكيف يمكنني مساعدتك؟`,
      suggestions: this.generateSuggestions(query),
      relatedProducts: this.generateRelatedProducts(query),
    };
  }

  // -----------------------------------------------------------------
  // 5️⃣ SUGGESTIONS GENERATOR — dynamic based on query + context
  // -----------------------------------------------------------------
  private generateSuggestions(query: string): string[] {
    const normalized = normalizeArabic(query);
    const suggestions: string[] = [];

    // Always add a few static useful suggestions
    suggestions.push("أسعار المنتجات");
    suggestions.push("توصيل لمنطقتك");
    suggestions.push("منتجات للجدران");

    // Add category-based suggestions
    if (normalized.includes(normalizeArabic("غرفة")) || normalized.includes(normalizeArabic("صالون"))) {
      suggestions.push("منتجات لغرفة النوم");
      suggestions.push("منتجات للصالة");
    }
    if (normalized.includes(normalizeArabic("الجدران")) || normalized.includes(normalizeArabic("جدار"))) {
      suggestions.push("سوفت ستون للجدران");
      suggestions.push("بديل حجر للجدران");
    }
    if (normalized.includes(normalizeArabic("SPC")) || normalized.includes(normalizeArabic("باركيه"))) {
      suggestions.push("مقارنة أنواع SPC");
      suggestions.push("سعر SPC للمتر");
    }

    // Deduplicate and limit
    return [...new Set(suggestions)].slice(0, 5);
  }

  // -----------------------------------------------------------------
  // 6️⃣ RELATED PRODUCTS — based on query category
  // -----------------------------------------------------------------
  private generateRelatedProducts(query: string): string[] {
    const normalized = normalizeArabic(query);
    let matches: Product[] = [];

    if (normalized.includes(normalizeArabic("SPC")) || normalized.includes(normalizeArabic("باركيه"))) {
      matches = products.filter((p) => p.categoryId === "cat-spc");
    } else if (normalized.includes(normalizeArabic("بديل حجر")) || normalized.includes(normalizeArabic("حجر"))) {
      matches = products.filter((p) => p.categoryId === "cat-stone-alt");
    } else if (normalized.includes(normalizeArabic("سوفت ستون")) || normalized.includes(normalizeArabic("سوفت"))) {
      matches = products.filter((p) => p.categoryId === "cat-soft-stone");
    } else {
      // fallback: featured
      matches = products.filter((p) => p.featured).slice(0, 4);
    }

    if (matches.length === 0) {
      matches = products.filter((p) => p.featured).slice(0, 4);
    }

    return matches.map((p) => p.id);
  }

  // -----------------------------------------------------------------
  // 7️⃣ MOCK AI PROVIDER CALL — when no API key, return our smart mock
  // -----------------------------------------------------------------
  private async callAIProvider(messages: AIChatMessage[]): Promise<string> {
    // If AI is configured (provider + key), we would call the real API here.
    // For now, since AI_ENABLED=false and API_KEY empty, we return our smart mock.
    // In a real deployment, this would be a proper fetch to OpenAI/Anthropic/Google.
    const lastUserMsg = messages.find((m) => m.role === "user")?.content || "";
    return this.generateResponse(lastUserMsg, messages).response;
  }
}

// Export a singleton instance
export const aiService = new AIService();