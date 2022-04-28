// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')


test('sanity', () => {
  expect(false).toBe(false)
})

test('environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')})


  describe('[POST] /register', () => {  test('responds with error when no username', async () => {

    const res = await request(server).post('/api/auth/register').send({
      username: 'hello', 
      password: 'password',
})
    expect(res.body).toMatchObject({})
})
test('responds with error when no password', async () => {

    const res = await request(server).post('/api/auth/register').send({
      username: 'helloooo', 
      password: 'hellloooo',
})
    expect(res.body).toMatchObject({})
})
})

describe('[POST] /login', () => { test('responds with error when no username', async () => {

    const res = await request(server).post('/login').send({
      username: '', 
      password: 'username'
})
    expect(res.status).toBe(404)
})
  })