import { FastifyInstance } from 'fastify'
import { filter } from './filter'
import { list } from './list'
import { profile } from './profile'
import { register } from './register'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', register)
  app.get('/:city/pets', list)
  app.get('/pets/:petId', profile)
  app.get('/:city/pets/filter', filter)
}
