import { useEffect, useState } from 'react'
import { IJobItem } from '../types/interfaces'

let timer: ReturnType<typeof setTimeout>
const TIMEOUT = 600

export function useJobItems(inputValue: string) {
  const [isFetching, setIsFetching] = useState<boolean>(false)
	const [jobItems, setJobItems] = useState<IJobItem[]>([])
  const jobItemsSliced = jobItems.slice(0, 7)

	useEffect(() => {
		if (!inputValue) return
    
		clearTimeout(timer)

		timer = setTimeout(async () => {
      setIsFetching(true)

			try {
				const res = await fetch(
					`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${inputValue}`,
				)
				const { jobItems } = await res.json()

        setJobItems(jobItems)
			} catch (error: unknown) {
				const errorMessage =
					error instanceof Error ? error.message : 'Something went wrong!'
				throw new Error(`Error: ${errorMessage}`)
			} finally {
        setIsFetching(false)
      }
      
		}, TIMEOUT)

	}, [inputValue])

  return [
    isFetching,
    jobItemsSliced
  ] as const
}
