import { useEffect, useState } from 'react'

export function useDebounce(inputValue: string, delay: number = 1000) {
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInputValue(inputValue)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [inputValue, delay])

  return debouncedInputValue
}
