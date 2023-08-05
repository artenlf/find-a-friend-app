import { Pet, Prisma } from '@prisma/client'
import { PetParams } from './prisma/utils/pet-params'

export interface PetsRepository {
  searchMany(params?: PetParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  findManyByCity(city: string): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
