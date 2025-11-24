import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/satoshi"; // <-- Add this line

export const metadata: Metadata = {
  title: "Stagbyte – Build and Deploy AI Agents",
  description:
    "Build, deploy, and scale intelligent AI agents with Stagbyte. Stay ahead with real-time AI feeds and automation tools.",
  keywords: ["AI", "agents", "automation", "machine learning", "startup", "Stagbyte"],
  metadataBase: new URL("https://stagbyte.netlify.app"),
  openGraph: {
    title: "Stagbyte – Build and Deploy AI Agents",
    description: "Explore AI agents that automate, analyze, and scale. Stagbyte empowers innovation.",
    url: "https://stagbyte.netlify.app",
    siteName: "Stagbyte",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Stagbyte AI Agents Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stagbyte – AI Agents for Automation",
    description: "Discover tools to automate your business and workflows using smart AI agents.",
    images: ["/og-cover.png"],
    creator: "@yourTwitterHandle",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-satoshi antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
