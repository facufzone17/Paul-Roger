import Image from 'next/image'

import type { Foto as TipoFoto } from '@/lib/imagenes'
import { cx } from '@/lib/formato'

import s from './Foto.module.css'

interface Props {
  foto: TipoFoto
  /** Ancho que ocupa en pantalla: el navegador elige el tamaño justo del srcset. */
  sizes: string
  /** Degradé del manual (pág. 21): negro o rojo sobre la foto para ganar contraste. */
  capa?: 'ninguna' | 'suave' | 'base' | 'fuerte' | 'lateral' | 'roja'
  className?: string
  /** Solo para la imagen principal de la pantalla (LCP). */
  prioridad?: boolean
  /** Si la foto acompaña un texto que ya la describe, se oculta a lectores de pantalla. */
  decorativa?: boolean
  posicion?: string
  calidad?: 60 | 70 | 75 | 80
}

/** Foto en un bloque: llena su contenedor, con el tratamiento oscuro del manual. */
export function Foto({ foto, sizes, capa = 'base', className, prioridad, decorativa, posicion, calidad = 70 }: Props) {
  return (
    <div className={cx(s.marco, className)} data-capa={capa}>
      <Image
        src={foto.src}
        alt={decorativa ? '' : foto.alt}
        fill
        sizes={sizes}
        quality={calidad}
        preload={prioridad}
        className={s.img}
        style={posicion ? { objectPosition: posicion } : undefined}
      />
    </div>
  )
}
