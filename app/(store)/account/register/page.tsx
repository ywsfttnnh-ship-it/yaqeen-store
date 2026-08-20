"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User as UserIcon, Phone } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    if (form.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    try {
      await register(form);
      router.push("/account/profile");
    } catch {
      setError("حدث خطأ أثناء إنشاء الحساب");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h1 className="text-2xl font-bold text-foreground text-center">إنشاء حساب جديد</h1>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            انضم إلينا واستمتع بتجربة تسوق أسرع ومتابعة أسهل لطلباتك
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input
              label="الاسم الكامل *"
              placeholder="محمد أحمد"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              icon={<UserIcon className="h-4 w-4" />}
            />
            <Input
              label="البريد الإلكتروني *"
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              icon={<Mail className="h-4 w-4" />}
            />
            <Input
              label="رقم الهاتف"
              type="tel"
              placeholder="+970 59 123 4567"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              icon={<Phone className="h-4 w-4" />}
            />
            <Input
              label="كلمة المرور *"
              type="password"
              placeholder="6 أحرف على الأقل"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              icon={<Lock className="h-4 w-4" />}
            />
            {error && <p className="text-sm text-accent-600">{error}</p>}
            <Button type="submit" className="w-full" isLoading={isLoading}>
              إنشاء الحساب
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">لديك حساب بالفعل؟ </span>
            <Link href="/account/login" className="text-primary-600 hover:text-primary-700">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}