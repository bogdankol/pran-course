import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { BASE_API_URL } from '../lib/constants';
import toastError from '../utils/toastError'
import { IJobItemById } from '../types/interfaces';

interface IJobItemByIdResponse {
  jobItem: IJobItemById,
}

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map(id => ({
      queryKey: ['job-item', id],
      queryFn: () => fetchOneItem(id),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: (error: unknown) => toastError(error)
    }))
  })

  const jobItems = results
    ?.map((item: UseQueryResult<IJobItemByIdResponse | null, unknown>) => item.data?.jobItem)
    .filter(el => !!el)
  const isLoading = results
    // .some((item: UseQueryResult<IJobItemByIdResponse | null, unknown>) => item.status === 'loading')
    .some((item: UseQueryResult<IJobItemByIdResponse | null, unknown>) => item.isLoading)

  return {
    jobItems,
    isFetching: isLoading
  }

}

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