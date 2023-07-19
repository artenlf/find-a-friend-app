import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPetByIdUseCase } from './get-pet-by-id'

let petsRepository: InMemoryPetsRepository
let sut: GetPetByIdUseCase

describe('Get pet Profile Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('should be able to get the Pet profile', async () => {
    const registeredPet = await petsRepository.create({
      type: 'dog',
      name: 'bidu',
      about: 'good dog',
      age: 'young',
      size: 'small',
      energy_level: 'medium',
      independency_level: 'medium',
      environment: 'medium',
      organization_id: '34b2c799-918c-4753-9ad7-e5306b55730e',
    })

    const { pet } = await sut.execute({
      petId: registeredPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('bidu')
  })

  it('should not be able to get pet profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
