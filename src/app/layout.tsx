import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ervexa – Build and Deploy AI Agents",
  description: "Build, deploy, and scale intelligent AI agents with Ervexa. Stay ahead with real-time AI feeds and automation tools.",
  keywords: ["AI", "agents", "automation", "machine learning", "startup", "ervexa"],
  metadataBase: new URL("https://ervexa.netlify.app"), // update with actual domain if needed
  openGraph: {
    title: "Ervexa – Build and Deploy AI Agents",
    description: "Explore AI agents that automate, analyze, and scale. Ervexa empowers innovation.",
    url: "https://ervexa.netlify.app",
    siteName: "Ervexa",
    images: [
      {
        url: "/og-cover.png", // put this in /public
        width: 1200,
        height: 630,
        alt: "Ervexa AI Agents Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ervexa – AI Agents for Automation",
    description: "Discover tools to automate your business and workflows using smart AI agents.",
    images: ["/og-cover.png"],
    creator: "@yourTwitterHandle", // optional
  },
  themeColor: "#000000",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
