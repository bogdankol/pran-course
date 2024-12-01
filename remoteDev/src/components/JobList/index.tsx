import { useActiveItemId } from '../../hooks/useActiveItemId'
import { IJobItem } from '../../types/interfaces'
import JobListItem from '../JobListItem'
import Spinner from '../Spinner'

interface IProps {
  jobItems: IJobItem[] 
  isFetching: boolean
}

export default function JobList({ 
  jobItems,
  isFetching
}: IProps) {
  const activeId = useActiveItemId()

	return <ul className='job-list'>

    {isFetching && <Spinner />}
    
    {!isFetching && jobItems?.map((el: IJobItem) => <JobListItem 
      {...{
        jobItem: el,
        isActive: el.id === activeId
      }}
      key={el.id}
    />)}
  </ul>
}
