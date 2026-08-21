import type { AIConfig, AIProvider, AIChatMessage } from "@/types";
import { config } from "@/lib/config";
import { products, getProductById } from "@/lib/data";
import { storeKnowledge } from "@/lib/ai/store-knowledge";
import {
  normalizeArabic,
  containsAny,
  extractQuantity,
  extractCityMention,
  isPriceQuery,
  isDeliveryCostQuery,
  isDeliveryAvailabilityQuery,
  isLocationQuery,
  isGreeting,
} from "@/lib/ai/arabic-nlp";

// ============================================================
// AI Service — Smart rule-based dynamic AI Shopping Assistant
// Encapsulates stateless context parsing, real product search,
// exact price computations, and personalized Arabic copy.
// ============================================================

export class AIService {
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

  // -----------------------------------------------------------------
  // 1️⃣ STATELESS CONTEXT PARSING — reconstruct state from chat history
  // -----------------------------------------------------------------
  private reconstructContext(
    currentQuery: string,
    chatHistory: { role: string; content: string }[] = []
  ): {
    productId?: string;
    city?: string;
    quantity?: number;
    categoryId?: string;
  } {
    let productId: string | undefined = undefined;
    let city: string | undefined = undefined;
    let quantity: number | undefined = undefined;
    let categoryId: string | undefined = undefined;

    const analyzeMessage = (text: string, isUser: boolean) => {
      const normalized = normalizeArabic(text);

      // Check for exact/fuzzy product matches in database
      for (const p of products) {
        const hasNameAr = p.nameAr && normalized.includes(normalizeArabic(p.nameAr));
        const hasSlug = p.slug && normalized.toLowerCase().includes(p.slug.toLowerCase());
        const nameEnNorm = normalizeArabic(p.name);
        const hasNameEn = nameEnNorm && normalized.includes(nameEnNorm);

        let distinctMatch = false;
        if (p.id === "prod-spc-001" && (normalized.includes("رمادي اشق") || (normalized.includes("رمادي") && normalized.includes("اشق")) || normalized.includes("ash gray") || normalized.includes("ash-gray"))) distinctMatch = true;
        if (p.id === "prod-spc-002" && (normalized.includes("بلوط طبيعي") || (normalized.includes("بلوط") && normalized.includes("طبيعي")) || normalized.includes("oak naturel") || normalized.includes("oak-naturel"))) distinctMatch = true;
        if (p.id === "prod-spc-003" && (normalized.includes("رملي فحمي") || (normalized.includes("رملي") && normalized.includes("فحمي")) || normalized.includes("charcoal slate") || normalized.includes("charcoal-slate"))) distinctMatch = true;
        if (p.id === "prod-spc-004" && (normalized.includes("بلوط اسود") || (normalized.includes("بلوط") && normalized.includes("اسود")) || normalized.includes("honey oak") || normalized.includes("honey-oak") || normalized.includes("عسلي"))) distinctMatch = true;
        if (p.id === "prod-stone-001" && (normalized.includes("مرمر ابيض") || (normalized.includes("مرمر") && normalized.includes("ابيض")) || normalized.includes("white marble"))) distinctMatch = true;
        if (p.id === "prod-stone-002" && (normalized.includes("جرانيت داكن") || (normalized.includes("جرانيت") && normalized.includes("داكن")) || normalized.includes("dark granite"))) distinctMatch = true;
        if (p.id === "prod-stone-003" && (normalized.includes("ترافيرتين بيج") || (normalized.includes("ترافيرتين") && normalized.includes("بيج")) || normalized.includes("beige travertine") || normalized.includes("ترافرتين"))) distinctMatch = true;
        if (p.id === "prod-soft-001" && (normalized.includes("جير ابيض") || (normalized.includes("جير") && normalized.includes("ابيض")) || normalized.includes("cream limestone") || normalized.includes("جير ناعم") || normalized.includes("جيري"))) distinctMatch = true;
        if (p.id === "prod-soft-002" && (normalized.includes("بيتشي بني") || (normalized.includes("بيتشي") && normalized.includes("بني")) || normalized.includes("beechwood brown") || normalized.includes("بيتشي"))) distinctMatch = true;
        if (p.id === "prod-soft-003" && (normalized.includes("طوبي احمر") || (normalized.includes("طوبي") && normalized.includes("احمر")) || normalized.includes("terracotta red") || normalized.includes("طوبي"))) distinctMatch = true;
        if (p.id === "prod-soft-004" && (normalized.includes("بيج ليموني") || (normalized.includes("بيج") && normalized.includes("ليموني")) || normalized.includes("limewash beige") || normalized.includes("ليموني"))) distinctMatch = true;

        if (hasNameAr || hasSlug || hasNameEn || distinctMatch) {
          productId = p.id;
          categoryId = p.categoryId;
        }
      }

      // Check category if no product is identified
      if (!productId) {
        if (normalized.includes("spc") || normalized.includes("باركيه") || normalized.includes("ارضيات") || normalized.includes("ارضيه")) {
          categoryId = "cat-spc";
        } else if (normalized.includes("بديل حجر") || normalized.includes("بديل الحجر") || normalized.includes("بديل رخام")) {
          categoryId = "cat-stone-alt";
        } else if (normalized.includes("سوفت ستون") || normalized.includes("سوفت") || normalized.includes("ستون")) {
          categoryId = "cat-soft-stone";
        }
      }

      // Extract City
      const foundCity = extractCityMention(normalized);
      if (foundCity) {
        city = foundCity;
      }

      // Extract Quantity
      if (isUser) {
        const foundQty = extractQuantity(text);
        if (foundQty !== null) {
          quantity = foundQty;
        } else {
          // Fallback plain number
          const parsedNum = this.extractPlainNumber(text);
          if (parsedNum !== null) {
            quantity = parsedNum;
          }
        }
      }
    };

    // Process history chronological order
    for (const msg of chatHistory) {
      analyzeMessage(msg.content, msg.role === "user");
    }

    // Process current query
    analyzeMessage(currentQuery, true);

    return { productId, city, quantity, categoryId };
  }

