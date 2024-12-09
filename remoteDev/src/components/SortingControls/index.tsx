import { clsx } from 'clsx'
import { TSortBy } from '../../types/types'

interface IProps {
	onClick: (s: TSortBy) => void
	sortBy: TSortBy
}

export default function SortingControls({
	onClick,
	sortBy,
}: IProps) {
	return (
		<section className='sorting'>
			<i className='fa-solid fa-arrow-down-short-wide'></i>

			<SortingButton 
        {...{
          sortBy,
          text: 'Relevant',
          onClick,
          isActive: sortBy === 'relevant'
        }}
      />

			<SortingButton 
        {...{
          sortBy,
          text: 'Recent',
          onClick,
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
  onClick: (s: TSortBy) => void,
  isActive: boolean
}) {
  return <button
  className={clsx(`sorting__button sorting__button--${sortBy}`, `${isActive ? 'sorting__button--active' : ''}`)}
  onClick={() => onClick('relevant')}
>
  {text}
</button>
}