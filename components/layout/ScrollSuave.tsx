'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Scroll con inercia (Lenis): la rueda del mouse frena en drift en vez de saltos
 * discretos. Corre sobre gsap.ticker —ya usado por ScrollTrigger en el sitio
 * (ver Servicios.tsx)— en lugar de un rAF propio, así quedan sincronizados.
 * Se desactiva con prefers-reduced-motion: el scroll nativo sigue andando igual.
 */
export function ScrollSuave() {
  useEffect(() => {
    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)')
    let cancelado = false
    let deshacer: (() => void) | undefined

    const iniciar = async () => {
      deshacer?.()
      deshacer = undefined
      if (consulta.matches) return

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      if (cancelado || consulta.matches) return

      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenis.on('scroll', ScrollTrigger.update)

      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      deshacer = () => {
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
    }

    iniciar()
    consulta.addEventListener('change', iniciar)
    return () => {
      cancelado = true
      consulta.removeEventListener('change', iniciar)
      deshacer?.()
    }
  }, [])

  return null
}
