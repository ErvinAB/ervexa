import { ANTLER_LEFT, ANTLER_RIGHT, BODY, TILE } from "@/components/site/BrandMark";

/**
 * The stag with eyes that are alive: they blink every few seconds and drift
 * toward the cursor. Both are pure CSS — the eye offset reads --mx / --my,
 * which PointerTracker writes site-wide — so this stays a server component.
 */
export default function LivingStag({
  className = "",
  tile = false,
  body = "#0f1511",
  blinkDelay = "0s",
  eyeColor = "#ffffff",
}: {
  className?: string;
  /** Draw the Stag Lime app-icon tile behind the stag. */
  tile?: boolean;
  body?: string;
  blinkDelay?: string;
  /** White by default; lime makes a stag peering out of the dark. */
  eyeColor?: string;
}) {
  return (
    <svg viewBox={tile ? "0 0 492 636" : "55 75 380 515"} className={className} aria-hidden="true" focusable="false">
      {tile ? <path d={TILE} fill="#c5f277" stroke="#0f1511" strokeWidth={18.75} /> : null}
      <g fill={body}>
        <path d={ANTLER_LEFT} />
        <path d={ANTLER_RIGHT} />
        <path d={BODY} />
      </g>
      <g className="stag-look">
        <g className="stag-blink" style={{ animationDelay: blinkDelay }}>
          <ellipse cx="271.299" cy="248.175" rx="17.406" ry="23.919" fill={eyeColor} />
          <ellipse cx="216.186" cy="253.068" rx="14.978" ry="19.026" fill={eyeColor} />
        </g>
      </g>
    </svg>
  );
}
