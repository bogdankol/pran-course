'use client'
import { TPet } from '@/lib/types'
import { createContext, ReactNode, useState } from 'react'

type TPetContext = {
  pets: TPet[],
  selectedPetId: string | null
  updateSelectedPetId: (id: string) => void
  selectedPetData: TPet | null
  numberOfPets: number
  handleCheckoutPet: (id: string) => void
  handleAddPet: (d: TPet) => void
}

export const PetContext = createContext<TPetContext | null>(null)

export default function PetContextProvider({
  children,
  data,
}: {
  children: ReactNode[] | ReactNode
  data: TPet[]
}) {
  const [pets, setPets] = useState(data ?? [])
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const selectedPetData = pets.find(el => el.id === selectedPetId) ?? null
  const numberOfPets = pets.length

  const updateSelectedPetId = (id: string) => setSelectedPetId(id)

  const handleCheckoutPet = (id: string) => {
    setPets(pets.filter(pet => pet.id !== id))
    setSelectedPetId(null)
  }

  const handleAddPet = (newPet: TPet) => {
    setPets(prev => [...prev, newPet])
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        updateSelectedPetId,
        selectedPetData,
        numberOfPets,
        handleCheckoutPet,
        handleAddPet
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
