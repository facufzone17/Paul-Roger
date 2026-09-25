/**
 * Datos de la casa. Lo que todavía no confirmó el cliente va con `falta`
 * y se muestra como placeholder visible, nunca inventado.
 */

export const SITIO = {
  nombre: 'Paul Roger',
  claim: 'Brasas & Cocktail',
  frase: 'Bienvenidos a casa',
  url: 'https://paulroger.com.ar',
  descripcion:
    'Parrilla contemporánea, sushi y coctelería de autor en Polo Design, Guillermo E. Hudson. Salón privado, eventos, música en vivo y limousine.',
  direccion: {
    calle: 'Calle 47 6750',
    zona: 'Polo Design',
    localidad: 'Guillermo E. Hudson',
    provincia: 'Buenos Aires',
    codigoPais: 'AR',
  },
  email: 'reservas@paulroger.com.ar',
  instagram: {
    usuario: '@paulroger.hudson',
    url: 'https://www.instagram.com/paulroger.hudson/',
  },
  horarios: {
    falta: 'horarios de cafetería, mediodía y noche',
  },
  /** Link para llegar: no es un mapa embebido, abre la app de mapas del celular. */
  comoLlegar: 'https://www.google.com/maps/search/?api=1&query=Paul+Roger+Calle+47+6750+Guillermo+E.+Hudson',
} as const

export const NAV_IZQUIERDA = [
  { label: 'La Casa', href: '/la-casa' },
  { label: 'Carta', href: '/carta' },
  { label: 'Eventos', href: '/eventos' },
] as const

export const NAV_DERECHA = [
  { label: 'Private Dining', href: '/private-dining' },
  { label: 'Nosotros', href: '/nosotros' },
] as const

/** Servicios del pie de página (wireframe: "Eventos Privados" destacado). */
export const SERVICIOS_FOOTER = [
  { label: 'Brasas', href: '/carta#fuertes' },
  { label: 'Sushi', href: '/carta#sushi' },
  { label: 'Coctelería', href: '/carta#cocteleria-de-autor' },
  { label: 'Salón VIP', href: '/private-dining' },
  { label: 'Eventos Privados', href: '/eventos', destacado: true },
  { label: 'Limousine', href: '/reservar?tipo=limousine' },
] as const

/** Recorrido del cliente, del documento de cultura (Capacitación Nº 1, Consultoría Mentor). */
export const RECORRIDO_DEL_CLIENTE = [
  'Reserva',
  'Llegada',
  'Recepción',
  'Mesa',
  'Pedido',
  'Comida',
  'Servicio',
  'Pago',
  'Despedida',
  'Recuerdo',
] as const

export const CULTURA = {
  mision:
    'Crear experiencias gastronómicas únicas y memorables, integrando excelencia, hospitalidad y calidez humana.',
  vision: 'Convertir a Paul Roger en un referente gastronómico reconocido por la calidad de su propuesta.',
  valores: ['Hospitalidad', 'Excelencia', 'Respeto', 'Compromiso', 'Trabajo en equipo', 'Pasión'],
  lujo: 'El verdadero lujo es cuando el cliente siente que todo fue pensado para él.',
} as const
