import request from 'supertest'
const baseURL = 'http://54.162.8.45:4000'

describe('Route testing', () => {
  it('Deve retornar http 200 e a url encurtada (route: POST /)', async () => {
    const res = await request(baseURL)
      .post('/encurtador')
      .send({ url: 'http://wisereducacao.com' })

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('newURL')
  })
  it('Deve retornar http 404 e a url encurtada (route: GET /)', async () => {
    const res = await request(baseURL).get('/testeurlerrada')

    expect(res.status).toEqual(404)
  })
})