  private extractPlainNumber(text: string): number | null {
    const match = text.match(/(\d+(?:\.\d+)?)/);
    if (match) {
      const val = parseFloat(match[1]);
      // Exclude phone prefixes or huge dimensions
      if (!isNaN(val) && val > 0 && val < 2000 && val !== 972 && val !== 59) {
        return val;
      }
    }
    return null;
  }

  // -----------------------------------------------------------------
  // 2️⃣ INTENT DETECTION
  // -----------------------------------------------------------------
  private detectIntent(normalized: string, context: { productId?: string; categoryId?: string }): string {
    if (isGreeting(normalized)) return "greeting";

    const contactKeywords = ["كيف اطلب", "طريقة الطلب", "كيف اشتري", "رقم", "تلفون", "جوال", "اتواصل", "واتس", "واتساب", "اتصال", "تواصل", "رقمكم"];
    if (containsAny(normalized, contactKeywords)) return "contact";

    if (isLocationQuery(normalized)) return "location";
    if (isPriceQuery(normalized)) return "price";
    if (isDeliveryCostQuery(normalized)) return "delivery-cost";
    if (isDeliveryAvailabilityQuery(normalized)) return "delivery-availability";

    const specsKeywords = ["مواصفات", "سمك", "مادة", "كفالة", "ضمان", "تركيب", "طريقة تركيب", "كيف بركب", "كلِك", "وزن", "قياس", "ابعاد", "صندوق", "كرتونة", "كرتونه"];
    if (containsAny(normalized, specsKeywords)) return "specifications";

    if (normalized.includes("نوع") || normalized.includes("انواع") || normalized.includes("خيارات") || normalized.includes("شو في") || normalized.includes("كتالوج")) {
      return "product-categories";
    }

    const byeKeywords = ["شكرا", "تسلم", "يعطيك العافيه", "يسلمو", "باي", "مع السلامه", "مشكور", "يسلم ايديك"];
    if (containsAny(normalized, byeKeywords)) return "bye";

    // Fallback to category intents if context has category
    if (context.productId) return "price";
    if (context.categoryId === "cat-spc") return "product-spc";
    if (context.categoryId === "cat-stone-alt") return "product-stone";
    if (context.categoryId === "cat-soft-stone") return "product-soft-stone";

    return "general";
  }

