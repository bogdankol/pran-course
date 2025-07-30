'use server'

import { TPet } from '@/lib/types'
// import { Pet as TPet } from '@prisma/client'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { sleep } from '@/lib/utils'
import { PetFormSchema, petIdSchema } from '@/lib/validations'

export async function addPet(newPetData: unknown) {
  await sleep(1000)

  const validatedPet = PetFormSchema.safeParse(newPetData)
  if(!validatedPet.success) return {
    message: 'some data is missing or invalid'
  }
  console.log({validatedPet, newPetData})

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    })

    revalidatePath('/app', 'layout')
  } catch (_: unknown) {
    return {
      message: 'Couldn`t add pet'
    }
  }
}

export async function editPet(petId: unknown, newPetData: unknown) {
  await sleep(1000)

  const validatedPet = PetFormSchema.safeParse(newPetData)
  const validatedId = petIdSchema.safeParse(petId)
  
  if(!validatedPet.success || !validatedId.success) return {
    message: 'some data is missing or invalid edit'
  }
  console.log({validatedPet, newPetData, validatedId})

  try {
    await prisma.pet.update({
      data: validatedPet.data,
      where: {
        id: validatedId.data
      }
    })

    revalidatePath('/app', 'layout')
  } catch (_: unknown) {
    return {
      message: 'Couldn`t edit pet'
    }
  }
}

export async function checkoutPet(petId:  unknown) {
  await sleep(1000)

  const validatedId = petIdSchema.safeParse(petId)
  
  if(!validatedId.success) return {
    message: 'petId is invalid'
  }
  console.log({validatedId})

  try {
    await prisma.pet.delete({
      where: {
        id: validatedId.data
      }
    })

    revalidatePath('/app', 'layout')

  } catch (_: unknown) {
    return {
      message: 'Couldn`t delete a pet'
    }
  }
}