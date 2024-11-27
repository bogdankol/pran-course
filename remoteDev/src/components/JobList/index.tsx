import { IJobItem } from '../../types/interfaces'
import JobListItem from '../JobListItem'
import Spinner from '../Spinner'

interface IProps {
  jobItems: IJobItem[] 
  isFetching: boolean
}

export function JobList({ 
  jobItems,
  isFetching
}: IProps) {
  console.log({isFetching})
	return <ul className='job-list'>

    {isFetching && <Spinner />}
    
    {!isFetching && jobItems?.map((el: IJobItem) => <JobListItem 
      {...el}
      key={el.id}
    />)}
  </ul>
}

export default JobList
