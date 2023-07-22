import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a Organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      title: 'John Doe Organization',
      email: 'johndoe@example.com',
      zip_code: '12345678',
      address: '39, 5th street',
      phone: '12345678',
      password: '12345678',
      latitude: -22.9019746,
      longitude: -47.0582353,
    })

    expect(response.statusCode).toEqual(201)
  })
})
