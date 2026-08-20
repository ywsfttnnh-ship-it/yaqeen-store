"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Package, MapPin, LogOut, LayoutDashboard, ChevronRight } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { cn } from "@/lib/utils/cn";

const accountLinks = [
  { href: "/account/profile", labelAr: "الملف الشخصي", icon: User },
  { href: "/account/orders", labelAr: "طلباتي", icon: Package },
  { href: "/account/addresses", labelAr: "عناويني", icon: MapPin },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const isAuthPage = pathname === "/account/login" || pathname === "/account/register";

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && !isAuthPage) {
      router.push("/account/login");
    }
  }, [isLoading, isAuthenticated, isAuthPage, router]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-muted-foreground">
        جاري التحميل...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-muted-foreground">
        يرجى تسجيل الدخول للوصول إلى حسابك
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">حسابي</h1>
        <p className="mt-2 text-muted-foreground">مرحباً، {user?.nameAr}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <nav className="rounded-2xl border border-border bg-card p-4" aria-label="قائمة الحساب">
            <ul className="space-y-1">
              {accountLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href || (link.href !== "/account/profile" && pathname.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all",
                        active ? "bg-primary-50 text-primary-700" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        {link.labelAr}
                      </span>
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </Link>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={() => { logout(); router.push("/account/login"); }}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-accent-600 hover:bg-accent-50 transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  تسجيل الخروج
                </button>
              </li>
            </ul>
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="mt-2 flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
              >
                <LayoutDashboard className="h-5 w-5" />
                لوحة التحكم
              </Link>
            )}
          </nav>
        </aside>

        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  );
}