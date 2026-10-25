"use client";

import { useEffect } from "react";

/**
 * Site-wide: writes the pointer position as --mx / --my (-1..1 from the
 * centre of the window) on <html>, eased so it glides. Every stag's eyes,
 * the hero layers and the 3D tile read these in CSS, so nothing re-renders.
 *
 * Off for touch input and for prefers-reduced-motion.
 */
export default function PointerTracker() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      root.style.setProperty("--mx", x.toFixed(4));
      root.style.setProperty("--my", y.toFixed(4));
      frame =
        Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001
          ? requestAnimationFrame(tick)
          : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
