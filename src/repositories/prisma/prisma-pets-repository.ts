import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { PetParams } from './utils/pet-params'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city: {
            equals: city,
            mode: 'insensitive',
          },
        },
      },
    })
    return pets
  }

  async searchMany(city: string, query?: PetParams) {
    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city: {
            equals: city,
            mode: 'insensitive',
          },
        },
        ...query,
      },
    })

    return pets
  }

  async create(data: Prisma.PetCreateManyInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
