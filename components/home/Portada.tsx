import { getImageProps } from 'next/image'
import Link from 'next/link'

import { Glifo } from '@/components/marca/Icono'
import { LogoInline } from '@/components/marca/LogoInline'
import { SITIO } from '@/data/sitio'
import { FOTOS } from '@/lib/imagenes'

import s from './Portada.module.css'

/**
 * Portada: la única foto a pantalla completa del sitio. Recorte horizontal en
 * escritorio y vertical en el celular (art direction), tratada en oscuro.
 * Logo, "Bienvenidos a casa" y una sola acción: Reservar.
 */
export function Portada() {
  const comun = { alt: FOTOS.heroDesktop.alt, sizes: '100vw', quality: 70 as const }
  const {
    props: { srcSet: escritorio },
  } = getImageProps({ ...comun, src: FOTOS.heroDesktop.src })
  const {
    props: { srcSet: celular, ...img },
  } = getImageProps({ ...comun, src: FOTOS.heroMobile.src, loading: 'eager', fetchPriority: 'high' })

  return (
    <section className={s.portada} aria-labelledby="portada-titulo">
      <picture>
        <source media="(min-width: 768px)" srcSet={escritorio} sizes="100vw" />
        <source media="(max-width: 767px)" srcSet={celular} sizes="100vw" />
        <img {...img} alt={FOTOS.heroDesktop.alt} className={s.foto} />
      </picture>
      <div className={s.capa} aria-hidden="true" />

      <div className={s.contenido}>
        <h1 id="portada-titulo" className={s.titulo}>
          <span className="visually-hidden">
            {SITIO.nombre} — {SITIO.claim}.{' '}
          </span>
          <LogoInline className={s.logo} />
          <span className={s.frase}>{SITIO.frase}</span>
        </h1>
        <p className={s.que}>Parrilla, sushi y coctelería de autor en Polo Design, Hudson.</p>
        <Link href="/reservar" className={`btn btn-primario btn-grande ${s.cta}`}>
          Reservar
        </Link>
      </div>

      <a href="#la-casa" className={s.conocer}>
        <Glifo tipo="abajo" className={s.conocerIcono} />
        Conocer
      </a>
    </section>
  )
}
