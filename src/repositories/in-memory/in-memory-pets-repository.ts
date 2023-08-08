import { PetParams } from '@/interfaces/pet-params'
import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrganizationsRepository } from '../organizations-repository'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private organizationsRepository: OrganizationsRepository) {}

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

  async findManyByCity(city: string) {
    const organizations = await this.organizationsRepository.findManyByCity(
      city,
    )

    const petsListByOrganizationsInCity = this.pets.filter((pet) => {
      return organizations.find(
        (organization) => organization.id === pet.organization_id,
      )
    })

    return petsListByOrganizationsInCity
  }

  async searchMany(city: string, params?: PetParams) {
    const orgs = await this.organizationsRepository.findManyByCity(city)

    const petsByOrgsInCity = this.pets.filter((pet) => {
      return orgs.find((org) => org.id === pet.organization_id)
    })

    if (!params) {
      return petsByOrgsInCity
    }
    const petFiltered = petsByOrgsInCity.filter(
      (pet) =>
        (!params.type || pet.type === params?.type) &&
        (!params.age || pet.age === params?.age) &&
        (!params.size || pet.size === params?.size) &&
        (!params.energy_level || pet.energy_level === params?.energy_level) &&
        (!params.independency_level ||
          pet.independency_level === params?.independency_level) &&
        (!params.environment || pet.environment === params?.environment),
    )

    return petFiltered
  }
}
