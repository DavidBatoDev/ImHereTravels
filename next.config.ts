import type { NextConfig } from "next";
import { getAllTourSlugs } from "./data/tours";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/imheretravels-a3f81.firebasestorage.app/**",
      },
      {
        protocol: "https",
        hostname: "imheretravels.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        pathname: "/imheretravels.com/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/dev", destination: "/resident-hosts/dev", permanent: true },
      ...getAllTourSlugs().map((slug) => ({
        source: `/${slug}`,
        destination: `/tours/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
