'use client'

import { createContext, useContext, useState } from 'react'

import type { EscalonId } from '@/data/tipos'

interface Valor {
  escalon: EscalonId | null
  elegir: (e: EscalonId) => void
}

const Contexto = createContext<Valor | null>(null)

/**
 * En /eventos, el escalón que se elige arriba (selector) queda recordado y llega
 * precargado al formulario de consulta del final, sin volver a elegirlo.
 */
export function EscalonProvider({ inicial = null, children }: { inicial?: EscalonId | null; children: React.ReactNode }) {
  const [escalon, setEscalon] = useState<EscalonId | null>(inicial)
  return <Contexto.Provider value={{ escalon, elegir: setEscalon }}>{children}</Contexto.Provider>
}

export const useEscalon = () => useContext(Contexto)
