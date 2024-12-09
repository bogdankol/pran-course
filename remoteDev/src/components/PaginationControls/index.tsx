import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'
import { TDirection } from '../../types/types'

export default function PaginationControls({
	onClick,
	currentPage,
  totalNumberOfPages
}: {
	onClick: (direction: TDirection, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	currentPage: number
  totalNumberOfPages: number
}) {
	return <section className='pagination'>
    {currentPage > 1 && <PaginationButton
      {...{
        direction: 'prev',
        currentPage,
        onClick,
      }}
    />}

    {
      currentPage < totalNumberOfPages &&
      <PaginationButton
        {...{
          direction: 'next',
          currentPage,
          onClick,
        }}
      />
    }

    
  </section>
}

function PaginationButton({
	direction,
	currentPage,
	onClick,
}: {
	direction: TDirection
	currentPage: number
	onClick: (direction: TDirection, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) {
	return (
		<button
			className={clsx('pagination__button', `pagination__button--${direction}`)}
			onClick={(e) => onClick(direction, e)}
		>
			{direction === 'prev' && <ArrowLeftIcon />}
			Page {direction === 'prev' ? currentPage - 1 : currentPage + 1}
			{direction === 'next' && <ArrowRightIcon />}
		</button>
	)
}
