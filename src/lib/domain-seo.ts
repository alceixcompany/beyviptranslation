export type SiteAddress = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  display: string;
};

export type SiteGeo = {
  latitude: number;
  longitude: number;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  domain: string;
  url: string;
  locale: string;
  language: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  instagram: string;
  instagramHandle: string;
  address: SiteAddress;
  geo: SiteGeo;
  defaultImage: string;
  logo: string;
  locationName: string;
  title: string;
  titleTemplate: string;
  description: string;
  ogDescription: string;
  keywords: readonly string[];
  areaServed: readonly string[];
};

const contactConfig = {
  phone: "+905334276383",
  phoneDisplay: "+90 533 427 63 83",
  whatsapp: "+905330923476",
  whatsappDisplay: "+90 533 092 34 76",
  email: "beyviptranslation@gmail.com",
  instagram: "https://www.instagram.com/beyviptranslation",
  instagramHandle: "@beyviptranslation",
  defaultImage: "/beyvip/hero.png",
  logo: "/beyvip/logo-horizontal-transparent-v2.png",
  locale: "tr_TR",
  language: "tr",
};

const istanbulAddress: SiteAddress = {
  streetAddress: "Istanbul",
  addressLocality: "Istanbul",
  addressRegion: "Istanbul",
  postalCode: "",
  addressCountry: "TR",
  display: "İstanbul / Türkiye",
};

const istanbulGeo: SiteGeo = {
  latitude: 41.0082,
  longitude: 28.9784,
};

