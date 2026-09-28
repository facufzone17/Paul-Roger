'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Glifo, Icono } from '@/components/marca/Icono'
import { Logo } from '@/components/marca/Logo'
import { NAV_DERECHA, NAV_IZQUIERDA, SITIO } from '@/data/sitio'
import { cx } from '@/lib/formato'

import s from './Header.module.css'

const TODOS = [...NAV_IZQUIERDA, ...NAV_DERECHA]

/**
 * Header de todas las páginas: La Casa · Carta · Eventos | logo | Sala VIP · Nosotros + RESERVAR.
 * Transparente sobre la portada, sólido al scrollear. En el celular, menú a pantalla
 * completa en rojo (manual, pág. 36) con RESERVAR siempre visible.
 */
export function Header() {
  const ruta = usePathname()
  const [solido, setSolido] = useState(false)
  const [abierto, setAbierto] = useState(false)
  const boton = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const header = useRef<HTMLElement>(null)

  // Transparente sobre la portada, sólido al scrollear.
  useEffect(() => {
    const alScrollear = () => setSolido(window.scrollY > 24)
    alScrollear()
    window.addEventListener('scroll', alScrollear, { passive: true })
    return () => window.removeEventListener('scroll', alScrollear)
  }, [])

  const cerrar = useCallback((devolverFoco = true) => {
    setAbierto(false)
    if (devolverFoco) boton.current?.focus()
  }, [])

  // Al cambiar de página se cierra el menú.
  useEffect(() => {
    setAbierto(false)
  }, [ruta])

  // Menú abierto: sin scroll de fondo, Esc cierra y el foco queda adentro.
  useEffect(() => {
    if (!abierto) return
    const raiz = document.documentElement
    raiz.style.overflow = 'hidden'
    const primero = panel.current?.querySelector<HTMLElement>('a')
    primero?.focus()

    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        cerrar()
        return
      }
      if (e.key !== 'Tab' || !header.current) return
      const enfocables = Array.from(
        header.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((el) => el.offsetParent !== null)
      const i = enfocables.indexOf(document.activeElement as HTMLElement)
      if (e.shiftKey && i <= 0) {
        e.preventDefault()
        enfocables[enfocables.length - 1]?.focus()
      } else if (!e.shiftKey && i === enfocables.length - 1) {
        e.preventDefault()
        enfocables[0]?.focus()
      }
    }
    document.addEventListener('keydown', alTeclado)
    return () => {
      raiz.style.overflow = ''
      document.removeEventListener('keydown', alTeclado)
    }
  }, [abierto, cerrar])

  const esActual = (href: string) => ruta === href || ruta.startsWith(href + '/')

  return (
    <header ref={header} className={cx(s.header, (solido || abierto) && s.solido, abierto && s.abierto)}>
      <div className={s.barra}>
        <nav aria-label="Principal" className={s.navEscritorio}>
          <ul role="list" className={s.lista}>
            {NAV_IZQUIERDA.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={s.link} aria-current={esActual(l.href) ? 'page' : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={boton}
          type="button"
          className={s.toggle}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          onClick={() => (abierto ? cerrar() : setAbierto(true))}
        >
          <Glifo tipo={abierto ? 'cerrar' : 'menu'} className={s.toggleIcono} />
          <span className={s.toggleTexto}>{abierto ? 'Cerrar' : 'Menú'}</span>
        </button>

        <Link href="/" className={s.logo} aria-label="Paul Roger — Brasas & Cocktail, inicio">
          <Logo variante={abierto ? 'blanco' : 'color'} ancho={132} alt="" className={s.logoImg} />
        </Link>

        <div className={s.derecha}>
          <nav aria-label="Secundaria" className={s.navEscritorio}>
            <ul role="list" className={s.lista}>
              {NAV_DERECHA.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={s.link} aria-current={esActual(l.href) ? 'page' : undefined}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/reservar" className={cx('btn btn-primario', s.reservar)} aria-current={ruta === '/reservar' ? 'page' : undefined}>
            Reservar
          </Link>
        </div>
      </div>

      <div id="menu-movil" ref={panel} className={s.panel} hidden={!abierto}>
        <Icono nombre="fuego" alto={520} className={s.panelFuego} />
        <nav aria-label="Menú" className={s.panelNav}>
          <ul role="list">
            {TODOS.map((l, i) => (
              <li key={l.href} style={{ '--i': i } as React.CSSProperties}>
                <Link href={l.href} className={s.panelLink} aria-current={esActual(l.href) ? 'page' : undefined} onClick={() => cerrar(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.panelPie}>
          <p>
            {SITIO.direccion.calle} · {SITIO.direccion.zona}
            <br />
            {SITIO.direccion.localidad}
          </p>
          <div className={s.panelRedes}>
            <a href={SITIO.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${SITIO.instagram.usuario} (se abre en otra pestaña)`}>
              <Icono nombre="instagram" alto={26} />
            </a>
            <a href={`mailto:${SITIO.email}`} aria-label={`Escribir a ${SITIO.email}`}>
              <Icono nombre="mail" alto={22} />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
