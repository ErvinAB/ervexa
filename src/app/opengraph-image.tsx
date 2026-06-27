import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Stagbyte — Automation Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#09090b",
          padding: "80px",
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 64 64"
          fill="none"
          style={{ marginBottom: "24px" }}
        >
          <rect width="64" height="64" rx="12" fill="#06b6d4" />
          <path
            d="M20 44V20L32 32L44 20V44"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#f4f4f5",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          Stagbyte
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#a1a1aa",
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1.4,
          }}
        >
          Automation engineering for modern teams.
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "32px",
          }}
        >
          {[
            "Test Automation",
            "Agentic Systems",
            "Workflow Orchestration",
            "Data Pipelines",
          ].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 16px",
                borderRadius: "9999px",
                border: "1px solid #27272a",
                color: "#71717a",
                fontSize: "16px",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
