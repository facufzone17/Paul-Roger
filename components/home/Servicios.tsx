'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Glifo, Icono } from '@/components/marca/Icono'
import { FOTOS, type Foto } from '@/lib/imagenes'
import { cx } from '@/lib/formato'

import s from './Servicios.module.css'

type ServicioId = 'brasas' | 'sushi' | 'cocteleria' | 'vinos'

interface Servicio {
  id: ServicioId
  nombre: string
  texto: string
  href: string
  foto: Foto
}

const SERVICIOS: Servicio[] = [
  {
    id: 'brasas',
    nombre: 'Brasas',
    texto: 'Cortes a la parrilla, achuras y el cochinillo entero, que se encarga con la reserva.',
    href: '/carta#fuertes',
    foto: FOTOS.mosaicoBrasas,
  },
  {
    id: 'sushi',
    nombre: 'Sushi',
    texto: 'Niguiris, rolls de autor, tiraditos y lajas a elección del sushiman.',
    href: '/carta#sushi',
    foto: FOTOS.mosaicoSushi,
  },
  {
    id: 'vinos',
    nombre: 'Vinos',
    texto: 'Más de 90 etiquetas, del Malbec de todos los días al Cristal.',
    href: '/carta#vinos',
    foto: FOTOS.mosaicoVinos,
  },
  {
    id: 'cocteleria',
    nombre: 'Coctelería',
    texto: 'Clásicos bien hechos y tragos de autor, como el Paul Roger y el Wasabi Roger.',
    href: '/carta#cocteleria-de-autor',
    foto: FOTOS.mosaicoCocteleria,
  },
]

const buscar = (id: ServicioId) => SERVICIOS.find((x) => x.id === id)!

/*
 * Una fila por servicio, en el orden del scroll: dos fotos del mismo tamaño, una a
 * cada lado del título. La principal (con el nombre al pie) alterna de lado, así el
 * servicio que pasa por la mitad de la pantalla es siempre uno solo.
 */
const FILAS: { servicio: ServicioId; principal: 'izquierda' | 'derecha'; detalle: Foto }[] = [
  { servicio: 'brasas', principal: 'izquierda', detalle: FOTOS.cardBifeChorizo },
  { servicio: 'sushi', principal: 'derecha', detalle: FOTOS.cartaSushi },
  { servicio: 'vinos', principal: 'izquierda', detalle: FOTOS.casaCava },
  { servicio: 'cocteleria', principal: 'derecha', detalle: FOTOS.servicioCocteleria },
]

/**
 * Servicios con scrollytelling (referencia: COTE). El título queda fijo y el
 * scroll va pasando una fila por servicio alrededor:
 * Brasas · Sushi · Vinos · Coctelería. Cada foto lleva a su sección de la carta.
 * En el celular y con reduced-motion no hay pin: bloques apilados, mismo contenido.
 */
