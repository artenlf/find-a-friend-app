import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsUseCase } from './search-pets'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets', async () => {
    await petsRepository.create({
      type: 'cat',
      name: 'Thomas',
      about: 'friendly cat',
      age: 'adult',
      size: 'medium',
      energy_level: 'high',
      independency_level: 'low',
      environment: 'small',
      pictures: [''],
      requirements: ['have a friend named Jerry'],
      organization_id: '',
    })

    await petsRepository.create({
      type: 'dog',
      name: 'Bidu',
      about: 'good dog',
      age: 'young',
      size: 'small',
      energy_level: 'medium',
      independency_level: 'medium',
      environment: 'medium',
      pictures: [''],
      requirements: [''],
      organization_id: '',
    })

    const { pets } = await sut.execute({
      query: 'Thomas',
    })

    // expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Thomas' })])
  })
})
