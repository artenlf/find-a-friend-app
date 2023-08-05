import { PetsRepository } from '@/repositories/pets-repository'
import { PetParams } from '@/repositories/prisma/utils/pet-params'
import { Pet } from '@prisma/client'

interface FilterPetsUseCaseRequest {
  query?: PetParams
}

interface FilterPetsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
  }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(query)

    return { pets }
  }
}
