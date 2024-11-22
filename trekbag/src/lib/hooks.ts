import { useContext } from 'react';
import { ItemsContext } from '../contexts/ItemsContextProvider';

export function useItemsContext() {
  const context = useContext(ItemsContext)

  if(!context) {
    throw Error('context must be within ContextProvider')
  }

  return context
}