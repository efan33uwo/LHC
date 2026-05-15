import type { NextConfig } from "next";

const swappableImageHeaders = [
  {
    key: "Cache-Control",
    value: "no-store, max-age=0, must-revalidate",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/staff/:path*",
        headers: swappableImageHeaders,
      },
      {
        source: "/services/:path*",
        headers: swappableImageHeaders,
      },
    ];
  },
};

export default nextConfig;
