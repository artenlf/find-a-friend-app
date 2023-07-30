import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsListInCityUseCase } from './fetch-pets-list-in-city'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsListInCityUseCase

describe('Fetch Pets List in City Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new FetchPetsListInCityUseCase(petsRepository)
  })

  it('should be able to fetch a list of pets in the city', async () => {
    const testOrganization = await organizationsRepository.create({
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
      age: 'adult',
      size: 'medium',
      energy_level: 'high',
      independency_level: 'low',
      environment: 'small',
      pictures: [''],
      requirements: ['have a friend named Jerry'],
      organization_id: testOrganization.id,
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
      organization_id: testOrganization.id,
    })

    const testOrganization2 = await organizationsRepository.create({
      title: 'Ellen Ripley Organization',
      email: 'ellenripley@example.com',
      zip_code: '67890',
      address: '39, 5th street',
      city: 'Austin',
      state: 'TX',
      phone: '12345678',
      password_hash: '123456',
    })

    await petsRepository.create({
      type: 'other',
      name: 'Alien',
      about: 'well...',
      age: 'newborn',
      size: 'large',
      energy_level: 'veryHigh',
      independency_level: 'low',
      environment: 'large',
      pictures: [''],
      requirements: ['be on board with dumb people'],
      organization_id: testOrganization2.id,
    })

    await petsRepository.create({
      type: 'cat',
      name: 'Jones',
      about: 'smartest cat on space',
      age: 'young',
      size: 'small',
      energy_level: 'veryHigh',
      independency_level: 'high',
      environment: 'large',
      pictures: [''],
      requirements: ['be the smartest animal on a ship'],
      organization_id: testOrganization2.id,
    })

    const testOrganization3 = await organizationsRepository.create({
      title: 'Arten Organization',
      email: 'arten@example.com',
      zip_code: '12345',
      address: '39, 5th street',
      city: 'Campinas',
      state: 'SP',
      phone: '12345678',
      password_hash: '123456',
    })

    await petsRepository.create({
      type: 'cat',
      name: 'Bruce Wayne',
      about: 'friendly cat',
      age: 'adult',
      size: 'medium',
      energy_level: 'high',
      independency_level: 'low',
      environment: 'small',
      pictures: [''],
      requirements: [''],
      organization_id: testOrganization3.id,
    })

    await petsRepository.create({
      type: 'cat',
      name: 'Michael Jordan',
      about: 'happiest cat ever',
      age: 'young',
      size: 'large',
      energy_level: 'low',
      independency_level: 'low',
      environment: 'medium',
      pictures: [''],
      requirements: [''],
      organization_id: testOrganization3.id,
    })

    const { pets } = await sut.execute({
      city: 'Campinas',
    })

    expect(pets).toHaveLength(4)
  })
})
