interface BrandMarkProps {
  className?: string;
  /** Accessible label. Pass null when the mark sits next to a visible wordmark. */
  title?: string | null;
  /**
   * "silhouette" (default): the stag alone in currentColor, eyes cut out so the
   * background shows through. "icon": the primary mark, a black stag on the
   * Stag Lime tile, as in the Forest Lime brand guide.
   */
  variant?: "silhouette" | "icon";
}

/*
 * Paths are the original master SVG (public/brand/stagbyte-master.svg),
 * unchanged. The brand rule is to keep the antlers, the asymmetric eyes and
 * the rounded outer tile exactly as drawn.
 */
export const BODY =
  "M183.256,192.723c0,0 -35.622,310.752 -33.194,374.846c0.615,16.237 37.916,12.954 47.766,9.715c9.85,-3.238 -0.27,-29.41 11.334,-29.146c11.605,0.264 52.737,-7.629 65.42,-3.581c7.074,2.258 3.532,23.129 10.759,24.829c9.175,2.159 47.262,11.088 47.689,-5.056c1.754,-66.252 -12.279,-327.484 -37.242,-389.418c-14.197,-35.225 -110.54,-27.164 -112.535,17.811Z";
export const ANTLER_RIGHT =
  "M265.868,174.585c0,0 55.863,-12.954 67.197,-21.859c8.279,-6.505 -1.214,-24.558 0.81,-31.574c1.429,-4.954 8.386,-14.755 11.334,-10.525c3.103,4.453 0.54,33.059 7.286,37.242c6.747,4.183 27.875,-1.631 33.194,-12.144c5.802,-11.469 -2.294,-44.393 1.619,-56.672c2.803,-8.795 18.781,-25.704 21.859,-17.002c3.913,11.065 20.953,63.411 1.619,83.389c-20.24,20.915 -123.059,42.099 -123.059,42.099l-21.859,-12.954Z";
export const ANTLER_LEFT =
  "M219.221,174.585c0,0 -55.863,-12.954 -67.197,-21.859c-8.279,-6.505 1.214,-24.558 -0.81,-31.574c-1.429,-4.954 -8.386,-14.755 -11.334,-10.525c-3.103,4.453 -0.54,33.059 -7.286,37.242c-6.747,4.183 -27.875,-1.631 -33.194,-12.144c-5.802,-11.469 2.294,-44.393 -1.619,-56.672c-2.803,-8.795 -18.781,-25.704 -21.859,-17.002c-3.913,11.065 -20.953,63.411 -1.619,83.389c20.24,20.915 123.059,42.099 123.059,42.099l21.859,-12.954Z";
// The two eyes as path sub-shapes, so evenodd can punch them out of the body.
const EYES =
  "M253.893,248.175a17.406,23.919 0 1,0 34.812,0a17.406,23.919 0 1,0 -34.812,0Z" +
  "M201.208,253.068a14.978,19.026 0 1,0 29.956,0a14.978,19.026 0 1,0 -29.956,0Z";
export const TILE =
  "M482.361,127.622l0,379.762c0,65.262 -52.985,118.247 -118.247,118.247l-236.493,0c-65.262,0 -118.247,-52.985 -118.247,-118.247l0,-379.762c0,-65.262 52.985,-118.247 118.247,-118.247l236.493,0c65.262,0 118.247,52.985 118.247,118.247Z";

export function StagShapes({ eyes = "cutout" }: { eyes?: "cutout" | "white" }) {
  return (
    <>
      <path d={ANTLER_LEFT} />
      <path d={ANTLER_RIGHT} />
      {eyes === "cutout" ? (
        <path d={BODY + EYES} fillRule="evenodd" />
      ) : (
        <>
          <path d={BODY} />
          <path d={EYES} fill="#ffffff" />
        </>
      )}
    </>
  );
}

export default function BrandMark({
  className = "h-6 w-auto",
  title,
  variant = "silhouette",
}: BrandMarkProps) {
  const a11y = {
    role: title ? "img" : undefined,
    "aria-hidden": title ? undefined : true,
    focusable: "false" as const,
  };

  if (variant === "icon") {
    return (
      <svg viewBox="0 0 492 636" className={className} {...a11y}>
        {title ? <title>{title}</title> : null}
        <path d={TILE} fill="#c5f277" stroke="#0f1511" strokeWidth={18.75} />
        <g fill="#0f1511">
          <StagShapes eyes="white" />
        </g>
      </svg>
    );
  }

  // Cropped to the stag itself (no tile).
  return (
    <svg viewBox="55 75 380 515" className={className} fill="currentColor" {...a11y}>
      {title ? <title>{title}</title> : null}
      <StagShapes />
    </svg>
  );
}
