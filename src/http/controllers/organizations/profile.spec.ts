import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/tests/create-and-authenticate-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Organization profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get organization profile', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const organizationProfileResponse = await request(app.server)
      .get('/organization')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(organizationProfileResponse.statusCode).toEqual(200)
    expect(organizationProfileResponse.body.organization).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    )
  })
})
