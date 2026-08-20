"use client";

import * as React from "react";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Address } from "@/types";

export default function AddressesPage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = React.useState<Address[]>(user?.addresses || []);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [form, setForm] = React.useState({
    fullName: "", phone: "", street: "", building: "", city: "", state: "", postalCode: "",
  });

  React.useEffect(() => {
    if (user) setAddresses(user.addresses || []);
  }, [user]);

  const openNew = () => {
    setEditingIndex(null);
    setForm({ fullName: "", phone: "", street: "", building: "", city: "", state: "", postalCode: "" });
    setIsModalOpen(true);
  };

  const openEdit = (idx: number) => {
    setEditingIndex(idx);
    const a = addresses[idx];
    setForm({ fullName: a.fullName, phone: a.phone, street: a.street, building: a.building || "", city: a.city, state: a.state, postalCode: a.postalCode });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const address: Address = {
      id: editingIndex !== null ? addresses[editingIndex].id : `addr-${Date.now()}`,
      fullName: form.fullName,
      phone: form.phone,
      street: form.street,
      streetAr: form.street,
      building: form.building,
      city: form.city,
      state: form.state,
      postalCode: form.postalCode,
      country: "فلسطين",
    };
    if (editingIndex !== null) {
      setAddresses((prev) => prev.map((a, i) => (i === editingIndex ? address : a)));
    } else {
      setAddresses((prev) => [...prev, address]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (idx: number) => {
    setAddresses((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">عناويني</h2>
        <Button onClick={openNew} size="sm">
          <Plus className="h-4 w-4 me-1" />
          إضافة عنوان
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-muted-foreground">
            <MapPin className="h-8 w-8" />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">لا توجد عناوين محفوظة. أضف عنواناً لتسريع عملية الشراء.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr, idx) => (
            <div key={addr.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(idx)} className="p-2 text-muted-foreground hover:text-primary-600" aria-label="تعديل">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(idx)} className="p-2 text-muted-foreground hover:text-accent-600" aria-label="حذف">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 font-medium">{addr.fullName}</p>
              <p className="mt-1 text-sm text-muted-foreground">{addr.street}</p>
              <p className="text-sm text-muted-foreground">{addr.city}، {addr.state}</p>
              <p className="text-sm text-muted-foreground">{addr.phone}</p>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        titleAr={editingIndex !== null ? "تعديل العنوان" : "إضافة عنوان جديد"}
        size="md"
        footer={
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
            <Button className="flex-1" onClick={handleSave}>حفظ العنوان</Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="الاسم الكامل *" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          <Input label="رقم الهاتف *" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input label="الشارع / الحي *" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
          <Input label="رقم المبنى / الشقة" value={form.building} onChange={(e) => setForm({ ...form, building: e.target.value })} />
          <Input label="المدينة *" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <Input label="المنطقة" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
          <Input label="الرمز البريدي" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
}