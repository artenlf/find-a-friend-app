import { makeGetOrganizationProfileUseCase } from '@/use-cases/factories/make-get-organization-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const getOrganizationProfile = makeGetOrganizationProfileUseCase()

  const { organization } = await getOrganizationProfile.execute({
    organizationId: req.user.sub,
  })

  return reply.status(200).send({
    organization: {
      ...organization,
      password_hash: undefined,
    },
  })
}
