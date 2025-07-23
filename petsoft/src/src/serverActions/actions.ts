'use server'

import { TPet } from '@/lib/types'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { sleep } from '@/lib/utils'

export async function addPet(formData: FormData) {
  await sleep(2000)

  try {

    const newPet = Object.fromEntries(formData.entries())
    const newPetData: TPet = {
    id: String(Date.now()),
    ...newPet,
    age: Number(newPet.age),
    imageUrl:
      newPet.imageUrl ||
      'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
  } as TPet

    await prisma.pet.create({
      data: newPetData,
    })

    revalidatePath('/app', 'layout')

  } catch (_: unknown) {
    return {
      message: 'Couldn`t add pet'
    }
  }
}

export async function editPet(petId: string, formData: FormData) {
  await sleep(2000)

  try {
    const newPet = Object.fromEntries(formData.entries())
    const newPetData: TPet = {
    id: petId,
    ...newPet,
    age: Number(newPet.age),
    imageUrl:
      newPet.imageUrl ||
      'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
  } as TPet

    await prisma.pet.update({
      data: newPetData,
      where: {
        id: petId
      }
    })

    revalidatePath('/app', 'layout')

  } catch (_: unknown) {
    return {
      message: 'Couldn`t edit pet'
    }
  }
}

export async function checkoutPet(petId: string) {
  await sleep(2000)

  try {
    await prisma.pet.delete({
      where: {
        id: petId
      }
    })

    revalidatePath('/app', 'layout')

  } catch (_: unknown) {
    return {
      message: 'Couldn`t delete a pet'
    }
  }
}