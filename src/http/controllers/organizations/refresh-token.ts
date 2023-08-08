import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(req: FastifyRequest, reply: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign({
    sign: {
      sub: req.user.sub,
    },
  })

  const refreshToken = await reply.jwtSign({
    sign: {
      sub: req.user.sub,
      expiresIn: '7d',
    },
  })

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, // HTTPS encryption
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}
