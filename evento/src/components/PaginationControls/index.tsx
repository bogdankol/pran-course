import Link from 'next/link'
import {
  ArrowLeftIcon,
  ArrowRightIcon
} from '@radix-ui/react-icons'
import { clsx } from 'clsx'

const btnStyles = 'text-white px-5 py-3 bg-white/5 rounded-md opacity-75 flex items-center gap-x-2 hover:opacity-100 transition text-sm'

export default function PaginationControls({
  previousPath,
  nextPath
}: {
  previousPath: string
  nextPath: string
}) {
	return <div className={clsx(`flex w-full`, {
    'justify-end': !previousPath,
    'justify-between': previousPath,
    'justify-start': !nextPath
  })}>
    {previousPath 
      ? <Link 
        {...{
          href: previousPath
        }}
        className={btnStyles}
      >
        <ArrowLeftIcon />
        Previous
      </Link>
      : null
    }

    {nextPath 
      ? <Link 
        {...{
          href: nextPath
        }}
        className={btnStyles}
      >
        Next
        <ArrowRightIcon />
      </Link>
      : null
    }
  </div>
}
