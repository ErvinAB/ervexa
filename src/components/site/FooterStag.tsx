"use client";

import { useState } from "react";
import LivingStag from "@/components/hero/LivingStag";

/**
 * The stag peeking over the top edge of the footer. Only its head shows;
 * hover and it rises a little, click and it hops and says something.
 */
const lines = [
  "Still building. Properly.",
  "No arms, so the contact form is all yours.",
  "Inkline has a fresh board today.",
  "N°01 is coming along nicely.",
  "Small stag. Big ideas.",
  "You found me. Now go play Inkline.",
];

export default function FooterStag() {
  const [index, setIndex] = useState(-1);
  const [hop, setHop] = useState(0);

  const poke = () => {
    setIndex((i) => (i + 1) % lines.length);
    setHop((h) => h + 1);
  };

  return (
    <div className="absolute bottom-full right-6 z-10 md:right-16">
      {index >= 0 && (
        <p
          key={index}
          role="status"
          className="stag-bubble pointer-events-none absolute bottom-[6.2rem] right-[6.5rem] w-max max-w-[15rem] rounded-2xl rounded-br-sm bg-lime px-4 py-2.5 text-sm font-semibold text-deep shadow-lg"
        >
          {lines[index]}
        </p>
      )}
      {/* The clip box ends exactly at the footer edge, so the body is hidden
          below it and the stag reads as peeking over. */}
      <div className="h-36 w-28 [clip-path:inset(-200%_-200%_0_-200%)]">
        <button
          type="button"
          onClick={poke}
          aria-label="Say hi to the stag"
          className="footer-stag-btn block w-full"
        >
          <span key={hop} className={hop ? "stag-hop block" : "block"}>
            <LivingStag className="footer-stag-svg mx-auto h-36 w-auto" body="#2c4734" blinkDelay="-1s" />
          </span>
        </button>
      </div>
    </div>
  );
}
