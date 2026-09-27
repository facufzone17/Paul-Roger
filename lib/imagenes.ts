import type { StaticImageData } from 'next/image'

import casaBarra from '@/public/img/pr-casa-barra.webp'
import casaCava from '@/public/img/pr-casa-cava.webp'
import casaSalon from '@/public/img/pr-casa-salon.webp'
import casaVinos from '@/public/img/pr-casa-vinos.webp'
import cardBifeChorizo from '@/public/img/pr-card-bife-chorizo.webp'
import cardEspinaca from '@/public/img/pr-card-espinaca.webp'
import cardFlan from '@/public/img/pr-card-flan.webp'
import cardSushiPalillos from '@/public/img/pr-card-sushi-palillos.webp'
import cartaSushi from '@/public/img/pr-carta-sushi.webp'
import complementoChocolates from '@/public/img/pr-complemento-chocolates.webp'
import complementoFlores from '@/public/img/pr-complemento-flores.webp'
import complementoLimousine from '@/public/img/pr-complemento-limousine.webp'
import contactoFachada from '@/public/img/pr-contacto-fachada.webp'
import eventosFachada from '@/public/img/pr-eventos-fachada.webp'
import fondoReservar from '@/public/img/pr-fondo-reservar.webp'
import heroDesktop from '@/public/img/pr-hero-salon-desktop.webp'
import heroMobile from '@/public/img/pr-hero-salon-mobile.webp'
import mosaicoBrasas from '@/public/img/pr-mosaico-brasas.webp'
import mosaicoCocteleria from '@/public/img/pr-mosaico-cocteleria.webp'
import mosaicoSushi from '@/public/img/pr-mosaico-sushi.webp'
import mosaicoVinos from '@/public/img/pr-mosaico-vinos.webp'

export interface Foto {
  src: StaticImageData
  alt: string
}

/**
 * Fotos del sitio: las WebP finales de img/final/, importadas con
 * scripts/importar_fotos.py (ver ahí los parches pendientes). Para actualizar una
 * foto se reemplaza en img/final/ con el mismo nombre y se vuelve a correr el script.
 */
export const FOTOS = {
  heroDesktop: { src: heroDesktop, alt: 'El salón de Paul Roger visto desde arriba, con la barra iluminada y el neón de la casa al fondo' },
  heroMobile: { src: heroMobile, alt: 'La barra de Paul Roger con el neón de la casa, vista desde el salón' },
  mosaicoBrasas: { src: mosaicoBrasas, alt: 'Bife a la parrilla con salsa criolla y una copa de vino tinto' },
  mosaicoSushi: { src: mosaicoSushi, alt: 'Tabla de rolls de sushi con salsas y una copa de vino blanco' },
  mosaicoCocteleria: { src: mosaicoCocteleria, alt: 'Botellero iluminado sobre la barra de coctelería' },
  mosaicoVinos: { src: mosaicoVinos, alt: 'Botellas de vino acostadas en la cava, con las etiquetas a la vista' },
  casaBarra: { src: casaBarra, alt: 'La barra de noche: botellero iluminado, bartenders trabajando y sushi sobre la barra' },
  casaVinos: { src: casaVinos, alt: 'La pared de vinos iluminada, con un mozo pasando entre las mesas' },
  casaSalon: { src: casaSalon, alt: 'El salón de día, con la barra y el neón de Paul Roger al fondo' },
  casaCava: { src: casaCava, alt: 'La cava de vinos iluminada, vista desde las mesas en penumbra' },
  complementoLimousine: { src: complementoLimousine, alt: 'La limousine negra de Paul Roger estacionada frente al cartel de la casa' },
  complementoFlores: { src: complementoFlores, alt: 'Heladera exhibidora con ramos de flores de colores' },
  complementoChocolates: { src: complementoChocolates, alt: 'Cajas de bombones belgas con el logo de Paul Roger' },
  eventosFachada: { src: eventosFachada, alt: 'La fachada de Paul Roger de noche, con el neón rojo encendido y autos clásicos en la puerta' },
  contactoFachada: { src: contactoFachada, alt: 'El neón de Paul Roger sobre la entrada del local, de noche' },
  cartaSushi: { src: cartaSushi, alt: 'Sashimi de atún, salmón y pesca blanca sobre una fuente negra' },
  fondoReservar: { src: fondoReservar, alt: 'Servilleta con el logo de Paul Roger y cubiertos sobre la mesa' },
  cardBifeChorizo: { src: cardBifeChorizo, alt: 'Bife de chorizo con salsa criolla, visto desde arriba' },
  cardFlan: { src: cardFlan, alt: 'Flan de la casa con dulce de leche y el sello de lacre de Paul Roger' },
  cardSushiPalillos: { src: cardSushiPalillos, alt: 'Rolls de sushi y palillos levantando una pieza' },
  cardEspinaca: { src: cardEspinaca, alt: 'Espinacas a la italiana con parmesano y pistachos' },
} satisfies Record<string, Foto>
