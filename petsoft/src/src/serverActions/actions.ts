'use server'

import { TPet } from '@/lib/types'
// import { Pet as TPet } from '@prisma/client'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { sleep } from '@/lib/client-utils'
import { PetFormSchema, petIdSchema } from '@/lib/validations'
import { signIn } from '@/lib/auth'
import { signOut } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { checkAuth, getPetById } from '@/lib/server-utils'

// user actions
export async function signUp(authData: FormData) {
  const data = Object.fromEntries(authData.entries())
  const hashedPassword = await bcrypt.hash(String(data.password), 10)

  try {
    await prisma.user.create({
      data: {
        email: String(data.email),
        hashedPassword,
      },
    })
  } catch (err: unknown) {
    throw Error('error during user creation')
  }

  try {
    await signIn('credentials', authData)
  } catch (err: unknown) {
    throw Error('error during signIn after user creation')
  }
}

export async function signOutFunc() {
  await signOut({ redirectTo: '/' })
}

export async function login(authData: FormData) {
  try {
    const result = await signIn('credentials', authData)
    // console.log({result})
  } catch (err: unknown) {
    console.error('ERROR:', err)
  }
}

// Pet actions
export async function addPet(newPetData: unknown) {
  await sleep(1000)

  const session = await checkAuth()

  const validatedPet = PetFormSchema.safeParse(newPetData)
  if (!validatedPet.success)
    return {
      message: 'some data is missing or invalid',
    }
  console.log({ validatedPet, newPetData })

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    })

    revalidatePath('/app', 'layout')
  } catch (_: unknown) {
    return {
      message: 'Couldn`t add pet',
    }
  }
}

export async function editPet(petId: unknown, newPetData: unknown) {
  await sleep(1000)

  // auth check
  const session = await checkAuth()

  // validation
  const validatedPet = PetFormSchema.safeParse(newPetData)
  const validatedId = petIdSchema.safeParse(petId)

  if (!validatedPet.success || !validatedId.success)
    return {
      message: 'some data is missing or invalid edit',
    }
  console.log({ validatedPet, newPetData, validatedId })

  // authorization (rights to delete that specific item) check
  try {
    const pet = await getPetById(validatedId.data)

    if (!pet)
      return {
        message: 'Pet not found',
      }

    if (pet.userId !== session.user.id)
      return {
        message: 'Not authorized to edit that pet',
      }
  } catch (_: unknown) {
    return {
      message: 'Error during checking pet for deletion',
    }
  }

  // mutation
  try {
    await prisma.pet.update({
      data: validatedPet.data,
      where: {
        id: validatedId.data,
      },
    })

    revalidatePath('/app', 'layout')
  } catch (_: unknown) {
    return {
      message: 'Couldn`t edit pet',
    }
  }
}

export async function checkoutPet(petId: unknown) {
  await sleep(1000)

  // auth check
  const session = await checkAuth()

  // validation
  const validatedId = petIdSchema.safeParse(petId)

  if (!validatedId.success)
    return {
      message: 'petId is invalid',
    }
  console.log({ validatedId })

  // authorization (rights to delete that specific item) check
  try {
    const pet = await getPetById(validatedId.data)

    if (!pet)
      return {
        message: 'Pet not found',
      }

    if (pet.userId !== session.user.id)
      return {
        message: 'Not authorized to delete that pet',
      }
  } catch (_: unknown) {
    return {
      message: 'Error during checking pet for deletion',
    }
  }

  // db mutation
  try {
    await prisma.pet.delete({
      where: {
        id: validatedId.data,
      },
    })

    revalidatePath('/app', 'layout')
  } catch (_: unknown) {
    return {
      message: 'Couldn`t delete a pet',
    }
  }
}
