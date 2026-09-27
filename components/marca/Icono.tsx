/**
 * Íconos de "Elementos gráficos" del manual (pág. 19), servidos como sprite:
 * public/brand/iconos.svg. Se pintan con currentColor.
 */
export type NombreIcono =
  | 'servicio'
  | 'plato'
  | 'fuego'
  | 'coctel'
  | 'vino'
  | 'bife'
  | 'torta'
  | 'sushi'
  | 'cafe'
  | 'cerveza'
  | 'chef'
  | 'ubicacion'
  | 'instagram'
  | 'mail'
  | 'regalo'
  | 'flor'
  | 'reserva'

/** Ancho / alto de cada ícono, para que no se deforme. */
const PROPORCION: Record<NombreIcono, number> = {
  servicio: 0.961,
  plato: 1.51,
  fuego: 0.551,
  coctel: 0.842,
  vino: 0.675,
  bife: 0.881,
  torta: 1.03,
  sushi: 0.957,
  cafe: 0.915,
  cerveza: 0.849,
  chef: 1.132,
  ubicacion: 0.813,
  instagram: 1,
  mail: 1.361,
  regalo: 1,
  flor: 0.754,
  reserva: 2.411,
}

export function Icono({ nombre, alto = 24, className }: { nombre: NombreIcono; alto?: number; className?: string }) {
  return (
    <svg
      width={Math.round(alto * PROPORCION[nombre])}
      height={alto}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <use href={`/brand/iconos.svg#${nombre}`} />
    </svg>
  )
}

/** Glifos de interfaz: flecha, cerrar, menú, más, check. Trazo fino, como el manual. */
export function Glifo({ tipo, className }: { tipo: 'flecha' | 'cerrar' | 'menu' | 'mas' | 'check' | 'abajo'; className?: string }) {
  const trazos = {
    flecha: 'M4 12h15M13 6l6 6-6 6',
    cerrar: 'M6 6l12 12M18 6L6 18',
    menu: 'M3 8h18M3 16h18',
    mas: 'M12 5v14M5 12h14',
    check: 'M5 12.5l4.5 4.5L19 7.5',
    abajo: 'M12 4v15M6 13l6 6 6-6',
  }[tipo]
  return (
    <svg viewBox="0 0 24 24" className={className ?? 'flecha'} aria-hidden="true" focusable="false">
      <path d={trazos} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}
