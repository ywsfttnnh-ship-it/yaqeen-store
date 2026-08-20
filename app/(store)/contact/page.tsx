"use client";

import * as React from "react";
import { MapPin, Phone, Clock, Send, Facebook, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CONTACT = {
  phoneDisplay: "+972 59-742-6988",
  phoneTel: "+972597426988",
  facebook: "https://www.facebook.com/profile.php?id=61590887216809",
  instagram: "https://www.instagram.com/yaqeen_1_store/",
};

export default function ContactPage() {
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">تواصل معنا</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          فريقنا جاهز للإجابة على استفساراتك وتقديم الاستشارة المجانية. لا تتردد في التواصل معنا.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[
            { icon: MapPin, title: "العنوان", text: "الخليل، فلسطين" },
            { icon: Phone, title: "الهاتف", text: CONTACT.phoneDisplay, tel: CONTACT.phoneTel },
            { icon: Clock, title: "ساعات العمل", text: "السبت - الخميس: 9 صباحاً - 8 مساءً" },
            { icon: MapPin, title: "التوصيل", text: "التوصيل لجميع مناطق الضفة الغربية" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  {item.tel ? (
                    <a
                      href={`tel:${item.tel}`}
                      className="mt-1 block text-sm font-medium text-primary-700 hover:text-primary-600"
                      dir="ltr"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground" dir="auto">{item.text}</p>
                  )}
                </div>
              </div>
            );
          })}

          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
              <span className="text-sm font-bold">تابع</span>
            </div>
            <div>
              <h3 className="font-bold">تابعنا على</h3>
              <div className="mt-2 flex items-center gap-3">
                <a
                  href={CONTACT.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="فيسبوك"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="انستغرام"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f09433]/20 via-[#dc2743]/20 to-[#bc1888]/20 text-[#dc2743] hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8">
          {sent ? (
            <div className="py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700 text-3xl">
                ✓
              </div>
              <h2 className="mt-4 text-xl font-bold">تم إرسال رسالتك</h2>
              <p className="mt-2 text-sm text-muted-foreground">سيتواصل معك فريقنا في أقرب وقت ممكن.</p>
              <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>
                إرسال رسالة أخرى
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="الاسم الكامل *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="اسمك" />
                <Input label="رقم الهاتف" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+970..." />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="البريد الإلكتروني *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="example@email.com" />
                <Input label="الموضوع" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="موضوع الرسالة" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">رسالتك *</label>
                <textarea
                  rows={5}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="اكتب رسالتك هنا..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Send className="h-4 w-4" />
                إرسال الرسالة
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}