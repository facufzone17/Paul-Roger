'use client'

import { useId, useRef, useState } from 'react'

import { fechaLarga } from '@/data/agenda'
import { PERSONAS_MAX_MESA, TURNOS_EJECUTIVO } from '@/data/reservas'
import { cx } from '@/lib/formato'

import { AvisoErrores, Campo, enfocarPrimerError, useHoy, validarContacto, validarFecha, type Errores } from './campos'
import { Confirmacion } from './Confirmacion'
import s from './reservas.module.css'

/** Menú ejecutivo: el formulario más corto. Día, horario y personas, para resolverlo desde el celular. */
export function FormEjecutivo() {
  const hoy = useHoy()
  const uid = useId()
  const form = useRef<HTMLFormElement>(null)
  const inicial = () => ({ dia: '', horario: '', personas: '2', nombre: '', telefono: '' })
  const [d, setD] = useState(inicial)
  const [errores, setErrores] = useState<Errores>({})
  const [enviado, setEnviado] = useState(false)

  const cambiar = (campo: keyof ReturnType<typeof inicial>) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setD((x) => ({ ...x, [campo]: e.target.value }))

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    const err: Errores = {}
    validarFecha(d.dia, hoy, err, 'dia')
    if (d.dia && !err.dia) {
      const [a, m, dd] = d.dia.split('-').map(Number)
      const semana = new Date(Date.UTC(a, m - 1, dd)).getUTCDay()
      if (semana === 0 || semana === 6) err.dia = 'El menú ejecutivo es de lunes a viernes: elegí un día hábil.'
    }
    if (!d.horario) err.horario = 'Elegí un horario.'
    validarContacto({ ...d, email: undefined }, err, false)
    setErrores(err)
    if (Object.values(err).some(Boolean)) {
      enfocarPrimerError(form.current, err, uid)
      return
    }
    setEnviado(true)
  }

  if (enviado) {
    const f = fechaLarga(d.dia)
    return (
      <Confirmacion
        titulo={`Listo, ${d.nombre.trim().split(' ')[0]}. Te esperamos al mediodía.`}
        onOtra={() => {
          setD(inicial())
          setEnviado(false)
        }}
      >
        <p>
          Menú ejecutivo para {d.personas} el {f.dia.toLowerCase()} {f.numero} de {f.mes} a las {d.horario}.
        </p>
      </Confirmacion>
    )
  }

  const cantidadErrores = Object.values(errores).filter(Boolean).length

  return (
    <form ref={form} className={cx(s.form, s.formUnaColumna)} onSubmit={enviar} noValidate aria-label="Reserva de menú ejecutivo">
      <div className={s.campos}>
        <p className={s.intro}>De lunes a viernes, de 12 a 16 h. Pensado para una reunión de trabajo o un almuerzo sin apuro.</p>
        <AvisoErrores cantidad={cantidadErrores} />

        <div className={s.fila}>
          <Campo id={`${uid}dia`} etiqueta="Día" error={errores.dia}>
            {(p) => <input {...p} type="date" name="dia" min={hoy} value={d.dia} onChange={cambiar('dia')} />}
          </Campo>
          <Campo id={`${uid}horario`} etiqueta="Horario" error={errores.horario}>
            {(p) => (
              <select {...p} name="horario" value={d.horario} onChange={cambiar('horario')}>
                <option value="">Elegí un horario</option>
                {TURNOS_EJECUTIVO.map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>
            )}
          </Campo>
          <Campo id={`${uid}personas`} etiqueta="Personas">
            {(p) => (
              <select {...p} name="personas" value={d.personas} onChange={cambiar('personas')}>
                {Array.from({ length: PERSONAS_MAX_MESA }, (_, i) => String(i + 1)).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === '1' ? 'persona' : 'personas'}
                  </option>
                ))}
              </select>
            )}
          </Campo>
        </div>

        <div className={s.fila}>
          <Campo id={`${uid}nombre`} etiqueta="A nombre de" error={errores.nombre}>
            {(p) => <input {...p} type="text" name="nombre" autoComplete="name" placeholder="Nombre y apellido" value={d.nombre} onChange={cambiar('nombre')} />}
          </Campo>
          <Campo id={`${uid}telefono`} etiqueta="Celular" error={errores.telefono}>
            {(p) => <input {...p} type="tel" name="telefono" autoComplete="tel" inputMode="tel" placeholder="11 2345 6789" value={d.telefono} onChange={cambiar('telefono')} />}
          </Campo>
        </div>

        <button type="submit" className={`btn btn-primario btn-grande ${s.enviar}`}>
          Confirmar reserva
        </button>
      </div>
    </form>
  )
}
