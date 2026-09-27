import Link from 'next/link'

import { Glifo, Icono } from '@/components/marca/Icono'
import { Falta } from '@/components/ui/Falta'
import { Foto } from '@/components/ui/Foto'
import { AGENDA, fechaLarga } from '@/data/agenda'
import { FOTOS } from '@/lib/imagenes'

import s from './LaCasa.module.css'

/**
 * La Casa (referencia de layout: QITCHEN). Un panel grande y tres tarjetas:
 * BARRA → /la-casa#barra · VIP → /private-dining · MÚSICA EN VIVO → /la-casa#musica.
 */
export function LaCasa() {
  const proxima = AGENDA[0]
  const f = proxima ? fechaLarga(proxima.fecha) : null

  return (
    <section id="la-casa" className={s.casa} aria-labelledby="casa-titulo">
      <div className={s.grilla}>
        <div className={s.principal}>
          <Foto foto={FOTOS.casaBarra} sizes="(min-width: 1024px) 68vw, 100vw" capa="base" className={s.fondo} posicion="50% 45%" />
          <div className={s.principalTexto} data-reveal>
            <p className="volanta">Polo Design · Hudson</p>
            <h2 id="casa-titulo" className={s.mega}>
              La casa
            </h2>
            <p className={s.lead}>Brasas a la vista, una barra de autor y música en vivo. Una casa pensada para que la noche no tenga apuro.</p>
            <Link href="/la-casa" className="link-flecha">
              <span>Conocé la casa</span>
              <Glifo tipo="flecha" />
            </Link>
          </div>
        </div>

        <ul role="list" className={s.tarjetas}>
          <li>
            <Link href="/la-casa#barra" className={s.tarjeta}>
              <Foto foto={FOTOS.casaVinos} sizes="(min-width: 1024px) 30vw, (min-width: 700px) 33vw, 100vw" capa="suave" decorativa className={s.fondo} posicion="50% 35%" />
              <span className={s.detalle}>Coctelería de autor y pared de vinos</span>
              <Etiqueta>Barra</Etiqueta>
            </Link>
          </li>
          <li>
            <Link href="/private-dining" className={`${s.tarjeta} ${s.vacia} ${s.tinto}`}>
              <Icono nombre="servicio" alto={120} className={s.marcaAgua} />
              <span className={s.aviso}>
                <Falta>foto del Salón Privado</Falta>
              </span>
              <span className={s.detalle}>Private Dining · salón privado para hasta 16 personas</span>
              <Etiqueta>VIP</Etiqueta>
            </Link>
          </li>
          <li>
            <Link href="/la-casa#musica" className={`${s.tarjeta} ${s.vacia} ${s.tierra}`}>
              <span className={s.aviso}>
                <Falta>foto de música en vivo</Falta>
              </span>
              {proxima && f && (
                <span className={s.agenda}>
                  <span className={s.agendaVolanta}>
                    Próxima fecha <span className="ejemplo">Ejemplo</span>
                  </span>
                  <span className={s.agendaFecha}>
                    {f.dia} {f.numero} de {f.mes}
                  </span>
                  <span className={s.agendaHora}>
                    {proxima.hora} · {proxima.formato}
                  </span>
                </span>
              )}
              <Etiqueta>Música en vivo</Etiqueta>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

/** Solapa recortada en la esquina, como en la referencia. */
function Etiqueta({ children }: { children: React.ReactNode }) {
  return (
    <span className={s.etiqueta}>
      <span className={s.etiquetaTexto}>{children}</span>
      <span className={s.etiquetaFlecha}>
        <Glifo tipo="flecha" />
      </span>
    </span>
  )
}
