import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  searchMany(query: string): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
