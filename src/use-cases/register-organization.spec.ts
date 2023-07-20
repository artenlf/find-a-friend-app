import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { RegisterOrganizationUseCase } from './register-organization'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterOrganizationUseCase

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationUseCase(organizationsRepository)
  })
  it('should be able to register a organization', async () => {
    const { organization } = await sut.execute({
      title: 'John Doe Organization',
      email: 'johndoe@example.com',
      zipcode: '12345',
      address: 'street address 12345',
      phone: '12345678',
      password: '123456',
      latitude: -22.9019746,
      longitude: -47.0582353,
      pets: [],
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to register an organization with the same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      title: 'John Doe Organization',
      email,
      zipcode: '12345',
      address: 'street address 12345',
      phone: '12345678',
      password: '123456',
      latitude: -22.9019746,
      longitude: -47.0582353,
      pets: [],
    })

    await expect(() =>
      sut.execute({
        title: 'John Doe Organization',
        email,
        zipcode: '12345',
        address: 'street address 12345',
        phone: '12345678',
        password: '123456',
        latitude: -22.9019746,
        longitude: -47.0582353,
        pets: [],
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })

  it('should hash organization password upon register', async () => {
    const { organization } = await sut.execute({
      title: 'John Doe Organization',
      email: 'johndoe@example.com',
      zipcode: '12345',
      address: 'street address 12345',
      phone: '12345678',
      password: '123456',
      latitude: -22.9019746,
      longitude: -47.0582353,
      pets: [],
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})