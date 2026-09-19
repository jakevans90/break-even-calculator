import type { MetadataRoute } from "next";

const siteUrl = "https://break-even.jakegenerates.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
