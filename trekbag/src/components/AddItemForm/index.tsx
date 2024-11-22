import Button from '../Button'
import { useState } from 'react'

export default function AddItemForm({
  onAddItem
}: {
  onAddItem: any
}) {
  const [inputValue, setInputValue] = useState('')

  function onSubmitHandler(e: any) {
    e.preventDefault()

    if(!inputValue) return

    onAddItem(inputValue)
    setInputValue('')
  }

  return (
    <form 
      onSubmit={onSubmitHandler}
    >
      <h2>Add an item</h2>
      <input 
        type='text' 
        value={inputValue}
        onChange={({target: {value}}) => setInputValue(value)}
        autoFocus
      />
      <Button>Add to list</Button>
    </form>
  )
}
