// export type TPet = {
//   id: string
//   name: string
//   ownerName: string
//   imageUrl: string
//   age: number
//   notes: string
// }

import { Pet } from '@prisma/client'

export type TPet = Omit<Pet, "createdAt" | 'updatedAt'>