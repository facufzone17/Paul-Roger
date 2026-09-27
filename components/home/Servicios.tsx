'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Glifo } from '@/components/marca/Icono'
import { FOTOS, type Foto } from '@/lib/imagenes'
import { cx } from '@/lib/formato'

import s from './Servicios.module.css'

type ServicioId = 'brasas' | 'sushi' | 'cocteleria' | 'vinos'

interface Servicio {
  id: ServicioId
  numero: string
  nombre: string
  texto: string
  href: string
  foto: Foto
}

const SERVICIOS: Servicio[] = [
  {
    id: 'brasas',
    numero: '01',
    nombre: 'Brasas',
    texto: 'Cortes a la parrilla, achuras y el cochinillo entero, que se encarga con la reserva.',
    href: '/carta#fuertes',
    foto: FOTOS.mosaicoBrasas,
  },
  {
    id: 'sushi',
    numero: '02',
    nombre: 'Sushi',
    texto: 'Niguiris, rolls de autor, tiraditos y lajas a elección del sushiman.',
    href: '/carta#sushi',
    foto: FOTOS.mosaicoSushi,
  },
  {
    id: 'cocteleria',
    numero: '03',
    nombre: 'Coctelería',
    texto: 'Clásicos bien hechos y tragos de autor, como el Paul Roger y el Wasabi Roger.',
    href: '/carta#cocteleria-de-autor',
    foto: FOTOS.mosaicoCocteleria,
  },
  {
    id: 'vinos',
    numero: '04',
    nombre: 'Vinos',
    texto: 'Más de 90 etiquetas, del Malbec de todos los días al Cristal.',
    href: '/carta#vinos',
    foto: FOTOS.mosaicoVinos,
  },
]

const buscar = (id: ServicioId) => SERVICIOS.find((x) => x.id === id)!

/* Mosaico alrededor del título: las cuatro fotos principales y detalles que las acompañan. */
const IZQUIERDA: { servicio: ServicioId; detalle?: Foto }[] = [
  { servicio: 'brasas' },
  { servicio: 'brasas', detalle: FOTOS.cardBifeChorizo },
  { servicio: 'cocteleria' },
]
const DERECHA: { servicio: ServicioId; detalle?: Foto }[] = [
  { servicio: 'sushi' },
  { servicio: 'sushi', detalle: FOTOS.cartaSushi },
  { servicio: 'vinos' },
  { servicio: 'vinos', detalle: FOTOS.casaCava },
]

/**
 * Servicios con scrollytelling (referencia: COTE). El título queda fijo y el
 * scroll del usuario va pasando y revelando las fotos del mosaico que lo rodea:
 * Brasas · Sushi · Coctelería · Vinos. Cada foto lleva a su sección de la carta.
 * En el celular y con reduced-motion no hay pin: bloques apilados, mismo contenido.
 */
export function Servicios() {
  const [activo, setActivo] = useState<ServicioId>('brasas')
  const raiz = useRef<HTMLDivElement>(null)
  const actual = buscar(activo)

  // El servicio cuya foto cruza la mitad de la pantalla es el que se nombra en el centro.
  useEffect(() => {
    const nodo = raiz.current
    if (!nodo || !('IntersectionObserver' in window)) return
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setActivo((e.target as HTMLElement).dataset.servicio as ServicioId)
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    nodo.querySelectorAll('[data-servicio]').forEach((el) => observador.observe(el))
    return () => observador.disconnect()
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
        gsap.fromTo(
          `.${s.derecha}`,
          { yPercent: 4 },
          { yPercent: -10, ease: 'none', scrollTrigger: { trigger: nodo, start: 'top bottom', end: 'bottom top', scrub: 0.5 } },
        )
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
            <p className="volanta">Servicios</p>
            <h2 id="servicios-titulo" className={s.titulo}>
              Conocé nuestros servicios
            </h2>
            <div className={s.activo}>
              <span className={s.activoNumero}>{actual.numero} / 04</span>
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

        <ul role="list" className={cx(s.columna, s.izquierda)}>
          {IZQUIERDA.map((t, i) => (
            <Tesela key={i} servicio={buscar(t.servicio)} detalle={t.detalle} activo={activo === t.servicio} />
          ))}
        </ul>
        <ul role="list" className={cx(s.columna, s.derecha)}>
          {DERECHA.map((t, i) => (
            <Tesela key={i} servicio={buscar(t.servicio)} detalle={t.detalle} activo={activo === t.servicio} />
          ))}
        </ul>
      </div>

      {/* Celular y reduced-motion: bloques apilados, sin pin */}
      <div className={`contenedor ${s.apilado}`}>
        <p className="volanta">Servicios</p>
        <h2 className={s.tituloApilado}>Conocé nuestros servicios</h2>
        <ul role="list" className={s.lista}>
          {SERVICIOS.map((sv) => (
            <li key={sv.id} data-reveal>
              <Link href={sv.href} className={s.bloque}>
                <span className={s.bloqueFoto}>
                  <Image src={sv.foto.src} alt="" fill sizes="(min-width: 640px) 45vw, 100vw" quality={70} className={s.img} />
                </span>
                <span className={s.bloqueNumero}>{sv.numero}</span>
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
    <li className={cx(s.tesela, detalle && s.detalle, activo && s.enFoco)} data-servicio={servicio.id}>
      <Link
        href={servicio.href}
        className={s.teselaLink}
        tabIndex={detalle ? -1 : undefined}
        aria-hidden={detalle ? true : undefined}
      >
        <span className={s.foto}>
          <Image src={imagen.src} alt="" fill sizes="(min-width: 900px) 27vw, 1px" quality={70} className={s.img} />
        </span>
        {!detalle && (
          <span className={s.pie}>
            <span className={s.pieNumero}>{servicio.numero}</span>
            <span className={s.pieNombre}>{servicio.nombre}</span>
            <span className="visually-hidden">: {servicio.texto} Ver en la carta.</span>
          </span>
        )}
      </Link>
    </li>
  )
}
