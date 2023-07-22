import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search Pets', async () => {
    await request(app.server).post('/pets').send({
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

    await request(app.server).post('/gyms').send({
      type: 'dog',
      name: 'bashum',
      about: 'dog maneiro',
      age: 'adult',
      size: 'small',
      energy_level: 'medium',
      independency_level: 'medium',
      environment: 'medium',
      organization_id: '34b2c799-918c-4753-9ad7-e5306b55730e',
    })

    const response = await request(app.server)
      .get('/pets/search')
      .query({
        query: 'bashum',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        title: 'bashum',
      }),
    ])
  })
})
