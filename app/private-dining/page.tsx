import type { Metadata } from 'next'
import Link from 'next/link'

import { Glifo } from '@/components/marca/Icono'
import { FormEvento } from '@/components/reservas/FormEvento'
import { Apertura } from '@/components/ui/Apertura'
import { CtaFijo } from '@/components/ui/CtaFijo'
import { Falta } from '@/components/ui/Falta'
import { SALON_PRIVADO } from '@/data/eventos'

import s from './private-dining.module.css'

export const metadata: Metadata = {
  title: 'Private Dining · Salón privado',
  description:
    'El salón privado de Paul Roger, el VIP de la casa: hasta 16 personas, con TV, aire acondicionado y privacidad. Para cenas íntimas, celebraciones y reuniones de trabajo en Hudson.',
  alternates: { canonical: '/private-dining' },
}

/** Private Dining = el salón privado = el "VIP" de la casa. Es un solo espacio (confirmado por el cliente). */
export default function PaginaPrivateDining() {
  return (
    <>
      <Apertura
        volanta="Private Dining"
        titulo="Nuestro salón privado"
        bajada="El VIP de la casa: un espacio cerrado para hasta 16 personas, con la cocina y la barra de Paul Roger y la tranquilidad de estar solos."
        falta="foto del Salón Privado (el VIP)"
      >
        <a href="#consulta" className="btn btn-primario btn-grande">
          Consultar disponibilidad
        </a>
      </Apertura>

      {/* Qué es */}
      <section className="seccion" aria-labelledby="que-es-titulo">
        <div className="contenedor">
          <h2 id="que-es-titulo" className="visually-hidden">
            Qué es el salón privado
          </h2>
          <ul role="list" className={s.datos} data-reveal>
            <li>
              <span className={s.datoGrande}>{SALON_PRIVADO.capacidad}</span>
              <span className={s.datoTexto}>personas como máximo</span>
            </li>
            <li>
              <span className={s.datoGrande}>TV</span>
              <span className={s.datoTexto}>para una presentación o un partido</span>
            </li>
            <li>
              <span className={s.datoGrande}>Clima</span>
              <span className={s.datoTexto}>con aire acondicionado</span>
            </li>
            <li>
              <span className={s.datoGrande}>Privado</span>
              <span className={s.datoTexto}>puertas adentro, solo para ustedes</span>
            </li>
          </ul>
          <p className={s.aclaracion}>
            Es el mismo espacio que en la casa y en Instagram llamamos <strong>VIP</strong>.
          </p>
        </div>
      </section>

      {/* Dos usos */}
      <section className={`seccion ${s.usos}`} aria-labelledby="usos-titulo">
        <div className="contenedor">
          <div className={s.cabecera} data-reveal>
            <p className="volanta">Dos usos</p>
            <h2 id="usos-titulo" className="titulo-2">
              De la cena íntima a la reunión de trabajo
            </h2>
          </div>
          <div className={s.dosUsos}>
            <article className={s.uso} data-reveal>
              <span className={s.usoNumero}>01</span>
              <h3 className={s.usoTitulo}>Cenas y celebraciones íntimas</h3>
              <p>
                Un cumpleaños, un aniversario, una pedida de mano o una cena de amigos, con la cocina de la casa o un menú pensado para la ocasión, y
                la posibilidad de sumar flores, bombones y la limousine.
              </p>
            </article>
            <article className={s.uso} data-reveal>
              <span className={s.usoNumero}>02</span>
              <h3 className={s.usoTitulo}>Reuniones de trabajo y coworking</h3>
              <p>
                Un espacio cerrado con TV para presentar, combinable con el menú ejecutivo de lunes a viernes al mediodía. Para equipos, clientes o
                un almuerzo de negocios sin interrupciones.
              </p>
            </article>
          </div>
          <ul role="list" className={s.faltan}>
            {SALON_PRIVADO.faltan.map((f) => (
              <li key={f}>
                <Falta>{f}</Falta>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Menús y adicionales */}
      <section className="seccion" aria-labelledby="menus-titulo">
        <div className={`contenedor ${s.menus}`} data-reveal>
          <div>
            <p className="volanta">Menús y adicionales</p>
            <h2 id="menus-titulo" className="titulo-3">
              Los mismos menús de evento y servicios de la casa
            </h2>
          </div>
          <div className={s.menusTexto}>
            <p>Menú establecido o personalizado, formato cocktail o islas gastronómicas; y como adicionales, DJ, ambientación con flores, coordinación y limousine.</p>
            <Link href="/eventos#menus" className="link-flecha">
              <span>Ver menús y adicionales</span>
              <Glifo tipo="flecha" />
            </Link>
          </div>
        </div>
      </section>

      {/* Formulario con el escalón "Salón privado" precargado */}
      <section id="consulta" className={`seccion ${s.consulta}`} aria-labelledby="consulta-titulo">
        <div className="contenedor">
          <div className={s.cabecera}>
            <p className="volanta">Consulta</p>
            <h2 id="consulta-titulo" className="titulo-2">
              Reservá el salón privado
            </h2>
            <p className="bajada">Contanos la fecha y cuántos son: te respondemos con disponibilidad y una propuesta.</p>
          </div>
          <FormEvento escalonInicial="salon-privado" />
        </div>
      </section>

      <CtaFijo destino="consulta">Consultar disponibilidad</CtaFijo>
    </>
  )
}
