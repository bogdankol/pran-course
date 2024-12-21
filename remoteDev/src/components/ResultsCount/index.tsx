import { useJobItemsContext } from '../../hooks/useJobItemsCOntext';

export default function ResultsCount() {

  const {
    totalAmountOfItems
  } = useJobItemsContext()
  return <p className="count"><span className='u-bold'>{totalAmountOfItems}</span> results</p>;
}
