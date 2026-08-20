import type { Product, Review } from "@/types";

export const products: Product[] = [
  {
    id: "prod-spc-001",
    slug: "spc-wood-ash-gray-1220",
    name: "SPC Wood - Ash Gray 1220x180",
    nameAr: "SPC وود - رمادي أشق - 1220×180",
    description:
      "Premium SPC flooring with realistic wood grain texture in ash gray. Features a wear-resistant surface, waterproof core, and easy click-lock installation. Perfect for living rooms, bedrooms, and commercial spaces.",
    descriptionAr:
      "أرضية SPC متميزة بنقشة خشب رمادي أشق واقعية. تتميز بسطح مقاوم للتمزق، نواة مقاومة للماء، وتركيب قفل ونقر سهل. مثالية للغرف المعيشة والنوم ومساحات تجارية.",
    shortDescription:
      "Premium ash gray SPC flooring with waterproof core and click-lock installation.",
    shortDescriptionAr:
      "أرضية SPC رمادية متميزة بنواة مقاومة للماء وتركيب قفل ونقر.",
    price: 149,
    comparePrice: 199,
    discount: 25,
    categoryId: "cat-spc",
    images: [
      { id: "img-001", url: "/assets/products/SPC/img-001.png", alt: "SPC Ash Gray flooring installation", altAr: "تركيب أرضية SPC رمادية", isPrimary: true },
      { id: "img-002", url: "/assets/products/SPC/img-002.png", alt: "SPC Ash Gray close-up texture", altAr: "تفاصيل نسيج SPC رمادية", isPrimary: false },
      { id: "img-003", url: "/assets/products/SPC/img-003.png", alt: "SPC Ash Gray in bedroom setting", altAr: "أرضية SPC رمادية في غرفة نوم", isPrimary: false },
    ],
    rating: 4.8,
    reviewCount: 124,
    stock: 42,
    sku: "SPC-ASH-1220-01",
    weight: 12.5,
    dimensions: { length: 1220, width: 180, height: 6.5 },
    material: "SPC Core + WPC Wear Layer",
    materialAr: "نواة SPC + طبقة ارتداء WPC",
    finish: "Matt Embossed",
    finishAr: "لمعة ماتة مدحوتة",
    warranty: "25 Years Residential",
    warrantyAr: "ضمان 25 سنة سكني",
    featured: true,
    bestSeller: true,
    newArrival: false,
    tags: ["أرضية", "SPC", "رمادي", "خزامى", "مقاومة ماء"],
    specifications: [
      { name: "Material", nameAr: "المادة", value: "SPC Core", valueAr: "نواة SPC" },
      { name: "Thickness", nameAr: "سمك الطبقة", value: "6.5 mm", valueAr: "6.5 ملم" },
      { name: "Wear Layer", nameAr: "طبقة الارتداء", value: "0.3 mm", valueAr: "0.3 ملم" },
      { name: "Water Resistance", nameAr: "مقاومة الماء", value: "100%", valueAr: "100%" },
      { name: "Installation", nameAr: "طريقة التركيب", value: "Click-Lock", valueAr: "قفل ونقر" },
      { name: "Coverage", nameAr: "التغطية", value: "1.08 m² per box", valueAr: "1.08 م² لكل صندوق" },
    ],
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "prod-spc-002",
    slug: "spc-oak-naturel-1220",
    name: "SPC Wood - Oak Naturel 1220x180",
    nameAr: "SPC وود - بلوط طبيعي - 1220×180",
    description:
      "Natural oak SPC flooring with authentic wood grain and hand-scraped texture. This premium product brings the warmth of natural wood to any space with maximum durability and minimum maintenance.",
    descriptionAr:
      "أرضية SPC بلوط طبيعي بنقشة خشب أصيل وخشكة يدوية. هذا المنتج المتميز يجلب دفء الخشب الطبيعي إلى أي مساحة بأقصى متانة وأقل صيانة.",
    shortDescription:
      "Natural oak SPC flooring with hand-scraped texture and premium durability.",
    shortDescriptionAr:
      "أرضية SPC بلوط طبيعي بنقشة مدحوتة يدوياً ومتانة متميزة.",
    price: 179,
    comparePrice: 229,
    discount: 22,
    categoryId: "cat-spc",
    images: [
      { id: "img-004", url: "/assets/products/SPC/img-004.png", alt: "SPC Oak Naturel flooring", altAr: "أرضية SPC بلوط طبيعي", isPrimary: true },
      { id: "img-005", url: "/assets/products/SPC/img-005.png", alt: "SPC Oak Naturel texture detail", altAr: "تفاصيل نسيج SPC بلوط طبيعي", isPrimary: false },
      { id: "img-006", url: "/assets/products/SPC/img-006.png", alt: "SPC Oak Naturel kitchen setting", altAr: "أرضية SPC بلوط طبيعي في المطبخ", isPrimary: false },
    ],
    rating: 4.9,
    reviewCount: 89,
    stock: 35,
    sku: "SPC-OAK-1220-02",
    weight: 12.5,
    dimensions: { length: 1220, width: 180, height: 6.5 },
    material: "SPC Core + WPC Wear Layer",
    materialAr: "نواة SPC + طبقة ارتداء WPC",
    finish: "Hand-Scraped Matt",
    finishAr: "مات مدحوت يدوياً",
    warranty: "25 Years Residential",
    warrantyAr: "ضمان 25 سنة سكني",
    featured: true,
    bestSeller: true,
    newArrival: false,
    tags: ["أرضية", "SPC", "بلوط", "طبيعي", "مقاومة ماء"],
    specifications: [
      { name: "Material", nameAr: "المادة", value: "SPC Core", valueAr: "نواة SPC" },
      { name: "Thickness", nameAr: "سمك الطبقة", value: "6.5 mm", valueAr: "6.5 ملم" },
      { name: "Wear Layer", nameAr: "طبقة الارتداء", value: "0.3 mm", valueAr: "0.3 ملم" },
      { name: "Water Resistance", nameAr: "مقاومة الماء", value: "100%", valueAr: "100%" },
      { name: "Installation", nameAr: "طريقة التركيب", value: "Click-Lock", valueAr: "قفل ونقر" },
      { name: "Coverage", nameAr: "التغطية", value: "1.08 m² per box", valueAr: "1.08 م² لكل صندوق" },
    ],
    createdAt: "2024-01-20T08:00:00Z",
    updatedAt: "2024-01-20T08:00:00Z",
  },
  {
    id: "prod-spc-003",
    slug: "spc-charcoal-slate-1220",
    name: "SPC Stone - Charcoal Slate 1220x180",
    nameAr: "SPC ستون - رملي فحمي - 1220×180",
    description:
      "Sleek charcoal slate SPC flooring with stone-like appearance. Ideal for modern interiors, offering exceptional slip resistance and easy maintenance for high-traffic areas.",
    descriptionAr:
      "أرضية SPC رملية فحمية أنيقة بمظهر حجري. مثالية للديكورات الحديثة، توفر مقاومة مميزة للانزلاق وصيانة سهلة للمناطق ذات الحركة الكثيفة.",
    shortDescription:
      "Charcoal slate SPC flooring with stone appearance and slip resistance.",
    shortDescriptionAr:
      "أرضية SPC رملية فحمية بمظهر حجري ومقاومة للانزلاق.",
    price: 169,
    comparePrice: 209,
    discount: 19,
    categoryId: "cat-spc",
    images: [
      { id: "img-007", url: "/assets/products/SPC/img-007.png", alt: "SPC Charcoal Slate flooring", altAr: "أرضية SPC رملية فحمية", isPrimary: true },
      { id: "img-008", url: "/assets/products/SPC/img-008.png", alt: "SPC Charcoal Slate in living room", altAr: "أرضية SPC رملية فحمية في غرفة معيشة", isPrimary: false },
      { id: "img-009", url: "/assets/products/SPC/img-009.png", alt: "SPC Charcoal Slate hallway view", altAr: "أرضية SPC رملية فحمية في الممر", isPrimary: false },
    ],
    rating: 4.7,
    reviewCount: 63,
    stock: 28,
    sku: "SPC-SLATE-1220-03",
    weight: 12.5,
    dimensions: { length: 1220, width: 180, height: 6.5 },
    material: "SPC Core + Stone Effect Layer",
    materialAr: "نواة SPC + طبقة مظهر حجري",
    finish: "Textured Matt",
    finishAr: "مات نصف ناعم",
    warranty: "25 Years Residential",
    warrantyAr: "ضمان 25 سنة سكني",
    featured: true,
    bestSeller: false,
    newArrival: true,
    tags: ["أرضية", "SPC", "رصاصي", "حجري", "مقاومة ماء"],
    specifications: [
      { name: "Material", nameAr: "المادة", value: "SPC Core", valueAr: "نواة SPC" },
      { name: "Thickness", nameAr: "سمك الطبقة", value: "6.5 mm", valueAr: "6.5 ملم" },
      { name: "Wear Layer", nameAr: "طبقة الارتداء", value: "0.3 mm", valueAr: "0.3 ملم" },
      { name: "Water Resistance", nameAr: "مقاومة الماء", value: "100%", valueAr: "100%" },
      { name: "Installation", nameAr: "طريقة التركيب", value: "Click-Lock", valueAr: "قفل ونقر" },
      { name: "Coverage", nameAr: "التغطية", value: "1.08 m² per box", valueAr: "1.08 م² لكل صندوق" },
    ],
    createdAt: "2024-02-10T08:00:00Z",
    updatedAt: "2024-02-10T08:00:00Z",
  },
  {
    id: "prod-spc-004",
    slug: "spc-honey-wood-620x180",
    name: "SPC Wood - Honey Oak 620x180",
    nameAr: "SPC وود - بلوط أسود - 620×180",
    description:
      "Compact SPC flooring plank featuring golden honey oak finish. Perfect for smaller rooms, hallways, and accent walls. Easy DIY installation with click-lock system.",
    descriptionAr:
      "لوحة أرضية SPC مدمجة بلمعة بلوط عسلي ذهبي. مثالية للغرف الصغيرة والممرات وجدران المؤثرات. تركيب سهل للقيام به بنفسك مع نظام القفل والنقر.",
    shortDescription:
      "Golden honey oak SPC flooring plank for smaller spaces and accent walls.",
    shortDescriptionAr:
      "لوحة أرضية SPC بلوط أسود ذهبي للمساحات الصغيرة وجدران المؤثرات.",
    price: 129,
    comparePrice: 159,
    discount: 19,
    categoryId: "cat-spc",
    images: [
      { id: "img-010", url: "/assets/products/SPC/img-010.png", alt: "SPC Honey Oak flooring detail", altAr: "تفاصيل أرضية SPC بلوط أسود", isPrimary: true },
    ],
    rating: 4.5,
    reviewCount: 37,
    stock: 51,
    sku: "SPC-HONEY-620-04",
    weight: 6.8,
    dimensions: { length: 620, width: 180, height: 6.5 },
    material: "SPC Core + WPC Wear Layer",
    materialAr: "نواة SPC + طبقة ارتداء WPC",
    finish: "Glossy Matt Hybrid",
    finishAr: "هجين لامع مات",
    warranty: "20 Years Residential",
    warrantyAr: "ضمان 20 سنة سكني",
    featured: false,
    bestSeller: false,
    newArrival: true,
    tags: ["أرضية", "SPC", "بلوط", "أصغر", "أسود"],
    specifications: [
      { name: "Material", nameAr: "المادة", value: "SPC Core", valueAr: "نواة SPC" },
      { name: "Thickness", nameAr: "سمك الطبقة", value: "6.5 mm", valueAr: "6.5 ملم" },
      { name: "Wear Layer", nameAr: "طبقة الارتداء", value: "0.3 mm", valueAr: "0.3 ملم" },
      { name: "Water Resistance", nameAr: "مقاومة الماء", value: "100%", valueAr: "100%" },
      { name: "Installation", nameAr: "طريقة التركيب", value: "Click-Lock", valueAr: "قفل ونقر" },
      { name: "Coverage", nameAr: "التغطية", value: "0.55 m² per box", valueAr: "0.55 م² لكل صندوق" },
    ],
    createdAt: "2024-03-05T08:00:00Z",
    updatedAt: "2024-03-05T08:00:00Z",
  },
  {
    id: "prod-stone-001",
    slug: "stone-alt-marble-white-600x600",
    name: "Stone Alternative - White Marble 600x600",
    nameAr: "بديل حجر - مرمر أبيض - 600×600",
    description:
      "Premium artificial stone panel mimicking high-end white Carrara marble. Lightweight, durable, and easy to install for both interior and exterior surfaces including countertops, backsplashes, and wall cladding.",
    descriptionAr:
      "لوحة حجر اصطناعي متميز تحاكي مرمر كارارا الأبيض عالي الجودة. خفيفة الوزن، متينة، وسهلة التركيب لسطوح داخلية وخارجية بما في ذلك العدادات والبطاقات الخلفية وتغطية الجدران.",
    shortDescription:
      "Premium artificial white marble stone panel for countertops and wall cladding.",
    shortDescriptionAr:
      "لوحة حجر مصطنع أبيض متميز للعدادات وتغطية الجدران.",
    price: 299,
    comparePrice: 379,
    discount: 21,
    categoryId: "cat-stone-alt",
    images: [
      { id: "img-011", url: "/assets/products/بديل حجر/img-011.png", alt: "White marble stone alternative panel", altAr: "لوحة مرمر أبيض بديل الحجر", isPrimary: true },
      { id: "img-012", url: "/assets/products/بديل حجر/img-012.png", alt: "White marble stone alternative installation", altAr: "تركيب مرمر أبيض بديل الحجر", isPrimary: false },
      { id: "img-013", url: "/assets/products/بديل حجر/img-013.png", alt: "White marble stone alternative texture", altAr: "نسيج مرمر أبيض بديل الحجر", isPrimary: false },
    ],
    rating: 4.9,
    reviewCount: 52,
    stock: 18,
    sku: "STN-MARBLE-WHT-01",
    weight: 8.2,
    dimensions: { length: 600, width: 600, height: 20 },
    material: "Acrylic Resin + Mineral Fillers",
    materialAr: "راتنير أكريليكي + مواد معدنية",
    finish: "Glossy Polished",
    finishAr: "ملمع مصقول",
    warranty: "10 Years Commercial",
    warrantyAr: "ضمان 10 سنوات تجارية",
    featured: true,
    bestSeller: true,
    newArrival: false,
    tags: ["بديل حجر", "مرمر", "أبيض", "عداد", "جدران"],
    specifications: [
      { name: "Material", nameAr: "المادة", value: "Acrylic Resin Composite", valueAr: "تركيبة أكريليكية" },
      { name: "Thickness", nameAr: "السمك", value: "20 mm", valueAr: "20 ملم" },
      { name: "Surface Finish", nameAr: "لمعة السطح", value: "Polished", valueAr: "مصقول" },
      { name: "Water Resistance", nameAr: "مقاومة الماء", value: "Waterproof", valueAr: "مقاوم للماء" },
      { name: "Applications", nameAr: "التطبيقات", value: "Interior/Exterior", valueAr: "داخلي/خارجي" },
      { name: "Coverage", nameAr: "التغطية", value: "1 m² per 3 panels", valueAr: "1 م² لكل 3 لوحات" },
    ],
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z",
  },
  {
    id: "prod-stone-002",
    slug: "stone-alt-granite-dark-600x600",
    name: "Stone Alternative - Dark Granite 600x600",
    nameAr: "بديل حجر - جرانيت داكن - 600×600",
    description:
      "Dark granite-effect stone alternative panels with authentic mineral veining. Ideal for creating dramatic accent walls, kitchen backslashes, and luxury bathroom surfaces.",
    descriptionAr:
      "لوحات بديل الحجر بنمط جرانيت داكن بخطوط معدنية أصيلة. مثالية لإنشاء جدران مؤثرات درامية والخلفيات المطبخية وسطوح حمامات فاخرة.",
    shortDescription:
      "Dark granite stone alternative panels with authentic mineral veining for accent walls.",
    shortDescriptionAr:
      "لوحات بديل جرانيت داكن بخطوط معدنية أصيلة لجدران المؤثرات.",
    price: 319,
    comparePrice: 399,
    discount: 20,
    categoryId: "cat-stone-alt",
    images: [
      { id: "img-014", url: "/assets/products/بديل حجر/img-014.png", alt: "Dark granite stone alternative panel", altAr: "لوحة جرانيت داكن بديل الحجر", isPrimary: true },
      { id: "img-015", url: "/assets/products/بديل حجر/img-015.png", alt: "Dark granite stone alternative texture", altAr: "نسيج جرانيت داكن بديل الحجر", isPrimary: false },
    ],
    rating: 4.8,
    reviewCount: 41,
    stock: 23,
    sku: "STN-GRANITE-DK-02",
    weight: 8.2,
    dimensions: { length: 600, width: 600, height: 20 },
    material: "Acrylic Resin + Mineral Fillers",
    materialAr: "راتنير أكريليكي + مواد معدنية",
    finish: "Semi-Gloss Textured",
    finishAr: "نصف لامع نصف ناعم",
    warranty: "10 Years Commercial",
    warrantyAr: "ضمان 10 سنوات تجارية",
    featured: true,
    bestSeller: false,
    newArrival: false,
    tags: ["بديل حجر", "جرانيت", "داكن", "مؤثرات", "مطبخ"],
    specifications: [
      { name: "Material", nameAr: "المادة", value: "Acrylic Resin Composite", valueAr: "تركيبة أكريليكية" },
      { name: "Thickness", nameAr: "السمك", value: "20 mm", valueAr: "20 ملم" },
      { name: "Surface Finish", nameAr: "لمعة السطح", value: "Semi-Gloss", valueAr: "نصف لامع" },
      { name: "Water Resistance", nameAr: "مقاومة الماء", value: "Waterproof", valueAr: "مقاوم للماء" },
      { name: "Applications", nameAr: "التطبيقات", value: "Interior/Exterior", valueAr: "داخلي/خارجي" },
      { name: "Coverage", nameAr: "التغطية", value: "1 m² per 3 panels", valueAr: "1 م² لكل 3 لوحات" },
    ],
    createdAt: "2024-01-12T08:00:00Z",
    updatedAt: "2024-01-12T08:00:00Z",
  },
  {
    id: "prod-stone-003",
    slug: "stone-alt-beige-600x300",
    name: "Stone Alternative - Beige Travertine 600x300",
    nameAr: "بديل حجر - ترافيرتين بيج - 600×300",
    description:
      "Elegant beige travertine stone alternative panels with natural tumbled finish. Perfect for creating sophisticated living spaces with timeless Mediterranean charm.",
    descriptionAr:
      "لوحات بديل ترافيرتين بيج أنيقة بنلمعة مطحونة طبيعية. مثالية لإنشاء مساحات معيشة أنيقة بسحر أطلسي خالد.",
    shortDescription:
      "Elegant beige travertine stone alternative with natural tumbled finish.",
    shortDescriptionAr:
      "بديل ترافيرتين بيج أنيق بلمعة مطحونة طبيعية.",
    price: 269,
    comparePrice: 329,
    discount: 18,
    categoryId: "cat-stone-alt",
    images: [
      { id: "img-015", url: "/assets/products/بديل حجر/img-015.png", alt: "Beige travertine stone alternative", altAr: "بديل ترافيرتين بيج", isPrimary: true },
      { id: "img-013", url: "/assets/products/بديل حجر/img-013.png", alt: "Beige travertine texture detail", altAr: "تفاصيل نسيج بديل ترافيرتين بيج", isPrimary: false },
    ],
    rating: 4.6,
    reviewCount: 29,
    stock: 12,
    sku: "STN-TRAV-BE-03",
    weight: 6.5,
    dimensions: { length: 600, width: 300, height: 18 },
    material: "Acrylic Resin + Mineral Fillers",
    materialAr: "راتنير أكريليكي + مواد معدنية",
    finish: "Tumbled Natural",
    finishAr: "مطحون طبيعي",
    warranty: "10 Years Commercial",
    warrantyAr: "ضمان 10 سنوات تجارية",
    featured: false,
    bestSeller: false,
    newArrival: true,
    tags: ["بديل حجر", "ترافيرتين", "بيج", "أطلسي", "طقس"],
    specifications: [
      { name: "Material", nameAr: "المادة", value: "Acrylic Resin Composite", valueAr: "تركيبة أكريليكية" },
      { name: "Thickness", nameAr: "السمك", value: "18 mm", valueAr: "18 ملم" },
      { name: "Surface Finish", nameAr: "لمعة السطح", value: "Tumbled", valueAr: "مطحون" },
      { name: "Water Resistance", nameAr: "مقاومة الماء", value: "Waterproof", valueAr: "مقاوم للماء" },
      { name: "Applications", nameAr: "التطبيقات", value: "Interior/Exterior", valueAr: "داخلي/خارجي" },
      { name: "Coverage", nameAr: "التغطية", value: "1 m² per 6 panels", valueAr: "1 م² لكل 6 لوحات" },
    ],
    createdAt: "2024-02-20T08:00:00Z",
    updatedAt: "2024-02-20T08:00:00Z",
  },
  {
    id: "prod-soft-001",
    slug: "soft-stone-limestone-cream-600x600",
    name: "Soft Stone - Cream Limestone 600x600",
    nameAr: "سوفت ستون - جير أبيض - 600×600",
    description:
      "Premium soft limestone panels in a soothing cream tone. These natural-looking panels bring warmth and texture to any interior wall, perfect for living rooms and bedrooms.",
    descriptionAr:
      "لوحات جير ناعم متميزة بلون أبيض ناعم. هذه اللوحات ذات المظهر الطبيعي تجلب الدفء والنص على أي جدار داخلي، مثالية للغرف المعيشة والنوم.",
    shortDescription:
      "Premium cream limestone soft stone panels for interior walls.",
    shortDescriptionAr:
      "لوحات سوفت ستون جير أبيض متميزة للجدران الداخلية.",
    price: 219,
    comparePrice: 269,
    discount: 19,
    categoryId: "cat-soft-stone",
    images: [
      { id: "img-016", url: "/assets/products/سوفت ستون/img-016.png", alt: "Cream limestone soft stone panels", altAr: "لوحات سوفت ستون جير أبيض", isPrimary: true },
      { id: "img-017", url: "/assets/products/سوفت ستون/img-017.png", alt: "Cream limestone soft stone texture", altAr: "نسيج سوفت ستون جير أبيض", isPrimary: false },
      { id: "img-018", url: "/assets/products/سوفت ستون/img-018.png", alt: "Cream limestone soft stone in living room", altAr: "أرضية سوفت ستون جير أبيض في غرفة معيشة", isPrimary: false },
      { id: "img-019", url: "/assets/products/سوفت ستون/img-019.png", alt: "Cream limestone soft stone wall close-up", altAr: "تفاصيل جدار سوفت ستون جير أبيض", isPrimary: false },
    ],
    rating: 4.7,
    reviewCount: 76,
    stock: 33,
    sku: "SST-LIME-CRM-01",
    weight: 7.5,
    dimensions: { length: 600, width: 600, height: 15 },
    material: "Soft Stone Composite",
    materialAr: "تركيبة سوفت ستون ناعمة",
    finish: "Natural Matt",
    finishAr: "طبيعي مات",
    warranty: "15 Years Residential",
    warrantyAr: "ضمان 15 سنة سكنية",
    featured: true,
    bestSeller: true,
    newArrival: false,
    tags: ["سوفت ستون", "جير", "أبيض", "جدران", "داخلي"],
    specifications: [
      { name: "Material", nameAr: "المادة", value: "Soft Stone Composite", valueAr: "تركيبة سوفت ستون" },
      { name: "Thickness", nameAr: "السمك", value: "15 mm", valueAr: "15 ملم" },
      { name: "Surface Finish", nameAr: "لمعة السطح", value: "Natural Matt", valueAr: "طبيعي مات" },
      { name: "Water Resistance", nameAr: "مقاومة الماء", value: "Waterproof", valueAr: "مقاوم للماء" },
      { name: "Applications", nameAr: "التطبيقات", value: "Interior Walls", valueAr: "جدران داخلية" },
      { name: "Coverage", nameAr: "التغطية", value: "1 m² per 3 panels", valueAr: "1 م² لكل 3 لوحات" },
    ],
    createdAt: "2024-01-08T08:00:00Z",
    updatedAt: "2024-01-08T08:00:00Z",
  },
  {
    id: "prod-soft-002",
    slug: "soft-stone-beechwood-600x300",
    name: "Soft Stone - Beechwood Brown 600x300",
    nameAr: "سوفت ستون - بيتشي بني - 600×300",
    description:
      "Warm beechwood brown soft stone panels with subtle grain patterns. Ideal for accent walls and feature areas that need natural texture and color depth.",
    descriptionAr:
      "لوحات سوفت ستون بني بيتشي دافئة بأنماط حبوب ناعمة. مثالية لجدران المؤثرات والمناطق المميزة التي تحتاج إلى نص ولون طبيعي.",
    shortDescription:
      "Warm beechwood brown soft stone panels with natural grain patterns.",
    shortDescriptionAr:
      "لوحات سوفت ستون بني بيتشي دافئة بنمط حبوب طبيعي.",
    price: 199,
    comparePrice: 249,
    discount: 20,
    categoryId: "cat-soft-stone",
    images: [
      { id: "img-020", url: "/assets/products/سوفت ستون/img-020.png", alt: "Beechwood brown soft stone panels", altAr: "لوحات سوفت ستون بيتشي بني", isPrimary: true },
      { id: "img-021", url: "/assets/products/سوفت ستون/img-021.png", alt: "Beechwood brown soft stone detail", altAr: "تفاصيل سوفت ستون بيتشي بني", isPrimary: false },
      { id: "img-022", url: "/assets/products/سوفت ستون/img-022.png", alt: "Beechwood brown soft stone in bathroom", altAr: "سوفت ستون بيتشي بني في الحمام", isPrimary: false },
    ],
    rating: 4.6,
    reviewCount: 55,
    stock: 27,
    sku: "SST-BEECH-BRN-02",
    weight: 5.8,
    dimensions: { length: 600, width: 300, height: 15 },
    material: "Soft Stone Composite",
    materialAr: "تركيبة سوفت ستون ناعمة",
    finish: "Textured Matt",
    finishAr: "نصف ناعم مات",
    warranty: "15 Years Residential",
    warrantyAr: "ضمان 15 سنة سكنية",
    featured: true,
    bestSeller: false,
    newArrival: false,
    tags: ["سوفت ستون", "بيتشي", "بني", "مؤثرات", "داخلي"],
    specifications: [
      { name: "Material", nameAr: "المادة", value: "Soft Stone Composite", valueAr: "تركيبة سوفت ستون" },
      { name: "Thickness", nameAr: "السمك", value: "15 mm", valueAr: "15 ملم" },
      { name: "Surface Finish", nameAr: "لمعة السطح", value: "Textured Matt", valueAr: "نصف ناعم مات" },
      { name: "Water Resistance", nameAr: "مقاومة الماء", value: "Waterproof", valueAr: "مقاوم للماء" },
      { name: "Applications", nameAr: "التطبيقات", value: "Interior Walls", valueAr: "جدران داخلية" },
      { name: "Coverage", nameAr: "التغطية", value: "1 m² per 6 panels", valueAr: "1 م² لكل 6 لوحات" },
    ],
    createdAt: "2024-01-18T08:00:00Z",
    updatedAt: "2024-01-18T08:00:00Z",
  },
  {
    id: "prod-soft-003",
    slug: "soft-stone-terracotta-600x600",
    name: "Soft Stone - Terracotta Red 600x600",
    nameAr: "سوفت ستون - طوبي أحمر - 600×600",
    description:
      "Vibrant terracotta red soft stone panels that bring warmth and Mediterranean flair to any space. Perfect for feature walls, fireplace surrounds, and decorative accents.",
    descriptionAr:
      "لوحات سوفت ستون طوبي أحمر نابض بالحياة التي تجلب الدفء والبريق الأطلسي إلى أي مساحة. مثالية لجدران المميزات والمحاطات بالنار واللمعان الزخرفي.",
    shortDescription:
      "Vibrant terracotta red soft stone panels with Mediterranean flair.",
    shortDescriptionAr:
      "لوحات سوفت ستون طوبي أحمر نابض بالحياة بأسلوب أطلسي.",
    price: 239,
    comparePrice: 289,
    discount: 17,
    categoryId: "cat-soft-stone",
    images: [
      { id: "img-023", url: "/assets/products/سوفت ستون/img-023.png", alt: "Terracotta red soft stone panels", altAr: "لوحات سوفت ستون طوبي أحمر", isPrimary: true },
      { id: "img-020", url: "/assets/products/سوفت ستون/img-020.png", alt: "Terracotta red soft stone texture", altAr: "نسيج سوفت ستون طوبي أحمر", isPrimary: false },
      { id: "img-022", url: "/assets/products/سوفت ستون/img-022.png", alt: "Terracotta red soft stone feature wall", altAr: "جدار مميز سوفت ستون طوبي أحمر", isPrimary: false },
    ],
    rating: 4.8,
    reviewCount: 48,
    stock: 19,
    sku: "SST-TERRA-RED-03",
    weight: 7.2,
    dimensions: { length: 600, width: 600, height: 15 },
    material: "Soft Stone Composite",
    materialAr: "تركيبة سوفت ستون ناعمة",
    finish: "Natural Matt Burnished",
    finishAr: "مات طبيعي ملمع",
    warranty: "15 Years Residential",
    warrantyAr: "ضمان 15 سنة سكنية",
    featured: false,
    bestSeller: true,
    newArrival: false,
    tags: ["سوفت ستون", "طوبي", "أحمر", "أطلسي", "مؤثرات"],
    specifications: [
      { name: "Material", nameAr: "المادة", value: "Soft Stone Composite", valueAr: "تركيبة سوفت ستون" },
      { name: "Thickness", nameAr: "السمك", value: "15 mm", valueAr: "15 ملم" },
      { name: "Surface Finish", nameAr: "لمعة السطح", value: "Natural Matt", valueAr: "طبيعي مات" },
      { name: "Water Resistance", nameAr: "مقاومة الماء", value: "Waterproof", valueAr: "مقاوم للماء" },
      { name: "Applications", nameAr: "التطبيقات", value: "Interior Walls", valueAr: "جدران داخلية" },
      { name: "Coverage", nameAr: "التغطية", value: "1 m² per 3 panels", valueAr: "1 م² لكل 3 لوحات" },
    ],
    createdAt: "2024-01-25T08:00:00Z",
    updatedAt: "2024-01-25T08:00:00Z",
  },
  {
    id: "prod-soft-004",
    slug: "soft-stone-limewash-beige-600x300",
    name: "Soft Stone - Limewash Beige 600x300",
    nameAr: "سوفت ستون - بيج ليموني - 600×300",
    description:
      "Subtle limewash beige soft stone panels with a weathered, organic appearance. Creates a calm, serene atmosphere perfect for modern minimalist interiors.",
    descriptionAr:
      "لوحات سوفت ستون بيج ليموني ناعمة بمظهر متهالك وعضوي. تخلق جواً هادئاً وسلمياً مثالياً للديكورات الحديثة الأنيقة.",
    shortDescription:
      "Subtle limewash beige soft stone panels with organic weathered appearance.",
    shortDescriptionAr:
      "لوحات سوفت ستون بيج ليموني ناعمة بمظهر عضوي متهالك.",
    price: 209,
    comparePrice: 259,
    discount: 19,
    categoryId: "cat-soft-stone",
    images: [
      { id: "img-016", url: "/assets/products/سوفت ستون/img-016.png", alt: "Limewash beige soft stone panels", altAr: "لوحات سوفت ستون بيج ليموني", isPrimary: true },
      { id: "img-017", url: "/assets/products/سوفت ستون/img-017.png", alt: "Limewash beige soft stone in bedroom", altAr: "سوفت ستون بيج ليموني في غرفة نوم", isPrimary: false },
    ],
    rating: 4.5,
    reviewCount: 33,
    stock: 24,
    sku: "SST-LIMEWASH-BE-04",
    weight: 5.6,
    dimensions: { length: 600, width: 300, height: 15 },
    material: "Soft Stone Composite",
    materialAr: "تركيبة سوفت ستون ناعمة",
    finish: "Natural Textured",
    finishAr: "نطاق طبيعي",
    warranty: "15 Years Residential",
    warrantyAr: "ضمان 15 سنة سكنية",
    featured: false,
    bestSeller: false,
    newArrival: true,
    tags: ["سوفت ستون", "بيج", "أبيض", "أنيق", "داخلي"],
    specifications: [
      { name: "Material", nameAr: "المادة", value: "Soft Stone Composite", valueAr: "تركيبة سوفت ستون" },
      { name: "Thickness", nameAr: "السمك", value: "15 mm", valueAr: "15 ملم" },
      { name: "Surface Finish", nameAr: "لمعة السطح", value: "Textured", valueAr: "نطاق" },
      { name: "Water Resistance", nameAr: "مقاومة الماء", value: "Waterproof", valueAr: "مقاوم للماء" },
      { name: "Applications", nameAr: "التطبيقات", value: "Interior Walls", valueAr: "جدران داخلية" },
      { name: "Coverage", nameAr: "التغطية", value: "1 m² per 6 panels", valueAr: "1 م² لكل 6 لوحات" },
    ],
    createdAt: "2024-03-15T08:00:00Z",
    updatedAt: "2024-03-15T08:00:00Z",
  },
];

