import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Filter Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to filter Pets', async () => {
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

    await request(app.server).post('/pets').send({
      type: 'dog',
      name: 'bidu',
      about: 'dog legal',
      age: 'young',
      size: 'small',
      energy_level: 'medium',
      independency_level: 'medium',
      environment: 'medium',
      organization_id: organization.id,
    })

    await request(app.server).post('/pets').send({
      type: 'dog',
      name: 'bashum',
      about: 'dog maneiro',
      age: 'adult',
      size: 'small',
      energy_level: 'medium',
      independency_level: 'medium',
      environment: 'medium',
      organization_id: organization.id,
    })

    const response = await request(app.server)
      .get(`/${organization.city}/pets`)
      .query({
        age: 'adult',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    // expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'bashum' })]),
    )
  })
})
