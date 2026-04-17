import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/global/Header";

const BASE_URL = "https://www.imheretravels.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s — I'm Here Travels",
    default: "I'm Here Travels | Small-Group Tours to the Philippines & Beyond",
  },
  description:
    "I'm Here Travels runs small-group tours across the Philippines, Japan, India, Maldives and more. Journey through stunning destinations, meet like-minded travellers, and make memories that last a lifetime.",
  keywords: [
    "small group tours Philippines",
    "group travel Asia",
    "Philippines tour packages",
    "Japan group tour",
    "Maldives tour",
    "adventure travel",
    "I'm Here Travels",
  ],
  openGraph: {
    type: "website",
    siteName: "I'm Here Travels",
    title: "I'm Here Travels | Small-Group Tours to the Philippines & Beyond",
    description:
      "Small-group adventures across the Philippines, Japan, Maldives, India, Tanzania and beyond. Book your trip and explore the world with us.",
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
    title: "I'm Here Travels | Small-Group Tours to the Philippines & Beyond",
    description:
      "Small-group adventures across the Philippines, Japan, Maldives, India, Tanzania and beyond.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "TravelAgency"],
      "@id": `${BASE_URL}/#organization`,
      name: "I'm Here Travels",
      url: BASE_URL,
      description:
        "I'm Here Travels runs small-group tours across the Philippines, Japan, India, Maldives and more. We connect people with places and create a positive impact together.",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/Logos/imheretravels-logo-horizontal-midnight.svg`,
        width: 300,
        height: 80,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: `${BASE_URL}/contact-us`,
        availableLanguage: "English",
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
      description: "Small-group tours across the Philippines, Japan, India, Maldives and beyond.",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/tours?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
    {
      "@type": "SiteLinksSearchBox",
      url: BASE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/tours?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ItemList",
      "@id": `${BASE_URL}/#site-navigation`,
      name: "Site Navigation",
      itemListElement: [
        {
          "@type": "SiteLinksSearchBox",
          position: 1,
          name: "Browse All Tours",
          description: "Small-group adventures across Southeast Asia, East Asia, South Asia, Africa, Oceania and South America.",
          url: `${BASE_URL}/tours`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "All Destinations",
          description: "Explore every destination we travel to — Philippines, Japan, Maldives, India and more.",
          url: `${BASE_URL}/all-destinations`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "About Us",
          description: "Founded in 2023, we create small-group travel experiences that connect people with places.",
          url: `${BASE_URL}/about-us`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "FAQs",
          description: "Answers to common questions about tours, bookings, what's included and travel requirements.",
          url: `${BASE_URL}/faqs`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Contact Us",
          description: "Get in touch with our team for bookings, questions, or custom travel enquiries.",
          url: `${BASE_URL}/contact-us`,
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Why Choose Us",
          description: "Discover what makes I'm Here Travels different — small groups, curated routes, real experiences.",
          url: `${BASE_URL}/why-us`,
        },
      ],
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
      <body className="min-h-screen flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
