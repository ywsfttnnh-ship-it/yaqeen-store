"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart, Check, ChevronRight, ChevronLeft, Truck, CreditCard,
  Banknote, Landmark, ShieldCheck, MapPin, User, CheckCircle2,
} from "lucide-react";
import { useCart } from "@/lib/context/cart-context";
import { useAuth } from "@/lib/context/auth-context";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import { config } from "@/lib/config";

type Step = "shipping" | "payment" | "review" | "confirmation";

const paymentMethods = [
  { id: "cash_on_delivery" as const, labelAr: "الدفع عند الاستلام", icon: Banknote, descAr: "ادفع نقداً عند استلام طلبك" },
  { id: "bank_transfer" as const, labelAr: "تحويل بنكي", icon: Landmark, descAr: "تحويل مباشر إلى حسابنا البنكي" },
  { id: "credit_card" as const, labelAr: "بطاقة ائتمانية", icon: CreditCard, descAr: "Visa / Mastercard / PayPal" },
];

const shippingMethods = [
  { id: "standard" as const, labelAr: "توصيل قياسي", descAr: `${config.delivery.estimatedDays.standard} — ${formatCurrency(config.delivery.standardFee)}`, free: false },
  { id: "express" as const, labelAr: "توصيل سريع", descAr: `${config.delivery.estimatedDays.express} — ${formatCurrency(config.delivery.expressFee)}`, free: false },
];

