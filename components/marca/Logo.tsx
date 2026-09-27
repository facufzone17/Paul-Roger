/* eslint-disable @next/next/no-img-element -- SVG vectorial del manual: no pasa por el optimizador */

/** Proporción del logo horizontal del manual (script "Paul Roger" + claim). */
const PROPORCION = 270.48 / 98.37

interface Props {
  /** color: script rojo + claim blanco (sobre negro, manual pág. 13). blanco: versión negativa. */
  variante?: 'color' | 'blanco'
  ancho: number
  /** Vacío cuando el logo acompaña un texto que ya dice "Paul Roger". */
  alt?: string
  className?: string
  prioridad?: boolean
}

/**
 * El logotipo es un script manuscrito: se usa siempre el archivo del manual,
 * nunca se escribe con una fuente. Sin efectos, sin dorado ni plateado.
 */
export function Logo({ variante = 'color', ancho, alt = 'Paul Roger — Brasas & Cocktail', className, prioridad }: Props) {
  return (
    <img
      src={variante === 'color' ? '/brand/logo-horizontal.svg' : '/brand/logo-horizontal-blanco.svg'}
      width={ancho}
      height={Math.round(ancho / PROPORCION)}
      alt={alt}
      className={className}
      decoding="async"
      fetchPriority={prioridad ? 'high' : undefined}
      loading={prioridad ? 'eager' : undefined}
    />
  )
}
