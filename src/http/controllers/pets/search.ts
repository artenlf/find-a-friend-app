import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    query: z.string(),
  })

  const { query } = searchPetsQuerySchema.parse(req.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    query,
  })

  return reply.status(200).send({
    pets,
  })
}
