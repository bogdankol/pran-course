import React, { createContext, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'

export const searchTextContext = createContext<IContext | null>(null)

interface IContext {
  inputValue: string
  debouncedInputValue: string
  handleChangeSearchText: (newSearchText: string) => void
}

export default function searchTextProviderProvider({
  children,
}: {
  children: React.ReactNode
}) {
  
  const [inputValue, setInputValue] = useState<string>('')
  const debouncedInputValue = useDebounce(inputValue, 500)

  function handleChangeSearchText(newSearchText: string) {
    setInputValue(newSearchText)
  }

  return (
    <searchTextContext.Provider
      value={{
        inputValue,
        debouncedInputValue,
        handleChangeSearchText
      }}
    >
      {children}
    </searchTextContext.Provider>
  )
}
