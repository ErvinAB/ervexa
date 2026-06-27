import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { navigation, socialLinks } from "@/lib/content/navigation";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-zinc-100"
            >
              <Image
                src="/logoSBWhite.svg"
                alt="Stagbyte"
                width={18}
                height={18}
                className="h-4 w-auto"
              />
              Stagbyte
            </Link>
            <p className="mt-3 max-w-xs text-xs text-zinc-500 leading-relaxed">
              Automation engineering for modern teams. Test automation, agentic systems,
              workflow orchestration, data pipelines, and custom automation.
            </p>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs font-medium text-zinc-400">Pages</p>
            <ul className="space-y-1.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mono text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs font-medium text-zinc-400">Connect</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> Email
                </a>
              </li>
            </ul>
            <p className="mt-4 text-[10px] text-zinc-600">
              Built in Skopje. Working globally.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-800/30 pt-6 text-center">
          <p className="font-mono text-[10px] text-zinc-600">
            &copy; {new Date().getFullYear()} Stagbyte. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
