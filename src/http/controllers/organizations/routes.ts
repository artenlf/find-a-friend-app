import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { create } from './create'
import { profile } from './profile'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', create)
  app.post('/sessions', authenticate)

  // Authenticated routes
  app.get('/organization', { onRequest: [verifyJWT] }, profile)
}
