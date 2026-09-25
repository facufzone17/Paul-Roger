/** "$39.000": igual que en la carta impresa. Sin Intl para que servidor y navegador den lo mismo. */
export function precio(valor: number) {
  return '$' + String(Math.round(valor)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

/** Une clases condicionales: cx('a', cond && 'b'). */
export function cx(...clases: (string | false | null | undefined)[]) {
  return clases.filter(Boolean).join(' ')
}
