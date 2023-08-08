import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetOrganizationProfileUseCase } from './get-organization-profile'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: GetOrganizationProfileUseCase

describe('Get Organization Profile Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new GetOrganizationProfileUseCase(organizationsRepository)
  })

  it('should be able to authenticate an organization', async () => {
    const createdOrganization = await organizationsRepository.create({
      title: 'John Doe Organization',
      email: 'johndoe@example.com',
      zip_code: '12345',
      address: 'street address 12345',
      city: 'Campinas',
      state: 'SP',
      phone: '12345678',
      password_hash: await hash('123456', 6),
    })

    const { organization } = await sut.execute({
      organizationId: createdOrganization.id,
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization.title).toEqual('John Doe Organization')
  })

  it('should not be able to get organization profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        organizationId: 'non-existing id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
