import type { Adicional, Escalon, EscalonId, MenuEvento } from './tipos'

/**
 * Textos de eventos: salen de "Paul_Roger_Servicios_y_Eventos (1).docx"
 * (erratas corregidas: "Pistache" → "Pistachos premium de altura", "Limusine" → "Limousine").
 * Estructura de la página según estructura-eventos.html.
 */

export const EVENTOS_INTRO =
  'En Paul Roger diseñamos momentos inolvidables. Nuestra propuesta combina gastronomía de excelencia, espacios sofisticados y atención al detalle, adaptada a cada celebración.'

export const ESCALONES: Escalon[] = [
  {
    id: 'mesa-festejo',
    nombre: 'Mesa de festejo',
    capacidad: 'En el salón',
    capacidadFalta: 'cantidad máxima de personas por mesa',
    resumen: 'Cumpleaños y celebraciones en una mesa del salón, con menú establecido o personalizado.',
  },
  {
    id: 'salon-privado',
    nombre: 'Sala VIP',
    capacidad: 'Hasta 16 personas',
    resumen: 'Un espacio cerrado con TV, aire acondicionado y privacidad.',
  },
  {
    id: 'exclusividad',
    nombre: 'Exclusividad total',
    capacidad: 'El espacio completo',
    capacidadFalta: 'capacidad del espacio completo',
    resumen: 'Reserva privada de nuestros salones o del espacio completo, para la máxima privacidad.',
  },
]

export const escalon = (id: EscalonId) => ESCALONES.find((e) => e.id === id)!

export const esEscalonId = (valor: unknown): valor is EscalonId =>
  typeof valor === 'string' && ESCALONES.some((e) => e.id === valor)

export const DETALLE_MESA_FESTEJO = {
  titulo: 'Mesas y festejos de cumpleaños',
  puntos: [
    {
      titulo: 'Menú establecido de cumpleaños',
      texto:
        'Una selección preconcebida con entrada, plato principal y postre, pensada para dar agilidad y excelencia al servicio en grupos.',
    },
    {
      titulo: 'Menú personalizado',
      texto: 'Una carta a la medida de sus gustos y preferencias alimentarias, coordinada antes con nuestro equipo de cocina.',
    },
  ],
}

export const DETALLE_EXCLUSIVIDAD = {
  titulo: 'Festejos con total exclusividad',
  puntos: [
    {
      titulo: 'Toda la casa para ustedes',
      texto:
        'Reserva privada de nuestros salones o del espacio completo, para asegurar la máxima privacidad y un ambiente único para sus invitados.',
    },
    {
      titulo: 'Personalización del evento',
      texto: 'Ambientación a medida, coordinación logística, arreglos florales propios y planificación integral de la velada.',
    },
  ],
}

export const MENUS_EVENTO: MenuEvento[] = [
  {
    id: 'establecido',
    nombre: 'Menú establecido de cumpleaños',
    descripcion: 'Entrada, plato principal y postre, pensado para servir con agilidad a grupos.',
  },
  {
    id: 'personalizado',
    nombre: 'Menú personalizado',
    descripcion: 'A la medida de sus gustos y preferencias alimentarias, coordinado con nuestra cocina.',
  },
  {
    id: 'formal-cocktail',
    nombre: 'Formal o cocktail',
    descripcion: 'Finger food, pasos de alta cocina y barra libre.',
  },
  {
    id: 'islas',
    nombre: 'Islas gastronómicas',
    descripcion:
      'Estaciones temáticas e interactivas: fiambres artesanales, sushi bar, carnes al corte y opciones vegetarianas, para un formato dinámico y distendido.',
  },
]

export const ADICIONALES: Adicional[] = [
  {
    id: 'dj',
    nombre: 'DJ y musicalización',
    descripcion: 'Ambientación sonora profesional, sets en vivo y equipamiento de audio adaptado al estilo del evento.',
  },
  {
    id: 'ambientacion',
    nombre: 'Ambientación y flores',
    descripcion: 'Ambientación a medida y arreglos florales propios.',
  },
  {
    id: 'coordinacion',
    nombre: 'Coordinación',
    descripcion: 'Coordinación logística y planificación integral del desarrollo de la velada.',
  },
  {
    id: 'limousine',
    nombre: 'Limousine con chofer',
    descripcion: 'Chofer privado. El precio depende del trayecto: siempre es a consultar.',
    siempreConsulta: true,
  },
]

export const PRODUCTOS_PAUL_ROGER = [
  { id: 'flores', nombre: 'Ramos de flores', descripcion: 'De calidad y variedad, de nuestro stand.' },
  { id: 'chocolates', nombre: 'Chocolate belga artesanal', descripcion: 'Bombones exclusivos para Paul Roger.' },
  { id: 'pistachos', nombre: 'Pistachos premium de altura', descripcion: 'De Mendoza, con cáscara.' },
] as const

export const TIPOS_EVENTO = ['Cumpleaños', 'Aniversario', 'Pedida de mano', 'Cena de empresa', 'Reunión de trabajo', 'Otro'] as const

/** Sala VIP (antes "salón privado" / Private Dining): un solo espacio, confirmado por el cliente. */
export const SALON_PRIVADO = {
  capacidad: 16,
  equipamiento: ['TV', 'Aire acondicionado', 'Privacidad'],
  faltan: [
    'si se alquila por hora o por evento',
    'mínimo de consumo',
    'días y horarios disponibles para reuniones de trabajo',
  ],
} as const
