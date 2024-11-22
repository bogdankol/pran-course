export default function Title ({
  locked
}: {
  locked: boolean
}) {
  return <h1 className='title'>{
    locked 
      ? <span>Limit! Buy <b>Pro</b> for &gt; 5</span> 
      : 'Fancy Counter'
    }</h1>

}
