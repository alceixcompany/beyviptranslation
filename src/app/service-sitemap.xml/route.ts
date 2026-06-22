import { NextResponse } from 'next/server'
import { createUrlsetXml, serviceEntries } from '@/lib/sitemap'

export const revalidate = 3600

export function GET() {
  return new NextResponse(createUrlsetXml(serviceEntries), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}

