import type { Metadata } from 'next'

import { Reservar } from '@/components/reservas/Reservar'
import { Foto } from '@/components/ui/Foto'
import { esComplementoId } from '@/data/complementos'
import { esEscalonId } from '@/data/eventos'
import { esOcasionId, esTipoReserva, type OcasionId, type TipoReserva } from '@/data/reservas'
import type { ComplementoId } from '@/data/tipos'
import { FOTOS } from '@/lib/imagenes'

import s from './reservar.module.css'

export const metadata: Metadata = {
  title: 'Reservar',
  description: 'Reservá tu mesa en Paul Roger, Polo Design, Hudson. También eventos, Sala VIP, limousine y menú ejecutivo, con todos los datos en un solo lugar.',
  alternates: { canonical: '/reservar' },
}

const primero = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)

/**
 * /reservar: el único lugar del sitio donde se piden datos.
 * ?tipo=mesa|evento|limousine|ejecutivo · ?extra=flores|chocolates|pistachos|limousine
 * ?escalon=mesa-festejo|salon-privado|exclusividad · ?ocasion=aniversario|cumpleanos|…
 */
export default async function PaginaReservar({ searchParams }: PageProps<'/reservar'>) {
  const params = await searchParams
  const extras = String(primero(params.extra) ?? '')
    .split(',')
    .filter(esComplementoId) as ComplementoId[]
  const tipoParam = primero(params.tipo)
  const tipo: TipoReserva = esTipoReserva(tipoParam) ? tipoParam : 'mesa'
  const ocasionParam = primero(params.ocasion)
  // Quien llega a sumar flores o bombones está festejando algo: la ocasión arranca en "Celebración".
  const ocasion: OcasionId = esOcasionId(ocasionParam) ? ocasionParam : extras.length ? 'celebracion' : 'cena'
  const escalonParam = primero(params.escalon)
  const escalon = esEscalonId(escalonParam) ? escalonParam : null

  return (
    <>
      <header className={s.cabecera}>
        <Foto foto={FOTOS.fondoReservar} sizes="(min-width: 900px) 50vw, 100vw" capa="fuerte" decorativa prioridad className={s.fondo} posicion="50% 60%" />
        <div className={`contenedor ${s.texto}`}>
          <p className="volanta">Reservar</p>
          <h1 className="titulo-1">Reservá en Paul Roger</h1>
          <p className="bajada">Mesa, evento, limousine o menú ejecutivo. Todo desde acá, con los datos completos y sin idas y vueltas por mensajes.</p>
        </div>
      </header>
      <div className={`contenedor ${s.cuerpo}`}>
        <Reservar tipoInicial={tipo} extras={extras} ocasionInicial={ocasion} escalonInicial={escalon} />
      </div>
    </>
  )
}
