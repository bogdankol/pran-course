import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'
import { TDirection } from '../../types/types'
import { useJobItemsContext } from '../../hooks/useJobItemsContext'

export default function PaginationControls() {

  const {
    currentPage,
    handlePageChange,
    totalNumberOfPages
  } = useJobItemsContext()
    
	return <section className='pagination'>
    {currentPage > 1 && <PaginationButton
      {...{
        direction: 'prev',
        currentPage,
        onClick: handlePageChange,
      }}
    />}

    {
      currentPage < totalNumberOfPages &&
      <PaginationButton
        {...{
          direction: 'next',
          currentPage,
          onClick: handlePageChange,
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
