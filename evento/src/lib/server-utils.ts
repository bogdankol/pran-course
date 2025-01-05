import 'server-only'

// import { TEvent } from './types';
// import { EventEvent as TEvent, PrismaClient } from '@prisma/client'
import prismaClient from './db'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import { capitalize } from './utils'

const EVENTS_PER_PAGE = 6

export const getEvents = unstable_cache(async (city: string, page = 1) => {
	// const res = await fetch(
	// 	`https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
	// )
	// const events: TEvent[] = await res.json()

  // const prismaClient = new PrismaClient()
  const events = await prismaClient.eventEvent.findMany({
    where: {
      city: city === 'all' ? undefined : capitalize(city)
    },
    orderBy: {
      date: 'asc'
    },
    take: EVENTS_PER_PAGE,
    skip: (page - 1) * EVENTS_PER_PAGE
  })

  const totalCount = await prismaClient.eventEvent.count({
    where: {
      city: city === 'all' ? undefined : capitalize(city)
    }
  })

	return {
    events,
    totalCount
  }
})

export const getEvent = unstable_cache(async (slug: string) => {
	// const res = await fetch(
	// 	`https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`,
	// 	{
	// 		cache: 'force-cache',
	// 	},
	// )
	// const event: TEvent = await res.json()

  // const prismaClient = new PrismaClient()
  const event = await prismaClient.eventEvent.findUnique({
    where: {
      slug
    }
  })

  if(!event) {
    return notFound()
  }

	return event
})