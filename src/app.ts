import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { organizationsRoutes } from './http/controllers/organizations/routes'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

app.register(petsRoutes)
app.register(organizationsRoutes)

// app.setErrorHandler((error, _request, reply) => {
//   if (error instanceof ZodError) {
//     return reply
//       .status(400)
//       .send({ message: 'Validation error', issues: error.format() })
//   }

//   if (env.NODE_ENV !== 'production') {
//     console.error(error)
//   } else {
//     // TODO: Here we should log the error to an external tool like Datadog/NewRelic/Sentry
//   }

//   return reply.status(500).send({ message: 'Internal server error' })
// })
