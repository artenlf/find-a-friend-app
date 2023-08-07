import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FilterPetsUseCase } from './filter-pets'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: FilterPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new FilterPetsUseCase(petsRepository)
  })

  it('should be able to search for pets', async () => {
    const organization = await organizationsRepository.create({
      title: 'John Doe Organization',
      email: 'johndoe@example.com',
      zip_code: '12345',
      address: '39, 5th street',
      city: 'Campinas',
      state: 'SP',
      phone: '12345678',
      password_hash: '123456',
    })

    await petsRepository.create({
      type: 'cat',
      name: 'Thomas',
      about: 'friendly cat',
      age: 'young',
      size: 'medium',
      energy_level: 'high',
      independency_level: 'low',
      environment: 'small',
      pictures: [''],
      requirements: ['have a friend named Jerry'],
      organization_id: organization.id,
    })

    await petsRepository.create({
      type: 'dog',
      name: 'Rufus',
      about: 'good dog',
      age: 'adult',
      size: 'large',
      energy_level: 'medium',
      independency_level: 'medium',
      environment: 'medium',
      pictures: [''],
      requirements: [''],
      organization_id: organization.id,
    })

    const { pets } = await sut.execute({
      city: 'Campinas',
      query: { size: 'large' },
    })

    expect(pets).toHaveLength(1)

    expect(pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Rufus' })]),
    )
  })
})
