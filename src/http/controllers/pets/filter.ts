import { makeFilterPetsUseCase } from '@/use-cases/factories/make-filter-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function filter(req: FastifyRequest, reply: FastifyReply) {
  const fetchPetsListInCityParamsSchema = z.object({
    city: z
      .string({ required_error: 'É necessário informar uma cidade.' })
      .trim()
      .nonempty({ message: 'É necessário informar uma cidade.' }),
  })

  const filterPetsQuerySchema = z.object({
    type: z.enum(['cat', 'dog', 'other']).optional(),
    age: z.enum(['newborn', 'young', 'adult', 'senior']).optional(),
    size: z.enum(['small', 'medium', 'large']).optional(),
    energy_level: z
      .enum(['veryLow', 'low', 'medium', 'high', 'veryHigh'])
      .optional(),
    independency_level: z.enum(['low', 'medium', 'high']).optional(),
    environment: z.enum(['small', 'medium', 'large']).optional(),
  })

  const { city } = fetchPetsListInCityParamsSchema.parse(req.params)
  const query = filterPetsQuerySchema.parse(req.query)

  const filterPetsUseCase = makeFilterPetsUseCase()

  const { pets } = await filterPetsUseCase.execute({ city, query })

  return reply.status(200).send({
    pets,
  })
}
