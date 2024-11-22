import AddItemForm from '../AddItemForm'
import ButtonGroup from '../ButtonGroup'
// import { useItemsContext } from '../../lib/hooks'
import { useItemsStore } from '../../stores/itemsStore'


export default function Sidebar() {
  // const { handleAddItem } = useItemsContext()
  const handleAddItem = useItemsStore((state: any) => state.addItem)

  console.log('Sidebar rerendered!')
  return <div className='sidebar'>

    <AddItemForm 
      {...{
        onAddItem: handleAddItem
      }}
    />

    <ButtonGroup 
      
    />
    
  </div>
}
