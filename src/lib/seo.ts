import type { Metadata } from "next";

export const siteConfig = {
  name: "BEYVIP Translation Office",
  shortName: "BEYVIP",
  url: "https://www.beyviptranslation.com",
  locale: "tr_TR",
  language: "tr",
  phone: "+905334276383",
  phoneDisplay: "+90 533 427 63 83",
  whatsapp: "+905330923476",
  whatsappDisplay: "+90 533 092 34 76",
  email: "beyviptranslation@gmail.com",
  instagram: "https://www.instagram.com/beyviptranslation",
  instagramHandle: "@beyviptranslation",
  address: {
    streetAddress: "Istanbul",
    addressLocality: "Istanbul",
    addressRegion: "Istanbul",
    postalCode: "",
    addressCountry: "TR",
    display: "İstanbul / Türkiye",
  },
  geo: {
    latitude: 41.0082,
    longitude: 28.9784,
  },
  defaultImage: "/beyvip/hero.png",
  logo: "/beyvip/logo-horizontal-transparent-v2.png",
};

export const serviceKeywords = [
  "tercume burosu",
  "yeminli tercume",
  "noter onayli tercume",
  "pasaport tercumesi",
  "vize evrak tercumesi",
  "resmi belge tercumesi",
  "arapca tercume",
  "ingilizce tercume",
  "rusca tercume",
  "farsca tercume",
  "fransizca tercume",
  "istanbul tercume burosu",
];

type SeoMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createSeoMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.defaultImage,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
}: SeoMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...serviceKeywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl(siteConfig.defaultImage),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: ["Istanbul", "Turkey", "Worldwide"],
    sameAs: [siteConfig.instagram],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "22:00",
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "tr-TR",
    publisher: {
      "@id": `${siteConfig.url}/#business`,
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
