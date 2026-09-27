'use client'

import { useId, useMemo, useRef, useState } from 'react'

import { Glifo } from '@/components/marca/Icono'
import { Falta } from '@/components/ui/Falta'
import { fechaLarga } from '@/data/agenda'
import { SERVICIO_DE_MESA } from '@/data/carta'
import { COMPLEMENTOS } from '@/data/complementos'
import { OCASIONES, OCASIONES_CON_COMPLEMENTOS, PERSONAS_MAX_MESA, SECTORES, TURNOS_EJEMPLO, type OcasionId } from '@/data/reservas'
import type { ComplementoId } from '@/data/tipos'
import { cx, precio } from '@/lib/formato'

import { AvisoErrores, Campo, enfocarPrimerError, Opciones, useHoy, validarContacto, validarFecha, type Errores } from './campos'
import { Confirmacion } from './Confirmacion'
import s from './reservas.module.css'

type Elegidos = Partial<Record<ComplementoId, string>>

const VARIANTE_INICIAL: Record<ComplementoId, string> = {
  flores: 'ramo-pequeno',
  chocolates: 'bombones-6',
  pistachos: 'pistachos',
  limousine: 'limousine',
}

interface Props {
  extras: ComplementoId[]
  ocasionInicial: OcasionId
  onPasarAEvento: () => void
}

