'use client'
import { TPet } from '@/lib/types'
// import { addPet } from '@/serverActions/actions'
import { createContext, ReactNode, useState } from 'react'

type TPetContext = {
  pets: TPet[],
  selectedPetId: string | null
  updateSelectedPetId: (id: string) => void
  selectedPetData: TPet | null
  numberOfPets: number
  handleCheckoutPet: (id: string) => void
  handleAddPet: (d: TPet) => void              // removed because of server action 'addPet'
  handleEditPet: (id: string, d: Omit<TPet, 'id'>) => void
}

export const PetContext = createContext<TPetContext | null>(null)

export default function PetContextProvider({
  children,
  data: pets,
}: {
  children: ReactNode[] | ReactNode
  data: TPet[]
}) {
  // const [pets, setPets] = useState(data)
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const selectedPetData = pets.find(el => el.id === selectedPetId) ?? null
  const numberOfPets = pets.length

  const updateSelectedPetId = (id: string) => setSelectedPetId(id)

  const handleCheckoutPet = (id: string) => {
    setSelectedPetId(null)
    // setPets(prev => prev.filter(pet => pet.id !== id))
  }

  const handleAddPet = async (newPet: TPet) => {
    // await addPet(newPet)
    // setPets(prev => [...prev, newPet])
  }

  const handleEditPet = (id: string, newPetData: Omit<TPet, 'id'>) => {
    setPets(prev => prev.map(pet => {
      if(id === pet.id) return {
        ...pet,
        ...newPetData
      }
      return pet
    }))
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
        handleAddPet,
        handleEditPet
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
