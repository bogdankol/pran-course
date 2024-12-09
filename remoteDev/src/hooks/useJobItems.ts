import { useEffect, useState } from 'react'
import { IJobItem } from '../types/interfaces'
import { BASE_API_URL } from '../lib/constants'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import toastError from '../utils/toastError'

// export function useJobItems(inputValue: string) {
//   const [isFetching, setIsFetching] = useState<boolean>(false)
// 	const [jobItems, setJobItems] = useState<IJobItem[]>([])


// 	useEffect(() => {
// 		if (!inputValue) return
    
// 		async function fetchItems() {
//       setIsFetching(true)

// 			try {
// 				const res = await fetch(`${BASE_API_URL}?search=${inputValue}`)
// 				const { jobItems } = await res?.json()

//         setJobItems(jobItems)
// 			} catch (error: unknown) {
// 				const errorMessage =
// 					error instanceof Error ? error.message : 'Something went wrong!'
// 				throw new Error(`Error: ${errorMessage}`)
// 			} finally {
//         setIsFetching(false)
//       }
//     }

//     fetchItems()

// 	}, [inputValue])

//   return {
//     isFetching,
//     jobItems
//   } 
// }

async function fetchItems(inputValue: string): Promise<IJobItem[] | undefined> {
  if(!inputValue) return

  const res = await fetch(`${BASE_API_URL}?search=${inputValue}`)

  if(!res.ok) {
    const error = await res.json()
    throw new Error(`ERROR!!!!!: ${error.description}`)
  }
  const { jobItems } = await res?.json()
  return jobItems
}

export function useJobItems(inputValue: string) {
  const {data, isInitialLoading} = useQuery(
    ['job-items', inputValue],
    () => fetchItems(inputValue),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!inputValue,
      onError: (error: unknown) => toastError(error)
    }
  )

  return {
    jobItems: data || [],
    isFetching: isInitialLoading
  }
}