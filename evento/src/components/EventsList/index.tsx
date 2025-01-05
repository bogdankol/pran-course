// import { TEvent } from 'lib/types'
import { EventEvent as TEvent } from '@prisma/client'
import EventListItem from '@/components/EventListItem'
import { getEvents } from 'lib/server-utils'
import PaginationControls from '@/components/PaginationControls'

export default async function EventsList({
  city,
  page = 1
}: {
  city: string,
  page?: number
}) {
  const {
    events,
    totalCount
  } = await getEvents(city, page)
  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : ''
  const nextPath = totalCount > (page * 6) ? `/events/${city}?page=${page + 1}` : ''
  
  return events && <section className='flex flex-col items-center gap-10 px-[20px] max-w-[1100px]'>

    <ul className='flex flex-wrap gap-10 justify-center w-full'>
      {events.map((event: TEvent) => <EventListItem 
        {...{
          event
        }}
        key={event.id}
      />)}
    </ul>

    <PaginationControls 
      {...{
        previousPath,
        nextPath
      }}
    />

  </section>
    
}
