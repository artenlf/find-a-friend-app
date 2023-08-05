import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async findManyByCity(params: string) {
    const organizations = await prisma.organization.findMany({
      where: {
        city: {
          equals: params,
        },
      },
    })
    return organizations
  }

  async searchMany(query: string) {
    const organizations = await prisma.organization.findMany({
      where: {
        title: {
          contains: query,
        },
      },
    })
    return organizations
  }

  async create(data: Prisma.OrganizationCreateManyInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }
}
