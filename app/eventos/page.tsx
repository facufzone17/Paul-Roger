import type { Metadata } from 'next'
import Link from 'next/link'

import { EscalonProvider } from '@/components/eventos/EscalonContexto'
import s from '@/components/eventos/eventos.module.css'
import { ConsultarEscalon, SelectorEscalones } from '@/components/eventos/SelectorEscalones'
import { Glifo, Icono, type NombreIcono } from '@/components/marca/Icono'
import { FormEvento } from '@/components/reservas/FormEvento'
import { Apertura } from '@/components/ui/Apertura'
import { CtaFijo } from '@/components/ui/CtaFijo'
import { Falta } from '@/components/ui/Falta'
import { Foto } from '@/components/ui/Foto'
import { ADICIONALES, DETALLE_EXCLUSIVIDAD, DETALLE_MESA_FESTEJO, EVENTOS_INTRO, MENUS_EVENTO, PRODUCTOS_PAUL_ROGER } from '@/data/eventos'
import { FOTOS } from '@/lib/imagenes'

export const metadata: Metadata = {
  title: 'Eventos',
  description:
    'Cumpleaños, cenas de empresa y eventos privados en Paul Roger, Hudson: mesa de festejo, Sala VIP para 16 personas o la casa entera. Menús de evento, DJ y limousine.',
  alternates: { canonical: '/eventos' },
}

const ICONO_PRODUCTO: Record<string, NombreIcono> = { flores: 'flor', chocolates: 'regalo', pistachos: 'plato' }

