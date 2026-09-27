'use client'

import { useId, useRef, useState } from 'react'

import { fechaLarga } from '@/data/agenda'
import { SITIO } from '@/data/sitio'
import { cx } from '@/lib/formato'

import { AvisoErrores, Campo, enfocarPrimerError, NotaFalta, Opciones, useHoy, validarContacto, validarFecha, type Errores } from './campos'
import { Confirmacion } from './Confirmacion'
import s from './reservas.module.css'

/**
 * Limousine: trayecto, horario y pasajeros. Hay un solo vehículo, así que
 * SIEMPRE es una consulta: nunca se confirma al instante ni se agrega a un carrito.
 */
export function FormLimousine() {
  const hoy = useHoy()
  const uid = useId()
  const form = useRef<HTMLFormElement>(null)
  const inicial = () => ({
    fecha: '',
    hora: '',
    retiro: '',
    destino: 'paul-roger',
    otroDestino: '',
    recorrido: 'ida-y-vuelta',
    pasajeros: '',
    nombre: '',
    telefono: '',
    email: '',
    comentarios: '',
  })
  const [d, setD] = useState(inicial)
  const [errores, setErrores] = useState<Errores>({})
  const [enviado, setEnviado] = useState(false)

  const cambiar = (campo: keyof ReturnType<typeof inicial>) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setD((x) => ({ ...x, [campo]: e.target.value }))

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    const err: Errores = {}
    validarFecha(d.fecha, hoy, err)
    if (!d.hora) err.hora = 'Indicá a qué hora pasamos a buscarte.'
    if (d.retiro.trim().length < 5) err.retiro = 'Escribí la dirección de retiro, con calle y altura.'
    if (d.destino === 'otro' && d.otroDestino.trim().length < 5) err.otroDestino = 'Escribí la dirección de destino.'
    const pasajeros = Number(d.pasajeros)
    if (!d.pasajeros || !Number.isFinite(pasajeros) || pasajeros < 1) err.pasajeros = 'Indicá cuántos pasajeros son.'
    validarContacto(d, err)
    setErrores(err)
    if (Object.values(err).some(Boolean)) {
      enfocarPrimerError(form.current, err, uid)
      return
    }
    setEnviado(true)
  }

  if (enviado) {
    const f = fechaLarga(d.fecha)
    return (
      <Confirmacion
        titulo={`Gracias, ${d.nombre.trim().split(' ')[0]}. Recibimos tu consulta.`}
        email={d.email}
        textoOtra="Hacer otra consulta"
        onOtra={() => {
          setD(inicial())
          setEnviado(false)
        }}
      >
        <p>
          Limousine el {f.dia.toLowerCase()} {f.numero} de {f.mes} a las {d.hora}, desde {d.retiro.trim()} hasta{' '}
          {d.destino === 'otro' ? d.otroDestino.trim() : 'Paul Roger'} ({d.recorrido === 'ida' ? 'solo ida' : 'ida y vuelta'}), para {d.pasajeros}{' '}
          {d.pasajeros === '1' ? 'pasajero' : 'pasajeros'}.
        </p>
        <p>Es un solo vehículo: todavía no está confirmada. Te respondemos con la disponibilidad y el precio según el trayecto.</p>
      </Confirmacion>
    )
  }

  const cantidadErrores = Object.values(errores).filter(Boolean).length

  return (
    <form ref={form} className={cx(s.form, s.formUnaColumna)} onSubmit={enviar} noValidate aria-label="Consulta de limousine">
      <div className={s.campos}>
        <p className={s.intro}>
          Llegar en limousine, con chofer privado. Es un solo vehículo, así que esto es una consulta: te confirmamos disponibilidad y precio según el
          trayecto.
        </p>
        <NotaFalta>si el servicio es propio o tercerizado, qué incluye y la capacidad de pasajeros</NotaFalta>
        <AvisoErrores cantidad={cantidadErrores} />

        <div className={s.fila}>
          <Campo id={`${uid}fecha`} etiqueta="Fecha" error={errores.fecha}>
            {(p) => <input {...p} type="date" name="fecha" min={hoy} value={d.fecha} onChange={cambiar('fecha')} />}
          </Campo>
          <Campo id={`${uid}hora`} etiqueta="Horario de retiro" error={errores.hora}>
            {(p) => <input {...p} type="time" name="hora" step={900} value={d.hora} onChange={cambiar('hora')} />}
          </Campo>
          <Campo id={`${uid}pasajeros`} etiqueta="Pasajeros" error={errores.pasajeros}>
            {(p) => <input {...p} type="number" name="pasajeros" inputMode="numeric" min={1} max={20} value={d.pasajeros} onChange={cambiar('pasajeros')} />}
          </Campo>
        </div>

        <Campo id={`${uid}retiro`} etiqueta="Dirección de retiro" error={errores.retiro}>
          {(p) => <input {...p} type="text" name="retiro" autoComplete="street-address" placeholder="Calle, altura y localidad" value={d.retiro} onChange={cambiar('retiro')} />}
        </Campo>

        <Opciones
          nombre="destino"
          idBase={`${uid}destino`}
          leyenda="Destino"
          opciones={[
            { id: 'paul-roger', titulo: 'Paul Roger', detalle: `${SITIO.direccion.calle}, ${SITIO.direccion.zona}` },
            { id: 'otro', titulo: 'Otro destino' },
          ]}
          valor={d.destino}
          onCambio={(v) => setD((x) => ({ ...x, destino: v }))}
        />

        {d.destino === 'otro' && (
          <Campo id={`${uid}otroDestino`} etiqueta="Dirección de destino" error={errores.otroDestino}>
            {(p) => <input {...p} type="text" name="otroDestino" placeholder="Calle, altura y localidad" value={d.otroDestino} onChange={cambiar('otroDestino')} />}
          </Campo>
        )}

        <Opciones
          nombre="recorrido"
          idBase={`${uid}recorrido`}
          leyenda="Recorrido"
          opciones={[
            { id: 'ida', titulo: 'Solo ida' },
            { id: 'ida-y-vuelta', titulo: 'Ida y vuelta' },
          ]}
          valor={d.recorrido}
          onCambio={(v) => setD((x) => ({ ...x, recorrido: v }))}
        />

        <div className={s.fila}>
          <Campo id={`${uid}nombre`} etiqueta="Nombre y apellido" error={errores.nombre}>
            {(p) => <input {...p} type="text" name="nombre" autoComplete="name" value={d.nombre} onChange={cambiar('nombre')} />}
          </Campo>
          <Campo id={`${uid}telefono`} etiqueta="Celular" error={errores.telefono}>
            {(p) => <input {...p} type="tel" name="telefono" autoComplete="tel" inputMode="tel" placeholder="11 2345 6789" value={d.telefono} onChange={cambiar('telefono')} />}
          </Campo>
          <Campo id={`${uid}email`} etiqueta="Correo" error={errores.email}>
            {(p) => <input {...p} type="email" name="email" autoComplete="email" placeholder="nombre@correo.com" value={d.email} onChange={cambiar('email')} />}
          </Campo>
        </div>

        <Campo id={`${uid}comentarios`} etiqueta="Comentarios" opcional>
          {(p) => <textarea {...p} name="comentarios" maxLength={400} placeholder="Una ocasión especial, paradas en el camino…" value={d.comentarios} onChange={cambiar('comentarios')} />}
        </Campo>

        <button type="submit" className={`btn btn-primario btn-grande ${s.enviar}`}>
          Enviar consulta
        </button>
      </div>
    </form>
  )
}
