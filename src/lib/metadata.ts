import type { Metadata } from "next";

const baseUrl = "https://stagbyte.netlify.app";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Stagbyte — Automation Engineering",
    template: "%s — Stagbyte",
  },
  description:
    "Test automation, agentic systems, workflow orchestration, data pipelines, and custom automation engineering by Stagbyte.",
   keywords: [
    "test automation",
    "Playwright",
    "agentic automation",
    "workflow orchestration",
    "data pipelines",
    "automation engineering",
    "n8n",
    "CI/CD automation",
    "performance testing",
    "TypeScript",
    "Python",
  ],
  openGraph: {
    title: "Stagbyte — Automation Engineering",
    description:
      "Test automation, agentic systems, workflow orchestration, data pipelines, and custom automation engineering.",
    url: baseUrl,
    siteName: "Stagbyte",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stagbyte — Automation Engineering",
    description:
      "Test automation, agentic systems, workflow orchestration, data pipelines, and custom automation engineering.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};
