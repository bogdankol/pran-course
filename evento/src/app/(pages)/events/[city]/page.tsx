import EventsList from '@/components/EventsList'
import H1 from '@/components/H1'
import type { TEvent } from 'lib/types'

export default async function EventPage({
  params: {
    city
  }
}: {
  params: {
    city: string
  }
}) {

  const res = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`)
  const events: TEvent[] = await res.json()

	return (
		<main className='flex flex-col items-center py-24 px-[20px] min-h-[110vh]'>
			<H1 className='mb-28'>
        {city === 'all' 
          ? 'All Events' 
          : `Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`
        }
      </H1>

      {events && <EventsList 
        {...{
          events
        }}
      />}
		</main>
	)
}
