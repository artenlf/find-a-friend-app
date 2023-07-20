import { PetsRepository } from '@/repositories/pets-repository'
import {
  Age,
  Energy_Level,
  Environment,
  Independency_Level,
  Pet,
  Size,
  Type,
} from '@prisma/client'

interface SearchPetsUseCaseRequest {
  query:
    | string
    | Type
    | Age
    | Size
    | Energy_Level
    | Independency_Level
    | Environment
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(query)

    return { pets }
  }
}
