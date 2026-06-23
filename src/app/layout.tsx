import type { Metadata } from "next";
import { DM_Sans, Marcellus, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ReduxProvider from "@/components/ReduxProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { absoluteUrl, serviceKeywords } from "@/lib/seo";
import { getRequestSiteConfig } from "@/lib/server-seo";

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

export async function generateMetadata(): Promise<Metadata> {
  const activeSite = await getRequestSiteConfig();

  return {
    metadataBase: new URL(activeSite.url),
    title: {
      default: activeSite.title,
      template: activeSite.titleTemplate,
    },
    description: activeSite.description,
    keywords: [
      activeSite.name,
      activeSite.shortName,
      ...serviceKeywords,
      ...activeSite.keywords,
    ],
    authors: [{ name: activeSite.name }],
    creator: activeSite.name,
    publisher: activeSite.name,
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
      canonical: activeSite.url,
      languages: {
        "tr-TR": activeSite.url,
      },
    },
    category: "translation",
    classification: "Business",
    other: {
      "geo.region": "TR-34",
      "geo.placename": `${activeSite.locationName}, İstanbul, Türkiye`,
      "geo.position": `${activeSite.geo.latitude};${activeSite.geo.longitude}`,
      "ICBM": `${activeSite.geo.latitude}, ${activeSite.geo.longitude}`,
    },
    icons: {
      icon: [
        { url: '/beyvip/favicon.png', sizes: '512x512', type: 'image/png' },
        { url: '/browser_icon.png', sizes: '512x512', type: 'image/png' },
      ],
      shortcut: '/beyvip/favicon.png',
      apple: [
        { url: '/beyvip/favicon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    openGraph: {
      title: activeSite.title,
      description: activeSite.ogDescription,
      type: "website",
      locale: activeSite.locale,
      siteName: activeSite.name,
      url: activeSite.url,
      images: [
        {
          url: absoluteUrl(activeSite.defaultImage, activeSite),
          width: 1200,
          height: 630,
          alt: activeSite.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: activeSite.name,
      description: activeSite.ogDescription,
      images: [absoluteUrl(activeSite.defaultImage, activeSite)]
    },
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${dmSans.variable} ${marcellus.variable} ${dancingScript.variable} font-sans`}>
        <ReduxProvider>
          <LanguageProvider>
            <RootLayoutContent>{children}</RootLayoutContent>
          </LanguageProvider>
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
