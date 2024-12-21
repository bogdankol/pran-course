import { useEffect } from 'react'

export function useOnClickOutside(refs: React.RefObject<HTMLElement>[], handler: () => void) {
  useEffect(() => {

    function handleEventClick(e: MouseEvent) {
      if(
        e.target instanceof HTMLElement &&
        refs.every(ref => !ref.current?.contains(e.target as Node))
      )
       return handler()
    }

    document.addEventListener('click', handleEventClick)

    return () => document.removeEventListener('click', handleEventClick)
  }, [refs, handler])
}