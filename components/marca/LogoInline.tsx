import vectores from '@/scripts/marca-vectores.json'

/**
 * Logo horizontal del manual como SVG incrustado en el HTML: se pinta en el primer
 * cuadro, sin esperar un pedido aparte. Se usa solo en la portada, donde es lo
 * primero que se ve. Mismos trazos que public/brand/logo-horizontal.svg.
 */
export function LogoInline({ className, titulo }: { className?: string; titulo?: string }) {
  const { w, h, paths } = vectores.horizontal
  return (
    <svg
      viewBox={`0 0 ${w.toFixed(2)} ${h.toFixed(2)}`}
      width={600}
      height={Math.round((600 * h) / w)}
      className={className}
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      <path fill="#e52521" d={paths.red} />
      <path fill="#ffffff" d={paths.black} />
    </svg>
  )
}
