import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";

interface SitemapEntry {
  readonly path: string;
  readonly priority: number;
}

const entries: readonly SitemapEntry[] = [
  { path: "/", priority: 1.0 },
  { path: "/projets", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/a-propos", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/mentions-legales", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return entries.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
