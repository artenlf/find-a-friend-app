import { makeGetPetByIdUseCase } from '@/use-cases/factories/make-get-pet-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const getPetProfileParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = getPetProfileParamsSchema.parse(req.params)

  const getPetProfile = makeGetPetByIdUseCase()

  const { pet } = await getPetProfile.execute({
    petId,
  })

  return reply.status(200).send({
    pet,
  })
}
