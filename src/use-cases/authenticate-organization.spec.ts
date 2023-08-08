import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { beforeEach, expect, it, test } from 'vitest'
import { AuthenticateOrganizationUseCase } from './authenticate-organization'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateOrganizationUseCase

test('Authenticate Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to authenticate a Organization', async () => {
    await organizationsRepository.create({
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
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    await expect(() =>
      sut.execute({
        email: 'dohnjoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
      title: 'John Doe Organization',
      email: 'johndoe@example.com',
      zip_code: '12345',
      address: 'street address 12345',
      city: 'Campinas',
      state: 'SP',
      phone: '12345678',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
