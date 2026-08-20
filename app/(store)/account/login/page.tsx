"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    try {
      await login(email, password);
      router.push("/account/profile");
    } catch {
      setError("بيانات الدخول غير صحيحة");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h1 className="text-2xl font-bold text-foreground text-center">تسجيل الدخول</h1>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            أدخل بياناتك للوصول إلى حسابك ومتابعة طلباتك
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
            />
            <Input
              label="كلمة المرور"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
            />
            {error && <p className="text-sm text-accent-600">{error}</p>}
            <Button type="submit" className="w-full" isLoading={isLoading}>
              تسجيل الدخول
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <Link href="/account/register" className="text-primary-600 hover:text-primary-700">
              إنشاء حساب جديد
            </Link>
            <button className="text-muted-foreground hover:text-foreground">نسيت كلمة المرور؟</button>
          </div>
        </div>
      </div>
    </div>
  );
}