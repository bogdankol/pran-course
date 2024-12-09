import React, { createContext } from 'react'
import useLocalStorageHook from '../hooks/useLocalStorageHook'

export const BookmarksContext = createContext(null)

export default function BookmarksContextProvider({
  children
}: {
  children: React.ReactNode
}) {

  const [bookmarkedIds, setBookmarkedIds] = useLocalStorageHook('bookmarkedIds', [])
  
  function handleToggleBookmark(id: number) {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((bookmarkedId: number) => bookmarkedId !== id))
    } else {
      setBookmarkedIds([...bookmarkedIds, id])
    }
  }

  return <BookmarksContext.Provider value={{
    bookmarkedIds,
    handleToggleBookmark
  }}>
    {children}
  </BookmarksContext.Provider>
}
