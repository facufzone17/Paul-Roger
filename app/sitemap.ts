import type { MetadataRoute } from 'next'

import { SITIO } from '@/data/sitio'

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas: { ruta: string; prioridad: number; frecuencia: 'weekly' | 'monthly' }[] = [
    { ruta: '', prioridad: 1, frecuencia: 'weekly' },
    { ruta: '/reservar', prioridad: 0.9, frecuencia: 'monthly' },
    { ruta: '/carta', prioridad: 0.9, frecuencia: 'weekly' },
    { ruta: '/la-casa', prioridad: 0.7, frecuencia: 'weekly' },
    { ruta: '/eventos', prioridad: 0.8, frecuencia: 'monthly' },
    { ruta: '/private-dining', prioridad: 0.8, frecuencia: 'monthly' },
    { ruta: '/nosotros', prioridad: 0.5, frecuencia: 'monthly' },
  ]
  return rutas.map((r) => ({
    url: `${SITIO.url}${r.ruta}`,
    lastModified: new Date('2026-09-25'),
    changeFrequency: r.frecuencia,
    priority: r.prioridad,
  }))
}