  // -----------------------------------------------------------------
  // 3️⃣ MAIN BOT CONTROLLER — stateless & fully deterministic
  // -----------------------------------------------------------------
  getResponse(
    query: string,
    chatHistory: { role: string; content: string }[] = []
  ): {
    response: string;
    suggestions: string[];
    relatedProducts: string[];
  } {
    const normalized = normalizeArabic(query);
    const context = this.reconstructContext(query, chatHistory);
    const intent = this.detectIntent(normalized, context);

    let response = "";
    let suggestions: string[] = [];
    let relatedProducts: string[] = [];

    // ----- GREETING -----
    if (intent === "greeting") {
      const greetings = [
        "يا أهلاً وسهلاً بك في يقين ستور بالخليل! 🌸 أنا مساعدك الذكي في المتجر، ويسعدني جداً خدمتك اليوم. كيف بقدر أساعدك في اختيار أرقى الأرضيات وبدائل الحجر لمنزلك؟",
        "أهلاً بك يا فندم في يقين ستور! يسعدنا جداً تواصلك معنا. 🥰 أنا هنا لمساعدتك في استعراض منتجاتنا الفاخرة، حساب التكاليف، ومعرفة أسعار ومواصفات الأرضيات والجدران بدقة. شو اللي بتدور عليه اليوم؟",
        "وعليكم السلام ورحمة الله وبركاته! مرحبًا بك في متجر يقين ستور بالخليل. 🥀 يسعدني تزويدك بكافة تفاصيل أسعار باركيه SPC الفاخر، وبديل الحجر، وسوفت ستون للجدران. كيف بقدر أخدمك اليوم؟"
      ];
      response = greetings[Math.floor(Math.random() * greetings.length)];
      suggestions = ["أسعار باركيه SPC", "بديل الحجر للجدران", "أين يقع موقعكم؟", "هل في توصيل لرام الله؟"];
      relatedProducts = products.filter(p => p.featured).slice(0, 3).map(p => p.id);
    }

    // ----- LOCATION -----
    else if (intent === "location") {
      const locations = [
        `معرضنا الرئيسي يقع في مدينة **${storeKnowledge.location.fullAr}**. 📍\n\nبنتشرف جداً بزيارتك لينا لتشوف جودة وفخامة الأرضيات وبدائل الحجر والرخام وسوفت ستون على أرض الواقع! وتتوفر خدمة التوصيل السريع لكافة مناطق ومدن الضفة الغربية الحبيبة.`,
        `موقع متجر يقين ستور هو في **${storeKnowledge.location.cityAr} - ${storeKnowledge.location.countryAr}**. 🇵🇸\n\nيسرنا تشريفك لمعرضنا للاطلاع على تشكيلة أرضيات SPC، بدائل الحجر، وسوفت ستون الفاخرة. وإذا كنت خارج الخليل، بنوصل طلبك لباب بيتك بأمان في أي مكان بالضفة!`
      ];
      response = locations[Math.floor(Math.random() * locations.length)];
      suggestions = ["هل يتوفر توصيل لمدينتي؟", "أسعار المنتجات", "كيف بقدر أتواصل معكم؟"];
      relatedProducts = products.filter(p => p.bestSeller).slice(0, 2).map(p => p.id);
    }

    // ----- DELIVERY AVAILABILITY & COST -----
    else if (intent === "delivery-availability" || intent === "delivery-cost") {
      if (context.city) {
        const deliveryTexts = [
          `أهلاً بك! بالتأكيد، التوصيل متوفر لمدينة **${context.city}** الحبيبة وكافة قراها ومناطقها بالكامل، كجزء من تغطيتنا الشاملة لجميع مناطق **الضفة الغربية**. 🚚\n\nتكلفة التوصيل ليست ثابتة بل تعتمد بدقة على المسافة المحددة وحجم ووزن الكمية المطلوبة لضمان احتساب السعر الأوفر والأنسب لك. شو المنتج والكمية اللي بتفكر تطلبها لـ ${context.city}؟ لنعطيك تفاصيل أكثر!`,
          `على راسي يا غالي، بنوصل لـ **${context.city}** وكل مدن وقرى الضفة الغربية بالكامل! 📦\n\nأما بالنسبة لكلفة الشحن لـ ${context.city}، فهي بتتحدد بدقة حسب المسافة والكمية الإجمالية (الوزن والحجم). إذا حابب، بتقدر تبلغني بالمنتج والكمية المطلوبة (بالمتر المربع أو عدد الألواح) وبحسبلك تكلفة المنتج والشحن التقريبية فوراً!`
        ];
        response = deliveryTexts[Math.floor(Math.random() * deliveryTexts.length)];
        suggestions = [`سعر توصيل كمية لـ ${context.city}`, "طريقة الطلب والتواصل", "عرض أسعار المنتجات"];
      } else {
        const deliveryTextsGeneral = [
          "نوفر خدمة التوصيل السريع والآمن لجميع مناطق ومدن وقرى **الضفة الغربية** بالكامل من معرضنا في الخليل! 🚚\n\nتكلفة التوصيل ليست ثابتة، بل تعتمد بدقة على مدينتك والمسافة، بالإضافة إلى حجم ووزن الكمية المطلوبة لضمان احتساب السعر الأوفر والأنسب لك. يرجى تزويدي باسم مدينتك والمنتج والكمية المطلوبة لنعطيك تفاصيل التكلفة الدقيقة!",
          "أهلاً بك! الشحن متوفر لجميع أنحاء **الضفة الغربية**. 📦 كلفة التوصيل تختلف حسب المنطقة والمسافة ونوع وحجم الطلبية (الوزن الكلي للكمية). خبرني بأي مدينة أنت وشو الكمية اللي بتحتاجها، وبحسبلك التكلفة بالكامل بكل سرور!"
        ];
        response = deliveryTextsGeneral[Math.floor(Math.random() * deliveryTextsGeneral.length)];
        suggestions = ["توصيل لرام الله", "توصيل لنابلس", "توصيل لجنين", "كيفية الطلب والتواصل"];
      }
      relatedProducts = products.filter(p => p.featured).slice(0, 2).map(p => p.id);
    }

    // ----- CONTACT / ORDERING -----
    else if (intent === "contact") {
      response = `للطلب المباشر وتنسيق الكميات وتفاصيل التوصيل وحساب الخصومات، يسعدنا جداً تواصلك معنا:
📞 **الاتصال أو الواتساب**: [${storeKnowledge.phoneDisplay}](https://wa.me/${storeKnowledge.phone.replace(/[\s+-]/g, "")})
🌐 **حساباتنا على السوشيال ميديا**:
- [فيسبوك يقين ستور](${storeKnowledge.socials.facebook})
- [إنستغرام يقين ستور](${storeKnowledge.socials.instagram})

نحن متواجدون لمساعدتك وتقديم أفضل جودة وسعر بأي وقت! 🌸`;
      suggestions = ["أين يقع المعرض؟", "ما هي الأسعار المتوفرة؟", "مواصفات باركيه SPC"];
    }

    // ----- SPECIFICATIONS -----
    else if (intent === "specifications" && context.productId) {
      const product = getProductById(context.productId);
      if (product) {
        const specsList = product.specifications.map(s => `• **${s.nameAr}**: ${s.valueAr}`).join("\n");
        response = `تفضل يا غالي، إليك كامل المواصفات الفنية المعتمدة لمنتج **${product.nameAr}**:

${specsList}
• **الضمان والكفالة**: ${product.warrantyAr}
• **الملمس واللمعة**: ${product.finishAr}
• **المادة المصنعة**: ${product.materialAr}
• **الأبعاد (المقاسات)**: الطول ${product.dimensions.length} ملم × العرض ${product.dimensions.width} ملم × الارتفاع/السمك ${product.dimensions.height} ملم.
• **الوزن**: ${product.weight} كغم لكل كرتونة/لوح.

هذا المنتج متميز ومصمم ليدوم طويلاً بمظهر دافئ وأنيق. هل تود الاستفسار عن كمية معينة لحساب تكلفتها الإجمالية؟`;
        suggestions = [`كم سعر 30 متر من ${product.nameAr.split(" - ")[1] || "هذا النوع"}؟`, "سعر التوصيل لمدينتي", "كيفية الطلب والتواصل"];
        relatedProducts = [product.id];
      }
    }

    // ----- PRODUCT CATEGORIES -----
    else if (intent === "product-categories") {
      response = `نوفر في يقين ستور ثلاث عائلات متميزة من الديكورات الأرضية والجدارية الفاخرة:

1️⃣ **باركيه SPC (SPC Flooring)**: أرضيات حجرية بلاستيكية متينة ومقاومة للمياه 100%، مثالية للغرف والصالونات والمكاتب بنظام تركيب قفل ونقر (كلِك) سهل وعملي جداً.
2️⃣ **بديل الحجر (Stone Alternative)**: ألواح متميزة تحاكي الرخام والجرانيت الطبيعي خفيفة الوزن وسهلة التركيب ومقاومة للرطوبة والمياه، لجمال جدران صالاتك ومطابخك.
3️⃣ **سوفت ستون (Soft Stone)**: لوحات حجر مرن طبيعي ناعم (مثل الحجر الجيري والترافيرتين) لتمنح جدرانك الداخلية والخلفيات المميزة ملمساً دافئاً وجذاباً وعصرياً.

أي من هذه الفئات ترغب في استكشاف منتجاتها وأسعارها وتفاصيلها اليوم؟`;
      suggestions = ["أسعار باركيه SPC", "عرض بديل الحجر", "عرض سوفت ستون للجدران"];
      relatedProducts = products.slice(0, 3).map(p => p.id);
    }

    // ----- PRICE & CALCULATION (CORE REQUIREMENT - ABSOLUTE ACCURACY) -----
    else if (intent === "price") {
      if (context.productId) {
        const product = getProductById(context.productId);
        if (product) {
          const unitPrice = product.price; // Rely strictly on database price!
          const unitName = product.categoryId === "cat-spc" ? "متر مربع" : "لوح";

          if (context.quantity !== undefined) {
            const qty = context.quantity;
            const totalProductPrice = unitPrice * qty;

            let text = `تكرم عينك! سعر الـ **${unitName}** لمنتج **${product.nameAr}** هو **${unitPrice} شيكل** بشكل رسمي ومعتمد وبدون أي رسوم خفية.

بناءً على كميتك المطلوبة لـ **${qty} ${unitName}**، فإن تفاصيل الحسبة الكلية للمنتج هي:
📐 الكمية المطلوبة: ${qty} ${unitName}
💰 سعر الـ ${unitName}: ${unitPrice} ₪
💵 التكلفة الإجمالية للمنتج: **${totalProductPrice} شيكل** (شامل ضريبة القيمة المضافة).

`;
            if (context.city) {
              text += `🚚 بالنسبة للتوصيل إلى **${context.city}**، فهو متوفر بالتأكيد وبسعر مناسب جداً بناءً على حجم البضاعة (الوزن التقريبي للطلب هو ${Math.round(product.weight * qty)} كغم).
للطلب أو لتنسيق الشحن، يسعدنا جداً تواصلك معنا مباشرة على الرقم ${storeKnowledge.phoneDisplay}!`;
            } else {
              text += `🚚 هل ترغب في توصيل هذه الكمية لبيتك؟ يرجى إخبارنا باسم مدينتك في الضفة الغربية لنعلمك بتفاصيل وكلفة التوصيل بكل سرور!`;
            }
            response = text;
            suggestions = ["كيف بقدر أطلب؟", "مواصفات هذا المنتج الفنية", "هل يوجد خصم للكميات الكبيرة؟"];
            relatedProducts = [product.id];
          } else {
            response = `سعر الـ **${unitName}** لمنتج **${product.nameAr}** هو **${unitPrice} شيكل** (سعر رسمي ومعتمد بالمتجر). 🥰

هذا المنتج فاخر ومقاوم للمياه بنسبة 100% ويأتي بـ ${product.warrantyAr}.
إذا بتحب نحسبلك التكلفة الإجمالية بدقة، يرجى تزويدي بالمساحة الإجمالية لغرفتك أو بيتك بالمتر المربع (أو عدد الألواح) وبحسبه إلك فوراً!`;
            suggestions = [`كم سعر 30 ${unitName}؟`, `كم سعر 50 ${unitName}؟`, "توصيل لرام الله", "طريقة الطلب والتواصل"];
            relatedProducts = [product.id];
          }
        }
      } else {
        // If no product is matched but category is known
        if (context.categoryId === "cat-spc") {
          const list = products
            .filter(p => p.categoryId === "cat-spc")
            .map(p => `• **${p.nameAr}**: السعر الرسمي **${p.price} شيكل** للمتر المربع.`)
            .join("\n");
          response = `تفضل يا غالي، أسعار أرضيات باركيه SPC الفاخرة والمعتمدة رسمياً لدينا هي:

${list}

جميع هذه الأرضيات مقاومة للماء والرطوبة بنسبة 100% وتتميز بنظام قفل ونقر (كلِك) لسهولة التركيب وبضمان لغاية 20-25 سنة!
هل ترغب في حساب تكلفة مساحة معينة بأحد هذه الأنواع؟ خبرني بالمساحة لنحسبها سوا!`;
          suggestions = ["سعر 30 متر باركيه", "توصيل للنابلس", "كيفية الطلب والتواصل"];
          relatedProducts = products.filter(p => p.categoryId === "cat-spc").map(p => p.id);
        } else if (context.categoryId === "cat-stone-alt") {
          const list = products
            .filter(p => p.categoryId === "cat-stone-alt")
            .map(p => `• **${p.nameAr}**: السعر الرسمي **${p.price} شيكل** للوحة الواحدة.`)
            .join("\n");
          response = `تفضل يا غالي، أسعار ألواح بديل الحجر الرخامي الفاخر المعتمدة في يقين ستور هي:

${list}

تتميز هذه الألواح بمظهر حجر رخامي فخم وجميل وملمع ومقاوم للمياه، وسهلة التركيب للجدران وخلفيات التلفزيون والمطابخ.
أي تصميم أعجبك وتود حساب كميته وتكلفته الكلية؟`;
          suggestions = ["بديل حجر مرمر أبيض", "توصيل لرام الله", "طريقة الطلب والتواصل"];
          relatedProducts = products.filter(p => p.categoryId === "cat-stone-alt").map(p => p.id);
        } else if (context.categoryId === "cat-soft-stone") {
          const list = products
            .filter(p => p.categoryId === "cat-soft-stone")
            .map(p => `• **${p.nameAr}**: السعر الرسمي **${p.price} شيكل** للوحة الواحدة.`)
            .join("\n");
          response = `تفضل يا غالي، أسعار لوحات سوفت ستون (الحجر الطبيعي المرن الفخم) المتوفرة لدينا هي:

${list}

تتميز هذه الألواح بنمط جيري وترافيرتين بمظهر طبيعي وملمس دافئ وفاخر على جدران الصالونات والمداخل والجدران الداخلية.
هل تود معرفة تفاصيل أو حساب مساحة معينة لبيتك؟`;
          suggestions = ["سوفت ستون جير أبيض", "سوفت ستون بيتشي بني", "طريقة الطلب والتواصل"];
          relatedProducts = products.filter(p => p.categoryId === "cat-soft-stone").map(p => p.id);
        } else {
          // General pricing overview
          response = `أهلاً بك يا غالي! في يقين ستور بالخليل، نلتزم بالأسعار الرسمية المعتمدة لجميع منتجاتنا دون أي زيادة وهمية:

🧱 **أرضيات باركيه SPC (مقاومة للمياه 100% وبنظام نقر وقفل)**:
• SPC وود - رمادي أشق: **149 شيكل** للمتر.
• SPC وود - بلوط طبيعي: **179 شيكل** للمتر.
• SPC ستون - رملي فحمي: **169 شيكل** للمتر.
• SPC وود - بلوط أسود: **129 شيكل** للمتر.

💎 **ألواح بديل الحجر الرخامي الفخم للجدران والعدادات**:
• بديل حجر - مرمر أبيض (600×600): **299 شيكل** للوحة.
• بديل حجر - جرانيت داكن (600×600): **319 شيكل** للوحة.
• بديل حجر - ترافيرتين بيج (600×300): **269 شيكل** للوحة.

🏺 **سوفت ستون (الحجر الطبيعي المرن المبتكر)**:
• سوفت ستون - جير أبيض (600×600): **219 شيكل** للوحة.
• سوفت ستون - بيتشي بني (600×300): **199 شيكل** للوحة.
• سوفت ستون - طوبي أحمر (600×600): **239 شيكل** للوحة.
• سوفت ستون - بيج ليموني (600×300): **209 شيكل** للوحة.

خبرني شو هو المنتج أو الفئة اللي لفتت انتباهك عشان نحسب الكمية والتكلفة الإجمالية بدقة فوراً!`;
          suggestions = ["سعر 40 متر SPC وود", "سعر بديل حجر مرمر أبيض", "التوصيل لبيت لحم", "طريقة الطلب والتواصل"];
          relatedProducts = products.filter(p => p.featured).slice(0, 3).map(p => p.id);
        }
      }
    }

    // ----- SPC PRODUCTS LIST -----
    else if (intent === "product-spc") {
      const spcProducts = products.filter(p => p.categoryId === "cat-spc");
      const list = spcProducts.map(p => `• **${p.nameAr}**: السعر **${p.price} ₪** للمتر.`).join("\n");
      response = `يتوفر لدينا تشكيلة متميزة وراقية من أرضيات باركيه SPC (Stone Plastic Composite) الحجرية المقاومة للماء والرطوبة 100%:

${list}

تتميز هذه الأرضيات لغرف النوم والصالونات والمكاتب بتركيب كلِك (Click-Lock) بدون لاصق وتتحمل الحركة الكثيفة مع ضمان يصل لـ 20-25 سنة سكني.
هل تود اختيار نوع معين لنحسب المساحة والتكلفة الكلية لطلبك؟`;
      suggestions = ["سعر 30 متر SPC رمادي أشق", "مواصفات باركيه SPC الفنية", "التوصيل لنابلس"];
      relatedProducts = spcProducts.map(p => p.id);
    }

    // ----- STONE PRODUCTS LIST -----
    else if (intent === "product-stone") {
      const stoneProducts = products.filter(p => p.categoryId === "cat-stone-alt");
      const list = stoneProducts.map(p => `• **${p.nameAr}**: السعر **${p.price} ₪** للوحة.`).join("\n");
      response = `يتوفر لدينا ألواح بديل الحجر (بديل الرخام الفخم) عالية الجودة لجدران ومطابخ رائعة بمظهر يحاكي الطبيعي بالكامل:

${list}

الألواح سهلة التنظيف والتركيب باللاصق، وخفيفة الوزن ومقاومة للمياه والحرارة والرطوبة بامتياز.
أي تصميم أعجبك وتود حساب كميته وتكلفته الكلية؟`;
      suggestions = ["بديل حجر مرمر أبيض", "بديل حجر جرانيت داكن", "التوصيل لرام الله"];
      relatedProducts = stoneProducts.map(p => p.id);
    }

    // ----- SOFT STONE PRODUCTS LIST -----
    else if (intent === "product-soft-stone") {
      const softProducts = products.filter(p => p.categoryId === "cat-soft-stone");
      const list = softProducts.map(p => `• **${p.nameAr}**: السعر **${p.price} ₪** للوحة.`).join("\n");
      response = `يتوفر في يقين ستور ألواح سوفت ستون (الحجر الطبيعي الناعم المرن) لتغطية الجدران الفاخرة:

${list}

تمنح هذه الألواح جدرانك ملمساً ترابياً حجرياً دافئاً، ومقاومة للمياه والرطوبة 100% وعازلة للحرارة وخفيفة الوزن ومثالية للصالات.
ما هو التصميم الذي تود حساب تكلفته ومقاساته لمساحتك؟`;
      suggestions = ["سوفت ستون جير أبيض", "سوفت ستون بيتشي بني", "طريقة الطلب والتواصل"];
      relatedProducts = softProducts.map(p => p.id);
    }

    // ----- BYE / THANK YOU -----
    else if (intent === "bye") {
      const thankResponses = [
        "على الرحب والسعة يا غالي! تسعدنا دائمًا خدمتك في يقين ستور الخليل. أتمنى لك يوماً سعيداً وبيتاً عامراً بالأناقة والجمال! 🌸",
        "الله يعافيك ويسلمك يا رب! يسعدنا تواصلك معنا بأي وقت. إذا احتجت أي استفسار آخر أو حساب كميات مستقبلاً، أنا هنا دائمًا لخدمتك! 🥰",
        "العفو يا فندم، واجبنا! يسعدنا جداً اهتمامك بمنتجات يقين ستور. يومك سعيد ونراك قريبًا إن شاء الله! 🥀"
      ];
      response = thankResponses[Math.floor(Math.random() * thankResponses.length)];
      suggestions = ["طريقة الطلب والتواصل", "أين يقع المعرض؟", "منتجاتنا الفاخرة"];
    }

    // ----- GENERAL FALLBACK -----
    else {
      response = `على راسي يا غالي! أنا هنا مساعدك الذكي ومستشارك للتسوق في يقين ستور الخليل. 🥰

يسعدني جداً تزويدك بكافة المعلومات الرسمية والدقيقة بخصوص:
• 📐 حساب التكاليف الإجمالية والكميات لأرضيات باركيه SPC، بديل الحجر، وسوفت ستون.
• 🚚 تفاصيل التوصيل السريع لجميع مناطق ومدن الضفة الغربية وتكلفته.
• 📞 طرق التواصل المباشر وتنسيق الطلبات وتأكيد الكفالة والضمان الفني.

بإمكانك إخباري بنوع المنتج أو المساحة اللي بتحتاجها وبحسبها إلك فوراً وبمنتهى الدقة والصدق!`;
      suggestions = ["عرض جميع الأسعار", "أين يقع المعرض؟", "التوصيل لرام الله", "كيفية الطلب"];
      relatedProducts = products.filter(p => p.featured).slice(0, 3).map(p => p.id);
    }

    return {
      response,
      suggestions: [...new Set(suggestions)].slice(0, 4),
      relatedProducts,
    };
  }

  // -----------------------------------------------------------------
  // 4️⃣ PROVIDER CALL FALLBACK (UNUSED SINCE KEY IS EMPTY BUT RESTORED)
  // -----------------------------------------------------------------
  private async callAIProvider(messages: AIChatMessage[]): Promise<string> {
    const lastUserMsg = messages.find((m) => m.role === "user")?.content || "";
    return this.getResponse(lastUserMsg, messages).response;
  }
}

// Export singleton instance
export const aiService = new AIService();
