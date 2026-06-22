import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
      ],
    },
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/page-sitemap.xml`,
      `${siteConfig.url}/service-sitemap.xml`,
      `${siteConfig.url}/news-sitemap.xml`,
      `${siteConfig.url}/service-area-sitemap.xml`,
    ],
    host: siteConfig.url,
  }
}
