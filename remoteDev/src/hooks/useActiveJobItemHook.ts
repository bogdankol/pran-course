import { useState, useEffect } from 'react'
import { BASE_API_URL } from '../lib/constants'
import { useActiveItemId } from './useActiveItemId'
import { IJobItemById } from '../types/interfaces'
import { useQuery } from '@tanstack/react-query'
import toastError from '../utils/toastError'

interface IJobItemByIdResponse {
  jobItem: IJobItemById,
}
// export function useActiveJobItemHook() {
//   const [jobItem, setJobItem] = useState<IJobItemById | null>(null)
//   const [isFetching, setIsFetching] = useState<boolean>(false)

//   const activeId = useActiveItemId()

//   useEffect(() => {

//     if(!activeId) return

//     const queryString = `${BASE_API_URL}/${activeId}`

//     setIsFetching(true)
//     fetch(queryString)
//       .then(response => response.json())
//       .then(({jobItem}) => {
//         setJobItem(jobItem)
//       })
//       .catch(error => console.log({error}))
//       .finally(() => setIsFetching(false))

//   }, [activeId])

//   return {
//     jobItemInfo: jobItem,
//     isFetching
//   }
// }

async function fetchOneItem(activeId: number | null): Promise<IJobItemByIdResponse | null> {
  if(!activeId) return null

  const queryString = `${BASE_API_URL}/${activeId}`
  const res = await fetch(queryString)

  if(!res.ok) {
    const error = await res.json()
    throw new Error(`Error: ${error.message}`)
  }
  const data = await res.json()
  return data
}

export function useActiveJobItemHook() {

  const activeId = useActiveItemId()

  const {data, isLoading, isInitialLoading} = useQuery(
    ['item', activeId],
    () => fetchOneItem(activeId),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!activeId,
      onError: (error: unknown) => toastError(error)
    }
  )

  return {
    jobItemInfo: data?.jobItem || null,
    isFetching: isInitialLoading
  }
  
}