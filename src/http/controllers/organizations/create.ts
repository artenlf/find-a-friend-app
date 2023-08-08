import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
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
    createBodySchema.parse(req.body)

  const createOrganizationUseCase = makeCreateOrganizationUseCase()

  await createOrganizationUseCase.execute({
    title,
    email,
    zip_code,
    address,
    city,
    state,
    phone,
    password,
  })

  return reply.status(201).send()
}
