'use client'

import { useEffect, useState } from 'react'

import { Glifo } from '@/components/marca/Icono'
import { Falta } from '@/components/ui/Falta'
import { cx } from '@/lib/formato'

import s from './campos.module.css'

export type Errores = Record<string, string | undefined>

/* ------------------------------------------------------------ campo de texto / fecha / select */

interface CampoProps {
  id: string
  etiqueta: string
  error?: string
  ayuda?: React.ReactNode
  opcional?: boolean
  children: (props: { id: string; 'aria-invalid'?: true; 'aria-describedby'?: string }) => React.ReactNode
  className?: string
}

/** Etiqueta + control + ayuda + error, conectados para lectores de pantalla. */
export function Campo({ id, etiqueta, error, ayuda, opcional, children, className }: CampoProps) {
  const describe = [ayuda ? `${id}-ayuda` : null, error ? `${id}-error` : null].filter(Boolean).join(' ') || undefined
  return (
    <div className={cx(s.campo, error && s.conError, className)}>
      <label htmlFor={id} className={s.etiqueta}>
        {etiqueta}
        {opcional && <span className={s.opcional}> (opcional)</span>}
      </label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describe })}
      {ayuda && (
        <div id={`${id}-ayuda`} className={s.ayuda}>
          {ayuda}
        </div>
      )}
      {error && (
        <p id={`${id}-error`} className={s.error}>
          {error}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------ grupo de opciones (radio / checkbox) */

interface Opcion {
  id: string
  titulo: string
  detalle?: React.ReactNode
}

interface OpcionesProps {
  nombre: string
  /** Prefijo único para los ids de ayuda y error (hay varios formularios en la misma página). */
  idBase?: string
  leyenda: string
  opciones: readonly Opcion[]
  valor: string | string[]
  onCambio: (valor: string) => void
  multiple?: boolean
  error?: string
  ayuda?: React.ReactNode
  variante?: 'chips' | 'tarjetas'
  opcional?: boolean
}

export function Opciones({ nombre, idBase, leyenda, opciones, valor, onCambio, multiple, error, ayuda, variante = 'chips', opcional }: OpcionesProps) {
  const base = idBase ?? nombre
  const describe = [ayuda ? `${base}-ayuda` : null, error ? `${base}-error` : null].filter(Boolean).join(' ') || undefined
  return (
    <fieldset id={base} tabIndex={-1} className={cx(s.campo, s.grupo, error && s.conError)} aria-describedby={describe}>
      <legend className={s.etiqueta}>
        {leyenda}
        {opcional && <span className={s.opcional}> (opcional)</span>}
      </legend>
      <div className={variante === 'chips' ? s.chips : s.tarjetas}>
        {opciones.map((o) => {
          const marcado = multiple ? (valor as string[]).includes(o.id) : valor === o.id
          return (
            <label key={o.id} className={variante === 'chips' ? s.chip : s.tarjeta}>
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={nombre}
                value={o.id}
                checked={marcado}
                onChange={() => onCambio(o.id)}
                className={s.oculto}
              />
              <span className={s.chipCaja}>
                <span className={s.marca} aria-hidden="true">
                  {multiple ? <Glifo tipo="check" className={s.check} /> : null}
                </span>
                <span className={s.chipTexto}>
                  <span className={s.chipTitulo}>{o.titulo}</span>
                  {o.detalle && <span className={s.chipDetalle}>{o.detalle}</span>}
                </span>
              </span>
            </label>
          )
        })}
      </div>
      {ayuda && (
        <div id={`${base}-ayuda`} className={s.ayuda}>
          {ayuda}
        </div>
      )}
      {error && (
        <p id={`${base}-error`} className={s.error}>
          {error}
        </p>
      )}
    </fieldset>
  )
}

/* ------------------------------------------------------------ utilidades de validación */

/** Hoy en formato AAAA-MM-DD, calculado en el navegador (para el mínimo de las fechas). */
export function useHoy() {
  const [hoy, setHoy] = useState<string>()
  useEffect(() => {
    const d = new Date()
    setHoy(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
  }, [])
  return hoy
}

export function validarContacto(datos: { nombre: string; telefono: string; email?: string }, errores: Errores, conEmail = true) {
  if (datos.nombre.trim().length < 3) errores.nombre = 'Escribí nombre y apellido.'
  const digitos = datos.telefono.replace(/\D/g, '')
  if (digitos.length < 8) errores.telefono = 'Dejanos un celular con característica, por ejemplo 11 2345 6789.'
  if (conEmail && datos.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.email.trim()))
    errores.email = 'Revisá el correo: le falta algo, por ejemplo nombre@correo.com.'
}

export function validarFecha(fecha: string, hoy: string | undefined, errores: Errores, clave = 'fecha') {
  if (!fecha) errores[clave] = 'Elegí una fecha.'
  else if (hoy && fecha < hoy) errores[clave] = 'La fecha ya pasó: elegí una desde hoy.'
}

/**
 * Lleva el foco al primer campo con error, para teclado y lectores de pantalla.
 * Los ids de los campos son `${prefijo}${clave}` porque hay varios formularios por página.
 */
export function enfocarPrimerError(form: HTMLFormElement | null, errores: Errores, prefijo: string) {
  const primero = Object.keys(errores).find((k) => errores[k])
  if (!form || !primero) return
  const el = form.querySelector<HTMLElement>(`#${CSS.escape(prefijo + primero)}`)
  el?.focus()
}

/** Aviso de datos que faltan dentro de un formulario. */
export function NotaFalta({ children }: { children: React.ReactNode }) {
  return (
    <p className={s.notaFalta}>
      <Falta>{children}</Falta>
    </p>
  )
}

/** Mensaje general de error, anunciado por lectores de pantalla. */
export function AvisoErrores({ cantidad }: { cantidad: number }) {
  return (
    <p role="alert" className={s.avisoErrores} hidden={cantidad === 0}>
      {cantidad === 1 ? 'Falta completar un dato.' : `Faltan completar ${cantidad} datos.`} Están marcados abajo.
    </p>
  )
}

export { s as estilosCampos }
