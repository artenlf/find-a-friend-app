import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    email: z.string().email(),
    zip_code: z.string().min(8),
    address: z.string(),
    phone: z.string().min(8),
    password: z.string().min(6),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const {
    title,
    email,
    zip_code,
    address,
    phone,
    password,
    latitude,
    longitude,
  } = registerBodySchema.parse(req.body)

  const registerOrganizationUseCase = makeRegisterOrganizationUseCase()

  await registerOrganizationUseCase.execute({
    title,
    email,
    zip_code,
    address,
    phone,
    password,
    latitude,
    longitude,
    pets: [],
  })

  return reply.status(201).send()
}
