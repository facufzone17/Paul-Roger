import Link from 'next/link'

import { Glifo } from '@/components/marca/Icono'
import { Foto } from '@/components/ui/Foto'
import { FOTOS } from '@/lib/imagenes'

import { Complementos } from './Complementos'
import s from './Eventos.module.css'

/**
 * Sección 4 de la home: Banner 1 (eventos en general → /eventos) y Banner 2
 * (Flores 20% · Chocolates 20% · Limousine 60%, con card desplegable).
 */
export function Eventos() {
  return (
    <section className={s.eventos} aria-labelledby="eventos-titulo">
      <div className={s.marco}>
        <article className={s.banner}>
          <Foto foto={FOTOS.eventosFachada} sizes="(min-width: 1400px) 1360px, 100vw" capa="fuerte" className={s.bannerFoto} posicion="60% 50%" />
          <div className={s.bannerTexto} data-reveal>
            <p className="volanta">Eventos</p>
            <h2 id="eventos-titulo" className="titulo-2">
              Tu celebración, pensada de principio a fin
            </h2>
            <ul role="list" className={s.tipos}>
              <li>Cumpleaños</li>
              <li>Cenas de empresa</li>
              <li>La casa entera, solo para ustedes</li>
            </ul>
            <Link href="/eventos" className="btn">
              Conocé los eventos
              <Glifo tipo="flecha" />
            </Link>
          </div>
        </article>

        <div className={s.complementos}>
          <div className={s.complementosTexto} data-reveal>
            <p className="volanta">Para sumar a tu reserva</p>
            <h3 className="titulo-3">Flores, bombones y una limousine en la puerta</h3>
            <p className={s.nota}>Se piden al reservar y se abonan en la mesa.</p>
          </div>
          <Complementos />
        </div>
      </div>
    </section>
  )
}