export const featuredProducts = products.filter((p) => p.featured);
export const bestSellerProducts = products.filter((p) => p.bestSeller);
export const newArrivalProducts = products.filter((p) => p.newArrival);

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((p) => p.categoryId === categoryId);
};

export const getRelatedProducts = (productId: string, categoryId: string, limit: number = 4): Product[] => {
  return products
    .filter((p) => p.categoryId === categoryId && p.id !== productId)
    .slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  if (!query.trim()) return [];
  const searchTerm = query.toLowerCase().trim();
  return products.filter((p) => {
    return (
      p.name.toLowerCase().includes(searchTerm) ||
      p.nameAr.includes(searchTerm) ||
      p.shortDescription.toLowerCase().includes(searchTerm) ||
      p.shortDescriptionAr.includes(searchTerm) ||
      p.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      (p.comparePrice !== undefined && p.comparePrice.toString().includes(searchTerm))
    );
  });
};

export const reviews: Review[] = [
  {
    id: "rev-001",
    productId: "prod-spc-001",
    userId: "user-001",
    userName: "محمد أحمد",
    userNameAr: "محمد أحمد",
    rating: 5,
    title: "Excellent quality SPC flooring",
    titleAr: "جودة ممتازة لأرضية SPC",
    comment:
      "I installed the ash gray SPC flooring in my living room and it looks amazing. The installation was easy with the click-lock system and the surface is very durable even with my kids running around.",
    commentAr:
      "قمت بتركيب أرضية SPC الرمادية في غرفة معيشتي وهي تبدو رائعة. كان التركيب سهلاً باستخدام نظام القفل والنقر، والسطح متين جداً حتى مع أطفالي يركضون حولها.",
    createdAt: "2024-06-15T10:30:00Z",
  },
  {
    id: "rev-002",
    productId: "prod-spc-001",
    userId: "user-002",
    userName: "سمية خالد",
    userNameAr: "سمية خالد",
    rating: 4,
    title: "Great value for money",
    titleAr: "قيمة ممتازة مقابل المال",
    comment:
      "The price-to-quality ratio is excellent. The flooring looks like real wood but performs much better. Highly recommend for anyone looking for durable flooring.",
    commentAr:
      "نسبة السعر إلى الجودة ممتازة. الأرضية تشبه الخشب الحقيقي لكن أدائها أفضل بكثير. أنصح بها لأي أحد يبحث عن أرضية متينة.",
    createdAt: "2024-06-20T14:15:00Z",
  },
  {
    id: "rev-003",
    productId: "prod-stone-001",
    userId: "user-003",
    userName: "أحمد علي",
    userNameAr: "أحمد علي",
    rating: 5,
    title: "Transformative marble alternative",
    titleAr: "بديل مرمر تحويلي",
    comment:
      "I used these white marble panels for my kitchen backsplash and bathroom walls. They look incredibly realistic and are so easy to clean. My guests always compliment them.",
    commentAr:
      "استخدمت هذه اللوحات المرمر الأبيض لخلفية مطبخي وجدران حمامي. هم يبدون واقعياً للغاية وسهلة التنظيف. ضيوفي يمدحونها دائماً.",
    createdAt: "2024-05-10T09:45:00Z",
  },
  {
    id: "rev-004",
    productId: "prod-soft-001",
    userId: "user-004",
    userName: "فاطمة محمود",
    userNameAr: "فاطمة محمود",
    rating: 5,
    title: " Beautiful soft stone panels",
    titleAr: "لوحات سوفت ستون جميلة",
    comment:
      "The cream limestone soft stone panels transformed my living room walls. The texture is exactly what I wanted and the color blends beautifully with my furniture.",
    commentAr:
      "لوحات سوفت ستون جير أبيض حولت جدران غرفة معيشتي. النص هو بالضبط ما أردت، واللون يتناسب بشكل رائع مع أثاثي.",
    createdAt: "2024-07-01T11:20:00Z",
  },
  {
    id: "rev-005",
    productId: "prod-stone-002",
    userId: "user-005",
    userName: "يوسف ناصر",
    userNameAr: "يوسف ناصر",
    rating: 4,
    title: "Solid product with great finish",
    titleAr: "منتج صلب بلمعة رائعة",
    comment:
      "The dark granite stone alternative panels have a premium feel. The installation was straightforward and the result looks fantastic. Worth every shekel.",
    commentAr:
      "لوحات جرانيت داكن بديل الحجر لديها إحساس متميز. كان التركيب مباشرة وسهل، والنتيجة تبدو رائعة. تستحق كل شيكل.",
    createdAt: "2024-06-28T16:00:00Z",
  },
];

export const getProductReviews = (productId: string): Review[] => {
  return reviews.filter((r) => r.productId === productId);
};

export const getProductRating = (productId: string): { rating: number; reviewCount: number } => {
  const product = getProductById(productId);
  if (!product) return { rating: 0, reviewCount: 0 };
  return { rating: product.rating, reviewCount: product.reviewCount };
};
