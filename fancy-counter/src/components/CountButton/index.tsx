/* eslint-disable @typescript-eslint/no-explicit-any */
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'

export default function CountButton({
  setCount,
  type,
  locked
}: {
  setCount: React.Dispatch<React.SetStateAction<number>>
  type: 'plus' | 'minus'
  locked: boolean
}) {
  function onClickHandler(e: {currentTarget: any}) {
    setCount((prevState: number) => {
      if(type === 'minus') {
        if(!prevState || prevState < 0) return 0
        return prevState - 1
      } else {
        return prevState > 5 ? 5 : prevState + 1
      }
      
    })
    
    e.currentTarget.blur()
  }
  return <button 
    onClick={onClickHandler} 
    className='count-btn'
    disabled={locked}
  >
    {type === 'plus' && <PlusIcon className='count-btn-icon' /> }

    {type === 'minus' && <MinusIcon className='count-btn-icon' /> }
  </button>
}