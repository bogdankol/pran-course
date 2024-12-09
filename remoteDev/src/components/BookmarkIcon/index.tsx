import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useContext } from 'react'
import { BookmarksContext } from '../../contexts/BookmarksContextProvider'
import { clsx } from 'clsx'

export default function BookmarkIcon({
  id
}: {
  id: number
}) {

  const context = useContext(BookmarksContext)

  if(!context) return 

  const { 
    bookmarkedIds, 
    handleToggleBookmark 
  }: {
    bookmarkedIds: number[]
    handleToggleBookmark: (id: number) => void
  } = context

  return (
		<button 
      className='bookmark-btn'
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        handleToggleBookmark(id)
      }}
      >
			<BookmarkFilledIcon className={`${bookmarkedIds.includes(id) ? 'filled' : ''}`} />
		</button>
	)
}
