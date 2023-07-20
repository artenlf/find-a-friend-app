import {
  Age,
  Energy_Level,
  Environment,
  Independency_Level,
  Pet,
  Prisma,
  Size,
  Type,
} from '@prisma/client'

export interface PetsRepository {
  searchMany(
    query:
      | string
      | Type
      | Age
      | Size
      | Energy_Level
      | Independency_Level
      | Environment,
  ): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
