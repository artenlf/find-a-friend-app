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

interface RegisterPetUseCaseRequest {
  type: Type
  name: string
  about: string
  age: Age
  size: Size
  energy_level: Energy_Level
  independency_level: Independency_Level
  environment: Environment
  pictures: string[]
  requirements: string[]
  organization_id: string
}

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
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
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
