import type { App } from "@/lib/content/apps";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Stagbyte",
  description:
    "Independent, product-led software studio building its own small apps that solve one everyday problem properly.",
  url: "https://stagbyte.com",
  email: "e.abedin@arvionix.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Skopje",
    addressCountry: "MK",
  },
  knowsAbout: [
    "Small app development",
    "Mobile app development",
    "Product and interface design",
    "Prototyping",
  ],
  founder: {
    "@type": "Person",
    name: "Ervin Abedin",
    url: "https://github.com/ErvinAB",
    sameAs: [
      "https://www.linkedin.com/in/ervin-abedin/",
      "https://github.com/ErvinAB",
    ],
  },
};

/**
 * Per-app `SoftwareApplication` markup for `/apps/[slug]`.
 *
 * Deliberately omits `offers` while the app is unobtainable — machine-readable
 * pricing for something you cannot buy is the same lie as a fake download
 * button. Add an offers block here when a real price exists.
 */
export function softwareApplicationSchema(app: App) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.tagline,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: app.platforms.join(", "),
    url: `https://stagbyte.com/apps/${app.slug}`,
    author: {
      "@type": "Organization",
      name: "Stagbyte",
      url: "https://stagbyte.com",
    },
  };
}

