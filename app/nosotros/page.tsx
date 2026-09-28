import type { Metadata } from 'next'
import Link from 'next/link'

import { Glifo } from '@/components/marca/Icono'
import { CierreReservar } from '@/components/ui/CierreReservar'
import { Falta } from '@/components/ui/Falta'
import { Foto } from '@/components/ui/Foto'
import { APERTURA_NOSOTROS, CIFRAS, DESDE, GOOGLE, LO_QUE_NOS_MUEVE, PRENSA, PRESENTACION, RESENAS } from '@/data/nosotros'
import { CULTURA } from '@/data/sitio'
import { FOTOS } from '@/lib/imagenes'

import s from './nosotros.module.css'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Nuestra historia, nuestra casa: Paul Roger nació entre amigos para ser la verdadera experiencia culinaria de Zona Sur. 4,7★ en Google, en Polo Design, Hudson.',
  alternates: { canonical: '/nosotros' },
}

export default function PaginaNosotros() {
  return (
    <>
      {/* Apertura: título centrado y tres fotos, la del medio más baja con el texto encima */}
      <header className={s.apertura}>
        <div className="contenedor">
          <div className={s.aperturaCabecera}>
            <h1 className={s.aperturaTitulo}>{APERTURA_NOSOTROS.titulo}</h1>
          </div>
          <div className={s.aperturaGrilla}>
            <Foto foto={FOTOS.casaSalon} sizes="(min-width: 900px) 30vw, 50vw" capa="suave" prioridad className={s.aperturaLateral} />
            <div className={s.aperturaCentro}>
              <p className={s.aperturaBajada}>{APERTURA_NOSOTROS.bajada}</p>
              <Link href="/reservar" className="btn btn-primario">
                Reservar
              </Link>
              <Foto foto={FOTOS.cardFlan} sizes="(min-width: 900px) 30vw, 90vw" capa="ninguna" className={s.aperturaChica} />
            </div>
            <Foto foto={FOTOS.casaVinos} sizes="(min-width: 900px) 30vw, 50vw" capa="suave" className={s.aperturaLateral} />
          </div>
        </div>
      </header>

      {/* Presentación + cifras */}
      <section className={`seccion ${s.presentacion}`} aria-labelledby="presentacion-titulo">
        <div className="contenedor">
          <div className={s.presentacionGrilla} data-reveal>
            <h2 id="presentacion-titulo" className={s.presentacionTitulo}>
              {PRESENTACION.titulo}
            </h2>
            {PRESENTACION.columnas.map((texto) => (
              <p key={texto} className={s.presentacionTexto}>
                {texto}
              </p>
            ))}
          </div>
          <ul role="list" className={s.cifras}>
            {CIFRAS.map((c, i) => (
              <li key={c.titulo} data-reveal style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties}>
                {c.valor ? <p className={s.cifraValor}>{c.valor}</p> : <Falta className={s.cifraFalta}>{c.falta}</Falta>}
                <p className={s.cifraTitulo}>{c.titulo}</p>
                <p className={s.cifraDetalle}>{c.detalle}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Video ancho: el reel de Instagram pasado a horizontal */}
      <div className="contenedor">
        <video
          className={s.ancha}
          src="/video/nosotros-casa.mp4"
          poster="/video/nosotros-casa-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="La casa de noche: la barra con el neón de Paul Roger, el botellero iluminado y el salón"
        />
      </div>

      {/* Lo que nos mueve, contado en prosa */}
      <section className="seccion" aria-labelledby="mueve-titulo">
        <div className="contenedor">
          <div className={s.mueveCabecera} data-reveal>
            <p className="volanta">Lo que nos mueve</p>
            <h2 id="mueve-titulo" className="titulo-2">
              {LO_QUE_NOS_MUEVE.titulo}
            </h2>
          </div>
          <div className={s.mueveGrilla}>
            <div className={s.mueveTexto} data-reveal>
              <div className="texto-largo">
                {LO_QUE_NOS_MUEVE.parrafos.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <Link href="/la-casa" className="link-flecha">
                <span>Conocé la casa</span>
                <Glifo tipo="flecha" />
              </Link>
            </div>
            <Foto foto={FOTOS.mosaicoBrasas} sizes="(min-width: 900px) 30vw, 50vw" capa="ninguna" className={s.mueveFotoA} />
            <Foto foto={FOTOS.mosaicoCocteleria} sizes="(min-width: 900px) 30vw, 50vw" capa="ninguna" className={s.mueveFotoB} />
          </div>
        </div>
      </section>

      {/* Desde 2025: historia, misión y visión */}
      <section className={`seccion ${s.desde}`} aria-labelledby="desde-titulo">
        <div className="contenedor">
          <h2 id="desde-titulo" className={s.desdeTitulo} data-reveal>
            Bienvenidos a casa desde <span className={s.corchetes}>[{DESDE.anio}]</span>
          </h2>
          <div className={s.desdeGrilla}>
            {DESDE.columnas.map((col, i) => (
              <article
                key={col.titulo}
                className={i === 1 ? `${s.desdeCol} ${s.desdeCentro}` : s.desdeCol}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
              >
                <div className={s.desdeCard}>
                  <h3 className={s.desdeCardTitulo}>{col.titulo}</h3>
                  <p>{col.texto}</p>
                </div>
                {i === 1 && <Foto foto={FOTOS.cardSushiPalillos} sizes="(min-width: 900px) 30vw, 90vw" capa="ninguna" className={s.desdeFoto} />}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* En los medios: lista grande a la izquierda, foto a la derecha */}
      <section className="seccion" aria-labelledby="prensa-titulo">
        <div className="contenedor">
          <div className={s.prensaCabecera} data-reveal>
            <p className="volanta">En los medios</p>
            <h2 id="prensa-titulo" className="titulo-2">
              Ya se habla de Paul Roger
            </h2>
            <p className="bajada">Abrimos en 2025 y el paseo gastronómico de Polo Design ya es una escapada recomendada. Nos nombraron en:</p>
          </div>
          <div className={s.prensaPanel}>
            <ul role="list" className={s.prensaLista}>
              {PRENSA.map((m) => (
                <li key={m.medio} data-reveal>
                  <a href={m.url} target="_blank" rel="noopener noreferrer" className={s.prensaLink}>
                    <span className={s.prensaMedio}>
                      {m.medio}
                      <sup className={s.prensaAnio}>({m.anio})</sup>
                    </span>
                    <span className={s.prensaNota}>
                      “{m.titulo}”<span className="visually-hidden"> (abre en otra pestaña)</span>
                    </span>
                  </a>
                </li>
              ))}
              <li data-reveal>
                <span className={s.prensaMedio}>
                  Google
                  <sup className={s.prensaAnio}>({GOOGLE.puntaje}★)</sup>
                </span>
                <span className={s.prensaNota}>{GOOGLE.opiniones} opiniones de clientes, relevadas en {GOOGLE.fecha}</span>
              </li>
            </ul>
            <Foto foto={FOTOS.eventosFachada} sizes="(min-width: 900px) 50vw, 100vw" capa="ninguna" className={s.prensaFoto} />
          </div>
        </div>
      </section>

      {/* Reseñas públicas de Google */}
      <section className={`seccion ${s.resenas}`} aria-labelledby="resenas-titulo">
        <div className="contenedor">
          <div className={s.resenasCabecera} data-reveal>
            <div>
              <p className="volanta">Reseñas en Google</p>
              <h2 id="resenas-titulo" className="titulo-2">
                Lo que dicen quienes ya vinieron
              </h2>
            </div>
            <div className={s.puntaje}>
              <p className={s.puntajeNumero}>{GOOGLE.puntaje}</p>
              <div>
                <p className={s.estrellas} aria-hidden="true">
                  ★★★★★
                </p>
                <p className={s.puntajeDetalle}>
                  <span className="visually-hidden">{GOOGLE.puntaje} de 5 estrellas, </span>
                  {GOOGLE.opiniones} opiniones
                </p>
                <a href={GOOGLE.url} target="_blank" rel="noopener noreferrer" className={s.puntajeLink}>
                  Ver todas en Google<span className="visually-hidden"> (abre en otra pestaña)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <ul role="list" className={s.resenasFila} tabIndex={0} aria-label="Reseñas de clientes, desplazá para ver más">
          {RESENAS.map((r) => (
            <li key={r.id} className={s.resena}>
              <blockquote className={s.resenaTexto}>
                <p>“{r.texto}”</p>
              </blockquote>
              <p className={s.resenaAutor}>
                {r.autor}
                <span>Reseña en Google</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* El lujo, en sus palabras */}
      <section className="seccion" aria-label="Nuestra idea de lujo">
        <figure className={`contenedor ${s.cita}`} data-reveal>
          <blockquote>
            <p>“{CULTURA.lujo}”</p>
          </blockquote>
          <figcaption>Cultura y ADN de Paul Roger</figcaption>
        </figure>
      </section>

      <CierreReservar titulo="Bienvenidos a casa." texto="El primer paso es la reserva. Del resto nos ocupamos nosotros." />
    </>
  )
}
