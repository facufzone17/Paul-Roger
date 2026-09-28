'use client'

import { useId, useRef, useState } from 'react'

import { useEscalon } from '@/components/eventos/EscalonContexto'
import { fechaLarga } from '@/data/agenda'
import { ADICIONALES, ESCALONES, MENUS_EVENTO, PRODUCTOS_PAUL_ROGER, TIPOS_EVENTO } from '@/data/eventos'
import type { EscalonId } from '@/data/tipos'
import { cx } from '@/lib/formato'

import { AvisoErrores, Campo, enfocarPrimerError, NotaFalta, Opciones, useHoy, validarContacto, validarFecha, type Errores } from './campos'
import { Confirmacion } from './Confirmacion'
import s from './reservas.module.css'

const MENUS = [...MENUS_EVENTO.map((m) => ({ id: m.id, titulo: m.nombre })), { id: 'no-se', titulo: 'Todavía no sé' }]

interface Props {
  escalonInicial?: EscalonId | null
  /** Adicional que llega marcado (p. ej. la limousine). */
  adicionalesIniciales?: string[]
  /** Dentro de /reservar lleva su propio encabezado; en /eventos y /sala-vip el de la página. */
  titulo?: string
}

/**
 * Consulta de evento. ES EL MISMO COMPONENTE en /reservar (pestaña Evento),
 * /eventos y /sala-vip: una sola fuente de verdad. Si cambia un campo,
 * se cambia acá una vez.
 */
