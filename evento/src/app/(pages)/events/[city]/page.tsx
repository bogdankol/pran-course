import EventsList from '@/components/EventsList'
import H1 from '@/components/H1'
import { capitalize } from 'lib/utils'
import { Metadata } from 'next'
import { Suspense } from 'react'
import Loading from './loading'
import { z } from 'zod'

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

const pageNumberSchema = z.coerce.number().int().positive().optional()

export default async function EventPage({
  params: {
    city
  },
  searchParams
}: {
  params: {
    city: string
  },
  searchParams: {
    page: string | undefined
  }
}) {

  // const page = searchParams.page ? +searchParams.page : 1
  const parsedPage = pageNumberSchema.safeParse(searchParams.page)
  if(!parsedPage.success) {
    throw new Error('Invalid page number')
  }

	return (
		<main className='flex flex-col items-center py-24 px-[20px] min-h-[110vh]'>
			<H1 className='mb-28'>
        {city === 'all' 
          ? 'All Events' 
          : `Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`
        }
      </H1>

      <Suspense key={parsedPage.data+city} fallback={<Loading/>}>
        <EventsList 
          {...{
            city,
            page: parsedPage.data
          }}
        />
      </Suspense>
		</main>
	)
}
