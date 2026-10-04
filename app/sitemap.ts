import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tech-nova-client-sand.vercel.app";
  const staticRoutes = [
    "", "/new-arrivals", "/exclusive", "/best-sellers",
    "/cart", "/signin", "/signup", "/privacy", "/terms",
  ];

  return staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
