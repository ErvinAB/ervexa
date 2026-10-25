import { ImageResponse } from "next/og";
import { firstAppStatus } from "@/lib/content/apps";

export const runtime = "edge";
export const alt = "Stagbyte — Small apps, built properly";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The link preview is often the first pixel anyone sees, before the site loads
 * at all — so it carries the same paper palette and the same accent swipe as the
 * hero rather than a dark field with a row of pills.
 *
 * The status line reads from `firstAppStatus`, so the card cannot drift from the
 * rest of the site. Note that the site's Geist Mono is a `next/font` variable and
 * is not reachable from the edge runtime, so the label style here is approximated
 * with letter-spacing rather than loading a second font over the network.
 */
const INK = "#f5f7f2";
const PAPER = "#0f1511";
const FOREST = "#c5f277";
const MARKER = "transparent";

// Satori has no `em` support in offset shorthand, so the swipe offsets are
// pre-computed from the 76px headline.
const HEADLINE_PX = 76;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "76px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              width: "26px",
              height: "2px",
              background: FOREST,
              opacity: 0.55,
            }}
          />
          <div
            style={{
              fontSize: "19px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: FOREST,
            }}
          >
            STAGBYTE
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: `${HEADLINE_PX}px`,
            fontWeight: 700,
            color: INK,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          <div style={{ display: "flex" }}>Small apps.</div>
          <div style={{ display: "flex" }}>Real problems.</div>
          <div
            style={{
              display: "flex",
              position: "relative",
              marginTop: "10px",
              // Without this the line stretches to the full column width and the
              // swipe becomes a full-width tan bar. The hero uses `w-fit` for the
              // same reason; in satori the equivalent is to opt out of stretch.
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "-9px",
                right: "-9px",
                top: "20px",
                bottom: "8px",
                background: MARKER,
              }}
            />
            <div style={{ display: "flex", position: "relative", color: FOREST }}>
              Built properly.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "rgba(201, 206, 194, 0.9)",
            }}
          >
            An independent, product-led software studio.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "19px",
              fontWeight: 600,
              color: FOREST,
            }}
          >
            {firstAppStatus.label}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
