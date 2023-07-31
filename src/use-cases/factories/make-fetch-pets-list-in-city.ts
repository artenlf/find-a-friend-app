import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsListInCityUseCase } from '../fetch-pets-list-in-city'

export function makeFetchPetsListInCityUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const useCase = new FetchPetsListInCityUseCase(petsRepository)

  return useCase
}
