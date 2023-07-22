import fastify from 'fastify'
import { organizationsRoutes } from './http/controllers/organizations/routes'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(petsRoutes)
app.register(organizationsRoutes)
