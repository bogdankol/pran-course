import React, { createContext, useCallback, useMemo, useState } from 'react'
import { useSearchQuery } from '../hooks/useSearchQuery'
import { RESULTS_PER_PAGE } from '../lib/constants'
import { IJobItem } from '../types/interfaces'
import { TSortBy, TDirection } from '../types/types'
import { useSearchTextContext } from '../hooks/useSearchTextContext'

export const JobItemsContext = createContext<IContext | null>(null)

interface IContext {
  jobItems: IJobItem[]
  isFetching: boolean
  totalAmountOfItems: number
  totalNumberOfPages: number
  jobItemsSliced: IJobItem[]
  currentPage: number
  sortBy: TSortBy
  handlePageChange: (direction: TDirection, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleChangeSortBy: (newSortBy: TSortBy) => void
}

export default function JobItemsContextProvider({
	children,
}: {
	children: React.ReactNode
}) {
  const {
    debouncedInputValue
  } = useSearchTextContext()

	const [currentPage, setCurrentPage] = useState<number>(1)
	const [sortBy, setSortBy] = useState<TSortBy>('relevant')
	const { isFetching, jobItems } = useSearchQuery(debouncedInputValue)

	const totalAmountOfItems = jobItems.length
	const totalNumberOfPages = totalAmountOfItems / RESULTS_PER_PAGE

  // we don't want the code below to execute again when currentPage changes, so we need to use useMemo
  // also we are spreading the jobItems array to avoid mutating the original array - which is basically a link
  //    in memory, so despite content of this link is changed, the reference to this link is still the same
  //    thus jobItemsSliced will not be updated (but with speading the original array we are creating a new link)
	const jobItemsSorted = useMemo( () => [...jobItems]?.sort((a: IJobItem, b: IJobItem) =>
		sortBy === 'relevant'
			? b.relevanceScore - a.relevanceScore
			: a.daysAgo - b.daysAgo,
	), [jobItems, sortBy])

  // we don't want the code below to execute again when currentPage changes, so we need to use useMemo
	const jobItemsSliced = useMemo(() => jobItemsSorted.slice(
		currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
		currentPage * RESULTS_PER_PAGE,
	), [jobItemsSorted, currentPage])

	const handlePageChange = useCallback(() => (
		direction: TDirection,
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		if (direction === 'next') {
      // in that approach the function get recreated every time the currentPage changes
			// setCurrentPage(currentPage + 1)

      setCurrentPage((prev: number) => prev + 1)
		} else {
			// setCurrentPage(currentPage - 1)
      setCurrentPage((prev: number) => prev - 1)
		}
		e.currentTarget.blur()
	}, [])

	const handleChangeSortBy = useCallback(() => (newSortBy: TSortBy) => {
		setSortBy(newSortBy)
		setCurrentPage(1)
	}, [])

  const contextValue = useMemo(() => ({
    jobItems,
    isFetching,
    totalAmountOfItems,
    totalNumberOfPages,
    jobItemsSliced,
    currentPage,
    sortBy,
    handlePageChange,
    handleChangeSortBy
  }), [jobItems, isFetching, totalAmountOfItems, totalNumberOfPages, jobItemsSliced, currentPage, sortBy, handlePageChange, handleChangeSortBy])

	return (
		<JobItemsContext.Provider value={contextValue}>{children}</JobItemsContext.Provider>
	)
}
