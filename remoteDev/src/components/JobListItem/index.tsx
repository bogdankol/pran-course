import BookmarkIcon from '../BookmarkIcon'
import { IJobItem } from '../../types/interfaces'

export default function JobListItem({
  badgeLetters,
  company,
  daysAgo,
  relevanceScore,
  title
}: IJobItem) {
	return (
		<li className='job-item'>
			<a className='job-item__link'>
				<div className='job-item__badge'>{badgeLetters}</div>

				<div className='job-item__middle'>
					<h3 className='third-heading'>{title}</h3>
					<p className='job-item__company'>{company}</p>
				</div>

				<div className='job-item__right'>
					<BookmarkIcon />
					<time className='job-item__time'>{`${daysAgo}d`}</time>
				</div>
			</a>
		</li>
	)
}
