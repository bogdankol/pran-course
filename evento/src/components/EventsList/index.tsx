// import { TEvent } from 'lib/types'
import { EventEvent as TEvent } from '@prisma/client'
import EventListItem from '@/components/EventListItem'
import { getEvents } from 'lib/utils'

export default async function EventsList({
  city
}: {
  city: string
}) {
  const events = await getEvents(city)
  
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