export function FormEvento({ escalonInicial = null, adicionalesIniciales = [], titulo }: Props) {
  const hoy = useHoy()
  const uid = useId()
  const form = useRef<HTMLFormElement>(null)
  const contexto = useEscalon()
  const [escalonLocal, setEscalonLocal] = useState<EscalonId | null>(escalonInicial)
  const escalon = contexto?.escalon ?? escalonLocal
  const setEscalon = (e: EscalonId) => (contexto ? contexto.elegir(e) : setEscalonLocal(e))

  const inicial = () => ({
    tipo: '',
    invitados: '',
    fecha: '',
    turno: 'noche',
    menu: 'no-se',
    adicionales: adicionalesIniciales,
    productos: [] as string[],
    nombre: '',
    telefono: '',
    email: '',
    mensaje: '',
  })
  const [d, setD] = useState(inicial)
  const [errores, setErrores] = useState<Errores>({})
  const [enviado, setEnviado] = useState(false)

  const cambiar = (campo: 'tipo' | 'invitados' | 'fecha' | 'nombre' | 'telefono' | 'email' | 'mensaje') => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setD((x) => ({ ...x, [campo]: e.target.value }))

  const alternar = (campo: 'adicionales' | 'productos', id: string) =>
    setD((x) => ({ ...x, [campo]: x[campo].includes(id) ? x[campo].filter((v) => v !== id) : [...x[campo], id] }))

  const invitados = Number(d.invitados)
  const superaSalon = escalon === 'salon-privado' && invitados > 16

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    const err: Errores = {}
    if (!escalon) err.escalon = 'Elegí dónde te imaginás el evento.'
    if (!d.tipo) err.tipo = 'Contanos qué se celebra.'
    if (!d.invitados || !Number.isFinite(invitados) || invitados < 1) err.invitados = 'Indicá cuántos invitados, aunque sea aproximado.'
    validarFecha(d.fecha, hoy, err)
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
    const esc = ESCALONES.find((x) => x.id === escalon)
    const menu = MENUS.find((m) => m.id === d.menu)
    const adicionales = ADICIONALES.filter((a) => d.adicionales.includes(a.id)).map((a) => a.nombre.toLowerCase())
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
          {d.tipo} para {invitados} {invitados === 1 ? 'persona' : 'personas'} · {esc?.nombre.toLowerCase()} · {f.dia.toLowerCase()} {f.numero} de {f.mes}, {d.turno}.
        </p>
        <p>
          Menú: {menu?.titulo.toLowerCase()}.{adicionales.length > 0 ? ` Adicionales: ${adicionales.join(', ')}.` : ''}
        </p>
        <p>El equipo te va a responder con la disponibilidad y una propuesta, con todos estos datos ya cargados.</p>
      </Confirmacion>
    )
  }

  const cantidadErrores = Object.values(errores).filter(Boolean).length

  return (
    <form ref={form} className={cx(s.form, s.formUnaColumna)} onSubmit={enviar} noValidate aria-label="Consulta de evento">
      <div className={s.campos}>
        {titulo && <h2 className={s.formTitulo}>{titulo}</h2>}
        <AvisoErrores cantidad={cantidadErrores} />

        <Opciones
          nombre="escalon"
          idBase={`${uid}escalon`}
          leyenda="¿Dónde lo imaginás?"
          variante="tarjetas"
          opciones={ESCALONES.map((e) => ({ id: e.id, titulo: e.nombre, detalle: e.capacidad }))}
          valor={escalon ?? ''}
          onCambio={(v) => setEscalon(v as EscalonId)}
          error={errores.escalon}
          ayuda={escalon === 'exclusividad' ? <NotaFalta>capacidad del espacio completo</NotaFalta> : undefined}
        />

        <div className={s.fila}>
          <Campo id={`${uid}tipo`} etiqueta="Qué se celebra" error={errores.tipo}>
            {(p) => (
              <select {...p} name="tipo" value={d.tipo} onChange={cambiar('tipo')}>
                <option value="">Elegí una opción</option>
                {TIPOS_EVENTO.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            )}
          </Campo>
          <Campo
            id={`${uid}invitados`}
            etiqueta="Invitados"
            error={errores.invitados}
            ayuda={superaSalon ? 'La Sala VIP es para hasta 16 personas. Para más, mirá la exclusividad total.' : undefined}
          >
            {(p) => <input {...p} type="number" name="invitados" inputMode="numeric" min={1} max={500} placeholder="Aproximado" value={d.invitados} onChange={cambiar('invitados')} />}
          </Campo>
          <Campo id={`${uid}fecha`} etiqueta="Fecha tentativa" error={errores.fecha}>
            {(p) => <input {...p} type="date" name="fecha" min={hoy} value={d.fecha} onChange={cambiar('fecha')} />}
          </Campo>
        </div>

        <Opciones
          nombre="turno"
          idBase={`${uid}turno`}
          leyenda="Momento del día"
          opciones={[
            { id: 'mediodía', titulo: 'Mediodía' },
            { id: 'noche', titulo: 'Noche' },
          ]}
          valor={d.turno}
          onCambio={(v) => setD((x) => ({ ...x, turno: v }))}
        />

        <Opciones
          nombre="menu"
          idBase={`${uid}menu`}
          leyenda="Menú de preferencia"
          opciones={MENUS}
          valor={d.menu}
          onCambio={(v) => setD((x) => ({ ...x, menu: v }))}
          ayuda={<NotaFalta>precio por persona de cada menú</NotaFalta>}
        />

        <Opciones
          nombre="adicionales"
          idBase={`${uid}adicionales`}
          leyenda="Adicionales"
          multiple
          opcional
          opciones={ADICIONALES.map((a) => ({ id: a.id, titulo: a.siempreConsulta ? `${a.nombre} (a consultar)` : a.nombre }))}
          valor={d.adicionales}
          onCambio={(v) => alternar('adicionales', v)}
        />

        <Opciones
          nombre="productos"
          idBase={`${uid}productos`}
          leyenda="Productos Paul Roger"
          multiple
          opcional
          opciones={PRODUCTOS_PAUL_ROGER.map((p) => ({ id: p.id, titulo: p.nombre }))}
          valor={d.productos}
          onCambio={(v) => alternar('productos', v)}
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

        <Campo id={`${uid}mensaje`} etiqueta="Contanos qué tenés en mente" opcional>
          {(p) => (
            <textarea {...p} name="mensaje" maxLength={800} placeholder="Una sorpresa, una ambientación, horarios, restricciones alimentarias…" value={d.mensaje} onChange={cambiar('mensaje')} />
          )}
        </Campo>

        <NotaFalta>anticipación mínima para reservar un evento y si se pide seña</NotaFalta>

        <button type="submit" className={`btn btn-primario btn-grande ${s.enviar}`}>
          Enviar consulta
        </button>
      </div>
    </form>
  )
}
