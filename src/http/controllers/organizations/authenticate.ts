import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateOrganizationUseCase } from '@/use-cases/factories/make-authenticate-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateOrganizationUseCase()

    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    return reply.status(200).send({
      token,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }

  //   const refreshToken = await reply.jwtSign({
  //     sign: {
  //       sub: organization.id,
  //       expiresIn: '7d',
  //     },
  //   })

  //   return reply
  //     .setCookie('refreshToken', refreshToken, {
  //       path: '/',
  //       secure: true,
  //       sameSite: true,
  //       httpOnly: true,
  //     })
  //     .status(200)
  //     .send({
  //       token,
  //     })
  // } catch (error) {
  //   if (error instanceof InvalidCredentialsError) {
  //     return reply.status(400).send({ message: error.message })
  //   }

  //   throw error
  // }
}
