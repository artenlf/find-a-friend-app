import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetCreateManyInput) {
    const pet: Pet = {
      id: randomUUID(),
      type: data.type,
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independency_level: data.independency_level,
      environment: data.environment,
      pictures: data.pictures as string[],
      requirements: data.requirements as string[],
      organization_id: data.organization_id,
    }

    this.pets.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
