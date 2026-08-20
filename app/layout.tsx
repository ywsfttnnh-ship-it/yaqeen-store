import "./globals.css";

import { Tajawal, Cairo, Fira_Code } from "next/font/google";
import { ThemeProvider } from "next-themes";
import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/lib/context/cart-context";
import { WishlistProvider } from "@/lib/context/wishlist-context";
import { AuthProvider } from "@/lib/context/auth-context";
import { AIConfigProvider } from "@/lib/context/ai-config-context";
import { AIChatProvider } from "@/components/ai/ai-chat-context";
import { config } from "@/lib/config";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin", "latin-ext"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${config.app.name.ar} | ${config.app.name.en}`,
    template: `%s | ${config.app.name.ar} | ${config.app.name.en}`,
  },
  description: config.app.description.ar,
  keywords: [
    "يقين ستور",
    "أرضيات SPC",
    "بديل حجر",
    "سوفت ستون",
    "ديكور داخلي",
    "تشطيطات",
    "أرضيات",
    "جدران",
    "مرآب",
    "مقاومة ماء",
  ],
  authors: [{ name: config.app.name.en }],
  creator: config.app.name.en,
  publisher: config.app.name.en,
  metadataBase: new URL(config.app.url),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ar",
    alternateLocale: "en",
    url: config.app.url,
    title: `${config.app.name.ar} | ${config.app.name.en}`,
    description: config.app.description.ar,
    siteName: config.app.name.ar,
    images: [
      {
        url: "/assets/products/لوقو المتجر/img-024.png",
        width: 1200,
        height: 630,
        alt: config.app.name.ar,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yaqeenstore",
    images: ["/assets/products/لوقو المتجر/img-024.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "e-commerce",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-pe-16 scroll-pt-1">
      <body
        className={`${tajawal.variable} ${cairo.variable} ${firaCode.variable} font-sans antialiased`}
        style={{ scrollbarGutter: "stable both-edges" }}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <AIConfigProvider>
              <CartProvider>
                <WishlistProvider>
                  <AIChatProvider>
                    {children}
                  </AIChatProvider>
                </WishlistProvider>
              </CartProvider>
            </AIConfigProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
