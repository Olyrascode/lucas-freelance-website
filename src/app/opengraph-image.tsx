import { ImageResponse } from "next/og";

export const alt = "Lucas Aufrère — Développeur front-end créatif freelance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 96px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: "#888888",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          lucas-aufrere.com
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 128,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontWeight: 400,
              color: "#FFFFFF",
            }}
          >
            Lucas Aufrère
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.3,
              color: "#EAEAEA",
              maxWidth: 920,
              fontFamily: "sans-serif",
              fontWeight: 400,
            }}
          >
            Développeur front-end créatif freelance — sites sur-mesure,
            animations fluides, interfaces soignées.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
