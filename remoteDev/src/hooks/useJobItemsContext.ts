import { useContext } from 'react'
import { JobItemsContext } from '../contexts/JobItemsContextProvider'

export function useJobItemsContext() {
  const context = useContext(JobItemsContext)

  if(!context) throw new Error('JobItemsContext is not set!')

  return context
}