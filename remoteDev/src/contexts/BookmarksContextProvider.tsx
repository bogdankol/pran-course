import React, { createContext } from 'react'
import useLocalStorageHook from '../hooks/useLocalStorageHook'
import type { IJobItemById } from '../types/interfaces'
import { useJobItems } from '../hooks/useJobItems'

export const BookmarksContext = createContext<IContext | null>(null)

interface IContext {
	bookmarkedIds: number[]
	bookmarkedJobItems: IJobItemById[]
	isFetching: boolean
	handleToggleBookmark: (id: number) => void
}

export default function BookmarksContextProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [bookmarkedIds, setBookmarkedIds] = useLocalStorageHook<number[]>(
		'bookmarkedIds',
		[],
	)

	const { jobItems: bookmarkedJobItems, isFetching } = useJobItems(bookmarkedIds)

	function handleToggleBookmark(id: number) {
		if (bookmarkedIds.includes(id)) {
			setBookmarkedIds(
				bookmarkedIds.filter((bookmarkedId: number) => bookmarkedId !== id),
			)
		} else {
			setBookmarkedIds([...bookmarkedIds, id])
		}
	}

	return (
		<BookmarksContext.Provider
			value={{
				bookmarkedIds,
				bookmarkedJobItems,
				isFetching,
				handleToggleBookmark,
			}}
		>
			{children}
		</BookmarksContext.Provider>
	)
}
