import { TriangleUpIcon } from '@radix-ui/react-icons'
import type { IItem } from '../../lib/interfaces'
import { useState } from 'react'
import { clsx } from 'clsx'

export default function FeedbackItem({
  upvoteCount: UPVC,
  badgeLetter,
  company,
  daysAgo,
  text,
}: IItem) {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [upvoteCount, setUpvoteCount] = useState<number>(UPVC)

  function upvoteClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    setUpvoteCount((prev: number) => prev + 1)
    e.currentTarget.disabled = true
  }

  function onItemClickHandler() {
    setIsOpened(!isOpened)
  }

  return (
    <li 
      className={clsx(
        "feedback", {
          ['feedback--expand']: isOpened
        }
      )}
      onClick={onItemClickHandler}
    >
      <button onClick={upvoteClickHandler}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>

      <div>
        <p>{badgeLetter}</p>
      </div>

      <div>
        <p>{company}</p>
        <p>{text}</p>
      </div>

      <p>{daysAgo ? `${daysAgo}d` : 'NEW'}</p>
    </li>
  )
}

