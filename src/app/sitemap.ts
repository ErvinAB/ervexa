import type { MetadataRoute } from "next";
import { projects } from "@/lib/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stagbyte.netlify.app";

  const staticPages = [
    "",
    "/capabilities",
    "/workflows",
    "/projects",
    "/about",
    "/insights",
    "/contact",
  ];

  const projectPages = projects.map((p) => `/projects/${p.slug}`);

  return [...staticPages, ...projectPages].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
