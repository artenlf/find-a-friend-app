import { makeFetchPetsListInCityUseCase } from '@/use-cases/factories/make-fetch-pets-list-in-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function list(req: FastifyRequest, reply: FastifyReply) {
  const fetchPetsListInCityParamsSchema = z.object({
    city: z.string(),
  })

  const { city } = fetchPetsListInCityParamsSchema.parse(req.params)

  const fetchPetsListInCity = makeFetchPetsListInCityUseCase()

  const { pets } = await fetchPetsListInCity.execute({
    city,
  })

  return reply.status(200).send({
    pets,
  })
}
