import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createSeoMetadata } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getRequestSiteConfig();

  return createSeoMetadata({
    title: `${site.locationName} Yeminli Tercüman İletişim`,
    description: `${site.name} iletişim bilgileri. Pasaport, vize, diploma, yeminli ve noter onaylı tercüme için hızlı teklif alın.`,
    path: '/iletisim',
    image: '/beyvip/hero.png',
    keywords: [`${site.locationName.toLocaleLowerCase('tr-TR')} yeminli tercuman iletisim`, `${site.locationName.toLocaleLowerCase('tr-TR')} tercume telefonu`],
    site,
  });
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
