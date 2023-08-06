import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    type: z.enum(['dog', 'cat', 'other']),
    name: z.string(),
    about: z.string(),
    age: z.enum(['newborn', 'young', 'adult', 'senior']),
    size: z.enum(['small', 'medium', 'large']),
    energy_level: z.enum(['veryLow', 'low', 'medium', 'high', 'veryHigh']),
    independency_level: z.enum(['low', 'medium', 'high']),
    environment: z.enum(['small', 'medium', 'large']),
    organization_id: z.string(),
  })

  const {
    type,
    name,
    about,
    age,
    size,
    energy_level,
    independency_level,
    environment,
    organization_id,
  } = registerBodySchema.parse(req.body)

  const registerPetUseCase = makeRegisterPetUseCase()

  await registerPetUseCase.execute({
    id: randomUUID(),
    type,
    name,
    about,
    age,
    size,
    energy_level,
    independency_level,
    environment,
    pictures: [],
    requirements: [],
    organization_id,
  })

  return reply.status(201).send()
}
