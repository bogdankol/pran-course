import { useState } from 'react'

export default function Counter() {
  const [number, setNumber] = useState(-9)
  function onClickHandler() {
    setNumber(number + 1)
  }


  return <div>
    <button onClick={onClickHandler}>{number}</button>
  </div>
}