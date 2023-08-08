import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', create)
  // app.get('/organizations', profile)
  // app.get('/organizations/search', search)
}
