import { makeFetchPetsListInCityUseCase } from '@/use-cases/factories/make-fetch-pets-list-in-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function list(req: FastifyRequest, reply: FastifyReply) {
  const fetchPetsListInCityParamsSchema = z.object({
    city: z
      .string({ required_error: 'É necessário informar uma cidade.' })
      .trim()
      .nonempty({ message: 'É necessário informar uma cidade.' }),
  })

  const { city } = fetchPetsListInCityParamsSchema.parse(req.params)

  const fetchPetsListInCityUseCase = makeFetchPetsListInCityUseCase()

  const { pets } = await fetchPetsListInCityUseCase.execute({
    city,
  })

  return reply.status(200).send({
    pets,
  })
}
