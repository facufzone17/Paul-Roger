'use client'

import Image from 'next/image'
import { memo, useEffect, useRef, useState } from 'react'

import { Falta } from '@/components/ui/Falta'
import { FILTROS_UVA, TIPOS_WHISKY } from '@/data/carta'
import type { SeccionCarta, SeccionId, Subcategoria, TipoWhisky, Uva, Vino } from '@/data/tipos'
import { FOTOS, type Foto } from '@/lib/imagenes'
import { cx } from '@/lib/formato'

import s from './Carta.module.css'
import { htmlItems, htmlWhiskies } from './listaHtml'

/** Una foto por categoría (hipótesis del prototipo del socio: panel fijo en escritorio, franja en el celular). */
const FOTO_SECCION: Record<SeccionId, Foto> = {
  cocina: FOTOS.mosaicoBrasas,
  sushi: FOTOS.cartaSushi,
  barra: FOTOS.mosaicoCocteleria,
  vinos: FOTOS.mosaicoVinos,
}

const uvasDe = (filtro: string) => FILTROS_UVA.find((f) => f.id === filtro)?.uvas

/**
 * Carta en HTML, legible en el celular sin zoom y nunca en PDF.
 * Base: el prototipo del socio (3 niveles, barra lateral con scroll-spy, filtros
 * tipo chip en Vinos y Whiskies). En el celular se recorre de corrido, con pestañas fijas.
 */
