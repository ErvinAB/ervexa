import type { Metadata } from "next";

const baseUrl = "https://stagbyte.netlify.app";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Stagbyte — Quality Engineering, Automated Intelligently",
    template: "%s — Stagbyte",
  },
  description:
    "QA automation frameworks, agentic testing, data reliability, and engineering workflow automation. AI-native quality engineering by Ervin Abedin.",
  keywords: [
    "QA automation",
    "Playwright",
    "test automation",
    "AI QA",
    "agentic testing",
    "data quality",
    "n8n automation",
    "workflow automation",
    "quality engineering",
    "TypeScript",
    "Python",
  ],
  openGraph: {
    title: "Stagbyte — Quality Engineering, Automated Intelligently",
    description:
      "QA automation frameworks, agentic testing, data reliability, and engineering workflow automation.",
    url: baseUrl,
    siteName: "Stagbyte",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stagbyte — Quality Engineering",
    description:
      "QA automation frameworks, agentic testing, data reliability, and engineering workflow automation.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};
