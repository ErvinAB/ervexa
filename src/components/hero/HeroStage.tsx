"use client";

import { useEffect, useRef } from "react";

/**
 * Writes --sy (page scroll in px) on the hero root while it is on screen, for
 * the scroll parallax. Pointer position (--mx / --my) is written site-wide by
 * PointerTracker, so the stag's eyes follow the cursor on every page.
 *
 * Skipped for prefers-reduced-motion: the scene renders still.
 */
export default function HeroStage({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = true;
    let frame = 0;
    const onScroll = () => {
      if (!visible || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty("--sy", String(Math.round(window.scrollY)));
      });
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