export function Servicios() {
  const [activo, setActivo] = useState<ServicioId>('brasas')
  const raiz = useRef<HTMLDivElement>(null)
  const actual = buscar(activo)

  // El servicio cuya fila está más cerca de la mitad de la pantalla es el que se
  // nombra en el centro. Se mide en cada scroll, así un scroll rápido no saltea filas.
  useEffect(() => {
    const nodo = raiz.current
    if (!nodo) return
    const filas = Array.from(nodo.querySelectorAll<HTMLElement>('[data-servicio]'))
    let cuadro = 0
    const medir = () => {
      cuadro = 0
      const mitad = window.innerHeight / 2
      let mejor: HTMLElement | undefined
      let distancia = Infinity
      for (const fila of filas) {
        const r = fila.getBoundingClientRect()
        if (!r.height) continue
        const d = Math.abs(r.top + r.height / 2 - mitad)
        if (d < distancia) {
          distancia = d
          mejor = fila
        }
      }
      if (mejor) setActivo(mejor.dataset.servicio as ServicioId)
    }
    const alScroll = () => {
      if (!cuadro) cuadro = requestAnimationFrame(medir)
    }
    medir()
    window.addEventListener('scroll', alScroll, { passive: true })
    window.addEventListener('resize', alScroll)
    return () => {
      cancelAnimationFrame(cuadro)
      window.removeEventListener('scroll', alScroll)
      window.removeEventListener('resize', alScroll)
    }
  }, [])

  // GSAP + ScrollTrigger solo para esto, en escritorio y sin reduced-motion.
  useEffect(() => {
    const nodo = raiz.current
    if (!nodo) return
    const consulta = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')
    let deshacer: (() => void) | undefined
    let cancelado = false

    const iniciar = async () => {
      deshacer?.()
      deshacer = undefined
      if (!consulta.matches) return
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      if (cancelado || !consulta.matches) return
      gsap.registerPlugin(ScrollTrigger)
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(`.${s.foto}`).forEach((foto) => {
          gsap.fromTo(
            foto,
            { clipPath: 'inset(18% 0% 0% 0% round 16px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 16px)',
              ease: 'none',
              scrollTrigger: { trigger: foto, start: 'top bottom', end: 'top 40%', scrub: 0.5 },
            },
          )
          gsap.fromTo(
            foto.querySelector('img'),
            { scale: 1.14 },
            { scale: 1, ease: 'none', scrollTrigger: { trigger: foto, start: 'top bottom', end: 'bottom top', scrub: 0.5 } },
          )
        })
      }, nodo)
      deshacer = () => ctx.revert()
    }

    iniciar()
    consulta.addEventListener('change', iniciar)
    return () => {
      cancelado = true
      consulta.removeEventListener('change', iniciar)
      deshacer?.()
    }
  }, [])

  return (
    <section className={s.servicios} aria-labelledby="servicios-titulo">
      {/* Escritorio: título fijo y mosaico que pasa alrededor */}
      <div ref={raiz} className={s.escenario}>
        <div className={s.centro}>
          <div className={s.fijo}>
            <h2 id="servicios-titulo" className={s.titulo}>
              Conocé nuestros servicios
            </h2>
            <div className={s.activo}>
              <span key={actual.id} className={s.activoNombre}>
                {actual.nombre}
              </span>
              <span className={s.activoTexto}>{actual.texto}</span>
              <Link href={actual.href} className="link-flecha">
                <span>Ver {actual.nombre.toLowerCase()} en la carta</span>
                <Glifo tipo="flecha" />
              </Link>
            </div>
          </div>
        </div>

        <ul role="list" className={s.filas}>
          {FILAS.map((f) => {
            const servicio = buscar(f.servicio)
            const enFoco = activo === f.servicio
            return (
              <li
                key={f.servicio}
                className={cx(s.fila, f.principal === 'derecha' && s.filaInvertida)}
                data-servicio={f.servicio}
              >
                <Tesela servicio={servicio} activo={enFoco} />
                <Tesela servicio={servicio} detalle={f.detalle} activo={enFoco} />
              </li>
            )
          })}
        </ul>
      </div>

      {/* Celular y reduced-motion: bloques apilados, sin pin */}
      <div className={`contenedor ${s.apilado}`}>
        <h2 className={s.tituloApilado}>Conocé nuestros servicios</h2>
        <ul role="list" className={s.lista}>
          {SERVICIOS.map((sv) => (
            <li key={sv.id} data-reveal>
              <Link href={sv.href} className={s.bloque}>
                <span className={s.bloqueFoto}>
                  <Image src={sv.foto.src} alt="" fill sizes="(min-width: 640px) 45vw, 100vw" quality={80} className={s.img} />
                </span>
                <span className={s.bloqueNombre}>{sv.nombre}</span>
                <span className={s.bloqueTexto}>{sv.texto}</span>
                <span className={s.bloqueLink}>
                  Ver en la carta <Glifo tipo="flecha" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={`contenedor ${s.cierre}`} data-reveal>
        <Icono nombre="reserva" alto={34} className={s.cierreFirma} />
        <p className={s.cierreTitulo}>La mesa está puesta.</p>
        <p className={s.cierreTexto}>Mesa, evento, limousine o menú ejecutivo: todo se reserva desde acá.</p>
        <Link href="/reservar" className="btn btn-primario btn-grande">
          Reservar
        </Link>
      </div>
    </section>
  )
}

function Tesela({ servicio, detalle, activo }: { servicio: Servicio; detalle?: Foto; activo: boolean }) {
  const imagen = detalle ?? servicio.foto
  return (
    <div className={cx(s.tesela, detalle ? s.detalle : s.principal, activo && s.enFoco)}>
      <Link
        href={servicio.href}
        className={s.teselaLink}
        tabIndex={detalle ? -1 : undefined}
        aria-hidden={detalle ? true : undefined}
      >
        <span className={s.foto}>
          {/* Ancho real en pantalla (≈ 33vw) más el zoom de 1.14 del scroll. */}
          <Image
            src={imagen.src}
            alt=""
            fill
            sizes="(min-width: 900px) 38vw, 1px"
            quality={80}
            className={s.img}
          />
        </span>
        {!detalle && (
          <span className={s.pie}>
            <span className={s.pieNombre}>{servicio.nombre}</span>
            <span className="visually-hidden">: {servicio.texto} Ver en la carta.</span>
          </span>
        )}
      </Link>
    </div>
  )
}
