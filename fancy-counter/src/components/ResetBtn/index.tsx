import { ResetIcon } from '@radix-ui/react-icons'

export default function ResetBtn({
  setCount
}: {
  setCount: React.Dispatch<React.SetStateAction<number>>
}) {

  function onClickHandler(e: { currentTarget: {blur: VoidFunction}}) {
    setCount(0)
    e.currentTarget.blur()
  }
  
  return <button onClick={onClickHandler} className='reset-btn'><ResetIcon className='reset-btn-icon' /></button>
}
