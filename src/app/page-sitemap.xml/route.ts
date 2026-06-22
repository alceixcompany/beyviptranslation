import { NextResponse } from 'next/server'
import { createUrlsetXml, staticPageEntries } from '@/lib/sitemap'

export const revalidate = 3600

export function GET() {
  return new NextResponse(createUrlsetXml(staticPageEntries), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}

