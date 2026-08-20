"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Bot,
  Settings,
  Store,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/orders", label: "الطلبات", icon: ShoppingCart },
  { href: "/admin/customers", label: "العملاء", icon: Users },
  { href: "/admin/analytics", label: "التحليلات", icon: BarChart3 },
  { href: "/admin/ai-config", label: "إعدادات المساعد الذكي", icon: Bot },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  React.useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/account/login");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        جاري التحميل...
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        غير مصرح لك بالوصول إلى لوحة التحكم
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50" dir="rtl">
      <aside className="fixed inset-y-0 right-0 z-40 w-64 border-e border-border bg-card">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-700 text-lg font-bold text-white">
            ي
          </span>
          <div>
            <p className="text-sm font-bold text-foreground">يقين ستور</p>
            <p className="text-xs text-muted-foreground">لوحة التحكم</p>
          </div>
        </div>

        <nav className="mt-4 space-y-1 px-3" aria-label="قائمة لوحة التحكم">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-primary-50 text-primary-700"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-border p-3">
          <Link
            href="/store"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
          >
            <Store className="h-5 w-5" />
            العودة للمتجر
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-accent-600 hover:bg-accent-50 transition-all"
          >
            <LogOut className="h-5 w-5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="mr-64 flex-1 p-8">{children}</main>
    </div>
  );
}