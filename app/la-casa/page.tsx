import type { Metadata } from 'next'
import Link from 'next/link'

import { Glifo } from '@/components/marca/Icono'
import { Apertura } from '@/components/ui/Apertura'
import { CierreReservar } from '@/components/ui/CierreReservar'
import { Falta } from '@/components/ui/Falta'
import { Foto } from '@/components/ui/Foto'
import { AGENDA, fechaLarga } from '@/data/agenda'
import { CARTA } from '@/data/carta'
import { FOTOS } from '@/lib/imagenes'

import s from './la-casa.module.css'

export const metadata: Metadata = {
  title: 'La Casa',
  description:
    'El salón, la barra de coctelería de autor y la pared de vinos, y la música en vivo de Paul Roger en Polo Design, Hudson. Agenda de próximas fechas.',
  alternates: { canonical: '/la-casa' },
}

/** Tres tragos de autor de la carta, para presentar la barra. */
const DE_AUTOR = CARTA.find((x) => x.id === 'barra')!
  .subcategorias.find((x) => x.id === 'cocteleria-de-autor')!
  .items.filter((i) => ['cocktail-paul-roger', 'wasabi-roger', 'caricia-al-paladar'].includes(i.id))

export default function PaginaLaCasa() {
  return (
    <>
      <Apertura
        volanta="La casa"
        titulo="Una casa para quedarse"
        bajada="Brasas a la vista, una barra de autor y música en vivo, en Polo Design. Pensada para que la noche no tenga apuro."
        foto={FOTOS.casaBarra}
        posicion="50% 40%"
      />

      <nav aria-label="En esta página" className={`contenedor ${s.indice}`}>
        <ul role="list">
          <li>
            <a href="#salon">El salón</a>
          </li>
          <li>
            <a href="#barra">La barra</a>
          </li>
          <li>
            <a href="#musica">Música en vivo</a>
          </li>
        </ul>
      </nav>

      {/* #salon */}
      <section id="salon" className={`seccion ${s.bloque}`} aria-labelledby="salon-titulo">
        <div className={`contenedor ${s.bloqueGrilla}`}>
          <div className={s.bloqueTexto} data-reveal>
            <p className="volanta">El salón</p>
            <h2 id="salon-titulo" className="titulo-2">
              Fuego a la vista y mesas para la cena larga
            </h2>
            <div className="texto-largo">
              <p>
                Las brasas se ven desde el salón: parte de la cena es mirar cómo se hace. Mesas para dos o para la familia entera, luz baja y el neón de la
                casa encendido sobre la barra.
              </p>
              <p>En la recepción te recibe el stand de flores: si es una noche especial, el ramo puede estar esperando en la mesa.</p>
            </div>
          </div>
          <div className={s.fotos}>
            <Foto foto={FOTOS.casaSalon} sizes="(min-width: 900px) 30vw, 60vw" capa="suave" className={s.fotoGrande} />
            <Foto foto={FOTOS.complementoFlores} sizes="(min-width: 900px) 20vw, 40vw" capa="suave" className={s.fotoChica} />
          </div>
        </div>
      </section>

      {/* #barra */}
      <section id="barra" className={`seccion ${s.bloque} ${s.bloqueOscuro}`} aria-labelledby="barra-titulo">
        <div className={`contenedor ${s.bloqueGrilla} ${s.invertido}`}>
          <div className={s.bloqueTexto} data-reveal>
            <p className="volanta">La barra</p>
            <h2 id="barra-titulo" className="titulo-2">
              Coctelería de autor y una pared de vinos
            </h2>
            <p className="texto-largo">
              Clásicos bien hechos, tragos propios y más de 90 etiquetas de vino a la vista, del Malbec de todos los días al Cristal.
            </p>
            <ul role="list" className={s.tragos}>
              {DE_AUTOR.map((t) => (
                <li key={t.id}>
                  <span className={s.tragoNombre}>{t.nombre}</span>
                  <span className={s.tragoDesc}>{t.descripcion}</span>
                </li>
              ))}
            </ul>
            <Link href="/carta#barra" className="link-flecha">
              <span>Ver la barra en la carta</span>
              <Glifo tipo="flecha" />
            </Link>
          </div>
          <div className={s.fotos}>
            <Foto foto={FOTOS.mosaicoCocteleria} sizes="(min-width: 900px) 30vw, 60vw" capa="suave" className={s.fotoGrande} />
            <Foto foto={FOTOS.casaVinos} sizes="(min-width: 900px) 20vw, 40vw" capa="suave" className={s.fotoChica} />
          </div>
        </div>
      </section>

      {/* #musica — contenido del restaurante. El DJ de eventos NO va acá. */}
      <section id="musica" className={`seccion ${s.bloque}`} aria-labelledby="musica-titulo">
        <div className="contenedor">
          <div className={s.musicaCabecera} data-reveal>
            <div>
              <p className="volanta">Música en vivo</p>
              <h2 id="musica-titulo" className="titulo-2">
                La música también es de la casa
              </h2>
            </div>
            <div className={s.musicaTexto}>
              <p className="texto-largo">Escenario, luces y bandas en vivo: algunas noches, la cena termina con música.</p>
              <Falta>géneros, formatos y días fijos de música en vivo</Falta>
            </div>
          </div>

          <div className={s.agenda}>
            <div className={s.agendaCabecera}>
              <h3 className={s.agendaTitulo}>Próximas fechas</h3>
              <p className={s.agendaAviso}>
                <span className="ejemplo">Ejemplo</span> Fechas de muestra: la grilla real la carga el equipo.
              </p>
            </div>
            <ol role="list" className={s.fechas}>
              {AGENDA.map((a) => {
                const f = fechaLarga(a.fecha)
                return (
                  <li key={a.id} className={s.fecha}>
                    <time dateTime={`${a.fecha}T${a.hora}`} className={s.fechaDia}>
                      <span className={s.fechaNumero}>{f.numero}</span>
                      <span className={s.fechaMes}>
                        {f.dia.slice(0, 3)} · {f.mes.slice(0, 3)}
                      </span>
                    </time>
                    <div className={s.fechaTexto}>
                      <p className={s.fechaTitulo}>{a.titulo}</p>
                      <p className={s.fechaFormato}>{a.formato}</p>
                    </div>
                    <p className={s.fechaHora}>{a.hora} h</p>
                    {a.ejemplo && <span className="ejemplo">Ejemplo</span>}
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>

      <CierreReservar titulo="Te guardamos la mesa." texto="Para una cena, para la barra o para una noche con música. Elegí el día y cuántos son." />
    </>
  )
}
