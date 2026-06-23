import type { MetadataRoute } from 'next'
import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { siteConfig } from '@/lib/seo'
import type { SiteConfig } from '@/lib/domain-seo'

export type SitemapEntry = MetadataRoute.Sitemap[number]

function toDate(value: unknown): Date {
  if (!value) return new Date()
  if (value instanceof Date) return value
  if (typeof value === 'string' || typeof value === 'number') return new Date(value)
  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate()
  }
  return new Date()
}

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function absoluteSitemapUrl(path: string, site: SiteConfig = siteConfig) {
  return `${site.url}${path}`
}

export function getStaticPageEntries(site: SiteConfig = siteConfig): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteSitemapUrl('/hizmetlerimiz', site),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteSitemapUrl('/hizmet-bolgelerimiz', site),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteSitemapUrl('/galeri', site),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteSitemapUrl('/haberler', site),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: absoluteSitemapUrl('/hakkimizda', site),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: absoluteSitemapUrl('/iletisim', site),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}

export const staticPageEntries = getStaticPageEntries();

export function getServiceEntries(site: SiteConfig = siteConfig): MetadataRoute.Sitemap {
  return [
    '/hizmetlerimiz/pasaport-tercumesi',
    '/hizmetlerimiz/yeminli-tercume',
    '/hizmetlerimiz/noter-onayli-tercume',
    '/hizmetlerimiz/diploma-transkript-tercumesi',
    '/hizmetlerimiz/vize-evraklari-tercumesi',
    '/hizmetlerimiz/hukuki-tercume',
  ].map((path) => ({
    url: absoluteSitemapUrl(path, site),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
}

export const serviceEntries = getServiceEntries();

export async function getNewsEntries(site: SiteConfig = siteConfig): Promise<MetadataRoute.Sitemap> {
  const newsSnapshot = await getDocs(query(collection(db, 'haberler'), where('isActive', '==', true)))

  return newsSnapshot.docs
    .map((doc: DocumentData): SitemapEntry | null => {
      const data = doc.data()
      const slug = data.slug || createSlug(data.title || '')

      if (!slug) return null

      return {
        url: absoluteSitemapUrl(`/haberler/${slug}`, site),
        lastModified: toDate(data.updatedAt || data.createdAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      }
    })
    .filter((entry): entry is SitemapEntry => Boolean(entry))
}

export async function getServiceAreaEntries(site: SiteConfig = siteConfig): Promise<MetadataRoute.Sitemap> {
  const serviceAreasSnapshot = await getDocs(
    query(collection(db, 'hizmet_bolgeleri'), where('isActive', '==', true))
  )

  return serviceAreasSnapshot.docs
    .map((doc: DocumentData): SitemapEntry | null => {
      const data = doc.data()
      const slug = data.slug || createSlug(data.name || '')

      if (!slug) return null

      return {
        url: absoluteSitemapUrl(`/hizmet-bolgelerimiz/${slug}`, site),
        lastModified: toDate(data.updatedAt || data.createdAt),
        changeFrequency: 'monthly',
        priority: 0.8,
      }
    })
    .filter((entry): entry is SitemapEntry => Boolean(entry))
}

export async function getAllSitemapEntries(site: SiteConfig = siteConfig): Promise<MetadataRoute.Sitemap> {
  try {
    const [newsEntries, serviceAreaEntries] = await Promise.all([
      getNewsEntries(site),
      getServiceAreaEntries(site),
    ])

    return [
      ...getStaticPageEntries(site),
      ...getServiceEntries(site),
      ...newsEntries,
      ...serviceAreaEntries,
    ]
  } catch (error) {
    console.error('Sitemap oluşturulurken hata:', error)
    return [...getStaticPageEntries(site), ...getServiceEntries(site)]
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function createUrlsetXml(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((entry) => {
      const lastModified = entry.lastModified ? new Date(entry.lastModified).toISOString() : undefined

      return [
        '<url>',
        `<loc>${escapeXml(entry.url)}</loc>`,
        lastModified ? `<lastmod>${lastModified}</lastmod>` : '',
        entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : '',
        typeof entry.priority === 'number' ? `<priority>${entry.priority}</priority>` : '',
        '</url>',
      ].filter(Boolean).join('')
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
}
