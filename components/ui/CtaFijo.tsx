'use client'

import { useEffect, useState } from 'react'

import s from './CtaFijo.module.css'

/**
 * Botón de consulta fijo al pie en el celular mientras se recorre la página
 * (estructura de /eventos). Se esconde cuando el formulario ya está en pantalla.
 */
export function CtaFijo({ destino, children }: { destino: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const objetivo = document.getElementById(destino)
    const alScrollear = () => {
      const pasado = window.scrollY > window.innerHeight * 0.6
      const r = objetivo?.getBoundingClientRect()
      const enPantalla = r ? r.top < window.innerHeight && r.bottom > 0 : false
      setVisible(pasado && !enPantalla)
    }
    alScrollear()
    window.addEventListener('scroll', alScrollear, { passive: true })
    return () => window.removeEventListener('scroll', alScrollear)
  }, [destino])

  return (
    <div className={s.fijo} data-visible={visible ? 'si' : 'no'}>
      <a href={`#${destino}`} className="btn btn-primario" tabIndex={visible ? undefined : -1} aria-hidden={visible ? undefined : true}>
        {children}
      </a>
    </div>
  )
}
