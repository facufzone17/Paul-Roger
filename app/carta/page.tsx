import type { Metadata } from 'next'
import Link from 'next/link'

import { Carta } from '@/components/carta/Carta'
import { Glifo, Icono } from '@/components/marca/Icono'
import { Apertura } from '@/components/ui/Apertura'
import { CierreReservar } from '@/components/ui/CierreReservar'
import { CARTA, FECHA_PRECIOS, MENU_EJECUTIVO, SERVICIO_DE_MESA } from '@/data/carta'
import { precio } from '@/lib/formato'

import s from './carta.module.css'

export const metadata: Metadata = {
  title: 'Carta',
  description:
    'La carta de Paul Roger en Hudson: parrilla y achuras, sushi, coctelería de autor, whiskies y más de 90 vinos que se filtran por uva. Precios actualizados.',
  alternates: { canonical: '/carta' },
}

export default function PaginaCarta() {
  return (
    <>
      <Apertura
        volanta="Carta"
        titulo="La carta"
        bajada={
          <>
            Cocina, sushi, barra y vinos, siempre al día. Precios de {FECHA_PRECIOS}. Servicio de mesa: {precio(SERVICIO_DE_MESA)} por persona.
          </>
        }
      />

      {/* Franja destacada del Menú ejecutivo, con su propia reserva */}
      <div className={`contenedor ${s.ejecutivoMarco}`}>
        <aside className={s.ejecutivo} aria-labelledby="ejecutivo-titulo">
          <div className={s.ejecutivoCabecera}>
            <Icono nombre="servicio" alto={40} className={s.ejecutivoIcono} />
            <div>
              <h2 id="ejecutivo-titulo" className={s.ejecutivoTitulo}>
                Menú ejecutivo
              </h2>
              <p className={s.ejecutivoHorario}>{MENU_EJECUTIVO.horario}</p>
            </div>
          </div>

          <ul role="list" className={s.ejecutivoOpciones}>
            {MENU_EJECUTIVO.opciones.map((op) => (
              <li key={op.id} className={s.ejecutivoOpcion}>
                <p className={s.ejecutivoOpcionNombre}>
                  {op.nombre}
                  <span className={s.ejecutivoOpcionDescripcion}> — {op.descripcion}</span>
                </p>
                <p className={s.ejecutivoOpcionPrecio}>{precio(op.precio)}</p>
              </li>
            ))}
          </ul>

          <p className={s.ejecutivoNota}>
            Postre a elección: {MENU_EJECUTIVO.postres.join(', ')}. {MENU_EJECUTIVO.incluye}
          </p>

          <div className={s.ejecutivoPie}>
            <p className={s.ejecutivoDescuento}>{MENU_EJECUTIVO.descuentoEfectivo}% off abonando en efectivo</p>
            <Link href="/reservar?tipo=ejecutivo" className="btn btn-primario">
              Reservar mediodía
              <Glifo tipo="flecha" />
            </Link>
          </div>
        </aside>
      </div>

      <Carta secciones={CARTA} />

      <CierreReservar titulo="¿Ya elegiste?" texto="Reservá tu mesa. ¿Querés el cochinillo entero? Pedilo en los comentarios de la reserva: se prepara solo con reserva." />
    </>
  )
}
