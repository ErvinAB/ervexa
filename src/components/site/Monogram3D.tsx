"use client";

import { useEffect, useRef } from "react";
import BrandMark from "@/components/site/BrandMark";

/**
 * The studio monogram as an extruded 3D object.
 *
 * Deliberately implemented with CSS 3D transforms rather than a WebGL library.
 * The site ships four production dependencies and sells "built properly" partly
 * on being fast; pulling in three.js for one decorative mark would cost ~150kB
 * to buy an effect that `translateZ` layers already give. Everything here is
 * transform/opacity only, so it composites on the GPU and never touches layout.
 *
 * There is no React state: pointer moves are written straight to the node so a
 * mousemove storm cannot trigger 60 re-renders a second.
 *
 * Accessibility: the mark is decorative (aria-hidden). Users who ask for
 * reduced motion get a static, untilted mark — the global rule collapses the
 * CSS idle animation, and the pointer tracking bails out before attaching.
 */
const LAYERS = 5;
const DEPTH = 9; // px of `translateZ` between each stacked copy

export default function Monogram3D({ className = "" }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const body = bodyRef.current;
    if (!stage || !body) return;
    // `hidden lg:block` keeps the device off small screens; a display:none node
    // has no offsetParent, so skip attaching the listener entirely.
    if (stage.offsetParent === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const handleMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      if (rect.width === 0) return;
      const px = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const py = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const clamp = (n: number) => Math.max(-1, Math.min(1, n));

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        body.style.transform = `rotateX(${clamp(-py) * 15}deg) rotateY(${clamp(px) * 18}deg)`;
      });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={stageRef} className={`monogram-stage ${className}`} aria-hidden="true">
      <div className="monogram-idle">
        <div ref={bodyRef} className="monogram-body">
          {Array.from({ length: LAYERS }).map((_, index) => (
            <span
              key={index}
              className="monogram-layer"
              style={{
                transform: `translateZ(${-index * DEPTH}px)`,
                // The nearest copy stays solid; the ones behind it only ever
                // show as a rim because perspective shrinks them slightly.
                opacity: index === 0 ? 1 : 0.45,
              }}
            >
              <BrandMark className="h-full w-full text-forest" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
