import { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
// import { TEvent } from './types';
// import { EventEvent as TEvent, PrismaClient } from '@prisma/client'
import prismaClient from './db'
import { notFound } from 'next/navigation'

export function cn(...classes: ClassValue[]) {
	return twMerge(clsx(classes))
}

export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export function capitalize(str: string) {
  return `${str.slice(0, 1).toUpperCase() + str.slice(1)}`
}

export async function getEvents(city: string) {
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
    }
  })

	return events
}

export async function getEvent(slug: string) {
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
}
