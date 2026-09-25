import type { FechaAgenda } from './tipos'

/**
 * Agenda de música en vivo.
 * FALTA la grilla real: estas fechas son de EJEMPLO y se rotulan así en el sitio.
 * En la Etapa 2 las carga el equipo desde el panel.
 */
export const AGENDA: FechaAgenda[] = [
  { id: 'ej-2026-10-02', fecha: '2026-10-02', hora: '22:00', titulo: 'Artista a confirmar', formato: 'Banda en vivo', ejemplo: true },
  { id: 'ej-2026-10-03', fecha: '2026-10-03', hora: '22:30', titulo: 'Artista a confirmar', formato: 'Banda en vivo', ejemplo: true },
  { id: 'ej-2026-10-09', fecha: '2026-10-09', hora: '22:00', titulo: 'Artista a confirmar', formato: 'Formato acústico', ejemplo: true },
  { id: 'ej-2026-10-10', fecha: '2026-10-10', hora: '22:30', titulo: 'Artista a confirmar', formato: 'Banda en vivo', ejemplo: true },
  { id: 'ej-2026-10-16', fecha: '2026-10-16', hora: '22:00', titulo: 'Artista a confirmar', formato: 'Formato acústico', ejemplo: true },
]

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

/** "Viernes 2 de octubre". Se calcula sin zona horaria para que servidor y navegador den lo mismo. */
export function fechaLarga(iso: string) {
  const [a, m, d] = iso.split('-').map(Number)
  const dia = new Date(Date.UTC(a, m - 1, d)).getUTCDay()
  return { dia: DIAS[dia], numero: d, mes: MESES[m - 1] }
}
