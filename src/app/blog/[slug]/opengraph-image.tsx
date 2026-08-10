import { getPostBySlug } from "@/lib/sanity/queries";
import { ImageResponse } from "next/og";

export const alt = "Denis Kucevic — Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post?.title ?? "Blog";
  const date = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return new ImageResponse(
    <div
      style={{
        background: "#0f1521",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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

      <p
        style={{
          color: "#34d399",
          fontSize: "24px",
          margin: 0,
          fontWeight: 500,
          letterSpacing: "0.05em",
          position: "relative",
        }}
      >
        deniskucevic.com / blog
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          position: "relative",
        }}
      >
        <h1
          style={{
            color: "#f1f5f9",
            fontSize: "60px",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "26px",
            margin: 0,
            fontWeight: 400,
          }}
        >
          {[date, "Denis Kučević"].filter(Boolean).join("  ·  ")}
        </p>
      </div>
    </div>,
    { ...size },
  );
}
