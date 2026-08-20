import Link from "next/link";
import { SearchX, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center" dir="rtl">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-100 text-primary-700">
        <SearchX className="h-10 w-10" />
      </div>
      <p className="mt-6 text-6xl font-black text-primary-700">404</p>
      <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-foreground">الصفحة غير موجودة</h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يمكنك العودة إلى الصفحة الرئيسية أو تصفح المتجر.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="h-5 w-5" />
            الصفحة الرئيسية
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/store">تصفح المتجر</Link>
        </Button>
      </div>
    </div>
  );
}