const domainDefinitions = [
  {
    domain: "beyviptranslation.com",
    name: "BEYVIP Translation Office",
    shortName: "BEYVIP",
    locationName: "İstanbul",
    title: "BEYVIP Translation Office | Yeminli Tercüme Bürosu",
    titleTemplate: "%s | BEYVIP Translation Office",
    description:
      "BEYVIP Translation Office pasaport, vize, ikamet, diploma, hukuki evrak, yeminli ve noter onaylı tercüme hizmetleri sunar.",
    ogDescription:
      "Pasaport, vize, ikamet, diploma ve resmi evraklar için hızlı ve dikkatli tercüme hizmeti.",
    keywords: [
      "beyvip translation",
      "beyvip tercume",
      "istanbul yeminli tercuman",
      "istanbul tercume burosu",
      "noter onayli tercume istanbul",
    ],
    areaServed: ["Istanbul", "Turkey", "Worldwide"],
  },
  {
    domain: "esenyurtyeminlitercuman.com",
    name: "Esenyurt Yeminli Tercüman",
    shortName: "Esenyurt Tercüman",
    locationName: "Esenyurt",
    title: "Esenyurt Yeminli Tercüman | Noter Onaylı Tercüme",
    titleTemplate: "%s | Esenyurt Yeminli Tercüman",
    description:
      "Esenyurt yeminli tercüman ve noter onaylı tercüme hizmetleri. Pasaport, vize, ikamet, diploma, hukuki evrak ve resmi belge tercümesi.",
    ogDescription:
      "Esenyurt'ta yeminli tercüman, noter onaylı tercüme ve resmi evrak tercümesi için hızlı destek.",
    keywords: [
      "esenyurt yeminli tercuman",
      "esenyurt yeminli tercume",
      "esenyurt noter onayli tercume",
      "esenyurt tercume burosu",
      "esenyurt pasaport tercumesi",
      "esenyurt vize evraki tercumesi",
    ],
    areaServed: ["Esenyurt", "Beylikdüzü", "Avcılar", "İstanbul", "Turkey"],
  },
  {
    domain: "behcesehiryeminlitercuman.com",
    name: "Bahçeşehir Yeminli Tercüman",
    shortName: "Bahçeşehir Tercüman",
    locationName: "Bahçeşehir",
    title: "Bahçeşehir Yeminli Tercüman | Noter Onaylı Tercüme",
    titleTemplate: "%s | Bahçeşehir Yeminli Tercüman",
    description:
      "Bahçeşehir yeminli tercüman ve noter onaylı tercüme hizmetleri. Resmi belge, pasaport, diploma, vize, ikamet ve hukuki tercüme.",
    ogDescription:
      "Bahçeşehir'de yeminli tercüman ve noter onaylı resmi belge tercümesi için profesyonel destek.",
    keywords: [
      "bahcesehir yeminli tercuman",
      "bahcesehir yeminli tercume",
      "bahcesehir noter onayli tercume",
      "bahcesehir tercume burosu",
      "bahcesehir pasaport tercumesi",
    ],
    areaServed: ["Bahçeşehir", "Başakşehir", "Esenyurt", "İstanbul", "Turkey"],
  },
  {
    domain: "beylikduzuyeminlitercuman.com",
    name: "Beylikdüzü Yeminli Tercüman",
    shortName: "Beylikdüzü Tercüman",
    locationName: "Beylikdüzü",
    title: "Beylikdüzü Yeminli Tercüman | Noter Onaylı Tercüme",
    titleTemplate: "%s | Beylikdüzü Yeminli Tercüman",
    description:
      "Beylikdüzü yeminli tercüman ve noter onaylı tercüme hizmetleri. Pasaport, vize, ikamet, diploma ve resmi evrak tercümesi.",
    ogDescription:
      "Beylikdüzü'nde yeminli tercüman, noter onaylı tercüme ve resmi evrak çevirisi.",
    keywords: [
      "beylikduzu yeminli tercuman",
      "beylikduzu yeminli tercume",
      "beylikduzu noter onayli tercume",
      "beylikduzu tercume burosu",
      "beylikduzu pasaport tercumesi",
    ],
    areaServed: ["Beylikdüzü", "Esenyurt", "Yakuplu", "İstanbul", "Turkey"],
  },
  {
    domain: "esenyurttercume.com.tr",
    name: "Esenyurt Tercüme",
    shortName: "Esenyurt Tercüme",
    locationName: "Esenyurt",
    title: "Esenyurt Tercüme Bürosu | Yeminli ve Noter Onaylı Tercüme",
    titleTemplate: "%s | Esenyurt Tercüme",
    description:
      "Esenyurt tercüme bürosu hizmetleri. Yeminli tercüme, noter onaylı tercüme, pasaport, vize, diploma, ikamet ve resmi evrak tercümesi.",
    ogDescription:
      "Esenyurt tercüme bürosu: yeminli, noter onaylı ve resmi belge tercümelerinde hızlı süreç.",
    keywords: [
      "esenyurt tercume",
      "esenyurt tercume burosu",
      "esenyurt yeminli tercume",
      "esenyurt noter tercume",
      "esenyurt resmi evrak tercumesi",
    ],
    areaServed: ["Esenyurt", "Beylikdüzü", "Avcılar", "İstanbul", "Turkey"],
  },
  {
    domain: "yakupluyeminlitercuman.com",
    name: "Yakuplu Yeminli Tercüman",
    shortName: "Yakuplu Tercüman",
    locationName: "Yakuplu",
    title: "Yakuplu Yeminli Tercüman | Noter Onaylı Tercüme",
    titleTemplate: "%s | Yakuplu Yeminli Tercüman",
    description:
      "Yakuplu yeminli tercüman ve noter onaylı tercüme hizmetleri. Pasaport, vize, diploma, ikamet ve resmi belge tercümesi.",
    ogDescription:
      "Yakuplu'da yeminli tercüman, noter onaylı tercüme ve resmi belge çeviri desteği.",
    keywords: [
      "yakuplu yeminli tercuman",
      "yakuplu yeminli tercume",
      "yakuplu noter onayli tercume",
      "yakuplu tercume burosu",
      "yakuplu pasaport tercumesi",
    ],
    areaServed: ["Yakuplu", "Beylikdüzü", "Esenyurt", "İstanbul", "Turkey"],
  },
] as const;

export const domainSeoConfigs: Record<string, SiteConfig> = Object.fromEntries(
  domainDefinitions.map((definition) => [
    definition.domain,
    {
      ...contactConfig,
      ...definition,
      url: `https://${definition.domain}`,
      address: istanbulAddress,
      geo: istanbulGeo,
    },
  ])
) as Record<string, SiteConfig>;

export const defaultSiteConfig = domainSeoConfigs["beyviptranslation.com"];

export function normalizeHost(host?: string | null) {
  return (host || "")
    .split(":")[0]
    .toLowerCase()
    .replace(/^www\./, "");
}

export function getSiteConfigByHost(host?: string | null): SiteConfig {
  const normalizedHost = normalizeHost(host);
  return domainSeoConfigs[normalizedHost] || defaultSiteConfig;
}

export function getAllSiteConfigs() {
  return Object.values(domainSeoConfigs);
}
