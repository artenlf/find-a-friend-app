import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsListInCityUseCaseRequest {
  city: string
}

interface FetchPetsListInCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsListInCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetsListInCityUseCaseRequest): Promise<FetchPetsListInCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(city)

    return { pets }
  }
}
