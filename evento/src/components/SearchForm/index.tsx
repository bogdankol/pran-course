'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchForm() {
  const [searchText, setSearchText] = useState('')

  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(!searchText.trim()) return

    router.push(`/events/${searchText}`)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value)
  }

  return  <form onSubmit={handleSubmit} className='w-full sm:w-[580px] '>
    <input 
      placeholder='Search events in any city...'
      spellCheck={false}
      value={searchText}
      onChange={handleChange}
      className='w-full h-16 rounded-lg bg-white/[7%] px-6 outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10'
    />
  </form>
}
