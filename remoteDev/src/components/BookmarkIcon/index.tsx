import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useBookmarksContext } from '../../hooks/useBookmarksContext'

export default function BookmarkIcon({
  id
}: {
  id: number
}) {

  const { 
    bookmarkedIds, 
    handleToggleBookmark 
  }: {
    bookmarkedIds: number[]
    handleToggleBookmark: (id: number) => void
  } = useBookmarksContext()

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
