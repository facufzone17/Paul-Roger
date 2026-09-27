'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useId, useState } from 'react'

import { Glifo } from '@/components/marca/Icono'
import { FOTOS, type Foto } from '@/lib/imagenes'
import { cx, precio } from '@/lib/formato'

import s from './Complementos.module.css'

type FranjaId = 'flores' | 'chocolates' | 'limousine'

const FRANJAS: { id: FranjaId; nombre: string; texto: string; precios: string; cta: string; href: string; foto: Foto; base: number }[] = [
  {
    id: 'flores',
    nombre: 'Flores',
    texto: 'Un ramo de nuestro stand de flores, listo para cuando llegan. Para un aniversario, un cumpleaños o una pregunta importante.',
    precios: `Ramo pequeño ${precio(18900)} · grande ${precio(30000)}`,
    cta: 'Sumar a mi reserva',
    href: '/reservar?extra=flores',
    foto: FOTOS.complementoFlores,
    base: 20,
  },
  {
    id: 'chocolates',
    nombre: 'Chocolates',
    texto: 'Bombones belgas artesanales, exclusivos para Paul Roger. Para cerrar la noche o para regalar.',
    precios: `Cajas de 6, 12 o 20 · desde ${precio(19900)}`,
    cta: 'Sumar a mi reserva',
    href: '/reservar?extra=chocolates',
    foto: FOTOS.complementoChocolates,
    base: 20,
  },
  {
    id: 'limousine',
    nombre: 'Limousine',
    texto:
      'Llegar en limousine, con chofer privado. Es un solo vehículo: coordinamos trayecto y horario y te pasamos el precio antes de confirmar.',
    precios: 'Siempre a consultar',
    cta: 'Consultar',
    href: '/reservar?tipo=limousine',
    foto: FOTOS.complementoLimousine,
    base: 60,
  },
]

/**
 * Banner 2: tres franjas (20% · 20% · 60%). Al tocar una se despliega su card
 * con texto y CTA. Flores y chocolates llegan a /reservar con el complemento
 * tildado; la limousine siempre es una consulta, nunca se agrega directo.
 */
export function Complementos() {
  const [abierta, setAbierta] = useState<FranjaId | null>(null)
  const base = useId()

  return (
    <div className={s.franjas} data-abierta={abierta ?? 'ninguna'}>
      {FRANJAS.map((f) => {
        const estaAbierta = abierta === f.id
        const peso = abierta ? (estaAbierta ? 60 : 20) : f.base
        const idCard = `${base}-${f.id}`
        return (
          <div key={f.id} className={cx(s.franja, estaAbierta && s.abierta)} style={{ '--peso': peso } as React.CSSProperties}>
            <Image src={f.foto.src} alt="" fill sizes="(min-width: 900px) 60vw, 100vw" quality={70} className={s.img} />
            <button
              type="button"
              className={s.cabecera}
              aria-expanded={estaAbierta}
              aria-controls={idCard}
              onClick={() => setAbierta(estaAbierta ? null : f.id)}
            >
              <span className={s.nombre}>{f.nombre}</span>
              <span className={s.signo}>
                <Glifo tipo={estaAbierta ? 'cerrar' : 'mas'} />
              </span>
            </button>
            <div id={idCard} role="region" aria-label={f.nombre} className={s.card} hidden={!estaAbierta}>
              <p className={s.texto}>{f.texto}</p>
              <p className={s.precios}>{f.precios}</p>
              <Link href={f.href} className="btn btn-primario">
                {f.cta}
                <Glifo tipo="flecha" />
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
