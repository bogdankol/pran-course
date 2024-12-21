import { forwardRef } from 'react'
import { useBookmarksContext } from '../../hooks/useBookmarksContext'
import JobList from '../JobList'
import { createPortal } from 'react-dom'

type IProps = any

const BookmarksPopover = forwardRef<HTMLDivElement, IProps>(function (_: IProps, ref) {
	const {
    bookmarkedJobItems,
    isFetching
  } = useBookmarksContext()

	return createPortal(
		<div className='bookmarks-popover' ref={ref}>
			<JobList
				{...{
					jobItems: bookmarkedJobItems,
					isFetching
				}}
			/>
		</div>,
    document.body
	)
})

export default BookmarksPopover