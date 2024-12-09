import BookmarkIcon from '../BookmarkIcon'
import { IJobItem } from '../../types/interfaces'
import { clsx } from 'clsx'

interface IProps {
  jobItem: IJobItem
  isActive: boolean
}

export default function JobListItem({
  jobItem: {
    badgeLetters,
    company,
    daysAgo,
    relevanceScore,
    title,
    id
  },
  isActive
}: IProps) {
	return (
		<li className={clsx(
      'job-item', {
        ['job-item--active']: isActive
      })}>
			<a className='job-item__link' href={`/#${id}`}>
				<div className='job-item__badge'>{badgeLetters}</div>

				<div className='job-item__middle'>
					<h3 className='third-heading'>{title}</h3>
					<p className='job-item__company'>{company}</p>
				</div>

				<div className='job-item__right'>
					<BookmarkIcon 
            {...{
              id
            }}
          />
					<time className='job-item__time'>{`${daysAgo}d`}</time>
				</div>
			</a>
		</li>
	)
}
