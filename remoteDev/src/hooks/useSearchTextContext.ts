import { useContext } from 'react'
import { searchTextContext } from '../contexts/searchTextContextProvider'

export function useSearchTextContext() {
  const context = useContext(searchTextContext)

  if(!context) throw new Error('searchTextContext is not set!')

  return context
}