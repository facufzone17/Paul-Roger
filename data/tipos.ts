/**
 * Tipos de los datos del sitio.
 *
 * En la Etapa 1 todo vive en archivos de /data. Están pensados como filas de
 * tablas (ids estables en slug, sin HTML adentro, referencias por id) para que
 * en la Etapa 2 se migren a la base de datos sin tocar los componentes: el
 * componente recibe el mismo objeto, venga de un archivo o de una consulta.
 */

/** Precio en pesos argentinos. `null` = el dato falta y se muestra como [FALTA: …]. */
export type Precio = number | null

export interface ItemCarta {
  id: string
  nombre: string
  /** Aclaración corta al lado del nombre: "3 piezas", "500 ml". */
  detalle?: string
  descripcion?: string
  precio: Precio
  /** Texto del placeholder visible cuando falta un dato. */
  falta?: string
  /** La foto de la carta impresa estaba cortada: el dato se leyó parcialmente y hay que confirmarlo. */
  verificar?: string
}

export type Uva =
  | 'malbec'
  | 'cabernet-sauvignon'
  | 'cabernet-franc'
  | 'pinot-noir'
  | 'syrah'
  | 'merlot'
  | 'tannat'
  | 'bonarda'
  | 'blend'
  | 'chardonnay'
  | 'sauvignon-blanc'
  | 'torrontes'
  | 'semillon'
  | 'riesling'
  | 'gewurztraminer'
  | 'viognier'
  | 'criolla'
  | 'moscatel'
  | 'petit-manseng'
  | 'blanco-otro'
  | 'rosado'
  | 'espumoso'
  | 'copa'

export interface Vino extends ItemCarta {
  bodega: string
  etiqueta: string
  uva: Uva
}

export type TipoWhisky = 'blended' | 'pure-malt' | 'single-malt' | 'irlanda' | 'estados-unidos'

export interface Whisky extends ItemCarta {
  origen: string
  tipo: TipoWhisky
}

export type SeccionId = 'cocina' | 'sushi' | 'barra' | 'vinos'

export interface Subcategoria {
  id: string
  titulo: string
  nota?: string
  /** Placeholder visible si a la subcategoría le falta información (p. ej. foto de la carta cortada). */
  falta?: string
  /** Cómo se lista: platos comunes, vinos (filtro por uva) o whiskies (filtro por tipo). */
  tipo?: 'items' | 'vinos' | 'whiskies'
  items: ItemCarta[] | Vino[] | Whisky[]
}

export interface SeccionCarta {
  id: SeccionId
  titulo: string
  bajada: string
  subcategorias: Subcategoria[]
}

/* ------------------------------------------------------------ complementos */

export type ComplementoId = 'flores' | 'chocolates' | 'pistachos' | 'limousine'

export interface VarianteComplemento {
  id: string
  nombre: string
  precio: Precio
}

export interface Complemento {
  id: ComplementoId
  nombre: string
  descripcion: string
  /** Una sola opción a elegir entre variantes (tamaño del ramo, cantidad de bombones). */
  variantes: VarianteComplemento[]
  /** Limousine: nunca se agrega directo, siempre es una consulta. */
  esConsulta?: boolean
}

/* ------------------------------------------------------------ agenda */

export interface FechaAgenda {
  id: string
  /** Fecha ISO (AAAA-MM-DD). */
  fecha: string
  hora: string
  titulo: string
  formato: string
  /** true mientras la grilla real no llegue: se rotula como ejemplo. */
  ejemplo: boolean
}

/* ------------------------------------------------------------ eventos */

export type EscalonId = 'mesa-festejo' | 'salon-privado' | 'exclusividad'

export interface Escalon {
  id: EscalonId
  numero: string
  nombre: string
  capacidad: string
  capacidadFalta?: string
  resumen: string
}

export interface MenuEvento {
  id: string
  nombre: string
  descripcion: string
}

export interface Adicional {
  id: string
  nombre: string
  descripcion: string
  siempreConsulta?: boolean
}
