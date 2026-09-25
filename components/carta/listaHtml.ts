import { TIPOS_WHISKY } from '@/data/carta'
import type { ItemCarta, Subcategoria, Vino, Whisky } from '@/data/tipos'
import { precio } from '@/lib/formato'

import s from './Carta.module.css'

/**
 * Las listas de la carta (~285 ítems) se entregan como HTML estático: React no
 * las hidrata, y eso le ahorra al celular el trabajo más pesado de la página.
 * Lo interactivo (navegación, filtros, scroll-spy) sigue en React y los filtros
 * ocultan filas por data-atributos (data-uva, data-tipo-whisky).
 * Los textos salen de /data y se escapan igual.
 */

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Mismo marcado que el componente <Falta>. */
const falta = (t: string) => `<span class="falta">[<b>FALTA:</b> ${esc(t)}]</span>`

const precioHtml = (valor: number | null, siFalta: string) => (valor === null ? siFalta : precio(valor))

function fila(it: ItemCarta) {
  const detalle = it.detalle ? `<span class="${s.itemDetalle}"> · ${esc(it.detalle)}</span>` : ''
  const descripcion = it.descripcion ? `<p class="${s.itemDescripcion}">${esc(it.descripcion)}</p>` : ''
  return (
    `<li class="${s.item}"><div class="${s.itemTexto}"><p class="${s.itemNombre}">${esc(it.nombre)}${detalle}</p>${descripcion}</div>` +
    `<p class="${s.itemPrecio}">${precioHtml(it.precio, falta('precio'))}</p></li>`
  )
}

function filaVino(v: Vino) {
  const etiqueta = v.etiqueta ? ` <span class="${s.etiqueta}">${esc(v.etiqueta)}</span>` : ''
  const detalle = v.detalle ? `<span class="${s.itemDetalle}"> · ${esc(v.detalle)}</span>` : ''
  const aviso = v.falta ? `<p class="${s.itemDescripcion}">${falta(v.falta)}</p>` : ''
  return (
    `<li class="${s.item} ${s.itemVino}" data-uva="${v.uva}"><div class="${s.itemTexto}">` +
    `<p class="${s.itemNombre}"><span class="${s.bodega}">${esc(v.bodega)}</span>${etiqueta}${detalle}</p>${aviso}</div>` +
    `<p class="${s.itemPrecio}">${precioHtml(v.precio, '<span class="visually-hidden">Precio a confirmar</span>')}</p></li>`
  )
}

function filaWhisky(w: Whisky) {
  const aviso = w.falta ? `<p class="${s.itemDescripcion}">${falta(w.falta)}</p>` : ''
  return (
    `<li class="${s.item}"><div class="${s.itemTexto}">` +
    `<p class="${s.itemNombre}">${esc(w.nombre)} <span class="${s.origen}">${esc(w.origen)}</span></p>` +
    `<p class="${s.itemDescripcion}">${esc(w.descripcion ?? '')}</p>${aviso}</div>` +
    `<p class="${s.itemPrecio}">${precioHtml(w.precio, '<span class="visually-hidden">Precio a confirmar</span>')}</p></li>`
  )
}

const cache = new Map<string, string>()

/** Contenido del <ul> de una subcategoría común o de vinos. */
export function htmlItems(sub: Subcategoria) {
  const clave = 'items:' + sub.id
  if (!cache.has(clave)) {
    const html = sub.tipo === 'vinos' ? (sub.items as Vino[]).map(filaVino).join('') : sub.items.map(fila).join('')
    cache.set(clave, html)
  }
  return cache.get(clave)!
}

/** Whiskies agrupados por tipo; cada grupo se puede ocultar con el filtro. */
export function htmlWhiskies(sub: Subcategoria) {
  const clave = 'whiskies:' + sub.id
  if (!cache.has(clave)) {
    const items = sub.items as Whisky[]
    const html = TIPOS_WHISKY.map(
      (g) =>
        `<div data-tipo-whisky="${g.id}"><h4 class="${s.grupoTitulo}">${esc(g.titulo)}</h4>` +
        `<ul role="list" class="${s.items}">${items.filter((w) => w.tipo === g.id).map(filaWhisky).join('')}</ul></div>`,
    ).join('')
    cache.set(clave, html)
  }
  return cache.get(clave)!
}
