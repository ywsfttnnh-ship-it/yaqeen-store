import type { MetadataRoute } from "next";
import { products, categoryData } from "@/lib/data";
import { config } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.app.url;

  const staticRoutes = [
    "",
    "/store",
    "/categories",
    "/offers",
    "/about",
    "/contact",
    "/faq",
    "/shipping",
    "/returns",
    "/warranty",
    "/payment",
    "/cart",
    "/wishlist",
    "/search",
    "/account/login",
    "/account/register",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const categoryRoutes = categoryData.map((category) => ({
    url: `${baseUrl}/categories/${encodeURIComponent(category.slug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}