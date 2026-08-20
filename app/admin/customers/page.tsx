"use client";

import * as React from "react";
import { Search, UserCircle2 } from "lucide-react";
import { mockUser } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function AdminCustomersPage() {
  const [query, setQuery] = React.useState("");

  const customers = [
    mockUser,
    {
      id: "user-002",
      name: "سارة خالد",
      nameAr: "سارة خالد",
      email: "sara@example.com",
      phone: "+970 59 987 6543",
      role: "customer" as const,
      addresses: [],
      wishlist: [],
      createdAt: "2024-03-12T10:00:00Z",
      updatedAt: "2024-06-20T10:00:00Z",
    },
    {
      id: "user-003",
      name: "أحمد ياسين",
      nameAr: "أحمد ياسين",
      email: "ahmed@example.com",
      phone: "+970 56 555 1122",
      role: "customer" as const,
      addresses: [],
      wishlist: [],
      createdAt: "2024-05-01T10:00:00Z",
      updatedAt: "2024-06-18T10:00:00Z",
    },
  ];

  const filtered = customers.filter(
    (c) => c.nameAr.includes(query) || c.email.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">العملاء</h1>
        <p className="mt-1 text-sm text-muted-foreground">{customers.length} عميل مسجل</p>
      </div>

      <div className="max-w-sm">
        <Input placeholder="ابحث عن عميل..." value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                <UserCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">{c.nameAr}</p>
                <p className="text-xs text-muted-foreground" dir="ltr">{c.email}</p>
              </div>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">الهاتف</dt>
                <dd dir="ltr">{c.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">تاريخ التسجيل</dt>
                <dd>{formatDate(c.createdAt)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">الطلبات</dt>
                <dd className="font-medium">2</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}