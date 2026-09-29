import Link from 'next/link'

import { Glifo, Icono } from '@/components/marca/Icono'
import { Logo } from '@/components/marca/Logo'
import { Monograma } from '@/components/marca/Monograma'
import { SERVICIOS_FOOTER, SITIO } from '@/data/sitio'

import { MapaUbicacion } from './MapaUbicacion'
import s from './Footer.module.css'

/**
 * Contacto + pie, en todas las páginas: mapa del local, dirección, horarios y mail.
 * Sin formulario y sin iframe de Google Maps: todo el tráfico con intención va a /reservar,
 * y el mapa abre la ubicación en una pestaña nueva.
 */
export function Footer() {
  const d = SITIO.direccion
  return (
    <footer className={s.pie} id="contacto">
      <div className={`contenedor ${s.contacto}`}>
        <MapaUbicacion />

        <div className={s.datos} data-reveal>
          <h2 className={s.titulo}>Visitanos</h2>

          <div className={s.divisor} aria-hidden="true">
            <Monograma alto={26} />
          </div>

          <dl className={s.lista}>
            <div>
              <dt>Dónde</dt>
              <dd>
                <address>
                  {d.calle}, {d.zona}
                  <br />
                  {d.localidad}, {d.provincia}
                </address>
              </dd>
            </div>
            <div>
              <dt>Horarios</dt>
              {SITIO.horarios.turnos.map((t) => (
                <dd key={t.dias} className={s.horario}>
                  {t.dias}:{' '}
                  <span>
                    {t.abre} a {t.cierra}
                  </span>
                </dd>
              ))}
            </div>
            <div>
              <dt>Reservas</dt>
              <dd>
                <a href={`mailto:${SITIO.email}`} className={s.mail}>
                  {SITIO.email}
                </a>
              </dd>
              <dd>
                <Link href="/reservar" className="link-flecha">
                  <span>Reservá online</span>
                  <Glifo tipo="flecha" />
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className={`contenedor ${s.base}`}>
        <div className={s.marca}>
          <Logo ancho={150} alt="Paul Roger — Brasas & Cocktail" />
        </div>

        <nav aria-label="Servicios de la casa">
          <ul role="list" className={s.servicios}>
            {SERVICIOS_FOOTER.map((it) => (
              <li key={it.label}>
                <Link href={it.href} className={'destacado' in it && it.destacado ? s.destacado : undefined}>
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a href={SITIO.instagram.url} target="_blank" rel="noopener noreferrer" className={s.instagram}>
          <Icono nombre="instagram" alto={22} />
          {SITIO.instagram.usuario}
          <span className="visually-hidden"> (se abre en otra pestaña)</span>
        </a>
      </div>

      <div className={`contenedor ${s.legal}`}>
        <p>
          {SITIO.nombre} — {SITIO.claim} · {SITIO.url.replace('https://', '')}
        </p>
        <a href="https://trevoo.com.ar" target="_blank" rel="noopener noreferrer" className={s.trevoo}>
          <span aria-hidden="true">by</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/trevoo.svg" alt="Sitio desarrollado por Trevoo" width={47} height={9} />
          <span className="visually-hidden"> (se abre en otra pestaña)</span>
        </a>
      </div>
    </footer>
  )
}
