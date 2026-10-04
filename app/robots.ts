import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/checkout", "/api/"],
    },
    sitemap: "https://tech-nova-client-sand.vercel.app/sitemap.xml",
  };
}
