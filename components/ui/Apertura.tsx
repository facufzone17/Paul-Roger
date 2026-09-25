import type { Foto as TipoFoto } from '@/lib/imagenes'
import { cx } from '@/lib/formato'

import { Falta } from './Falta'
import { Foto } from './Foto'
import s from './Apertura.module.css'

interface Props {
  volanta: string
  titulo: React.ReactNode
  bajada?: React.ReactNode
  /** Foto tratada en oscuro. Sin foto: placeholder marcado (si se indica `falta`) o apertura solo de texto. */
  foto?: TipoFoto
  falta?: string
  posicion?: string
  children?: React.ReactNode
}

/**
 * Apertura de las páginas internas. Bloque contenido, no a pantalla completa:
 * quien llega acá ya tiene intención, hay que darle contenido rápido.
 */
export function Apertura({ volanta, titulo, bajada, foto, falta, posicion, children }: Props) {
  const conBloque = Boolean(foto || falta)
  return (
    <header className={cx(s.apertura, conBloque ? s.conBloque : s.soloTexto)}>
      <div className={s.bloque}>
        {foto && <Foto foto={foto} sizes="100vw" capa="lateral" prioridad className={s.foto} posicion={posicion} calidad={70} />}
        {!foto && falta && (
          <div className={s.vacio}>
            <span className={s.aviso}>
              <Falta>{falta}</Falta>
            </span>
          </div>
        )}
        <div className={s.texto}>
          <p className="volanta">{volanta}</p>
          <h1 className={s.titulo}>{titulo}</h1>
          {bajada && <div className={s.bajada}>{bajada}</div>}
          {children && <div className={s.acciones}>{children}</div>}
        </div>
      </div>
    </header>
  )
}
