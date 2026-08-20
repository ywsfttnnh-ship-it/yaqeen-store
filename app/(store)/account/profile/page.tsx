"use client";

import * as React from "react";
import { Mail, Phone, User as UserIcon, Save } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user } = useAuth();
  const [form, setForm] = React.useState({
    name: user?.nameAr || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setForm({ name: user.nameAr, email: user.email, phone: user.phone || "" });
    }
  }, [user]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold mb-5">الملف الشخصي</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="الاسم الكامل" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} icon={<UserIcon className="h-4 w-4" />} />
          <Input label="البريد الإلكتروني" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} icon={<Mail className="h-4 w-4" />} />
          <Input label="رقم الهاتف" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} icon={<Phone className="h-4 w-4" />} />
        </div>
        <div className="mt-6 flex items-center gap-4">
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 me-1" />
            حفظ التغييرات
          </Button>
          {saved && <span className="text-sm text-green-600">تم الحفظ بنجاح ✓</span>}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold mb-5">إعدادات الحساب</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="تغيير كلمة المرور" type="password" placeholder="كلمة المرور الجديدة" />
          <Input label="تأكيد كلمة المرور" type="password" placeholder="تأكيد كلمة المرور" />
        </div>
        <div className="mt-6">
          <Button variant="outline">تحديث كلمة المرور</Button>
        </div>
      </div>
    </div>
  );
}