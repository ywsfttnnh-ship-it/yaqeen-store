"use client";

import * as React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div dir="rtl" className="container mx-auto px-4 py-24 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-accent-50 text-accent-600">
        <AlertTriangle className="h-10 w-10" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-foreground">حدث خطأ غير متوقع</h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        نعتذر عن الإزعاج، حدث خطأ أثناء تحميل الصفحة. حاول مرة أخرى.
      </p>
      <div className="mt-8">
        <Button size="lg" onClick={reset}>
          <RotateCcw className="h-5 w-5" />
          إعادة المحاولة
        </Button>
      </div>
    </div>
  );
}