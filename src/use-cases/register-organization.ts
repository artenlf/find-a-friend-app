import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization, Pet } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface RegisterOrganizationUseCaseRequest {
  title: string
  email: string
  zipcode: string
  address: string
  phone: string
  password: string
  latitude: number
  longitude: number
  pets: Pet[]
}

interface RegisterOrganizationUseCaseResponse {
  organization: Organization
}

export class RegisterOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    title,
    email,
    zipcode,
    address,
    phone,
    password,
    latitude,
    longitude,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      title,
      email,
      zipcode,
      address,
      phone,
      password_hash,
      latitude,
      longitude,
    })

    return { organization }
  }
}
