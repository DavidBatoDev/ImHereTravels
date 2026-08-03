import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/?e=*",
    },
    sitemap: "https://www.imheretravels.com/sitemap.xml",
  };
}
