import { SITIO } from '@/data/sitio'

/** Schema Restaurant para SEO local (Hudson, Polo Design, parrilla, sushi). */
export function restauranteJsonLd() {
  const d = SITIO.direccion
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITIO.url}/#restaurante`,
    name: `${SITIO.nombre} — ${SITIO.claim}`,
    alternateName: SITIO.nombre,
    description: SITIO.descripcion,
    url: SITIO.url,
    image: `${SITIO.url}/opengraph-image.jpg`,
    logo: `${SITIO.url}/brand/logo-horizontal.svg`,
    email: SITIO.email,
    servesCuisine: ['Parrilla', 'Sushi', 'Coctelería'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: d.calle,
      addressLocality: d.localidad,
      addressRegion: d.provincia,
      addressCountry: d.codigoPais,
    },
    areaServed: ['Guillermo E. Hudson', 'Berazategui', 'Zona Sur del Gran Buenos Aires'],
    menu: `${SITIO.url}/carta`,
    hasMenu: `${SITIO.url}/carta`,
    acceptsReservations: `${SITIO.url}/reservar`,
    sameAs: [SITIO.instagram.url],
    openingHoursSpecification: SITIO.horarios.turnos.map((t) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: t.schema,
      opens: t.abre,
      closes: t.cierra,
    })),
  }
}

export function JsonLd({ datos }: { datos: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datos).replace(/</g, '\\u003c') }} />
}
