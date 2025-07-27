'use server'

import { TPet } from '@/lib/types'
// import { Pet as TPet } from '@prisma/client'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { sleep } from '@/lib/utils'

export async function addPet(newPetData: TPet) {
  await sleep(1000)

  try {
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

export async function editPet(petId: TPet['id'], newPetData: TPet) {
  await sleep(1000)

  try {
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

export async function checkoutPet(petId:  TPet['id']) {
  await sleep(1000)

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