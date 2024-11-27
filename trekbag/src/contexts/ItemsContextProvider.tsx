import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { initialItems } from '../lib/constants'

interface IItem {
  name: string
  packed: boolean
  id: number
}

export const ItemsContext = createContext<any>(null)

export default function ItemsContextProvider({ 
  children 
}:{
  children: ReactNode
} ) {

  const [items, setItems] = useState<IItem[]>(() => {
    return JSON.parse(localStorage?.getItem('items') as string) || initialItems
  })

  const handleAddItem = (inputValue: string) => {
    const newItem = {
      id: new Date().getTime(),
      name: inputValue,
      packed: false
    }
    const newArr = [newItem, ...items]

    setItems(newArr)
  }

  const handleDeleteItem = (id: number) => {
    const newItems = items.filter((el: IItem) => String(el.id) !== String(id))
    setItems(newItems)
  }

  const handleToggleItem = (id: number) => {
    const newItems = items.map((el: IItem) => {
      if(String(el.id) === String(id)) return {...el, packed: !el.packed}
      return el
    })
    setItems(newItems)
  }

  const handleRemoveAllItems = () => {
    setItems([])
  }

  const handleResetToInitial = () => {
    setItems(initialItems)
  }

  const markAllAsComplete = () => {
    setItems(prev => prev.map((el: any) => ({
      ...el, 
      packed: true
    })))
  }

  const markAllAsIncomplete = () => {
    setItems(prev => prev.map((el: any) => ({
      ...el, 
      packed: false
    })))
  }

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])
  
  return <ItemsContext.Provider value={{
    items,
    handleAddItem,
    handleDeleteItem,
    handleToggleItem,
    handleRemoveAllItems,
    handleResetToInitial,
    markAllAsComplete,
    markAllAsIncomplete
  }}>{children}</ItemsContext.Provider>
}
