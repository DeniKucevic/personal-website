import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/igt-slot-game/:path*",
        destination:
          "https://igt-demo-game-slot.vercel.app/igt-slot-game/:path*",
      },
    ];
  },
};

export default nextConfig;
