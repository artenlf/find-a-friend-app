import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })
  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      type: 'cat',
      name: 'Thomas',
      about: 'Friendly cat',
      age: 'adult',
      size: 'medium',
      energy_level: 'high',
      independency_level: 'low',
      environment: 'small',
      pictures: [''],
      requirements: ['have a friend named Jerry'],
      organization_id: '',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
