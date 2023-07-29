import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find a Pet by id and get its profile', async () => {
    const organization = await prisma.organization.create({
      data: {
        title: 'John Doe Organization',
        email: 'johndoe@example.com',
        zip_code: '12345678',
        address: '39, 5th street',
        city: 'Campinas',
        state: 'SP',
        phone: '12345678',
        password_hash: '12345678',
      },
    })

    const pet = await prisma.pet.create({
      data: {
        type: 'dog',
        name: 'bidu',
        about: 'dog legal',
        age: 'young',
        size: 'small',
        energy_level: 'medium',
        independency_level: 'medium',
        environment: 'medium',
        organization_id: organization.id,
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet.name).toEqual('bidu')
  })
})
