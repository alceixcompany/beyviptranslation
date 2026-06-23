import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createSeoMetadata } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';

type Props = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const [{ slug }, site] = await Promise.all([params, getRequestSiteConfig()]);
  const title = titleFromSlug(slug);

  return createSeoMetadata({
    title,
    description: `${site.name} blog: ${title}. Yeminli tercüme, noter onaylı tercüme ve resmi evrak süreçleri hakkında bilgi alın.`,
    path: `/haberler/${slug}`,
    image: '/beyvip/hero.png',
    keywords: [title.toLocaleLowerCase('tr-TR'), `${site.locationName.toLocaleLowerCase('tr-TR')} tercume`],
    type: 'article',
    site,
  });
}

export default function NewsDetailLayout({ children }: Props) {
  return children;
}
