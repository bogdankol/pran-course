import Button from '../Button'
// import { useItemsContext } from '../../lib/hooks'
import { useItemsStore } from '../../stores/itemsStore'

export default function ButtonGroup() {
  // const {
  //   markAllAsComplete: onMarkAllAsComplete,
  //   markAllAsIncomplete: onMarkAllAsIncomplete,
  //   handleResetToInitial: onResetToInitial,
  //   handleRemoveAllItems: onRemoveAll
  // } = useItemsContext()

  const onMarkAllAsComplete = useItemsStore((state: any) => state.markAllAsComplete)
  const onMarkAllAsIncomplete = useItemsStore((state: any) => state.markAllAsIncomplete)
  const onResetToInitial = useItemsStore((state: any) => state.resetToInitial)
  const onRemoveAll = useItemsStore((state: any) => state.removeAllItems)

  const secondaryButtons = [
    {
      text: 'Mark as complete',
      onClick: onMarkAllAsComplete
    },{
      text: 'Mark all as incomplete',
      onClick: onMarkAllAsIncomplete
    },{
      text: 'Reset to initial',
      onClick: onResetToInitial
    },{
      text: 'remove all items',
      onClick: onRemoveAll
    }
  ]

  return (
    <section className='button-group'>
      {secondaryButtons.map((el: { text: string, onClick: any}) => <Button 
        key={el.text}
        buttonType='secondary'
        onClick={el.onClick}
      >{el.text}</Button>)}
    </section>
  )
}
