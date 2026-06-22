import { NextResponse } from 'next/server'
import { createUrlsetXml, getServiceAreaEntries } from '@/lib/sitemap'

export const revalidate = 3600

export async function GET() {
  try {
    return new NextResponse(createUrlsetXml(await getServiceAreaEntries()), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Service area sitemap oluşturulurken hata:', error)
    return new NextResponse(createUrlsetXml([]), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    })
  }
}