export default function CheckoutPage() {
  const { cart, clearCart, subtotal, shipping, tax } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [step, setStep] = React.useState<Step>("shipping");
  const [orderNumber] = React.useState(() => `ORD-YQ-${Date.now().toString().slice(-6)}`);

  const [shippingMethod, setShippingMethod] = React.useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = React.useState<"cash_on_delivery" | "bank_transfer" | "credit_card">("cash_on_delivery");

  const [form, setForm] = React.useState({
    fullName: user?.nameAr || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: "",
    state: "",
    street: "",
    building: "",
    postalCode: "",
  });
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const effectiveShipping = shippingMethod === "express" ? config.delivery.expressFee : shipping;
  const orderTotal = subtotal + tax + effectiveShipping;

  if (cart.items.length === 0 && step !== "confirmation") {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16" dir="rtl">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 text-muted-foreground">
            <ShoppingCart className="h-10 w-10" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-foreground">سلتك فارغة</h1>
          <p className="mt-2 text-muted-foreground">أضف منتجات إلى سلتك قبل إتمام عملية الشراء.</p>
          <Link href="/store" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
            تصفح المتجر
          </Link>
        </div>
      </div>
    );
  }

  const validateShipping = () => {
    const errors: Record<string, string> = {};
    if (!form.fullName.trim()) errors.fullName = "الاسم الكامل مطلوب";
    if (!form.phone.trim()) errors.phone = "رقم الهاتف مطلوب";
    if (!form.city.trim()) errors.city = "المدينة مطلوبة";
    if (!form.street.trim()) errors.street = "العنوان مطلوب";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goToPayment = () => {
    if (validateShipping()) setStep("payment");
  };

  const handleConfirm = () => {
    const placedAt = new Date().toISOString();
    localStorage.setItem(
      `yaqeen-order-${orderNumber}`,
      JSON.stringify({
        orderNumber,
        items: cart.items.map((i) => ({
          productId: i.productId,
          nameAr: i.product.nameAr,
          quantity: i.quantity,
          price: i.price,
          image: i.product.images[0]?.url,
        })),
        subtotal,
        tax,
        shipping: effectiveShipping,
        total: orderTotal,
        shippingMethod,
        paymentMethod,
        status: "new",
        createdAt: placedAt,
        customer: form,
      }),
    );
    clearCart();
    setStep("confirmation");
  };

  const steps: { id: Step; labelAr: string }[] = [
    { id: "shipping", labelAr: "الشحن" },
    { id: "payment", labelAr: "الدفع" },
    { id: "review", labelAr: "المراجعة" },
  ];

  const stepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <h1 className="text-3xl font-bold text-foreground mb-8">إتمام الطلب</h1>

      {/* Stepper */}
      <ol className="mb-10 flex items-center gap-2 sm:gap-4">
        {steps.map((s, idx) => {
          const done = idx < stepIndex;
          const current = idx === stepIndex;
          return (
            <li key={s.id} className="flex items-center gap-2 sm:gap-4 flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all",
                    done && "bg-green-600 text-white",
                    current && "bg-primary-600 text-white",
                    !done && !current && "bg-neutral-200 text-neutral-500",
                  )}
                >
                  {done ? <Check className="h-4 w-4" /> : idx + 1}
                </span>
                <span className={cn("hidden sm:block text-sm font-medium", current ? "text-foreground" : "text-muted-foreground")}>
                  {s.labelAr}
                </span>
              </div>
              {idx < steps.length - 1 && <div className={cn("h-0.5 flex-1 rounded", done ? "bg-green-600" : "bg-neutral-200")} />}
            </li>
          );
        })}
      </ol>

      {step === "shipping" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <MapPin className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-bold">بيانات التوصيل</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="الاسم الكامل *" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} error={formErrors.fullName} placeholder="محمد أحمد" />
                <Input label="رقم الهاتف *" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={formErrors.phone} placeholder="+970 59 123 4567" />
                <Input label="البريد الإلكتروني" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="example@email.com" />
                <Input label="المدينة *" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} error={formErrors.city} placeholder="رام الله" />
                <Input label="الشارع / الحي *" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} error={formErrors.street} placeholder="شارع النور، حي السلام" />
                <Input label="رقم المبنى / الشقة" value={form.building} onChange={(e) => setForm({ ...form, building: e.target.value })} placeholder="مبنى 3، شقة 4" />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <Truck className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-bold">طريقة الشحن</h2>
              </div>
              <div className="space-y-3">
                {shippingMethods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setShippingMethod(m.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border-2 p-4 text-start transition-all",
                      shippingMethod === m.id ? "border-primary-600 bg-primary-50" : "border-border hover:border-primary-300",
                    )}
                  >
                    <div>
                      <p className="font-medium">{m.labelAr}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{m.descAr}</p>
                    </div>
                    <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border-2", shippingMethod === m.id ? "border-primary-600" : "border-neutral-300")}>
                      {shippingMethod === m.id && <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700">
                <ChevronRight className="h-4 w-4" />
                العودة إلى السلة
              </Link>
              <Button onClick={goToPayment}>
                متابعة إلى الدفع
                <ChevronLeft className="h-4 w-4 me-1" />
              </Button>
            </div>
          </div>

          <OrderSummary items={cart.items} subtotal={subtotal} tax={tax} shipping={effectiveShipping} total={orderTotal} />
        </div>
      )}

      {step === "payment" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <CreditCard className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-bold">طريقة الدفع</h2>
              </div>
              <div className="space-y-3">
                {paymentMethods.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-xl border-2 p-4 text-start transition-all",
                        paymentMethod === m.id ? "border-primary-600 bg-primary-50" : "border-border hover:border-primary-300",
                      )}
                    >
                      <Icon className={cn("h-6 w-6", paymentMethod === m.id ? "text-primary-600" : "text-muted-foreground")} />
                      <div className="flex-1">
                        <p className="font-medium">{m.labelAr}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{m.descAr}</p>
                      </div>
                      <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border-2", paymentMethod === m.id ? "border-primary-600" : "border-neutral-300")}>
                        {paymentMethod === m.id && <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />}
                      </span>
                    </button>
                  );
                })}
              </div>
              {paymentMethod === "credit_card" && (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-neutral-50 border border-border p-5">
                  <Input label="رقم البطاقة" placeholder="4242 4242 4242 4242" />
                  <Input label="اسم حامل البطاقة" placeholder="MOHAMMAD AHMAD" />
                  <Input label="تاريخ الانتهاء" placeholder="MM/YY" />
                  <Input label="CVV" type="password" placeholder="123" />
                  <p className="sm:col-span-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    بيانات بطاقتك محمية ومشفرة بالكامل — نقبل Visa و Mastercard
                  </p>
                </div>
              )}
              {paymentMethod === "bank_transfer" && (
                <div className="mt-5 rounded-xl bg-neutral-50 border border-border p-5 text-sm">
                  <p className="font-medium mb-2">تفاصيل التحويل البنكي:</p>
                  <p className="text-muted-foreground">
                    البنك الوطني — اسم المستفيد: يقين ستور<br />
                    رقم الحساب: IL15 0127 8000 0000 0000 000<br />
                    الرمز السريع: BANKILJXXX
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    سيتم تأكيد الطلب بعد استلام التحويل. أرسل إشعار التحويل إلى info@yaqeenstore.com
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep("shipping")}>
                <ChevronRight className="h-4 w-4 me-1" />
                رجوع
              </Button>
              <Button onClick={() => setStep("review")}>
                مراجعة الطلب
                <ChevronLeft className="h-4 w-4 me-1" />
              </Button>
            </div>
          </div>

          <OrderSummary items={cart.items} subtotal={subtotal} tax={tax} shipping={effectiveShipping} total={orderTotal} />
        </div>
      )}

      {step === "review" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold mb-4">مراجعة الطلب</h2>
              <ul className="divide-y divide-border">
                {cart.items.map((item) => {
                  const image = item.product.images.find((i) => i.isPrimary) || item.product.images[0];
                  return (
                    <li key={item.id} className="flex items-center gap-4 py-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-neutral-100">
                        <Image src={image?.url || "/placeholder.png"} alt={item.product.nameAr} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium line-clamp-1">{item.product.nameAr}</p>
                        <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
                      </div>
                      <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold mb-4">معلومات التوصيل</h2>
              <div className="flex items-start gap-3 text-sm">
                <User className="h-5 w-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="font-medium">{form.fullName}</p>
                  <p className="text-muted-foreground">{form.phone} {form.email && `| ${form.email}`}</p>
                  <p className="text-muted-foreground">{form.street}، {form.city}، {form.state || "فلسطين"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold mb-4">ملخص الدفع</h2>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">طريقة الدفع</span>
                <span className="font-medium">{paymentMethods.find((m) => m.id === paymentMethod)?.labelAr}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">طريقة الشحن</span>
                <span className="font-medium">{shippingMethods.find((m) => m.id === shippingMethod)?.labelAr}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("payment")}>
                <ChevronRight className="h-4 w-4 me-1" />
                رجوع
              </Button>
              <Button size="lg" onClick={handleConfirm}>
                تأكيد الطلب ({formatCurrency(orderTotal)})
              </Button>
            </div>
          </div>

          <OrderSummary items={cart.items} subtotal={subtotal} tax={tax} shipping={effectiveShipping} total={orderTotal} />
        </div>
      )}

      {step === "confirmation" && (
        <div className="mx-auto max-w-2xl text-center py-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-foreground">تم استلام طلبك بنجاح!</h2>
          <p className="mt-3 text-muted-foreground">
            شكراً لثقتك بـ {config.app.name.ar}. سنتواصل معك قريباً لتأكيد تفاصيل التوصيل.
          </p>
          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">رقم الطلب</p>
            <p className="mt-1 text-2xl font-bold text-primary-700">{orderNumber}</p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/store">
              <Button>مواصلة التسوق</Button>
            </Link>
            <Link href={isAuthenticated ? "/account/orders" : "/account/login"}>
              <Button variant="outline">تتبع طلبك</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderSummary({ items, subtotal, tax, shipping, total }: {
  items: { product: { images: { url: string }[]; nameAr: string }; quantity: number; price: number }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">ملخص الطلب</h2>
        <ul className="mb-4 max-h-56 space-y-3 overflow-y-auto pe-1">
          {items.map((item) => (
            <li key={item.product.nameAr} className="flex items-center gap-3 text-sm">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-neutral-100">
                <Image src={item.product.images[0]?.url || "/placeholder.png"} alt={item.product.nameAr} fill className="object-cover" sizes="40px" />
              </div>
              <span className="flex-1 min-w-0 line-clamp-1 text-muted-foreground">{item.product.nameAr}</span>
              <span className="shrink-0 text-xs text-muted-foreground">×{item.quantity}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">المجموع الفرعي</dt>
            <dd className="font-medium">{formatCurrency(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">الشحن</dt>
            <dd className="font-medium">{shipping === 0 ? <span className="text-green-600">مجاني</span> : formatCurrency(shipping)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">الضريبة (17%)</dt>
            <dd className="font-medium">{formatCurrency(tax)}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3 text-base">
            <dt className="font-bold">الإجمالي</dt>
            <dd className="font-bold text-primary-700">{formatCurrency(total)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}