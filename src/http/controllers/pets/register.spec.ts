import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a Pet', async () => {
    const response = await request(app.server).post('/pets').send({
      type: 'dog',
      name: 'bidu',
      about: 'dog legal',
      age: 'young',
      size: 'small',
      energy_level: 'medium',
      independency_level: 'medium',
      environment: 'medium',
      organization_id: '34b2c799-918c-4753-9ad7-e5306b55730e',
    })

    expect(response.statusCode).toEqual(201)
  })
})
