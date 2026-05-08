import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Denis Kucevic, Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0f1521",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: "80px",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Emerald glow */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "50%",
          marginLeft: "-400px",
          width: "800px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(52,211,153,0.18) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          position: "relative",
        }}
      >
        <p
          style={{
            color: "#34d399",
            fontSize: "22px",
            margin: 0,
            fontWeight: 500,
            letterSpacing: "0.05em",
          }}
        >
          deniskucevic.com
        </p>
        <h1
          style={{
            color: "#f1f5f9",
            fontSize: "72px",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          Denis Kucevic
        </h1>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "30px",
            margin: 0,
            fontWeight: 400,
          }}
        >
          Software Developer · Pančevo, Serbia
        </p>
      </div>
    </div>,
    { ...size },
  );
}
