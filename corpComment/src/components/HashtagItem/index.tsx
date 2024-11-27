export default function HashtagItem({
  el,
  onSelectCompany,
}: {
  el: string
  onSelectCompany: (a: string) => void
}) {
  return <li key={el}>
    <button onClick={() => onSelectCompany(el)}>{`#${el}`}</button>
  </li>
}
