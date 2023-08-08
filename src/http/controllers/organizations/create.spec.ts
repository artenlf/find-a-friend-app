import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an Organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      title: 'John Doe Organization',
      email: 'johndoe@example.com',
      zip_code: '12345678',
      address: '39, 5th street',
      city: 'Campinas',
      state: 'SP',
      phone: '12345678',
      password: '12345678',
    })

    expect(response.statusCode).toEqual(201)
  })
})
