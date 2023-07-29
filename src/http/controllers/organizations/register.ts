import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    email: z.string().email(),
    zip_code: z.string().min(8),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    phone: z.string().min(8),
    password: z.string().min(6),
  })

  const { title, email, zip_code, address, city, state, phone, password } =
    registerBodySchema.parse(req.body)

  const registerOrganizationUseCase = makeRegisterOrganizationUseCase()

  await registerOrganizationUseCase.execute({
    title,
    email,
    zip_code,
    address,
    city,
    state,
    phone,
    password,
    pets: [],
  })

  return reply.status(201).send()
}
