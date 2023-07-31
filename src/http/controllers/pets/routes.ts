import { FastifyInstance } from 'fastify'
import { list } from './list'
import { profile } from './profile'
import { register } from './register'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', register)
  app.get('/:city/pets', list)
  app.get('/pets/:petId', profile)
  app.get('/pets/search', search)
}
