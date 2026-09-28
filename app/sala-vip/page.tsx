import type { Metadata } from 'next'
import Link from 'next/link'

import { Glifo } from '@/components/marca/Icono'
import { FormEvento } from '@/components/reservas/FormEvento'
import { Apertura } from '@/components/ui/Apertura'
import { CtaFijo } from '@/components/ui/CtaFijo'
import { Falta } from '@/components/ui/Falta'
import { FOTOS } from '@/lib/imagenes'
import { SALON_PRIVADO } from '@/data/eventos'

import s from './sala-vip.module.css'

export const metadata: Metadata = {
  title: 'Sala VIP',
  description:
    'La Sala VIP de Paul Roger: un espacio cerrado para hasta 16 personas, con TV, aire acondicionado y privacidad. Para cenas íntimas, celebraciones y reuniones de trabajo en Hudson.',
  alternates: { canonical: '/sala-vip' },
}

/** Sala VIP: el espacio privado de la casa (antes "Private Dining" / "salón privado"; el cliente pidió unificar el nombre). */
export default function PaginaSalaVip() {
  return (
    <>
      <Apertura
        volanta="Espacio privado"
        titulo="Sala VIP"
        bajada="Un espacio cerrado para hasta 16 personas, con la cocina y la barra de Paul Roger y la tranquilidad de estar solos."
        foto={FOTOS.casaPrivado}
        posicion="60% 55%"
      >
        <a href="#consulta" className="btn btn-primario btn-grande">
          Consultar disponibilidad
        </a>
      </Apertura>

      {/* Qué es */}
      <section className="seccion" aria-labelledby="que-es-titulo">
        <div className="contenedor">
          <h2 id="que-es-titulo" className="visually-hidden">
            Qué es la Sala VIP
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
              <h3 className={s.usoTitulo}>Cenas y celebraciones íntimas</h3>
              <p>
                Un cumpleaños, un aniversario, una pedida de mano o una cena de amigos, con la cocina de la casa o un menú pensado para la ocasión, y
                la posibilidad de sumar flores, bombones y la limousine.
              </p>
            </article>
            <article className={s.uso} data-reveal>
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

      {/* Formulario con el escalón "Sala VIP" precargado */}
      <section id="consulta" className={`seccion ${s.consulta}`} aria-labelledby="consulta-titulo">
        <div className="contenedor">
          <div className={s.cabecera}>
            <p className="volanta">Consulta</p>
            <h2 id="consulta-titulo" className="titulo-2">
              Reservá la Sala VIP
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
