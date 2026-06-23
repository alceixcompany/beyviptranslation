import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createSeoMetadata } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getRequestSiteConfig();

  return createSeoMetadata({
    title: `${site.locationName} Tercüme Haberleri`,
    description: `${site.name} yeminli tercüme, noter onaylı tercüme, vize evrakları ve resmi belge süreçleri hakkında güncel içerikler.`,
    path: '/haberler',
    image: '/beyvip/hero.png',
    keywords: [`${site.locationName.toLocaleLowerCase('tr-TR')} tercume haberleri`],
    site,
  });
}

export default function NewsLayout({ children }: { children: ReactNode }) {
  return children;
}
