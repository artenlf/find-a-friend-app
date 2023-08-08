import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })
  it('should be able to create an organization', async () => {
    const { organization } = await sut.execute({
      title: 'John Doe Organization',
      email: 'johndoe@example.com',
      zip_code: '12345',
      address: 'street address 12345',
      city: 'Campinas',
      state: 'SP',
      phone: '12345678',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create an organization with the same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      title: 'John Doe Organization',
      email,
      zip_code: '12345',
      address: 'street address 12345',
      city: 'Campinas',
      state: 'SP',
      phone: '12345678',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        title: 'John Doe Organization',
        email,
        zip_code: '12345',
        address: 'street address 12345',
        city: 'Campinas',
        state: 'SP',
        phone: '12345678',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })

  it('should hash organization password upon creation', async () => {
    const { organization } = await sut.execute({
      title: 'John Doe Organization',
      email: 'johndoe@example.com',
      zip_code: '12345',
      address: 'street address 12345',
      city: 'Campinas',
      state: 'SP',
      phone: '12345678',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
