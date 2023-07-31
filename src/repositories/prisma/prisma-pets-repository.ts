import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

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
          city,
        },
      },
    })
    return pets
  }

  async searchMany(query: string) {
    const pets = await prisma.pet.findMany({
      where: {
        name: {
          contains: query,
        },
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
