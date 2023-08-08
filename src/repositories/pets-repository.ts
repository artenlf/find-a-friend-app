import { PetParams } from '@/interfaces/pet-params'
import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  searchMany(city: string, query: PetParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  findManyByCity(city: string): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
