import type { MetadataRoute } from "next";
import { apps } from "@/lib/content/apps";
import { notes } from "@/lib/content/notes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stagbyte.com";

  const staticPages = [
    "",
    "/apps",
    "/games",
    "/notes",
    "/play",
    "/about",
    "/client-work",
    "/contact",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const noteEntries: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Each app gets its own front door, at the same priority as /apps.
  const appEntries: MetadataRoute.Sitemap = apps.map((app) => ({
    url: `${baseUrl}/apps/${app.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...appEntries, ...noteEntries];
}
