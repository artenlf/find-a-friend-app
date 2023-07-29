import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization, Pet } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface RegisterOrganizationUseCaseRequest {
  title: string
  email: string
  zip_code: string
  address: string
  city: string
  state: string
  phone: string
  password: string
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
    zip_code,
    address,
    city,
    state,
    phone,
    password,
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
      zip_code,
      address,
      city,
      state,
      phone,
      password_hash,
    })

    return { organization }
  }
}
