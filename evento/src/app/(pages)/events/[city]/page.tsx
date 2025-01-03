import EventsList from '@/components/EventsList'
import H1 from '@/components/H1'
import { capitalize } from 'lib/utils'
import { Metadata } from 'next'
import { Suspense } from 'react'

export function generateMetadata({
  params: {
    city
  }
}: {
  params: {
    city: string
  }
}): Metadata {
  return {
    title: city === 'all' ? 'All events' : `Events in ${capitalize(city)}`,
  }
}

export default async function EventPage({
  params: {
    city
  }
}: {
  params: {
    city: string
  }
}) {

	return (
		<main className='flex flex-col items-center py-24 px-[20px] min-h-[110vh]'>
			<H1 className='mb-28'>
        {city === 'all' 
          ? 'All Events' 
          : `Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`
        }
      </H1>

      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <EventsList 
          {...{
            city
          }}
        />
      {/* </Suspense> */}
		</main>
	)
}
