import { useContext } from 'react'
import { ActiveIdContext } from '../contexts/activeIdContextProvider'

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext)

  if(!context) throw new Error('ActiveIdContextProvider is not set!')

  return context
}