"use client";

import * as React from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
            { icon: MapPin, title: "العنوان", text: "رام الله - شارع الإرسال، عمارة النور" },
            { icon: Phone, title: "الهاتف", text: "+970 59 123 4567" },
            { icon: Mail, title: "البريد الإلكتروني", text: "info@yaqeenstore.ps" },
            { icon: Clock, title: "ساعات العمل", text: "السبت - الخميس: 9 صباحاً - 8 مساءً" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground" dir="auto">{item.text}</p>
                </div>
              </div>
            );
          })}
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