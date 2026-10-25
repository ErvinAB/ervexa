import type { Metadata } from "next";

const baseUrl = "https://stagbyte.com";

const description =
  "Stagbyte is an independent, product-led software studio making small apps that solve one everyday problem properly. Games are exploratory; client work is selective.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Stagbyte — Small apps, built properly",
    template: "%s — Stagbyte",
  },
  description,
  keywords: [
    "small apps",
    "utility apps",
    "independent software studio",
    "product-led studio",
    "one-time purchase apps",
    "privacy-first apps",
  ],
  openGraph: {
    title: "Stagbyte — Small apps, built properly",
    description,
    url: baseUrl,
    siteName: "Stagbyte",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stagbyte — Small apps, built properly",
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};