export function Carta({ secciones }: { secciones: SeccionCarta[] }) {
  const [activa, setActiva] = useState<{ seccion: SeccionId; sub: string }>({ seccion: secciones[0].id, sub: secciones[0].subcategorias[0].id })
  const [uva, setUva] = useState('todas')
  const [whisky, setWhisky] = useState<'todos' | TipoWhisky>('todos')
  const raiz = useRef<HTMLDivElement>(null)
  const chips = useRef<HTMLDivElement>(null)

  // Scroll-spy: la subcategoría que cruza el tercio superior de la pantalla.
  useEffect(() => {
    const nodo = raiz.current
    if (!nodo || !('IntersectionObserver' in window)) return
    const primera = { seccion: secciones[0].id, sub: secciones[0].subcategorias[0].id }
    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas.filter((e) => e.isIntersecting).pop()
        if (!visible) {
          // Volvió arriba de todo de un salto (p. ej. tocando la barra del celular): se marca la primera sección.
          if (nodo.getBoundingClientRect().top > window.innerHeight * 0.28) setActiva(primera)
          return
        }
        const el = visible.target as HTMLElement
        // La cabecera de una sección activa su primera subcategoría.
        setActiva({ seccion: el.dataset.seccion as SeccionId, sub: el.dataset.primera ?? el.id })
      },
      { rootMargin: '-28% 0px -64% 0px' },
    )
    nodo.querySelectorAll('[data-sub], [data-primera]').forEach((el) => observador.observe(el))
    return () => observador.disconnect()
  }, [secciones])

  // En el celular, el chip de la subcategoría activa se asoma solo (scroll horizontal, sin mover la página).
  useEffect(() => {
    const fila = chips.current
    const chip = fila?.querySelector<HTMLElement>(`[data-chip="${activa.sub}"]`)
    if (!fila || !chip) return
    const izquierda = chip.offsetLeft - 16
    if (izquierda < fila.scrollLeft || chip.offsetLeft + chip.offsetWidth > fila.scrollLeft + fila.clientWidth) {
      fila.scrollTo({ left: izquierda, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    }
  }, [activa.sub])

  // Filtros: las filas son HTML estático, así que se muestran u ocultan por data-atributos.
  useEffect(() => {
    const uvas = uvasDe(uva)
    raiz.current?.querySelectorAll<HTMLElement>('li[data-uva]').forEach((li) => {
      li.hidden = Boolean(uvas && !uvas.includes(li.dataset.uva as Uva))
    })
  }, [uva])

  useEffect(() => {
    raiz.current?.querySelectorAll<HTMLElement>('[data-tipo-whisky]').forEach((g) => {
      g.hidden = whisky !== 'todos' && g.dataset.tipoWhisky !== whisky
    })
  }, [whisky])

  const seccionActiva = secciones.find((x) => x.id === activa.seccion)!

  return (
    <div ref={raiz} className={s.carta}>
      {/* ---------- celular: pestañas fijas + subcategorías */}
      <div className={s.barraMovil}>
        <nav aria-label="Secciones de la carta">
          <ul role="list" className={s.tabs}>
            {secciones.map((sec) => (
              <li key={sec.id}>
                <a href={`#${sec.id}`} className={cx(s.tab, activa.seccion === sec.id && s.tabActiva)} aria-current={activa.seccion === sec.id ? 'true' : undefined}>
                  {sec.titulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div ref={chips} className={s.subchips}>
          {seccionActiva.subcategorias.map((sub) => (
            <a key={sub.id} href={`#${sub.id}`} data-chip={sub.id} className={cx(s.subchip, activa.sub === sub.id && s.subchipActivo)}>
              {sub.titulo}
            </a>
          ))}
        </div>
      </div>

      <div className={s.grilla}>
        {/* ---------- escritorio: barra lateral */}
        <nav aria-label="Secciones de la carta" className={s.lateral}>
          <ul role="list">
            {secciones.map((sec) => {
              const abierta = activa.seccion === sec.id
              return (
                <li key={sec.id} className={cx(s.lateralSeccion, abierta && s.lateralAbierta)}>
                  <a href={`#${sec.id}`} className={s.lateralTitulo} aria-current={abierta ? 'true' : undefined}>
                    {sec.titulo}
                  </a>
                  <ul role="list" className={s.lateralSubs} hidden={!abierta}>
                    {sec.subcategorias.map((sub) => (
                      <li key={sub.id}>
                        <a href={`#${sub.id}`} className={cx(s.lateralSub, activa.sub === sub.id && s.lateralSubActiva)} aria-current={activa.sub === sub.id ? 'location' : undefined}>
                          {sub.titulo}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* ---------- contenido de corrido */}
        <div className={s.contenido}>
          {secciones.map((sec) => (
            <section key={sec.id} id={sec.id} className={s.seccion} aria-labelledby={`${sec.id}-titulo`}>
              <div className={s.franja}>
                <Image src={FOTO_SECCION[sec.id].src} alt="" fill sizes="100vw" quality={60} className={s.franjaImg} />
              </div>
              <header className={s.seccionCabecera} data-seccion={sec.id} data-primera={sec.subcategorias[0].id}>
                <h2 id={`${sec.id}-titulo`} className={s.seccionTitulo}>
                  {sec.titulo}
                </h2>
                <p className={s.seccionBajada}>{sec.bajada}</p>
              </header>

              {sec.id === 'vinos' && (
                // También lo mira el scroll-spy: mientras se ven los filtros, la sección activa es Vinos.
                <div data-seccion={sec.id} data-primera={sec.subcategorias[0].id}>
                  <FiltroUva valor={uva} onCambio={setUva} total={contarVinos(sec, uva)} />
                </div>
              )}

              {sec.subcategorias.map((sub) => (
                <Sub
                  key={sub.id}
                  seccion={sec.id}
                  sub={sub}
                  uva={sub.tipo === 'vinos' ? uva : undefined}
                  whisky={sub.tipo === 'whiskies' ? whisky : undefined}
                  onWhisky={setWhisky}
                />
              ))}
            </section>
          ))}
        </div>

        {/* ---------- escritorio ancho: una foto por categoría */}
        <aside className={s.panel} aria-hidden="true">
          <div className={s.panelFijo}>
            {secciones.map((sec) => (
              <div key={sec.id} className={cx(s.panelFoto, activa.seccion === sec.id && s.panelFotoActiva)}>
                <Image src={FOTO_SECCION[sec.id].src} alt="" fill sizes="300px" quality={70} className={s.panelImg} />
                <span className={s.panelEtiqueta}>{sec.titulo}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ subcategoría */

/** Memo: con cada paso del scroll-spy la carta se re-renderiza, pero las subcategorías solo cambian con su filtro. */
const Sub = memo(function Sub({
  seccion,
  sub,
  uva,
  whisky,
  onWhisky,
}: {
  seccion: SeccionId
  sub: Subcategoria
  uva?: string
  whisky?: 'todos' | TipoWhisky
  onWhisky: (t: 'todos' | TipoWhisky) => void
}) {
  const uvas = uva ? uvasDe(uva) : undefined
  const oculta = sub.tipo === 'vinos' && Boolean(uvas) && !(sub.items as Vino[]).some((v) => uvas!.includes(v.uva))

  return (
    <section id={sub.id} data-sub data-seccion={seccion} className={s.sub} hidden={oculta} aria-labelledby={`${sub.id}-titulo`}>
      <div className={s.subCabecera}>
        <h3 id={`${sub.id}-titulo`} className={s.subTitulo}>
          {sub.titulo}
        </h3>
        {sub.nota && <p className={s.subNota}>{sub.nota}</p>}
      </div>

      {sub.tipo === 'whiskies' ? (
        <>
          <FiltroWhisky valor={whisky ?? 'todos'} onCambio={onWhisky} />
          <div dangerouslySetInnerHTML={{ __html: htmlWhiskies(sub) }} />
        </>
      ) : (
        <ul role="list" className={s.items} dangerouslySetInnerHTML={{ __html: htmlItems(sub) }} />
      )}

      {sub.falta && (
        <p className={s.subFalta}>
          <Falta>{sub.falta}</Falta>
        </p>
      )}
    </section>
  )
})

/* ------------------------------------------------------------ vinos: filtro por uva */

function contarVinos(sec: SeccionCarta, uva: string) {
  const uvas = uvasDe(uva)
  return sec.subcategorias.reduce((t, sub) => t + (sub.items as Vino[]).filter((v) => !uvas || uvas.includes(v.uva)).length, 0)
}

function FiltroUva({ valor, onCambio, total }: { valor: string; onCambio: (v: string) => void; total: number }) {
  return (
    <div className={s.filtro} role="group" aria-label="Filtrar vinos por uva">
      <p className={s.filtroTitulo}>Filtrá por uva</p>
      <div className={s.filtroChips}>
        {FILTROS_UVA.map((f) => (
          <button key={f.id} type="button" className={s.chip} aria-pressed={valor === f.id} onClick={() => onCambio(f.id)}>
            {f.titulo}
          </button>
        ))}
      </div>
      <p className={s.filtroTotal} aria-live="polite">
        {total} {total === 1 ? 'opción' : 'opciones'}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------ whiskies: filtro por tipo */

function FiltroWhisky({ valor, onCambio }: { valor: 'todos' | TipoWhisky; onCambio: (t: 'todos' | TipoWhisky) => void }) {
  return (
    <div className={s.filtro} role="group" aria-label="Filtrar whiskies por tipo">
      <div className={s.filtroChips}>
        <button type="button" className={s.chip} aria-pressed={valor === 'todos'} onClick={() => onCambio('todos')}>
          Todos
        </button>
        {TIPOS_WHISKY.map((t) => (
          <button key={t.id} type="button" className={s.chip} aria-pressed={valor === t.id} onClick={() => onCambio(t.id)}>
            {t.titulo}
          </button>
        ))}
      </div>
    </div>
  )
}
