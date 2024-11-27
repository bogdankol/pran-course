import Select from 'react-select'
import EmptyView from '../EmptyView'
import { useState, useMemo } from 'react'
// import { useItemsContext } from '../../lib/hooks'
import { useItemsStore } from '../../stores/itemsStore'

interface IItem {
  name: string
  packed: boolean
  id: number
}

interface ISortingOption {
  label: string
  value: ESortingOptions
}

enum ESortingOptions {
  default = 'default',
  packed = 'packed',
  unpacked = 'unpacked'
}

export default function ItemList() {

  const sortingOptions: ISortingOption[] = [
    {
      label: 'Sort by default',
      value: ESortingOptions.default
    },{
      label: 'Sort by packed',
      value: ESortingOptions.packed
    },{
      label: 'Sort by unpacked',
      value: ESortingOptions.unpacked
    }
  ]
  // const { items, handleDeleteItem, handleToggleItem } = useItemsContext()
  const items = useItemsStore((state: any) => state.items)
  const handleDeleteItem = useItemsStore((state: any) => state.deleteItem)
  const handleToggleItem = useItemsStore((state: any) => state.toggleItem)

  const [sortBy, setSortBy] = useState<ESortingOptions>(sortingOptions[0].value)

  const sortedItems = useMemo(() => items.sort((a: IItem, b: IItem) => {
    if (sortBy === ESortingOptions.packed) {
      return Number(b.packed) - Number(a.packed)
    }
  
    if (sortBy === ESortingOptions.unpacked) {
      return Number(a.packed) - Number(b.packed)
    }
  
    return 0
  }), [items, sortBy])

  return <ul className='item-list'>

    {!items.length && <EmptyView />}

    {items.length > 0 && <section className='sorting'>
      
      <Select 
        options={sortingOptions}
        defaultValue={sortingOptions[0]}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onChange={(option: { label: string, value: string}) => setSortBy(option.value)}
      />

    </section>}
    
    {sortedItems.map((el: {
      name: string
      packed: boolean
      id: number
    }) => <Item 
      key={el.name}
      {...el}
      {...{
        onDeleteItem: handleDeleteItem,
        onToggleItem: handleToggleItem
      }}
    />)}

  </ul>
}

function Item({
  name,
  packed,
  id,
  onDeleteItem,
  onToggleItem
}: {
  name: string
  packed: boolean
  id: number
  onDeleteItem: any
  onToggleItem: any
}) {
  return <li className='item'>
    <label>
      <input 
        type='checkbox' 
        checked={packed}
        onChange={() => onToggleItem(id)}
      />
      {name}
    </label>

    <button type='button' onClick={() => onDeleteItem(id)}>
      😵
    </button>
  </li>
}
