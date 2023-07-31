import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('List Pets in City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list Pets in a determined city', async () => {
    const organization = await prisma.organization.create({
      data: {
        title: 'John Doe Organization',
        email: 'johndoe@example.com',
        zip_code: '12345',
        address: '39, 5th street',
        city: 'Campinas',
        state: 'SP',
        phone: '12345678',
        password_hash: '123456',
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

    const organization2 = await prisma.organization.create({
      data: {
        title: 'Ellen Ripley Organization',
        email: 'ellenripley@example.com',
        zip_code: '67890',
        address: '39, 5th street',
        city: 'Austin',
        state: 'TX',
        phone: '12345678',
        password_hash: '123456',
      },
    })

    await request(app.server)
      .post('/pets')
      .send({
        type: 'other',
        name: 'Alien',
        about: 'well...',
        age: 'newborn',
        size: 'large',
        energy_level: 'veryHigh',
        independency_level: 'low',
        environment: 'large',
        pictures: [''],
        requirements: ['be on board with dumb people'],
        organization_id: organization2.id,
      })

    await request(app.server)
      .post('/pets')
      .send({
        type: 'cat',
        name: 'Jones',
        about: 'smartest cat on space',
        age: 'young',
        size: 'small',
        energy_level: 'veryHigh',
        independency_level: 'high',
        environment: 'large',
        pictures: [''],
        requirements: ['be the smartest animal on a ship'],
        organization_id: organization2.id,
      })

    const organization3 = await prisma.organization.create({
      data: {
        title: 'Arten Organization',
        email: 'arten@example.com',
        zip_code: '12345',
        address: '39, 5th street',
        city: 'Campinas',
        state: 'SP',
        phone: '12345678',
        password_hash: '123456',
      },
    })

    await request(app.server)
      .post('/pets')
      .send({
        type: 'cat',
        name: 'Michael Jordan',
        about: 'happiest cat ever',
        age: 'young',
        size: 'large',
        energy_level: 'low',
        independency_level: 'low',
        environment: 'medium',
        pictures: [''],
        requirements: [''],
        organization_id: organization3.id,
      })

    await request(app.server)
      .post('/pets')
      .send({
        type: 'cat',
        name: 'Bruce Wayne',
        about: 'friendly cat',
        age: 'adult',
        size: 'medium',
        energy_level: 'high',
        independency_level: 'low',
        environment: 'small',
        pictures: [''],
        requirements: [''],
        organization_id: organization3.id,
      })

    const response = await request(app.server)
      .get(`/${organization3.city}/pets`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(4)
  })
})
