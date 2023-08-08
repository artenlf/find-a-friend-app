import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOrganizationProfileUseRequest {
  organizationId: string
}

interface GetOrganizationProfileUseResponse {
  organization: Organization
}

export class GetOrganizationProfileUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    organizationId,
  }: GetOrganizationProfileUseRequest): Promise<GetOrganizationProfileUseResponse> {
    const organization = await this.organizationsRepository.findById(
      organizationId,
    )

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    return { organization }
  }
}
