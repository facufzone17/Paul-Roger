import type { Metadata } from 'next'
import Link from 'next/link'

import { Icono } from '@/components/marca/Icono'

import s from './not-found.module.css'

export const metadata: Metadata = {
  title: 'Página no encontrada',
}

export default function NoEncontrada() {
  return (
    <section className={s.error} aria-labelledby="error-titulo">
      <Icono nombre="plato" alto={64} className={s.icono} />
      <p className="volanta">Error 404</p>
      <h1 id="error-titulo" className={s.titulo}>
        Esto no está en la carta.
      </h1>
      <p className={s.texto}>La página que buscás no existe o cambió de lugar. Pero la mesa sigue puesta.</p>
      <div className={s.acciones}>
        <Link href="/reservar" className="btn btn-primario btn-grande">
          Reservar
        </Link>
        <Link href="/" className="btn btn-grande">
          Volver al inicio
        </Link>
      </div>
      <nav aria-label="Páginas del sitio" className={s.links}>
        <Link href="/carta">Carta</Link>
        <Link href="/la-casa">La Casa</Link>
        <Link href="/eventos">Eventos</Link>
        <Link href="/sala-vip">Sala VIP</Link>
      </nav>
    </section>
  )
}
