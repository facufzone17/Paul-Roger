'use client'

import Link from 'next/link'

import { Glifo } from '@/components/marca/Icono'
import { Falta } from '@/components/ui/Falta'
import { ESCALONES } from '@/data/eventos'
import type { EscalonId } from '@/data/tipos'
import { cx } from '@/lib/formato'

import { useEscalon } from './EscalonContexto'
import s from './eventos.module.css'

const DESTINO: Record<EscalonId, string> = {
  'mesa-festejo': '#mesa-festejo',
  'salon-privado': '/sala-vip',
  exclusividad: '#exclusividad',
}

/**
 * Selector de 3 escalones con la capacidad visible (es el criterio real de decisión).
 * Al elegir uno queda recordado y llega precargado al formulario del final.
 * "Sala VIP" lleva a /sala-vip.
 */
export function SelectorEscalones() {
  const contexto = useEscalon()
  return (
    <ul role="list" className={s.escalones}>
      {ESCALONES.map((e) => {
        const elegido = contexto?.escalon === e.id
        const esPagina = e.id === 'salon-privado'
        return (
          <li key={e.id} className={cx(s.escalon, elegido && s.escalonElegido)}>
            <p className={s.escalonCapacidad}>{e.capacidad}</p>
            {e.capacidadFalta && <Falta>{e.capacidadFalta}</Falta>}
            <h3 className={s.escalonNombre}>{e.nombre}</h3>
            <p className={s.escalonResumen}>{e.resumen}</p>
            <Link
              href={DESTINO[e.id]}
              className={cx('link-flecha', s.escalonLink)}
              onClick={() => {
                if (!esPagina) contexto?.elegir(e.id)
              }}
            >
              <span>{esPagina ? 'Conocé la Sala VIP' : 'Ver el detalle'}</span>
              <Glifo tipo="flecha" />
            </Link>
            {elegido && (
              <span className={s.escalonMarca}>
                <Glifo tipo="check" className={s.escalonCheck} /> Elegido para tu consulta
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

/** Botón "Consultar por este": precarga el escalón y baja al formulario. */
export function ConsultarEscalon({ escalon, children }: { escalon: EscalonId; children: React.ReactNode }) {
  const contexto = useEscalon()
  return (
    <a href="#consulta" className="btn btn-primario" onClick={() => contexto?.elegir(escalon)}>
      {children}
      <Glifo tipo="flecha" />
    </a>
  )
}
