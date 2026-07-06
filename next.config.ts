import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { getAllTourSlugs } from "./data/tours";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next.js doesn't infer it from the stray
  // lockfile at C:\Users\August\Desktop\Code\package-lock.json.
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
      {
        // Any Firebase Storage bucket on this host (prod + dev projects), so
        // review/tour images from imheretravels-a3f81 and imheretravels-dev
        // both render through next/image.
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
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
