import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Organization[] = []

  async create(data: Prisma.OrganizationCreateManyInput) {
    const organization: Organization = {
      id: randomUUID(),
      title: data.title,
      email: data.email,
      zip_code: data.zip_code,
      address: data.address,
      city: data.city,
      state: data.state,
      phone: data.phone,
      password_hash: data.password_hash,
    }

    this.organizations.push(organization)

    return organization
  }

  async findById(id: string) {
    const organization = this.organizations.find(
      (organization) => organization.id === id,
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.organizations.find(
      (organization) => organization.email === email,
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async searchMany(query: string) {
    return this.organizations.filter((organization) =>
      organization.title.includes(query),
    )
  }
}
