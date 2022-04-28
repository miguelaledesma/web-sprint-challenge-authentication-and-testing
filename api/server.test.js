// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')


test('sanity', () => {
  expect(false).toBe(false)
})

test('environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')})
