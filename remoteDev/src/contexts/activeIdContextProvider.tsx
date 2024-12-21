import React, { createContext } from 'react'
import { useActiveItemId } from '../hooks/useActiveItemId'

export const ActiveIdContext = createContext<IContext | null>(null)

interface IContext {
  activeId: number | null
}

export default function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  
  const activeId = useActiveItemId()

  return (
    <ActiveIdContext.Provider
      value={{
        activeId
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  )
}
