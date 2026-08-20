"use client";

import * as React from "react";
import { Save, Store, Landmark, Truck, BadgePercent } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  const [settings, setSettings] = React.useState({
    storeName: "يقين ستور",
    email: "info@yaqeenstore.ps",
    phone: "+970 59 123 4567",
    address: "رام الله - شارع الإرسال، عمارة النور",
    currency: "ILS",
    vatRate: "17",
    freeShippingThreshold: "500",
    standardShippingFee: "49",
    expressShippingFee: "99",
  });
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">إعدادات المتجر</h1>
        <p className="mt-1 text-sm text-muted-foreground">إدارة الإعدادات العامة للمتجر.</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
            <Store className="h-5 w-5" />
          </div>
          <h2 className="font-bold">معلومات المتجر</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="اسم المتجر" value={settings.storeName} onChange={(e) => setSettings({ ...settings, storeName: e.target.value })} />
          <Input label="البريد الإلكتروني" type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
          <Input label="الهاتف" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
          <Input label="العنوان" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
            <Landmark className="h-5 w-5" />
          </div>
          <h2 className="font-bold">المالية والضرائب</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="العملة" value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value })} />
          <Input label="نسبة الضريبة (%)" type="number" value={settings.vatRate} onChange={(e) => setSettings({ ...settings, vatRate: e.target.value })} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
            <Truck className="h-5 w-5" />
          </div>
          <h2 className="font-bold">الشحن</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="عتبة الشحن المجاني (₪)" type="number" value={settings.freeShippingThreshold} onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })} />
          <Input label="رسوم الشحن القياسي" type="number" value={settings.standardShippingFee} onChange={(e) => setSettings({ ...settings, standardShippingFee: e.target.value })} />
          <Input label="رسوم الشحن السريع" type="number" value={settings.expressShippingFee} onChange={(e) => setSettings({ ...settings, expressShippingFee: e.target.value })} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
            <BadgePercent className="h-5 w-5" />
          </div>
          <h2 className="font-bold">الخصومات</h2>
        </div>
        <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
          أضف أكواد الخصم من صفحة المنتجات أو عبر نظام إدارة الخصومات.
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4" />
          حفظ الإعدادات
        </Button>
        {saved && <span className="text-sm text-green-600">تم الحفظ بنجاح ✓</span>}
      </div>
    </div>
  );
}