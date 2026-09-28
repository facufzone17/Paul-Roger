import { Glifo, Icono } from '@/components/marca/Icono'
import { MONOGRAMA_D } from '@/components/marca/Monograma'
import { SITIO } from '@/data/sitio'
import { cx } from '@/lib/formato'

import { MAPA } from './mapaDatos'
import s from './MapaUbicacion.module.css'

const BADGE = 80
const ESCALA_BADGE = BADGE / 130.86 // el monograma viene dibujado en la caja de app/icon.svg
const LOGO_ANCHO = 160
const LOGO_ALTO = LOGO_ANCHO / (270.48 / 98.37)
const CLASE_ETIQUETA = { calle: s.etiqueta, ruta: s.etiquetaRuta, zona: s.etiquetaZona }

/**
 * Mapa del local en dorado sobre negro, con datos abiertos (ver scripts/generar_mapa.py)
 * y el mismo encuadre que Google Maps. No es un iframe: todo el bloque es un link
 * que abre la ubicación en Google Maps.
 */
export function MapaUbicacion() {
  const { x, y } = MAPA.local

  return (
    <div className={s.marco}>
      <a
        href={SITIO.comoLlegar}
        target="_blank"
        rel="noopener noreferrer"
        className={s.mapa}
        aria-label="Ver Paul Roger en Google Maps: Polo Hudson, Calle 47 6750, Hudson (se abre en otra pestaña)"
      >
        <svg
          viewBox={`0 0 ${MAPA.ancho} ${MAPA.alto}`}
          preserveAspectRatio="xMidYMid slice"
          className={s.svg}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="mapa-oro" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={MAPA.ancho} y2={MAPA.alto}>
              <stop offset="0" className={s.oroHondo} />
              <stop offset="0.3" className={s.oroClaro} />
              <stop offset="0.52" className={s.oroMedio} />
              <stop offset="0.76" className={s.oroClaro} />
              <stop offset="1" className={s.oroHondo} />
            </linearGradient>
            {MAPA.etiquetas.map((e) => (
              <path key={e.id} id={`mapa-${e.id}`} d={e.d} />
            ))}
          </defs>

          <rect width={MAPA.ancho} height={MAPA.alto} className={s.fondo} />
          <path d={MAPA.polo} className={s.poloFondo} />
          <path d={MAPA.edificios} className={s.edificios} />
          <path d={MAPA.calles.servicio} className={cx(s.calle, s.servicio)} />
          <path d={MAPA.calles.local} className={cx(s.calle, s.calleLocal)} />
          <path d={MAPA.calles.principal} className={cx(s.calle, s.principal)} />
          <path d={MAPA.calles.ramal} className={cx(s.calle, s.ramal)} />
          <path d={MAPA.calles.autopista} className={cx(s.calle, s.autopista)} />

          {/* Polo Hudson se recorta: lo de afuera se apaga un poco y el cerco se marca */}
          <path
            d={`M0 0H${MAPA.ancho}V${MAPA.alto}H0Z ${MAPA.polo}`}
            fillRule="evenodd"
            className={s.afueraDelPolo}
          />
          <path d={MAPA.polo} className={s.poloCerco} />

          {MAPA.escudos.map((e) => (
            <g key={`${e.x}-${e.y}`} transform={`translate(${e.x} ${e.y})`}>
              <rect x="-19" y="-15" width="38" height="30" rx="6" className={s.escudo} />
              <text dy="0.36em" textAnchor="middle" className={s.escudoTexto}>
                1
              </text>
            </g>
          ))}

          {MAPA.etiquetas.map((e) => (
            <text key={e.id} dy="0.36em" className={CLASE_ETIQUETA[e.tipo]}>
              <textPath href={`#mapa-${e.id}`} startOffset="50%" textAnchor="middle">
                {e.texto.toLocaleUpperCase('es-AR')}
              </textPath>
            </text>
          ))}

          {/* El monograma va centrado en el punto exacto; el logotipo, al lado */}
          <g className={s.local} style={{ '--x': `${x}px`, '--y': `${y}px` } as React.CSSProperties}>
            <circle r={BADGE / 2} className={s.pulso} />
              <g className={s.pin}>
                <rect x={-BADGE / 2} y={-BADGE / 2} width={BADGE} height={BADGE} rx="16" className={s.badge} />
                <g transform={`translate(${-BADGE / 2} ${-BADGE / 2}) scale(${ESCALA_BADGE}) translate(26.36 17.32)`}>
                  <path d={MONOGRAMA_D} className={s.monograma} />
                </g>
              </g>
              <rect
                x={BADGE / 2 + 10}
                y={-LOGO_ALTO / 2 - 11}
                width={LOGO_ANCHO + 26}
                height={LOGO_ALTO + 22}
                rx="14"
                className={s.placa}
              />
              <image
                href="/brand/logo-horizontal.svg"
                x={BADGE / 2 + 23}
                y={-LOGO_ALTO / 2}
                width={LOGO_ANCHO}
                height={LOGO_ALTO}
              />
          </g>
        </svg>

        <span className={s.chip}>
          <Icono nombre="ubicacion" alto={16} />
          Ver en Google Maps
          <Glifo tipo="flecha" className={cx('flecha', s.chipFlecha)} />
        </span>
      </a>

      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
        className={s.atribucion}
      >
        © OpenStreetMap · Microsoft<span className="visually-hidden"> (se abre en otra pestaña)</span>
      </a>
    </div>
  )
}
