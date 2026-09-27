'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Fades y reveals sobrios al scrollear. Lo que ya está en pantalla se marca
 * visible antes de activar el efecto, así nada parpadea; sin JavaScript o con
 * prefers-reduced-motion, todo se ve de entrada.
 */
export function Revelar() {
  const ruta = usePathname()

  useEffect(() => {
    const raiz = document.documentElement
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elementos = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'))

    if (reducido || !('IntersectionObserver' in window)) {
      elementos.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const alto = window.innerHeight
    for (const el of elementos) {
      const r = el.getBoundingClientRect()
      if (r.top < alto * 0.95 && r.bottom > 0) el.classList.add('is-visible')
    }
    raiz.setAttribute('data-revelar', '')

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            observador.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    elementos.filter((el) => !el.classList.contains('is-visible')).forEach((el) => observador.observe(el))
    return () => observador.disconnect()
  }, [ruta])

  return null
}
