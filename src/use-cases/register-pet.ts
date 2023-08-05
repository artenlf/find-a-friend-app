import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    type,
    name,
    about,
    age,
    size,
    energy_level,
    independency_level,
    environment,
    pictures,
    requirements,
    organization_id,
  }: Pet): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      type,
      name,
      about,
      age,
      size,
      energy_level,
      independency_level,
      environment,
      pictures,
      requirements,
      organization_id,
    })

    return { pet }
  }
}
