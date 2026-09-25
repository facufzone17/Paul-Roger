import Link from 'next/link'

import { Glifo, Icono } from '@/components/marca/Icono'
import { Logo } from '@/components/marca/Logo'
import { Falta } from '@/components/ui/Falta'
import { Foto } from '@/components/ui/Foto'
import { SERVICIOS_FOOTER, SITIO } from '@/data/sitio'
import { FOTOS } from '@/lib/imagenes'

import s from './Footer.module.css'

/**
 * Contacto + pie, en todas las páginas: imagen del local, dirección, horarios y mail.
 * Sin formulario y sin mapa embebido: todo el tráfico con intención va a /reservar.
 */
export function Footer() {
  const d = SITIO.direccion
  return (
    <footer className={s.pie} id="contacto">
      <div className={`contenedor ${s.contacto}`}>
        <Foto foto={FOTOS.contactoFachada} sizes="(min-width: 900px) 40vw, 100vw" capa="suave" className={s.foto} />

        <div className={s.datos} data-reveal>
          <p className="volanta">Contacto</p>
          <h2 className="titulo-2">Te esperamos</h2>

          <dl className={s.lista}>
            <div>
              <dt>Dónde</dt>
              <dd>
                <address>
                  {d.calle}, {d.zona}
                  <br />
                  {d.localidad}, {d.provincia}
                </address>
                <a href={SITIO.comoLlegar} target="_blank" rel="noopener noreferrer" className={s.mapa}>
                  <Icono nombre="ubicacion" alto={18} />
                  Cómo llegar<span className="visually-hidden"> (abre el mapa en otra pestaña)</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>Horarios</dt>
              <dd>
                <Falta>{SITIO.horarios.falta}</Falta>
              </dd>
            </div>
            <div>
              <dt>Reservas</dt>
              <dd>
                <a href={`mailto:${SITIO.email}`} className={s.mail}>
                  {SITIO.email}
                </a>
                <Link href="/reservar" className={`link-flecha ${s.online}`}>
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
        <p>Maqueta navegable · Etapa 1 · Títulos en Prata, provisoria hasta confirmar IvyMode</p>
      </div>
    </footer>
  )
}
