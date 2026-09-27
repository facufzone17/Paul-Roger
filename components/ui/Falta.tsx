/** Placeholder visible para datos que el cliente todavía no confirmó. Nunca se inventan. */
export function Falta({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={className ? `falta ${className}` : 'falta'}>
      [<b>FALTA:</b> {children}]
    </span>
  )
}
