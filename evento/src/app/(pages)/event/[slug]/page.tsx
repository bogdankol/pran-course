import H1 from '@/components/H1'
import { getEvent } from 'lib/server-utils'
import { sleep } from 'lib/utils'
import { Metadata } from 'next'
import Image from 'next/image'

export async function generateMetadata({
  params: {
    slug
  }
}: {
  params: {
    slug: string
  }
}): Promise<Metadata> {
  const event = await getEvent(slug)

  return {
    title: event.name,
  }
}

export async function generateStaticParams() {
  return [
    {
      slug: 'comedy-extravaganza',
    }, {
      slug: 'dg-practice-session'
    }
  ]
}

export default async function EventPage({
  params: {
    slug
  }
}: {
  params: {
    slug: string
  }
}) {

  await sleep(2000)
  
  const event = await getEvent(slug)

  return (
    <main>
      <section className='relative overflow-hidden flex items-center justify-center py-14 lg:py-20'>
        <Image 
          src={event.imageUrl}
          alt={`background img`}
          title={`background img`}
          fill
          sizes='(max-width: 1280px), 1280px'
          className='object-cover blur-3xl z-0'
          quality={1}
        />

        <div className='z-1 relative flex flex-col lg:flex-row gap-6 lg:gap-16'>
          <Image 
            src={event.imageUrl}
            alt={event.name}
            title={event.name}
            priority
            width={300}
            height={201}
            className='rounded-xl border-2 border-white/50 object-cover'
          />

          <div className='flex flex-col '>
            <p className='text-white/75'>
              {
                new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })
              }
            </p>

            <H1 className='mb-2 mt-1 whitespace-nowrap lg:text-5xl'>{event.name}</H1>

            <p className='whitespace-nowrap text-sl text-white/75'>Organized by <span className={`italic`}>{event.organizerName}</span></p>

            <button className='bg-white/20 text-lg capitalize w-[95vw] sm:w-full py-2 rounded-md border-white/10 border-2 bg-blur  lg:mt-auto mt-5 state-effects'>Get Tickets</button>
          </div>
        </div>
      </section>

      <div className='text-center px-5 py-16 min-h-[75vh]'>
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>

        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>

      
    </main>
  )
}

function Section({ 
  children
}: {
  children: React.ReactNode
}) {
  return <section className='mb-12'>
    {children}
  </section>
}

function SectionHeading({children}: {children: React.ReactNode}) {
  return <h2 className='text-2xl mb-8'>{children}</h2>
}

function SectionContent( {children}: {children: React.ReactNode}) {
  return <p className='text-lg leading-8 text-white/75 max-w-4xl mx-auto'>{children}</p>
}
