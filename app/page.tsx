import { Eventos } from '@/components/home/Eventos'
import { LaCasa } from '@/components/home/LaCasa'
import { Portada } from '@/components/home/Portada'
import { Servicios } from '@/components/home/Servicios'
import { JsonLd, restauranteJsonLd } from '@/lib/seo'

/** Home, en el orden del wireframe: portada · la casa · servicios · eventos/complementos · contacto (footer). */
export default function Inicio() {
  return (
    <>
      <JsonLd datos={restauranteJsonLd()} />
      <Portada />
      <LaCasa />
      <Servicios />
      <Eventos />
    </>
  )
}
