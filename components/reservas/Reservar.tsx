'use client'

import { useRef, useState } from 'react'

import { TIPOS_RESERVA, type OcasionId, type TipoReserva } from '@/data/reservas'
import type { ComplementoId, EscalonId } from '@/data/tipos'
import { cx } from '@/lib/formato'

import { FormEjecutivo } from './FormEjecutivo'
import { FormEvento } from './FormEvento'
import { FormLimousine } from './FormLimousine'
import { FormMesa } from './FormMesa'
import s from './reservas.module.css'

interface Props {
  tipoInicial: TipoReserva
  extras: ComplementoId[]
  ocasionInicial: OcasionId
  escalonInicial: EscalonId | null
}

/**
 * Motor de reservas: cuatro pestañas (Mesa · Evento · Limousine · Menú ejecutivo),
 * preseleccionadas desde la URL (?tipo=, ?extra=, ?escalon=). Los cuatro formularios
 * quedan montados para no perder lo escrito al cambiar de pestaña.
 */
export function Reservar({ tipoInicial, extras, ocasionInicial, escalonInicial }: Props) {
  const [tipo, setTipo] = useState<TipoReserva>(tipoInicial)
  const pestanas = useRef<(HTMLButtonElement | null)[]>([])

  const elegir = (nuevo: TipoReserva, enfocar = false) => {
    setTipo(nuevo)
    const url = new URL(window.location.href)
    url.searchParams.set('tipo', nuevo)
    window.history.replaceState(null, '', url)
    if (enfocar) pestanas.current[TIPOS_RESERVA.findIndex((t) => t.id === nuevo)]?.focus()
  }

  const alTeclado = (e: React.KeyboardEvent, i: number) => {
    const n = TIPOS_RESERVA.length
    const destino = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key]
    if (destino === undefined) return
    e.preventDefault()
    elegir(TIPOS_RESERVA[destino].id, true)
  }

  return (
    <div className={s.motor}>
      <div role="tablist" aria-label="Qué querés reservar" className={s.tabs}>
        {TIPOS_RESERVA.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              pestanas.current[i] = el
            }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tipo === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tipo === t.id ? 0 : -1}
            className={cx(s.tab, tipo === t.id && s.tabActiva)}
            onClick={() => elegir(t.id)}
            onKeyDown={(e) => alTeclado(e, i)}
          >
            {t.titulo}
          </button>
        ))}
      </div>

      <div role="tabpanel" id="panel-mesa" aria-labelledby="tab-mesa" hidden={tipo !== 'mesa'} className={s.panel}>
        <FormMesa extras={extras} ocasionInicial={ocasionInicial} onPasarAEvento={() => elegir('evento', true)} />
      </div>
      <div role="tabpanel" id="panel-evento" aria-labelledby="tab-evento" hidden={tipo !== 'evento'} className={s.panel}>
        <FormEvento escalonInicial={escalonInicial} />
      </div>
      <div role="tabpanel" id="panel-limousine" aria-labelledby="tab-limousine" hidden={tipo !== 'limousine'} className={s.panel}>
        <FormLimousine />
      </div>
      <div role="tabpanel" id="panel-ejecutivo" aria-labelledby="tab-ejecutivo" hidden={tipo !== 'ejecutivo'} className={s.panel}>
        <FormEjecutivo />
      </div>
    </div>
  )
}
