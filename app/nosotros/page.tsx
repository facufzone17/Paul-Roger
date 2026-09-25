import type { Metadata } from 'next'
import Link from 'next/link'

import { Apertura } from '@/components/ui/Apertura'
import { CierreReservar } from '@/components/ui/CierreReservar'
import { Falta } from '@/components/ui/Falta'
import { Foto } from '@/components/ui/Foto'
import { CULTURA, RECORRIDO_DEL_CLIENTE } from '@/data/sitio'
import { FOTOS } from '@/lib/imagenes'

import s from './nosotros.module.css'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Paul Roger nació entre amigos, del campo y de la buena comida. Nuestra forma de recibir: hospitalidad, excelencia y calidez, en Polo Design, Hudson.',
  alternates: { canonical: '/nosotros' },
}

export default function PaginaNosotros() {
  return (
    <>
      <Apertura
        volanta="Nosotros"
        titulo="Alrededor de una mesa pasan cosas importantes"
        bajada="Paul Roger nació entre amigos, del campo y de la buena comida. Y de la idea de armar, en Zona Sur, un lugar único donde recibir como en casa."
      />

      {/* La historia */}
      <section className={s.historia} aria-labelledby="historia-titulo">
        <div className={`contenedor ${s.historiaGrilla}`}>
          <div className={s.historiaFotos}>
            <Foto foto={FOTOS.cardBifeChorizo} sizes="(min-width: 900px) 26vw, 55vw" capa="suave" className={s.fotoA} />
            <Foto foto={FOTOS.cardFlan} sizes="(min-width: 900px) 20vw, 45vw" capa="suave" className={s.fotoB} />
          </div>
          <div className={s.historiaTexto} data-reveal>
            <p className="volanta">La historia</p>
            <h2 id="historia-titulo" className="titulo-2">
              Constituido como una familia
            </h2>
            <div className="texto-largo">
              <p>
                Paul Roger nace de la sinergia de un grupo de amigos y empresarios con experiencia, pasión y una impronta propia. Fue constituido como
                una familia y proyectado para que exista un lugar único y diferente en Zona Sur.
              </p>
              <p>
                El objetivo es el mismo desde el primer día: excelencia e innovación en la propuesta gastronómica, con productos y materias primas de
                calidad, en un ambiente hermoso para disfrutar.
              </p>
            </div>
            <Falta>la historia contada por los dueños: quiénes son y cómo empezó</Falta>
          </div>
        </div>
      </section>

      {/* Misión y valores, breve y en tono de marca */}
      <section className={`seccion ${s.valoresBanda}`} aria-labelledby="mision-titulo">
        <div className="contenedor">
          <p className="volanta">Lo que nos mueve</p>
          <h2 id="mision-titulo" className={s.mision} data-reveal>
            {CULTURA.mision}
          </h2>
          <ul role="list" className={s.valores}>
            {CULTURA.valores.map((v, i) => (
              <li key={v} data-reveal style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}>
                <span className={s.valorNumero}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.valorNombre}>{v}</span>
              </li>
            ))}
          </ul>
        </div>
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

      {/* Recorrido del cliente: empieza en la reserva */}
      <section className={`seccion ${s.recorridoBanda}`} aria-labelledby="recorrido-titulo">
        <div className="contenedor">
          <div className={s.recorridoCabecera} data-reveal>
            <p className="volanta">El recorrido</p>
            <h2 id="recorrido-titulo" className="titulo-2">
              Diez momentos, pensados uno por uno
            </h2>
            <p className="bajada">El primero es la reserva. Por eso empieza acá.</p>
          </div>
          <ol role="list" className={s.recorrido}>
            {RECORRIDO_DEL_CLIENTE.map((paso, i) => (
              <li key={paso} className={i === 0 ? s.pasoPrimero : undefined}>
                <span className={s.pasoNumero}>{String(i + 1).padStart(2, '0')}</span>
                {i === 0 ? (
                  <Link href="/reservar" className={s.pasoLink}>
                    {paso}
                  </Link>
                ) : (
                  <span className={s.pasoNombre}>{paso}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CierreReservar titulo="Bienvenidos a casa." texto="El primer paso es la reserva. Del resto nos ocupamos nosotros." />
    </>
  )
}
