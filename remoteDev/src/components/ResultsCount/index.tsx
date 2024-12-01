export default function ResultsCount({
  totalAmountOfItems
}: {
  totalAmountOfItems: number
}) {
  return <p className="count"><span className='u-bold'>{totalAmountOfItems}</span> results</p>;
}
