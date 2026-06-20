import type { Metadata } from "next";
import { DM_Sans, Marcellus, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ReduxProvider from "@/components/ReduxProvider";
import { absoluteUrl, serviceKeywords, siteConfig } from "@/lib/seo";

const dmSans = DM_Sans({ 
  subsets: ["latin", "latin-ext"],
  variable: '--font-dm-sans',
});

const marcellus = Marcellus({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: '--font-marcellus',
});

const dancingScript = Dancing_Script({
  subsets: ["latin", "latin-ext"],
  variable: '--font-dancing',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "BEYVIP Translation Office | Yeminli Tercüme Bürosu",
    template: "%s | BEYVIP Translation Office",
  },
  description: "BEYVIP Translation Office pasaport, vize, ikamet, diploma, hukuki evrak, yeminli ve noter onaylı tercüme hizmetleri sunar.",
  keywords: [
    siteConfig.name,
    siteConfig.shortName,
    ...serviceKeywords,
    "beyvip translation",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "tr-TR": siteConfig.url,
    },
  },
  category: "translation",
  classification: "Business",
  other: {
    "geo.region": "TR-34",
    "geo.placename": "İstanbul, Türkiye",
    "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    "ICBM": `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
  },
  icons: {
    icon: [
      { url: '/beyvip/logo.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    shortcut: '/beyvip/logo.svg',
    apple: [
      { url: '/beyvip/logo.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: "BEYVIP Translation Office | Yeminli Tercüme Bürosu",
    description: "Pasaport, vize, ikamet, diploma ve resmi evraklar için hızlı ve dikkatli tercüme hizmeti.",
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: absoluteUrl(siteConfig.defaultImage),
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: "BEYVIP Translation Office profesyonel tercüme hizmetleri.",
    images: [absoluteUrl(siteConfig.defaultImage)]
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${dmSans.variable} ${marcellus.variable} ${dancingScript.variable} font-sans`}>
        <ReduxProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </ReduxProvider>
      </body>
    </html>
  );
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  // Admin sayfalarında Header, Footer ve FloatingContact gösterme
  // Bu kontrol client-side'da yapılacak
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingContact />
    </>
  );
}
