/**
 * Opciones de los formularios de /reservar, /eventos y /sala-vip.
 * En la Etapa 2 los turnos salen de la configuración del panel.
 */

export const TIPOS_RESERVA = [
  { id: 'mesa', titulo: 'Mesa' },
  { id: 'evento', titulo: 'Evento' },
  { id: 'limousine', titulo: 'Limousine' },
] as const

export type TipoReserva = (typeof TIPOS_RESERVA)[number]['id']

export const esTipoReserva = (valor: unknown): valor is TipoReserva =>
  typeof valor === 'string' && TIPOS_RESERVA.some((t) => t.id === valor)

export const OCASIONES = [
  { id: 'cena', titulo: 'Cena' },
  { id: 'aniversario', titulo: 'Aniversario' },
  { id: 'cumpleanos', titulo: 'Cumpleaños' },
  { id: 'celebracion', titulo: 'Celebración' },
  { id: 'negocios', titulo: 'Negocios' },
] as const

export type OcasionId = (typeof OCASIONES)[number]['id']

/** Solo con estas ocasiones se ofrecen los complementos (con "Cena" no aparecen). */
export const OCASIONES_CON_COMPLEMENTOS: readonly OcasionId[] = ['aniversario', 'cumpleanos', 'celebracion']

export const esOcasionId = (valor: unknown): valor is OcasionId =>
  typeof valor === 'string' && OCASIONES.some((o) => o.id === valor)

/** Sin VIP a propósito: la Sala VIP no es un sector de mesa, se consulta como evento. */
export const SECTORES = [
  { id: 'salon', titulo: 'Salón' },
  { id: 'barra', titulo: 'Barra' },
] as const

const cadaMediaHora = (desde: string, hasta: string) => {
  const aMin = (h: string) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3))
  const out: string[] = []
  for (let m = aMin(desde); m <= aMin(hasta); m += 30) {
    out.push(`${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`)
  }
  return out
}

/** FALTAN los horarios reales: estos turnos son de ejemplo y el formulario lo aclara. */
export const TURNOS_EJEMPLO = {
  mediodia: cadaMediaHora('12:00', '15:00'),
  noche: cadaMediaHora('20:00', '23:30'),
}

export const PERSONAS_MAX_MESA = 12
