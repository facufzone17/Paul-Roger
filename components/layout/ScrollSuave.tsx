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

      // Las anclas de la misma página (#consulta, pestañas de la carta…) las lleva Lenis.
      // Si el salto quedara en manos del navegador, Lenis lo pisa cuando todavía tiene
      // inercia, y cualquier otro scroll suave (la fila de chips de la carta) lo corta a mitad de camino.
      const alClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        const link = (e.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null
        if (!link || (link.target && link.target !== '_self')) return
        const url = new URL(link.href)
        if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return
        const destino = document.getElementById(decodeURIComponent(url.hash.slice(1)))
        if (!destino) return
        e.preventDefault()
        lenis.scrollTo(destino)
        if (url.hash !== location.hash) history.pushState(null, '', url.hash)
      }
      document.addEventListener('click', alClick)

      deshacer = () => {
        document.removeEventListener('click', alClick)
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
