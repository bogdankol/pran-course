import { TEvent } from 'lib/types'
import EventListItem from '@/components/EventListItem'

export default function EventsList({
  events
}: {
  events: TEvent[]
}) {
  return (
    <ul className='flex flex-wrap gap-10 justify-center max-w-[1100px] px-[20px] '>
      {events.map((event: TEvent) => <EventListItem 
        {...{
          event
        }}
      />)}
    </ul>
  )
}
