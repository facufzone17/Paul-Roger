import Link from 'next/link'

import { Icono } from '@/components/marca/Icono'

import s from './CierreReservar.module.css'

/** Cierre de página con la acción primaria: RESERVAR. */
export function CierreReservar({
  titulo = 'Te guardamos la mesa.',
  texto = 'Elegí día, horario y cuántos son. Si es una ocasión especial, contanos y lo preparamos.',
  href = '/reservar',
  cta = 'Reservar',
}: {
  titulo?: string
  texto?: string
  href?: string
  cta?: string
}) {
  return (
    <section className={s.cierre} aria-label="Reservar">
      <div className={`contenedor ${s.interior}`} data-reveal>
        <Icono nombre="reserva" alto={34} className={s.firma} />
        <p className={s.titulo}>{titulo}</p>
        <p className={s.texto}>{texto}</p>
        <Link href={href} className="btn btn-primario btn-grande">
          {cta}
        </Link>
      </div>
    </section>
  )
}