/** /eventos convence, /reservar captura. Estructura según estructura-eventos.html, adaptada al brief. */
export default function PaginaEventos() {
  return (
    <EscalonProvider>
      {/* 01 · Apertura */}
      <Apertura volanta="Eventos" titulo="Tu celebración, en casa" bajada={EVENTOS_INTRO} foto={FOTOS.eventosFachada} posicion="60% 50%">
        <a href="#consulta" className="btn btn-primario btn-grande">
          Consultar disponibilidad
        </a>
      </Apertura>

      {/* 02 · Selector de escalones */}
      <section className="seccion" aria-labelledby="escalones-titulo">
        <div className="contenedor">
          <div className={s.cabecera} data-reveal>
            <p className="volanta">Tres formas de festejar</p>
            <h2 id="escalones-titulo" className="titulo-2">
              ¿Cuántos son y cuánta privacidad buscan?
            </h2>
          </div>
          <SelectorEscalones />
        </div>
      </section>

      {/* 03 · Detalle de cada escalón */}
      <section className={s.detalles} aria-label="Detalle de cada opción">
        <div className="contenedor">
          <article id="mesa-festejo" className={s.detalle}>
            <Foto foto={FOTOS.cardFlan} sizes="(min-width: 900px) 45vw, 100vw" capa="suave" className={s.detalleFoto} />
            <div className={s.detalleTexto} data-reveal>
              <p className="volanta">Escalón 01 · Mesa de festejo</p>
              <h3 className="titulo-3">{DETALLE_MESA_FESTEJO.titulo}</h3>
              <dl className={s.puntos}>
                {DETALLE_MESA_FESTEJO.puntos.map((p) => (
                  <div key={p.titulo}>
                    <dt>{p.titulo}</dt>
                    <dd>{p.texto}</dd>
                  </div>
                ))}
              </dl>
              <div className={s.acciones}>
                <ConsultarEscalon escalon="mesa-festejo">Consultar por una mesa de festejo</ConsultarEscalon>
                <Link href="/reservar?tipo=mesa&ocasion=cumpleanos" className="link-flecha">
                  <span>¿Solo la mesa? Reservala directo</span>
                  <Glifo tipo="flecha" />
                </Link>
              </div>
            </div>
          </article>

          <article id="exclusividad" className={`${s.detalle} ${s.detalleInvertido}`}>
            <Foto foto={FOTOS.casaSalon} sizes="(min-width: 900px) 45vw, 100vw" capa="suave" className={s.detalleFoto} />
            <div className={s.detalleTexto} data-reveal>
              <p className="volanta">Escalón 03 · Exclusividad total</p>
              <h3 className="titulo-3">{DETALLE_EXCLUSIVIDAD.titulo}</h3>
              <dl className={s.puntos}>
                {DETALLE_EXCLUSIVIDAD.puntos.map((p) => (
                  <div key={p.titulo}>
                    <dt>{p.titulo}</dt>
                    <dd>{p.texto}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.faltan}>
                <Falta>capacidad del espacio completo, mínimo de consumo y si se cobra por evento</Falta>
              </p>
              <div className={s.acciones}>
                <ConsultarEscalon escalon="exclusividad">Consultar por la casa entera</ConsultarEscalon>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 04 · Menús de evento */}
      <section id="menus" className="seccion" aria-labelledby="menus-titulo">
        <div className="contenedor">
          <div className={s.cabecera} data-reveal>
            <p className="volanta">Menús de evento</p>
            <h2 id="menus-titulo" className="titulo-2">
              Una propuesta para cada formato
            </h2>
            <p className="bajada">
              <Falta>precio por persona de cada menú</Falta>
            </p>
          </div>
          <ul role="list" className={s.menus}>
            {MENUS_EVENTO.map((m, i) => (
              <li key={m.id} className={s.menu} data-reveal style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties}>
                <span className={s.menuNumero}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={s.menuNombre}>{m.nombre}</h3>
                <p>{m.descripcion}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 · Adicionales (el DJ es un servicio del evento: no se mezcla con la agenda de música en vivo) */}
      <section className={`seccion ${s.bandaOscura}`} aria-labelledby="adicionales-titulo">
        <div className="contenedor">
          <div className={s.cabecera} data-reveal>
            <p className="volanta">Adicionales</p>
            <h2 id="adicionales-titulo" className="titulo-2">
              Para que la noche salga como la imaginaron
            </h2>
          </div>
          <ul role="list" className={s.adicionales}>
            {ADICIONALES.map((a, i) => (
              <li key={a.id} className={s.adicional} data-reveal>
                <span className={s.adicionalNumero}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={s.adicionalNombre}>{a.nombre}</h3>
                <p>{a.descripcion}</p>
                {a.id === 'dj' && <Falta>costo del DJ y de las islas gastronómicas</Falta>}
                {a.siempreConsulta && <Falta>si la limousine es propia o tercerizada y qué incluye</Falta>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 · Productos Paul Roger */}
      <section className="seccion" aria-labelledby="productos-titulo">
        <div className="contenedor">
          <div className={s.cabecera} data-reveal>
            <p className="volanta">Productos Paul Roger</p>
            <h2 id="productos-titulo" className="titulo-2">
              Para el evento o para cualquier reserva
            </h2>
          </div>
          <ul role="list" className={s.productos}>
            {PRODUCTOS_PAUL_ROGER.map((p) => (
              <li key={p.id} className={s.producto} data-reveal>
                {p.id === 'flores' && <Foto foto={FOTOS.complementoFlores} sizes="(min-width: 900px) 30vw, 100vw" capa="suave" className={s.productoFoto} />}
                {p.id === 'chocolates' && <Foto foto={FOTOS.complementoChocolates} sizes="(min-width: 900px) 30vw, 100vw" capa="suave" className={s.productoFoto} />}
                {p.id === 'pistachos' && (
                  <div className={s.productoVacio}>
                    <Icono nombre={ICONO_PRODUCTO[p.id]} alto={64} />
                    <Falta>foto de los pistachos</Falta>
                  </div>
                )}
                <h3 className={s.productoNombre}>{p.nombre}</h3>
                <p>{p.descripcion}</p>
                <Link href={`/reservar?extra=${p.id}`} className="link-flecha">
                  <span>Sumar a una reserva</span>
                  <Glifo tipo="flecha" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 07 · Formulario de consulta (el mismo componente que /reservar) */}
      <section id="consulta" className={`seccion ${s.consulta}`} aria-labelledby="consulta-titulo">
        <div className="contenedor">
          <div className={s.cabecera}>
            <p className="volanta">Consulta de evento</p>
            <h2 id="consulta-titulo" className="titulo-2">
              Contanos tu idea
            </h2>
            <p className="bajada">Con estos datos te respondemos con disponibilidad y una propuesta, sin idas y vueltas.</p>
          </div>
          <FormEvento />
        </div>
      </section>

      <CtaFijo destino="consulta">Consultar disponibilidad</CtaFijo>
    </EscalonProvider>
  )
}
