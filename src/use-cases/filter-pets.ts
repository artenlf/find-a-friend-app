import { PetParams } from '@/interfaces/pet-params'
import { PetsRepository } from '@/repositories/pets-repository'

import { Pet } from '@prisma/client'

interface FilterPetsUseCaseRequest {
  city: string
  query: PetParams
}

interface FilterPetsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    query,
  }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(city, query)

    return { pets }
  }
}
