import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://www.imheretravels.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s — I'm Here Travels",
    default: "I'm Here Travels | Small-Group Tours",
  },
  description:
    "I'm Here Travels runs small-group tours across the Philippines, Japan, India, Maldives and more. We connect people with places and create a positive impact together.",
  openGraph: {
    type: "website",
    siteName: "I'm Here Travels",
    title: "I'm Here Travels | Small-Group Tours",
    description:
      "Small-group adventures across Southeast Asia, East Asia, South Asia, Africa, Oceania and South America.",
    images: [
      {
        url: "/tours/philippine-sunrise/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "I'm Here Travels — Small-Group Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "I'm Here Travels | Small-Group Tours",
    description:
      "Small-group adventures across Southeast Asia, East Asia, South Asia, Africa, Oceania and South America.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "I'm Here Travels",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/Logos/imheretravels-logo-horizontal-midnight.svg`,
      },
      sameAs: [
        "https://www.instagram.com/imheretravels",
        "https://www.facebook.com/imheretravels",
        "https://www.tiktok.com/@imheretravels",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "I'm Here Travels",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/tours?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
