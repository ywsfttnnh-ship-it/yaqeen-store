"use client";

import * as React from "react";
import { Bot, Save, RotateCcw, Sparkles, KeyRound } from "lucide-react";
import { useAIConfig } from "@/lib/context/ai-config-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AIProvider } from "@/types";

const providers: { value: AIProvider; label: string; models: string[] }[] = [
  { value: "mock", label: "تجريبي (بدون API)", models: ["mock-assistant"] },
  { value: "openai", label: "OpenAI", models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"] },
  { value: "anthropic", label: "Anthropic", models: ["claude-3-5-sonnet", "claude-3-haiku"] },
  { value: "google", label: "Google Gemini", models: ["gemini-1.5-pro", "gemini-1.5-flash"] },
];

export default function AIConfigPage() {
  const { config, updateConfig, isEnabled } = useAIConfig();
  const [saved, setSaved] = React.useState(false);
  const providerInfo = providers.find((p) => p.value === config.provider) || providers[0];

  const handleSave = () => {
    updateConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">إعدادات المساعد الذكي</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          قم بإعداد مزود الذكاء الاصطناعي المستخدم في مساعد التسوق.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">تفعيل المساعد الذكي</p>
              <p className="text-sm text-muted-foreground">
                {isEnabled() ? "المساعد يعمل حالياً" : "المساعد معطل حالياً"}
              </p>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={config.enabled}
            onClick={() => updateConfig({ ...config, enabled: !config.enabled })}
            className={
              config.enabled
                ? "relative h-7 w-12 rounded-full bg-primary-600 transition-colors"
                : "relative h-7 w-12 rounded-full bg-neutral-200 transition-colors"
            }
          >
            <span
              className={
                config.enabled
                  ? "absolute top-0.5 start-6 h-6 w-6 rounded-full bg-card shadow transition-all"
                  : "absolute top-0.5 start-0.5 h-6 w-6 rounded-full bg-card shadow transition-all"
              }
            />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">مزود الخدمة</label>
          <select
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={config.provider}
            onChange={(e) => {
              const p = providers.find((x) => x.value === e.target.value as AIProvider);
              updateConfig({ ...config, provider: e.target.value as AIProvider, model: p?.models[0] || "" });
            }}
          >
            {providers.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">النموذج</label>
          <select
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={config.model}
            onChange={(e) => updateConfig({ ...config, model: e.target.value })}
          >
            {providerInfo.models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="مفتاح API"
          type="password"
          placeholder={config.provider === "mock" ? "غير مطلوب في الوضع التجريبي" : "sk-..."}
          value={config.apiKey}
          onChange={(e) => updateConfig({ ...config, apiKey: e.target.value })}
          icon={<KeyRound className="h-4 w-4" />}
          disabled={config.provider === "mock"}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">الحد الأقصى للرموز</label>
            <input
              type="number"
              min={256}
              max={4096}
              value={config.maxTokens}
              onChange={(e) => updateConfig({ ...config, maxTokens: Number(e.target.value) })}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">درجة الإبداع (0-1)</label>
            <input
              type="number"
              min={0}
              max={1}
              step={0.1}
              value={config.temperature}
              onChange={(e) => updateConfig({ ...config, temperature: Number(e.target.value) })}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 shrink-0 text-primary-700" />
          <p className="text-sm leading-6 text-primary-900">
            ملاحظة: في بيئة التطوير يتم حفظ الإعدادات محلياً في المتصفح. في بيئة الإنتاج،
            يُنصح بوضع هذه القيم في متغيرات البيئة (AI_PROVIDER, AI_MODEL, AI_API_KEY) في ملف .env.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4" />
          حفظ الإعدادات
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RotateCcw className="h-4 w-4" />
          إعادة تعيين
        </Button>
        {saved && <span className="text-sm text-green-600">تم الحفظ بنجاح ✓</span>}
      </div>
    </div>
  );
}