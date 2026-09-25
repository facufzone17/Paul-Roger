import type { Metadata, Viewport } from 'next'
import { Montserrat, Prata } from 'next/font/google'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Revelar } from '@/components/layout/Revelar'
import { ScrollSuave } from '@/components/layout/ScrollSuave'
import { SITIO } from '@/data/sitio'

import './globals.css'

/* Títulos: IvyMode según el manual. Mientras no se confirme Creative Cloud, Prata (libre).
   Para cambiarla alcanza con reemplazar esta fuente: todo el sitio lee --fuente-titulos. */
const prata = Prata({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-prata' })
const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', variable: '--font-montserrat' })

/** La maqueta no se indexa. Al publicar en paulroger.com.ar: NEXT_PUBLIC_INDEXAR=si */
const indexar = process.env.NEXT_PUBLIC_INDEXAR === 'si'

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: {
    default: 'Paul Roger — Brasas & Cocktail · Parrilla, sushi y coctelería en Hudson',
    template: '%s · Paul Roger — Brasas & Cocktail',
  },
  description: SITIO.descripcion,
  applicationName: 'Paul Roger',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Paul Roger — Brasas & Cocktail',
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  robots: indexar ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#1d1d1b',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" data-scroll-behavior="smooth" className={`${prata.variable} ${montserrat.variable}`}>
      <body>
        <a href="#contenido" className="saltar">
          Saltar al contenido
        </a>
        <ScrollSuave />
        <Header />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Revelar />
      </body>
    </html>
  )
}
