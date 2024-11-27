// import { useItemsContext } from '../../lib/hooks'
import { useItemsStore } from '../../stores/itemsStore'

export default function Counter({
  // totalNumberOfItems,
  // numberOfPackedItems
}: {
  // totalNumberOfItems: number
  // numberOfPackedItems: number
}) {
    // const { items } = useItemsContext()
    const items = useItemsStore((state: any) => state.items)

    const numberOfPackedItems = items.filter((el: any) => el.packed).length
    const totalNumberOfItems = items.length

    console.log('Counter rerendered')
  return (
    <p><b>{numberOfPackedItems}</b>/{totalNumberOfItems} items packed</p>
  )
}
