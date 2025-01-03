'use client'
import { TEvent } from 'lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const MotionItem = motion.li
const MotionLink = motion(Link)

export default function EventListItem({
  event
}: {
  event: TEvent
}) {

  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`0 1`, `1.4 1.5`]
  })

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1])

  return <MotionItem 
    key={event.id}
    className='relative flex flex-col flex-1 basis-80 h-[380px] max-w-[500px] bg-white/[3%] rounded-xl overflow-hidden state-effects'
    ref={ref}
    style={{
      scale: scaleProgress,
      opacity: opacityProgress
    }}
    initial={{
      opacity: 1,
      scale: 0.9
    }}
  >
    <Link 
      href={`/event/${event.slug}`} 
      className='w-full h-full flex flex-col'
    >
    
      <Image 
        src={event.imageUrl}
        alt={event.name}
        title={event.name}
        width={500}
        height={280}
        className='h-[60%] object-cover '
      />

      <div className='flex flex-col items-center flex-1 justify-center '>
        <h2 className='text-2xl font-semibold '>{event.name}</h2>
        <p className='italic text-white/75'>By {event.organizerName}</p>
        <p className='text-sm text-white/50 mt-4'>{event.location}</p>
      </div>

      <span className='absolute left-[12px] top-[12px] h-[45px] w-[45px] bg-black/30 rounded-md flex flex-col justify-center items-center'>
        <p className='text-xl font-bold -mb-[5px]'>
          {
            new Date(event.date).toLocaleString('en-us', { day: '2-digit' })
          }
        </p>
        <p className='text-xs uppercase text-accent'>
          {
            new Date(event.date).toLocaleString('en-us', { month: 'short' })
          }
        </p>
      </span>
    </Link>
  
  </MotionItem>
}
