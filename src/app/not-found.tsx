import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <div className="flex items-center justify-center px-6 py-32">
        <div className="text-center">
          <p className="font-mono text-5xl font-bold text-zinc-800">404</p>
          <h1 className="mt-4 text-xl font-bold text-zinc-100">Page not found</h1>
          <p className="mt-2 text-sm text-zinc-500">
            The page you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1 font-mono text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
