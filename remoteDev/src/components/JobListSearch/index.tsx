import { useJobItemsContext } from '../../hooks/useJobItemsContext';
import JobList from '../JobList';

export default function JobListSearch() {

  const {
    jobItemsSliced,
    isFetching,
  } = useJobItemsContext()
  
  return <JobList
    {...{
      jobItems: jobItemsSliced,
      isFetching,
    }}
  />
}
