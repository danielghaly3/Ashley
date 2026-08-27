import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Sacramento } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import { business, contact, seo } from "@/data/business";

/* ---------------------------------------------------------------------------
   TYPE
   Three faces, each with one job. All are self-hosted by next/font, subset to
   latin, and use `display: swap` so text is readable on the first paint.
--------------------------------------------------------------------------- */

/** Editorial serif — headlines only. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Geometric sans — navigation, buttons, labels and body copy. */
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

/** Script accent — used only for short decorative words. */
const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${business.name}`,
  },
  description: seo.description,
  applicationName: business.name,
  authors: [{ name: business.name }],
  openGraph: {
    type: "website",
    siteName: business.name,
    title: seo.title,
    description: seo.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /* Declared per scheme so the browser chrome matches the warm dim mode. */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFBF8" },
    { media: "(prefers-color-scheme: dark)", color: "#191614" },
  ],
  colorScheme: "light dark",
};

/**
 * Local-business structured data. Every value is drawn from data/business.ts,
 * which in turn comes from Ashley's own material — no ratings or review counts
 * are published because none could be verified.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: business.name,
  description: seo.description,
  url: seo.siteUrl,
  telephone: contact.phone,
  email: contact.email,
  image: `${seo.siteUrl}/images/hero-portrait.jpg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1545 NW 8th Ave",
    addressLocality: "Miami",
    addressRegion: "FL",
    addressCountry: "US",
  },
  areaServed: business.city,
  sameAs: [contact.instagramUrl, contact.facebookUrl],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://byashleycass.as.me/schedule/054822df",
      inLanguage: "en-US",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${sacramento.variable}`}
    >
      <head>
        {/*
          The scroll reveals start at opacity 0 and are switched on from JS. If
          JS never runs, this forces every revealed element visible so the page
          still reads as a complete document.
        */}
        <noscript>
          <style>{`.reveal > *, .reveal-mask > *, .image-reveal img { opacity: 1 !important; clip-path: none !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4
                     focus:z-skip focus:flex focus:min-h-tap focus:items-center
                     focus:bg-ink focus:px-5 focus:text-surface"
        >
          Skip to content
        </a>

        <div className="grain" aria-hidden="true" />

        <AnnouncementBar />
        <SiteHeader />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />

        {/*
          The bottom action bar is fixed, so the page reserves room for it —
          otherwise the last rows of the footer sit underneath it on a phone.
          Cleared above `lg`, where the bar is not rendered.
        */}
        <div aria-hidden="true" className="h-[4.75rem] lg:hidden" />

        <MobileActionBar />

        <script
          type="application/ld+json"
          // Static, author-controlled JSON — safe to inline for search engines.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
