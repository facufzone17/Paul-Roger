import type { MetadataRoute } from 'next'

import { SITIO } from '@/data/sitio'

/** La maqueta no se indexa. Al publicar en paulroger.com.ar se activa con NEXT_PUBLIC_INDEXAR=si. */
export default function robots(): MetadataRoute.Robots {
  const indexar = process.env.NEXT_PUBLIC_INDEXAR === 'si'
  return {
    rules: indexar ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    sitemap: `${SITIO.url}/sitemap.xml`,
  }
}
