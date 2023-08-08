import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { create } from './create'
import { profile } from './profile'
import { refresh } from './refresh-token'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', create)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  // Authenticated routes
  app.get('/organization', { onRequest: [verifyJWT] }, profile)
}
