import { useState, useEffect } from 'react'

export function useActiveItemId() {
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    function onHashChange() {
      const id = +window.location.hash.substring(1)
      setActiveId(id)
    }

    onHashChange()

    window.addEventListener('hashchange', onHashChange)

    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return activeId
}