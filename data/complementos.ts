import type { Complemento, ComplementoId } from './tipos'

/**
 * Complementos de la reserva, con los precios de la carta impresa
 * ("Bienvenidos a casa · Conocé nuestras experiencias").
 * Se abonan en la mesa: no hay pago online ni carrito.
 */
export const COMPLEMENTOS: Complemento[] = [
  {
    id: 'flores',
    nombre: 'Ramo de flores',
    descripcion: 'Flores de nuestro stand, de calidad y variedad. Lo preparamos para tu llegada.',
    variantes: [
      { id: 'ramo-pequeno', nombre: 'Ramo pequeño', precio: 18900 },
      { id: 'ramo-grande', nombre: 'Ramo grande', precio: 30000 },
    ],
  },
  {
    id: 'chocolates',
    nombre: 'Bombones belgas',
    descripcion: 'Chocolate belga artesanal, exclusivo para Paul Roger. Para cerrar la noche o para regalar.',
    variantes: [
      { id: 'bombones-6', nombre: 'Caja de 6', precio: 19900 },
      { id: 'bombones-12', nombre: 'Caja de 12', precio: 36900 },
      { id: 'bombones-20', nombre: 'Caja de 20', precio: 59000 },
    ],
  },
  {
    id: 'pistachos',
    nombre: 'Pistachos premium de altura',
    descripcion: 'De Mendoza, con cáscara.',
    variantes: [{ id: 'pistachos', nombre: 'Porción', precio: 29000 }],
  },
  {
    id: 'limousine',
    nombre: 'Limousine con chofer',
    descripcion:
      'Un solo vehículo, con chofer privado. El precio depende del trayecto: te respondemos con la disponibilidad antes de confirmar.',
    variantes: [{ id: 'limousine', nombre: 'Consulta', precio: null }],
    esConsulta: true,
  },
]

export const complemento = (id: ComplementoId) => COMPLEMENTOS.find((c) => c.id === id)!

export const esComplementoId = (valor: unknown): valor is ComplementoId =>
  typeof valor === 'string' && COMPLEMENTOS.some((c) => c.id === valor)
