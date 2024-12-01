import { useState, useEffect } from 'react'
import { BASE_API_URL } from '../lib/constants'
import { useActiveItemId } from './useActiveItemId'
import { IJobItemById } from '../types/interfaces'

export function useActiveJobItemHook() {
  const [jobItem, setJobItem] = useState<IJobItemById | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const activeId = useActiveItemId()

  useEffect(() => {

    console.log({activeId})
    if(!activeId) return

    const queryString = `${BASE_API_URL}/${activeId}`

    setIsFetching(true)
    fetch(queryString)
      .then(response => response.json())
      .then(({jobItem}) => {
        setJobItem(jobItem)
      })
      .catch(error => console.log({error}))
      .finally(() => setIsFetching(false))

  }, [activeId])

  return {
    jobItemInfo: jobItem,
    isFetching
  }
}