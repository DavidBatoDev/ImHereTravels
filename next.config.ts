import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
};

export default nextConfig;
