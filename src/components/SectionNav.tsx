"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "capabilities", label: "Capabilities" },
  { id: "projects", label: "Projects" },
  { id: "workflows", label: "Workflows" },
  { id: "cta", label: "Contact" },
];

export default function SectionNav() {
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { rootMargin: "-80% 0px 0px 0px" },
    );

    const hero = document.getElementById("hero");
    if (hero) heroObserver.observe(hero);

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed left-1/2 top-3 z-40 -translate-x-1/2 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-0.5 rounded-full border border-zinc-800/50 bg-zinc-950/80 px-1.5 py-1 backdrop-blur-md">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`relative rounded-full px-3 py-1.5 font-mono text-[11px] transition-colors ${
              active === id
                ? "text-zinc-100"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            {active === id && (
              <span className="absolute inset-0 rounded-full bg-zinc-800/60 nav-line-active" />
            )}
            <span className="relative z-10">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
