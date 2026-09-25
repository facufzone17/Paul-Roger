'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { Icono } from '@/components/marca/Icono'

import s from './reservas.module.css'

/**
 * Pantalla de confirmación. En la Etapa 1 no se envía ni se guarda nada:
 * se muestra cómo se vería, y se aclara.
 */
export function Confirmacion({
  titulo,
  children,
  email,
  onOtra,
  textoOtra = 'Hacer otra reserva',
}: {
  titulo: string
  children: React.ReactNode
  email?: string
  onOtra: () => void
  textoOtra?: string
}) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    ref.current?.focus()
    ref.current?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }, [])

  return (
    <div className={s.confirmacion}>
      <Icono nombre="reserva" alto={40} className={s.confirmacionFirma} />
      <h2 ref={ref} tabIndex={-1} className={s.confirmacionTitulo}>
        {titulo}
      </h2>
      <div className={s.confirmacionCuerpo}>{children}</div>
      <p className={s.confirmacionMaqueta}>
        <strong>Esto es una maqueta: no se envió ningún dato.</strong> En el sitio final
        {email ? ` llega un correo a ${email} con la identidad de la casa,` : ' llega la confirmación por correo,'} y el equipo recibe el aviso con
        todos los datos ordenados.
      </p>
      <div className={s.confirmacionAcciones}>
        <Link href="/" className="btn">
          Volver al inicio
        </Link>
        <button type="button" className="btn" onClick={onOtra}>
          {textoOtra}
        </button>
      </div>
    </div>
  )
}
