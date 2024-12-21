import { clsx } from 'clsx'
import { TSortBy } from '../../types/types'
import { useJobItemsContext } from '../../hooks/useJobItemsContext'

export default function SortingControls() {

  const {
    sortBy,
    handleChangeSortBy
  } = useJobItemsContext()

	return (
		<section className='sorting'>
			<i className='fa-solid fa-arrow-down-short-wide'></i>

			<SortingButton 
        {...{
          sortBy,
          text: 'Relevant',
          onClick: () => handleChangeSortBy('relevant'),
          isActive: sortBy === 'relevant'
        }}
      />

			<SortingButton 
        {...{
          sortBy,
          text: 'Recent',
          onClick: () => handleChangeSortBy('recent'),
          isActive: sortBy === 'recent'
        }}
      />
		</section>
	)
}

function SortingButton({
  sortBy,
  text,
  onClick,
  isActive
}: {
  sortBy: TSortBy
  text: string
  onClick: () => void,
  isActive: boolean
}) {
  return <button
  className={clsx(`sorting__button sorting__button--${sortBy}`, `${isActive ? 'sorting__button--active' : ''}`)}
  onClick={() => onClick()}
>
  {text}
</button>
}