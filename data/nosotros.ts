/**
 * Contenido de /nosotros. Textos de la casa: el posteo de presentación de
 * @paulroger.hudson ("Nuestra historia, nuestra casa") y el documento de cultura.
 * Las cifras y reseñas son públicas y verificadas (fecha en cada bloque);
 * lo que no está confirmado va con `falta`, nunca inventado.
 */

import { CULTURA } from './sitio'

export const APERTURA_NOSOTROS = {
  titulo: 'Nuestra historia, nuestra casa',
  bajada:
    'Nuestra misión es clara: ser la verdadera experiencia culinaria. Un espacio donde la calidad, el cariño y la buena compañía sean el ingrediente principal.',
} as const

export const PRESENTACION = {
  titulo: 'Hicimos Paul con una misión: que tu visita sea inolvidable',
  columnas: [
    'Paul Roger nace de la sinergia de un grupo de amigos y empresarios con experiencia, pasión y una impronta propia. Lo armamos como una familia, para que en Zona Sur exista un lugar único y diferente.',
    'Esto es lo que nos une y a esto vinimos. Esta es nuestra casa, y queremos que te sientas como en la tuya.',
  ],
} as const

export interface Cifra {
  /** Número tal cual se muestra. Sin valor: se muestra el placeholder `falta`. */
  valor?: string
  titulo: string
  detalle: string
  falta?: string
}

/** Puntaje de Google relevado el 27-09-2026. Actualizar a mano o, en la Etapa 2, por API. */
export const GOOGLE = {
  puntaje: '4,7',
  opiniones: 241,
  fecha: 'septiembre de 2026',
  url: 'https://www.google.com/maps?cid=17324360053569439558',
} as const

export const CIFRAS: Cifra[] = [
  { valor: `${GOOGLE.puntaje}★`, titulo: 'Puntaje en Google', detalle: `Sobre ${GOOGLE.opiniones} opiniones de quienes ya vinieron` },
  { valor: '+90', titulo: 'Etiquetas de vino', detalle: 'Del Malbec de todos los días a las grandes bodegas' },
  { titulo: 'Años de oficio', detalle: 'La experiencia del equipo detrás de la parrilla, la barra y el salón', falta: 'años de experiencia sumados del equipo' },
  { titulo: 'Clientes recibidos', detalle: 'Desde que abrimos las puertas en 2025', falta: 'cantidad aproximada de clientes desde la apertura' },
]

/** "Lo que nos mueve", contado en prosa: los seis valores del documento de cultura, sin enumerarlos. */
export const LO_QUE_NOS_MUEVE = {
  titulo: 'Todo lo que pasa en la mesa, pensado de antemano',
  parrafos: [
    'Recibir bien es nuestro oficio. La hospitalidad empieza antes de que llegues —en la reserva— y sigue hasta la despedida: cada momento lo pensamos uno por uno, para que no tengas que pensar en nada.',
    'Buscamos la excelencia en el fuego, en la barra y en el salón, con respeto por el producto y por quien se sienta a la mesa. Lo sostiene un equipo comprometido que trabaja en conjunto y con la misma pasión del primer día.',
  ],
} as const

/** Tres columnas estilo "desde [año]": historia, misión y visión. */
export const DESDE = {
  anio: '2025',
  columnas: [
    {
      titulo: 'Nuestra historia',
      texto:
        'Nacimos entre amigos, del campo y de la buena comida, con la idea de armar en Zona Sur un lugar donde recibir como en casa. Abrimos en 2025 en Polo Design, Hudson.',
    },
    {
      titulo: 'Nuestra misión',
      texto: CULTURA.mision,
    },
    {
      titulo: 'Nuestra visión',
      texto: CULTURA.vision,
    },
  ],
} as const

export interface Mencion {
  medio: string
  anio: string
  titulo: string
  url: string
}

/** Notas donde aparece Paul Roger (verificadas el 27-09-2026). */
export const PRENSA: Mencion[] = [
  {
    medio: 'La Nación',
    anio: '2026',
    titulo: 'Escapada: el nuevo polo gastronómico que se consolida en la zona sur',
    url: 'https://www.lanacion.com.ar/salud/escapada-el-nuevo-polo-gastronomico-que-se-consolida-en-la-zona-sur-nid03122025/',
  },
  {
    medio: 'Canal 26',
    anio: '2025',
    titulo: 'La localidad de zona sur que se convirtió en un polo imperdible para comer y pasear',
    url: 'https://www.canal26.com/turismo/2025/12/27/una-escapada-cercana-y-muy-atractiva-la-localidad-de-zona-sur-que-se-convirtio-en-un-polo-imperdible-para-comer-y-pasear/',
  },
]

export interface Resena {
  id: string
  /** Nombre y la inicial del apellido: la reseña es pública, pero no hace falta el nombre completo. */
  autor: string
  texto: string
}

/**
 * Fragmentos textuales de reseñas públicas de Google (relevadas el 27-09-2026).
 * Solo se recorta con "…"; no se reescribe nada. Antes de publicar, confirmar con
 * la casa (y, si se puede, pasarlas por la API de Google en la Etapa 2).
 */
export const RESENAS: Resena[] = [
  {
    id: 'micaela',
    autor: 'Micaela M.',
    texto: 'Ir a Paul es una experiencia distinta a todo lo que alguna vez pudiste experimentar.',
  },
  {
    id: 'constanza',
    autor: 'Constanza A.',
    texto: 'Muy confortable el lugar, el sonido cuidado […], la estética, los tragos que he probado bien logrados, el sushi rico, fresco y de sabores sutiles.',
  },
  {
    id: 'washington',
    autor: 'Washington S.',
    texto: 'El lugar es hermoso, destaca mucho el diseño y la ambientación. […] la atención un diez.',
  },
  {
    id: 'laura',
    autor: 'Laura',
    texto: 'Impecable el servicio y la comida espectacular. A tiempo y bien servido.',
  },
  {
    id: 'andres',
    autor: 'Andrés R.',
    texto: 'Fabuloso lugar para conocer y disfrutar en familia o con amigos, hermosa ambientación y música funcional de la mejor, abundante carta de tragos y amplia gama de vinos boutique!',
  },
  {
    id: 'walter',
    autor: 'Walter M.',
    texto: 'Un lugar excelente para reuniones de trabajo y celebraciones importantes. Super recomendable!',
  },
]