/** Mesa: fecha, horario, personas, sector (Salón o Barra, sin VIP), ocasión y a nombre de quién. */
export function FormMesa({ extras, ocasionInicial, onPasarAEvento }: Props) {
  const hoy = useHoy()
  const uid = useId()
  const form = useRef<HTMLFormElement>(null)
  const inicial = () => ({
    fecha: '',
    horario: '',
    personas: '2',
    sector: 'salon',
    ocasion: ocasionInicial as string,
    nombre: '',
    telefono: '',
    email: '',
    comentarios: '',
  })
  const [d, setD] = useState(inicial)
  const [elegidos, setElegidos] = useState<Elegidos>(() => Object.fromEntries(extras.map((e) => [e, VARIANTE_INICIAL[e]])))
  const [errores, setErrores] = useState<Errores>({})
  const [enviado, setEnviado] = useState(false)

  const cambiar = (campo: keyof ReturnType<typeof inicial>) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setD((x) => ({ ...x, [campo]: e.target.value }))

  const conComplementos = OCASIONES_CON_COMPLEMENTOS.includes(d.ocasion as OcasionId)
  const grupoGrande = d.personas === 'mas'

  const lineas = useMemo(() => {
    if (!conComplementos) return []
    return COMPLEMENTOS.filter((c) => elegidos[c.id]).map((c) => {
      const v = c.variantes.find((x) => x.id === elegidos[c.id]) ?? c.variantes[0]
      return { id: c.id, nombre: c.variantes.length > 1 ? `${c.nombre} · ${v.nombre.toLowerCase()}` : c.nombre, precio: v.precio }
    })
  }, [elegidos, conComplementos])
  const total = lineas.reduce((t, l) => t + (l.precio ?? 0), 0)
  const conLimousine = lineas.some((l) => l.id === 'limousine')

  const alternar = (id: ComplementoId) =>
    setElegidos((x) => {
      const nuevo = { ...x }
      if (nuevo[id]) delete nuevo[id]
      else nuevo[id] = VARIANTE_INICIAL[id]
      return nuevo
    })

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    const err: Errores = {}
    validarFecha(d.fecha, hoy, err)
    if (!d.horario) err.horario = 'Elegí un horario.'
    if (grupoGrande) err.personas = `Para más de ${PERSONAS_MAX_MESA} personas armamos una propuesta de evento.`
    validarContacto(d, err)
    setErrores(err)
    if (Object.values(err).some(Boolean)) {
      enfocarPrimerError(form.current, err, uid)
      return
    }
    setEnviado(true)
  }

  const f = d.fecha ? fechaLarga(d.fecha) : null
  const cuando = f ? `${f.dia.toLowerCase()} ${f.numero} de ${f.mes}` : null
  const sector = SECTORES.find((x) => x.id === d.sector)?.titulo
  const ocasion = OCASIONES.find((x) => x.id === d.ocasion)?.titulo

  if (enviado) {
    const nombre = d.nombre.trim().split(' ')[0]
    return (
      <Confirmacion
        titulo={`Los esperamos, ${nombre}.`}
        email={d.email}
        onOtra={() => {
          setD(inicial())
          setElegidos({})
          setEnviado(false)
        }}
      >
        <p>
          Mesa para {d.personas} en {d.sector === 'barra' ? 'la barra' : 'el salón'}, el {cuando} a las {d.horario}.
          {ocasion && d.ocasion !== 'cena' ? ` Ocasión: ${ocasion.toLowerCase()}.` : ''}
        </p>
        {lineas.filter((l) => l.id !== 'limousine').length > 0 && (
          <p>
            Cuando lleguen, en la mesa: {lineas.filter((l) => l.id !== 'limousine').map((l) => l.nombre.toLowerCase()).join(', ')}. Se abona en la mesa
            {total ? `: ${precio(total)}` : ''}.
          </p>
        )}
        {conLimousine && <p>La limousine queda como consulta: te respondemos con la disponibilidad y el precio según el trayecto.</p>}
      </Confirmacion>
    )
  }

  const cantidadErrores = Object.values(errores).filter(Boolean).length

  return (
    <form ref={form} className={s.form} onSubmit={enviar} noValidate aria-label="Reserva de mesa">
      <div className={s.campos}>
        <AvisoErrores cantidad={cantidadErrores} />

        <div className={s.fila}>
          <Campo id={`${uid}fecha`} etiqueta="Fecha" error={errores.fecha}>
            {(p) => <input {...p} type="date" name="fecha" min={hoy} value={d.fecha} onChange={cambiar('fecha')} required />}
          </Campo>
          <Campo id={`${uid}horario`} etiqueta="Horario" error={errores.horario} ayuda={<Falta>turnos reales por servicio</Falta>}>
            {(p) => (
              <select {...p} name="horario" value={d.horario} onChange={cambiar('horario')} required>
                <option value="">Elegí un horario</option>
                <optgroup label="Mediodía">
                  {TURNOS_EJEMPLO.mediodia.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </optgroup>
                <optgroup label="Noche">
                  {TURNOS_EJEMPLO.noche.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </optgroup>
              </select>
            )}
          </Campo>
          <Campo id={`${uid}personas`} etiqueta="Personas" error={errores.personas}>
            {(p) => (
              <select {...p} name="personas" value={d.personas} onChange={cambiar('personas')}>
                {Array.from({ length: PERSONAS_MAX_MESA }, (_, i) => String(i + 1)).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === '1' ? 'persona' : 'personas'}
                  </option>
                ))}
                <option value="mas">Más de {PERSONAS_MAX_MESA}</option>
              </select>
            )}
          </Campo>
        </div>

        {grupoGrande && (
          <div className={s.sugerencia} role="status">
            <p>Para grupos de más de {PERSONAS_MAX_MESA} armamos una propuesta a medida, con menú y espacio para el grupo.</p>
            <button type="button" className="btn" onClick={onPasarAEvento}>
              Consultar como evento
              <Glifo tipo="flecha" />
            </button>
          </div>
        )}

        <Opciones
          nombre="sector"
          idBase={`${uid}sector`}
          leyenda="Sector"
          opciones={[
            { id: 'salon', titulo: 'Salón' },
            { id: 'barra', titulo: 'Barra' },
          ]}
          valor={d.sector}
          onCambio={(v) => setD((x) => ({ ...x, sector: v }))}
          ayuda="¿Buscás el salón privado? Se consulta como evento, desde la pestaña Evento."
        />

        <Opciones
          nombre="ocasion"
          idBase={`${uid}ocasion`}
          leyenda="Ocasión"
          opciones={OCASIONES}
          valor={d.ocasion}
          onCambio={(v) => setD((x) => ({ ...x, ocasion: v }))}
        />

        {conComplementos ? (
          <fieldset className={s.complementos}>
            <legend className={s.complementosTitulo}>
              Sumá algo a la ocasión <span className={s.complementosNota}>Se abona en la mesa</span>
            </legend>
            <ul role="list" className={s.complementosLista}>
              {COMPLEMENTOS.map((c) => {
                const activo = Boolean(elegidos[c.id])
                const desde = c.variantes[0].precio
                return (
                  <li key={c.id} className={cx(s.complemento, activo && s.complementoActivo)}>
                    <label className={s.complementoCabecera}>
                      <input type="checkbox" checked={activo} onChange={() => alternar(c.id)} className={s.complementoCheck} />
                      <span className={s.complementoCaja} aria-hidden="true">
                        <Glifo tipo="check" className={s.complementoTilde} />
                      </span>
                      <span className={s.complementoNombre}>{c.nombre}</span>
                      <span className={s.complementoPrecio}>
                        {c.esConsulta ? 'A consultar' : desde !== null ? `${c.variantes.length > 1 ? 'desde ' : ''}${precio(desde)}` : ''}
                      </span>
                    </label>
                    <p className={s.complementoTexto}>{c.descripcion}</p>
                    {activo && c.variantes.length > 1 && (
                      <Opciones
                        nombre={`variante-${c.id}`}
                        idBase={`${uid}variante-${c.id}`}
                        leyenda={`Elegí ${c.id === 'flores' ? 'el ramo' : 'la caja'}`}
                        opciones={c.variantes.map((v) => ({ id: v.id, titulo: v.nombre, detalle: v.precio !== null ? precio(v.precio) : undefined }))}
                        valor={elegidos[c.id]!}
                        onCambio={(v) => setElegidos((x) => ({ ...x, [c.id]: v }))}
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          </fieldset>
        ) : (
          extras.length > 0 && (
            <p className={s.sugerencia}>Los complementos se ofrecen para aniversarios, cumpleaños y celebraciones: elegí una de esas ocasiones para sumarlos.</p>
          )
        )}

        <div className={s.fila}>
          <Campo id={`${uid}nombre`} etiqueta="A nombre de" error={errores.nombre}>
            {(p) => <input {...p} type="text" name="nombre" autoComplete="name" placeholder="Nombre y apellido" value={d.nombre} onChange={cambiar('nombre')} />}
          </Campo>
          <Campo id={`${uid}telefono`} etiqueta="Celular" error={errores.telefono}>
            {(p) => <input {...p} type="tel" name="telefono" autoComplete="tel" inputMode="tel" placeholder="11 2345 6789" value={d.telefono} onChange={cambiar('telefono')} />}
          </Campo>
          <Campo id={`${uid}email`} etiqueta="Correo" error={errores.email} ayuda="Ahí te llega la confirmación.">
            {(p) => <input {...p} type="email" name="email" autoComplete="email" placeholder="nombre@correo.com" value={d.email} onChange={cambiar('email')} />}
          </Campo>
        </div>

        <Campo id={`${uid}comentarios`} etiqueta="¿Algo que tengamos que saber?" opcional>
          {(p) => (
            <textarea {...p} name="comentarios" maxLength={400} placeholder="Alergias, una silla para bebé, una sorpresa…" value={d.comentarios} onChange={cambiar('comentarios')} />
          )}
        </Campo>
      </div>

      <aside className={s.resumen} aria-label="Resumen de la reserva">
        <h2 className={s.resumenTitulo}>Tu reserva</h2>
        <dl className={s.resumenLista}>
          <div>
            <dt>Cuándo</dt>
            <dd>{cuando ? `${cuando}${d.horario ? `, ${d.horario}` : ''}` : 'Elegí fecha y horario'}</dd>
          </div>
          <div>
            <dt>Mesa</dt>
            <dd>
              {grupoGrande ? `Más de ${PERSONAS_MAX_MESA}` : `${d.personas} ${d.personas === '1' ? 'persona' : 'personas'}`} · {sector}
            </dd>
          </div>
          <div>
            <dt>Ocasión</dt>
            <dd>{ocasion}</dd>
          </div>
          {lineas.length > 0 && (
            <div>
              <dt>Complementos</dt>
              <dd>
                <ul role="list" className={s.resumenComplementos}>
                  {lineas.map((l) => (
                    <li key={l.id}>
                      <span>{l.nombre}</span>
                      <span>{l.precio !== null ? precio(l.precio) : 'a consultar'}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
        {lineas.length > 0 && (
          <p className={s.resumenTotal}>
            <span>Total de complementos</span>
            <strong>{precio(total)}</strong>
          </p>
        )}
        <p className={s.resumenNota}>
          {lineas.length > 0 ? 'Se abona en la mesa, no hay pago online. ' : ''}Servicio de mesa: {precio(SERVICIO_DE_MESA)} por persona.
        </p>
        <button type="submit" className={`btn btn-primario btn-grande ${s.enviar}`}>
          Confirmar reserva
        </button>
      </aside>
    </form>
  )
}
