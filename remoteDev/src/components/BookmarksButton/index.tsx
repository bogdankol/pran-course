import { TriangleDownIcon } from '@radix-ui/react-icons'
import BookmarksPopover from '../BookmarksPopover'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

export default function BookmarksButton() {

  const [isOpened, setIsOpened] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useOnClickOutside([buttonRef, popoverRef], () => {setIsOpened(false)})

  function handleClick() {
    setIsOpened(!isOpened)
  }

	return (
		<section>
			<button 
        ref={buttonRef}
        className='bookmarks-btn'
        onClick={handleClick}
      >
				Bookmarks <TriangleDownIcon />
			</button>

			{isOpened && <BookmarksPopover 
        {...{
          ref: popoverRef
        }}
      />}
		</section>
	)
}
